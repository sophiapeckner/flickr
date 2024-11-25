package com.flickr.controllers;

import com.flickr.entities.Member;
import com.flickr.entities.Session;
import com.flickr.services.MemberService;
import com.flickr.storage.MemberRepository;
import com.flickr.storage.SessionRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Endpoint
@AnonymousAllowed
@RestController
@RequestMapping("/api/session")
public class JoinSessionEndpoint {
    private final SessionRepository sessionRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    public JoinSessionEndpoint(SessionRepository sessionRepository, MemberRepository memberRepository, MemberService memberService) {
        this.sessionRepository = sessionRepository;
        this.memberRepository = memberRepository;
        this.memberService = memberService;
    }

    /**
     * Add a member to a session
     * @param sessionId ID of the session that member is attempting to join
     * @param email Member's email; will be "" if member isn't signed in
     * @return String representation of member's ID
     */
    public String joinSession(Long sessionId, String email) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));

        Member member;
        if (email.isEmpty()) {
            // Member is anonymous
            member = new Member();
        } else {
            // Member is signed in
            member = memberService.getMemberByEmail(email);
        }
        member.setSessionId(sessionId); // Associate member with newly created session's ID
        member.setMovieIndex(0);
        memberRepository.save(member);

        // Ensure member is not already in session
        if (!session.getMembers().contains(member)) {
            session.getMembers().add(member);
        }

        sessionRepository.save(session);

        return member.getId().toString();
    }
}
