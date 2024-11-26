package com.flickr.controllers;

import com.flickr.entities.Member;
import com.flickr.entities.Session;
import com.flickr.services.MemberService;
import com.flickr.services.SessionService;
import com.flickr.storage.MemberRepository;
import com.flickr.storage.SessionRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Endpoint
@AnonymousAllowed
@RestController
@RequestMapping("/api/session")
public class ManageSessionEndpoint {
    private final SessionRepository sessionRepository;
    private final SessionService sessionService;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    public static final String sessionError = "Session not found";

    public ManageSessionEndpoint(SessionRepository sessionRepository, SessionService sessionService, MemberRepository memberRepository, MemberService memberService) {
        this.sessionRepository = sessionRepository;
        this.sessionService = sessionService;
        this.memberRepository = memberRepository;
        this.memberService = memberService;
    }

    /**
     * Fetch the session with specified group code
     * @param groupCode The session's code
     * @return The session with corresponding group code
     */
    public Session fetchSessionByGroupCode(String groupCode) {
        return sessionRepository.findByGroupCode(groupCode)
                .orElseThrow(() -> new IllegalArgumentException(sessionError));
    }

    /**
     * Create a new session and associate it with a unique group code & its group admin
     * @param email Group admin's email
     * @return The newly created session
     */
    public Session createSession(String email) {
        Member member = memberService.getMemberByEmail(email);
        String groupCode = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return sessionRepository.save(new Session(groupCode, member.getId().toString()));
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
     * Associate the member with the display name they inputted in session preferences
     * @param memberId String representation of member's ID
     * @param request Contains name member would like to go by in current session
     */
    @PutMapping("/{memberId}/displayName")
    public Member updateDisplayName(@PathVariable String memberId, @RequestBody Map<String, String> request) {
        Member member = memberService.getMemberById(memberId);
        String displayName = request.get("displayName");
        if (displayName.isEmpty()) {
            member.setDisplayName("Anonymous");
        } else {
            member.setDisplayName(displayName);
        }
        return memberRepository.save(member);
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
     * Insert selected streaming platform(s) into the session that member is in
     * @param memberId String representation of member's ID
     * @param request List of selected streaming platforms
     * @return The session that has been updated
     */
    @PutMapping("/{memberId}/languages")
    public Session updateLanguages(@PathVariable String memberId, @RequestBody Map<String, String> request) {
        Session session = fetchMembersSession(memberId);
        session.getLanguages().add(request.get("language"));
        return sessionRepository.save(session);
    }

    /**
     * Remove member at memberIndex from the session
     * @param sessionId Session's id
     * @param memberIndex The member to be removed
     * @return The updated session
     */
    @PutMapping("/{sessionId}/remove/{memberIndex}")
    public Session removeMember(@PathVariable Long sessionId, @PathVariable int memberIndex) {
        Session session = sessionRepository.findById(sessionId)
                        .orElseThrow(() -> new IllegalArgumentException(sessionError));
        Member member = session.getMembers().get(memberIndex);  // The member to be removed from group
        // Set the member's session ID to 0 (which is non-existent)
        member.setSessionId(0L);
        session.getMembers().remove(memberIndex);
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

    public Session removeSession(@PathVariable Long sessionId) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException(sessionError));
        for (Member member : session.getMembers()) {
            member.setSessionId(0L);
        }
        sessionRepository.delete(session);
        return session;
    }
}
