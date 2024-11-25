package com.flickr.controllers;

import com.flickr.services.SessionService;
import com.flickr.entities.Member;
import com.flickr.entities.Movie;
import com.flickr.entities.Session;
import com.flickr.entities.SessionMovie;
import com.flickr.services.MemberService;
import com.flickr.storage.MemberRepository;
import com.flickr.storage.MovieRepository;
import com.flickr.storage.SessionMovieRepository;
import com.flickr.storage.SessionRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.security.SecureRandom;
import java.util.*;

@Endpoint
@AnonymousAllowed
@RestController
@RequestMapping("/api/vote")
public class VoteEndpoint {
    private final SessionRepository sessionRepository;
    private final MovieRepository movieRepository;
    private final SessionMovieRepository sessionMovieRepository;
    private final MemberRepository memberRepository;
    private final SessionService sessionService;
    private final SecureRandom random = new SecureRandom();
    private final MemberService memberService;

    public VoteEndpoint (SessionRepository sessionRepository, MovieRepository movieRepository, SessionMovieRepository sessionMovieRepository, MemberRepository memberRepository, SessionService sessionService, MemberService memberService) {
        this.sessionRepository = sessionRepository;
        this.movieRepository = movieRepository;
        this.sessionMovieRepository = sessionMovieRepository;
        this.memberRepository = memberRepository;
        this.sessionService = sessionService;
//        I don't know if this is supposed to be in the constructor or if it needs a 'new MemberService();' call
        this.memberService = memberService;
    }

    /**
     * Get the member with ID
     * @param memberId Member's ID
     * @return Member object
     */
    //endpoint - something that the frontend calls in order to fetch data - similar to an api
    //Fake api is basically located at /api/vote/memberid
    // that is what @PathVariable does
    @GetMapping("/{memberId}")
    public Member fetchMemberById(@PathVariable String memberId) {
        return memberRepository.findById(Long.valueOf(memberId))
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
    }

    /**
     * Generate 20 movie suggestions for the session that member is in
     * @param memberId ID of the member
     * @return Session that movie suggestions have been generated for
     */
    // when start voiting is presssed, this is called
    // passes the member id of whoever pressed start voting
    @PostMapping("/{memberId}/movies")
    public Session generateSuggestions(@PathVariable String memberId) throws JSONException, IOException, InterruptedException {
        // based on the member id, it grabs the session that the member is in,
        Session session = sessionService.fetchMembersSession(memberId);

        // Get a random page number so that way movie suggestions are varied
        String pageNum = String.valueOf(random.nextInt(500));

        // Build the API URL
        String genreParam = String.join("OR", session.getGenres());
        String platformParam = String.join("AND", session.getStreamingPlatforms());

        Set<String> languages = session.getLanguages();
        String languageParam = String.join("OR", session.getLanguages());
        if (languages.contains("any")) {
            languageParam = "";
        }

        String url = String.format("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=%s&sort_by=popularity.desc&with_original_language=%s&with_genres=%s&with_watch_providers=%s", pageNum, languageParam, genreParam, platformParam);
        
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
        return sessionRepository.save(session);
    }

    /**
     * Update the member's movie index so that they can swipe through movies
     * @param memberId String representation of member's ID
     * @param request New value the movie index should be
     * @return The member with memberId
     */
    //    https://www.codejava.net/testing/junit-test-exception-examples-how-to-assert-an-exception-is-thrown#:~:text=Test%20Exception%20in%20JUnit%203&text=As%20you%20can%20see%2C%20we,to%20assert%20the%20exception%20message.
    @PutMapping("/{memberId}/updateMovieIndex")
    public Member updateMemberMovieIndex(@PathVariable String memberId, @RequestBody Map<String, Integer> request) {
        int movieIndex = request.get("movieIndex");
        Member member = memberRepository.findById(Long.valueOf(memberId))
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
        member.setMovieIndex(movieIndex);
        return memberRepository.save(member);
    }

    /**
     * Increment the vote count associated with a movie
     * @param movieId Movie's ID
     * @return SessionMovie associated with movie with movieId
     */
    @PutMapping("/{movieId}/incrementVote")
    public SessionMovie incrementMovieVoteCount(@PathVariable Long movieId) {
        SessionMovie sessionMovie = sessionMovieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("SessionMovie not found"));
        sessionMovie.setVoteCount(sessionMovie.getVoteCount() + 1);
        return sessionMovieRepository.save(sessionMovie);
    }

    /**
     * Add a member to a movie's voter list
     * @param movieId Movie's ID
     * @param memberId String representation of member's ID
     * @return SessionMovie associated with movie with movieId
     */
    @PutMapping("/{movieId}/addVoter/{memberId}")
    public SessionMovie addVoter(@PathVariable Long movieId, @PathVariable String memberId) {
        String voter = memberService.getMemberById(memberId).getDisplayName();
        SessionMovie sessionMovie = sessionMovieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("SessionMovie not found"));
        sessionMovie.getVoters().add(voter);
        return sessionMovieRepository.save(sessionMovie);
    }
}
