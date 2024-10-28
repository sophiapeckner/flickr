package com.flickr.endpoints;

import com.flickr.entities.Movie;
import com.flickr.entities.Session;
import com.flickr.entities.User;
import com.flickr.storage.SessionRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Endpoint
@AnonymousAllowed
public class SessionEndpoint {
    private SessionRepository repository;
    SessionEndpoint(SessionRepository repository) {
        this.repository = repository;
    }

    public List<Session> findAll() {
        // List all the Session(s) currently in the DB
        return repository.findAll();
    }

    public Session createSession() {
        // Create a new session associated with a unique groupCode
        // Adds this new session into the DB
        // This will occur when a group admin creates a group
        String groupCode = UUID.randomUUID().toString().substring(0, 8);
        return repository.save(new Session(groupCode));
    }

    public Optional<Session> fetchSession(String groupCode) {
        // Returns Session with corresponding groupCode
        return repository.findByGroupCode(groupCode);
    }

    public Session joinSession(String groupCode, User user) {
        // Add the specified user to the Session with groupCode
        // Assume that the Session exists; so isPresent() isn't used
        Session session = fetchSession(groupCode).get();
        session.getMembers().add(user);
        return repository.save(session);
    }
}
