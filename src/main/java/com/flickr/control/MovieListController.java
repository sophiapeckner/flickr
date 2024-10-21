package com.flickr.control;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;

import java.util.ArrayList;

@Endpoint
@AnonymousAllowed
public class MovieListController {
    private ArrayList<String> movies;

    public MovieListController() {
        this.movies = new ArrayList<String>();
    }

    public ArrayList<String> getSelectedMovieList() {
        return movies;
    }

    public void addMovieToList(String movieName) {
        movies.add(movieName);
    }
}
