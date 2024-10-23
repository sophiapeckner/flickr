package com.flickr.endpoints;

import com.flickr.entities.Movie;
import com.flickr.storage.SessionRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class SessionEndpoint {
    private SessionRepository repository;
    SessionEndpoint(SessionRepository repository) {
        this.repository = repository;
    }

    //    get or retrieve all the entities from the database table
    public List<Movie> findAll() {
        return repository.findAll();
    }

    public Movie add(String title, String imageURL) {
        return repository.save(new Movie(title, imageURL));
    }

//    public Movie update
}
