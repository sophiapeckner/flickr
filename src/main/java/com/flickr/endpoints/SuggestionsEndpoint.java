package com.flickr.endpoints;

import com.flickr.entities.Movie;
import com.flickr.storage.MovieRepository;
import com.flickr.storage.SessionRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

@Endpoint
@AnonymousAllowed
public class SuggestionsEndpoint {
    private MovieRepository repository;

    SuggestionsEndpoint(MovieRepository repository) {
        this.repository = repository;
    }

    public Movie generateSuggestions() throws JSONException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"))
                .header("accept", "application/json")
                .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDY1MTE3ZTA3NDY3NGJiMjZkNTE4NTNkMTU5YzllMyIsIm5iZiI6MTczMDExMjc5Ni4xOTc1ODYsInN1YiI6IjVkNGY3YmM0MDc5YTk3MGI5ZWFkMTEzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.egTJfOX1iiqPAjjbNF07G92XzbZQ5HwThmAMC3wv_3A")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
        HttpResponse<String> response = null;
        try {
            response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }

        JSONObject suggestionsObject = null;
        try {
            suggestionsObject = new JSONObject(response.body());
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        JSONArray results = suggestionsObject.getJSONArray("results");
        return repository.save(new Movie(results.getJSONObject(7).get("original_title").toString(),
                results.getJSONObject(7).get("backdrop_path").toString()));

    }

    public List<Movie> findAll() {
        // List all the suggestions(s) currently in the DB
        return repository.findAll();
    }

}
