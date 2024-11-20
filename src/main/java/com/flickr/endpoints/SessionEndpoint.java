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
import org.springframework.core.env.Environment;
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
    private final SessionRepository repository; // sessionRepository
    private final Environment environment;

    SessionEndpoint(SessionRepository repository, MovieRepository movieRepository, SessionMovieRepository sessionMovieRepository, MemberRepository memberRepository, Environment environment) {
        this.repository = repository;
        this.movieRepository = movieRepository;
        this.sessionMovieRepository = sessionMovieRepository;
        this.memberRepository = memberRepository;
        this.environment = environment;
    }

    // Hilla Endpoint
    public List<Session> findAll() {
        // List all the Session(s) currently in the DB
        return repository.findAll();
    }

    public Session fetchSessionByGroupCode(String groupCode) {
        // Returns Session with groupCode
        return repository.findByGroupCode(groupCode)
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));
    }

    public Session createSession() {
        // Create a new session associated with a unique groupCode
        // Adds this new session into H2
        // This is called when a group admin "Creates Group" on StartAuth View
        String groupCode = UUID.randomUUID().toString().substring(0, 8);
        return repository.save(new Session(groupCode));
    }

    public String joinSession(Long sessionId, String email) {
        Session session = repository.findById(sessionId)
            .orElseThrow(() -> new IllegalArgumentException("Session not found for groupCode: " + sessionId));

        // Declare member variable which will be saved to the Session & Repository
        Member member;
        if (email.isEmpty()) {
            // Member is joining anonymously
            member = new Member();
            member = memberRepository.save(member);
        } else {
            // Member is signed in/authenticated
            member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Member not found for email: " + email));
        }

        // Always associate the member with the Session ID
        member.setSessionId(sessionId);
        member.setMovieIndex(0);

        // Add the member to the Session only if they're not already in Session
        if (!session.getMembers().contains(member)) {
            session.getMembers().add(member);
        }

        repository.save(session);

        return member.getId().toString();
    }

    @GetMapping("/member/{memberId}")
    public Member fetchMemberById(@PathVariable String memberId) {
        return memberRepository.findById(Long.valueOf(memberId))
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
    }

    @GetMapping("/{memberId}")
    public Session fetchMembersSession(@PathVariable String memberId) {
        // Returns Session that the Member with memberID is in
        Member member = fetchMemberById(memberId);
        return repository.findById(member.getSessionId())
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));
    }

    @PutMapping("/{memberId}/genres")
    public Session updateGenres(@PathVariable String memberId, @RequestBody List<String> genres) {
        // Insert the genre(s) each member is interested in watching
        // into the Session that the Member is in
        Session session = fetchMembersSession(memberId);
        // Append all the `genres` to Session
        session.getGenres().addAll(genres);
        return repository.save(session);
    }

    @PutMapping("/{memberId}/platforms")
    public Session updateStreamingPlatforms(@PathVariable String memberId, @RequestBody List<String> platforms) {
        // Insert the streaming platform(s) each member has
        // into the Session that the Member is in
        Session session = fetchMembersSession(memberId);
        // Append all `platforms` to Session
        session.getStreamingPlatforms().addAll(platforms);
        return repository.save(session);
    }

    @PostMapping("/{memberId}/movies")
    public Session generateSuggestions(@PathVariable String memberId) throws JSONException, IOException, InterruptedException {
        // Generate suggestions for the group with Member
        Session session = fetchMembersSession(memberId);

        // Get a random page number so that way movie suggestions are varied
        String pageNum = String.valueOf(new Random().nextInt(500));

        // Build the API URL
        String genreParam = String.join("OR", session.getGenres());
        String platformParam = String.join("AND", session.getStreamingPlatforms());
        String url = String.format("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=%s&sort_by=popularity.desc&with_genres=%s&with_watch_providers=%s", pageNum, genreParam, platformParam);

        // Create the request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
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
        return repository.save(session);
    }

    @PutMapping("/{memberId}/startSession")
    public Session startSession(@PathVariable String memberId) {
        Session session = fetchMembersSession(memberId);
        session.setStarted(true);
        return repository.save(session);
    }

    @PutMapping("/member/{memberId}/updateMovieIndex")
    public Member updateMemberMovieIndex(@PathVariable String memberId, @RequestBody Map<String, Integer> request) {
        int movieIndex = request.get("movieIndex");
        Member member = fetchMemberById(memberId);
        member.setMovieIndex(movieIndex);
        return memberRepository.save(member);
    }

    @PutMapping("/movie/{movieId}/incrementVote")
    public SessionMovie incrementMovieVoteCount(@PathVariable Long movieId) {
       SessionMovie sessionMovie = sessionMovieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("SessionMovie not found"));
        sessionMovie.setVoteCount(sessionMovie.getVoteCount() + 1);
        return sessionMovieRepository.save(sessionMovie);
    }
}
