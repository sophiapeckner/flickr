package com.flickr.endpoints;

import com.flickr.entities.Member;
import com.flickr.entities.Movie;
import com.flickr.entities.Session;
import com.flickr.storage.SessionRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Endpoint
@AnonymousAllowed
@RestController
@RequestMapping("/api/session") // Base URL with RESTful access
public class SessionEndpoint {
    private SessionRepository repository;
    SessionEndpoint(SessionRepository repository) {
        this.repository = repository;
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
                    session.getMembers().add(member);
                    return repository.save(session);
                })
                .orElseThrow(() -> new IllegalArgumentException("Session not found for groupCode: " + groupCode));
    }

    // REST endpoint to fetch a session by groupCode
    @GetMapping("/{groupCode}")
    public Optional<Session> fetchSession(@PathVariable String groupCode) {
        // Returns Session with corresponding groupCode
        return repository.findByGroupCode(groupCode);
    }
}
