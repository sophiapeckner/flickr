package com.flickr.controllers;

import com.flickr.SessionService;
import com.flickr.entities.Session;
import com.flickr.storage.SessionRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Endpoint
@AnonymousAllowed
@RestController
@RequestMapping("/api/session")
public class ManageSessionEndpoint {
    private final SessionRepository sessionRepository;
    private final SessionService sessionService;

    ManageSessionEndpoint(SessionRepository sessionRepository, SessionService sessionService) {
        this.sessionRepository = sessionRepository;
        this.sessionService = sessionService;
    }

    /**
     * Get all sessions in the DB
     * @return List of sessions in the DB
     */
    public List<Session> findAll() {
        return sessionRepository.findAll();
    }

    /**
     * Fetch the session with specified group code
     * @param groupCode The session's code
     * @return The session with corresponding group code
     */
    public Session fetchSessionByGroupCode(String groupCode) {
        return sessionRepository.findByGroupCode(groupCode)
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));
    }

    /**
     * Create a new session and associate it with a unique group code
     * @return The newly created session
     */
    public Session createSession() {
        String groupCode = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return sessionRepository.save(new Session(groupCode));
    }

    /**
     * Returns the session that the member with memberID is in
     * @param memberId String representation of member's ID
     * @return Session that member is in
     */
    @GetMapping("/{memberId}")
    public Session fetchMembersSession(@PathVariable String memberId) {
        return sessionService.fetchMembersSession(memberId);
    }

    /**
     * Insert selected genre(s) into the session that member is in
     * @param memberId String representation of member's ID
     * @param genres List of selected genres
     * @return The session that has been updated
     */
    @PutMapping("/{memberId}/genres")
    public Session updateGenres(@PathVariable String memberId, @RequestBody List<String> genres) {
        Session session = fetchMembersSession(memberId);
        session.getGenres().addAll(genres);
        return sessionRepository.save(session);
    }

    /**
     * Insert selected streaming platform(s) into the session that member is in
     * @param memberId String representation of member's ID
     * @param platforms List of selected streaming platforms
     * @return The session that has been updated
     */
    @PutMapping("/{memberId}/platforms")
    public Session updateStreamingPlatforms(@PathVariable String memberId, @RequestBody List<String> platforms) {
        Session session = fetchMembersSession(memberId);
        session.getStreamingPlatforms().addAll(platforms);
        return sessionRepository.save(session);
    }

    /**
     * Start the session that member with memberId is in
     * @param memberId String representation of member's ID
     * @return The session that's been started
     */
    @PutMapping("/{memberId}/startSession")
    public Session startSession(@PathVariable String memberId) {
        Session session = fetchMembersSession(memberId);
        session.setStarted(true);
        return sessionRepository.save(session);
    }
}
