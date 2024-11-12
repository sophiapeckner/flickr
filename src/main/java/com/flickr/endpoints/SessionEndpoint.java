package com.flickr.endpoints;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flickr.entities.Member;
import com.flickr.entities.Movie;
import com.flickr.entities.Session;
import com.flickr.entities.SessionMovie;
import com.flickr.storage.MemberRepository;
import com.flickr.storage.MovieRepository;
import com.flickr.storage.SessionMovieRepository;
import com.flickr.storage.SessionRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import org.atmosphere.config.service.Post;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;

@Endpoint
@AnonymousAllowed
@RestController
@RequestMapping("/api/session") // Base URL with RESTful access
public class SessionEndpoint {
    private final MovieRepository movieRepository;
    private final SessionMovieRepository sessionMovieRepository;
    private final MemberRepository memberRepository;
    private final SessionRepository repository;

    SessionEndpoint(SessionRepository repository, MovieRepository movieRepository, SessionMovieRepository sessionMovieRepository, MemberRepository memberRepository) {
        this.repository = repository;
        this.movieRepository = movieRepository;
        this.sessionMovieRepository = sessionMovieRepository;
        this.memberRepository = memberRepository;
    }

    // Hilla Endpoint
    public List<Session> findAll() {
        // List all the Session(s) currently in the DB
        return repository.findAll();
    }

    public Session createSession() {
        // Create a new session associated with a unique groupCode
        // Adds this new session into H2
        // This is called when a group admin "Creates Group" on StartAuth View
        String groupCode = UUID.randomUUID().toString().substring(0, 8);
        return repository.save(new Session(groupCode));
    }

    public Session joinSession(String groupCode, String email, String pass, String username) {
        // First assume that the member is joining the session anonymously
        Member member = new Member();
        // If member is logged in, populate their information accordingly
        if (!email.isEmpty())       member.setEmail(email);
        if (!pass.isEmpty())        member.setPass(pass);
        if (!username.isEmpty())    member.setUsername(username);

        // First fetch the Session in the repository with corresponding groupCode
        // then add the newest member to the Session's members list
        return repository.findByGroupCode(groupCode)
                .map(session -> {
                    Member savedMember = memberRepository.save(member);
                    session.getMembers().add(savedMember);
                    return repository.save(session);
                })
                .orElseThrow(() -> new IllegalArgumentException("Session not found for groupCode: " + groupCode));
    }

    // REST GET endpoint to fetch a session by groupCode so that it's data can be viewed
    @GetMapping("/{groupCode}")
    public Optional<Session> fetchSession(@PathVariable String groupCode) {
        // Returns Session with corresponding groupCode
        return repository.findByGroupCode(groupCode);
    }

    // REST PUT endpoint to insert the genre(s) each member is interested in watching
    // into the Session associated with the groupCode
    @PutMapping("/{groupCode}/genres")
    public Session updateGenres(@PathVariable String groupCode, @RequestBody List<String> genres) {
        Optional<Session> session = fetchSession(groupCode);
        if (session.isEmpty()) {
            throw new IllegalArgumentException("Session not found for groupCode: " + groupCode);
        }
        // Append all the genres to the session's genre member variable
        session.get().getGenres().addAll(genres);
        return repository.save(session.get());
    }

    // REST PUT endpoint to insert the streaming platform(s) each member has
    // into the Session associated with the groupCode
    @PutMapping("/{groupCode}/platforms")
    public Session updateStreamingPlatforms(@PathVariable String groupCode, @RequestBody List<String> platforms) {
        Optional<Session> session = fetchSession(groupCode);
        if (session.isEmpty()) {
            throw new IllegalArgumentException("Session not found for groupCode: " + groupCode);
        }
        // Append all the streaming platforms to the session's streaming member variable
        session.get().getStreamingPlatforms().addAll(platforms);
        return repository.save(session.get());
    }

    @PostMapping("/{groupCode}/movies")
    public Session generateSuggestions(@PathVariable String groupCode) throws JSONException, IOException, InterruptedException {
        Optional<Session> sessionOptional = fetchSession(groupCode);

        if (sessionOptional.isEmpty()) {
            throw new IllegalArgumentException("Session not found for groupCode: " + groupCode);
        }

        Session session = sessionOptional.get();
        // Build the API URL
        String genreParam = String.join("OR", session.getGenres());
        String platformParam = String.join("AND", session.getStreamingPlatforms());
        String URL = String.format("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=%s&with_watch_providers=%s", genreParam, platformParam);

        // Create the request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(URL))
                .header("accept", "application/json")
                .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDY1MTE3ZTA3NDY3NGJiMjZkNTE4NTNkMTU5YzllMyIsIm5iZiI6MTczMDExMjc5Ni4xOTc1ODYsInN1YiI6IjVkNGY3YmM0MDc5YTk3MGI5ZWFkMTEzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.egTJfOX1iiqPAjjbNF07G92XzbZQ5HwThmAMC3wv_3A")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();

        // Execute the request and get the response
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        JSONObject suggestionsObject = new JSONObject(response.body());
        JSONArray results = suggestionsObject.getJSONArray("results");

        // Create a list to store SessionMovie objects
        List<SessionMovie> sessionMovies = new ArrayList<>();
        for (int i = 0; i < Math.min(20, results.length()); i++) {
            JSONObject movieData = results.getJSONObject(i);

            Movie movie = new Movie(
                    movieData.getString("original_title"),
                    movieData.getString("overview"),
                    movieData.getString("backdrop_path"),
                    movieData.getString("release_date")
            );

            // Each movie must be saved
            movie = movieRepository.save(movie);

            SessionMovie sessionMovie = new SessionMovie();
            sessionMovie.setSession(session);
            sessionMovie.setMovie(movie);
            sessionMovie.setVoteCount(0);

            sessionMovie = sessionMovieRepository.save(sessionMovie);

            sessionMovies.add(sessionMovie);
        }
        session.getMovies().addAll(sessionMovies);
//        System.out.println(new ObjectMapper().writeValueAsString(session));
        return repository.save(session);
    }

    @PutMapping("/member/{memberId}/updateMovieIndex")
    public Member updateMemberMovieIndex(@PathVariable Long memberId, @RequestBody Map<String, Integer> request) {
        int movieIndex = request.get("movieIndex");
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        member.setMovieIndex(movieIndex);
        return memberRepository.save(member);
    }

    @PutMapping("/{groupCode}/movie/{movieId}/incrementVote")
    public SessionMovie incrementMovieVoteCount(@PathVariable String groupCode, @PathVariable Long movieId) {
        Session session = repository.findByGroupCode(groupCode)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        SessionMovie sessionMovie = sessionMovieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("SessionMovie not found"));
        sessionMovie.setVoteCount(sessionMovie.getVoteCount() + 1);
        return sessionMovieRepository.save(sessionMovie);
    }
}
