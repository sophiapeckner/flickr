package com.flickr;

import com.flickr.entities.Member;
import com.flickr.entities.Session;
import com.flickr.storage.MemberRepository;
import com.flickr.storage.SessionRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class SessionService {
    private final MemberRepository memberRepository;
    private final SessionRepository sessionRepository;

    public SessionService(MemberRepository memberRepository, SessionRepository sessionRepository) {
        this.memberRepository = memberRepository;
        this.sessionRepository = sessionRepository;
    }

    /**
     * Returns the session that the member with memberID is in
     * @param memberId String representation of member's ID
     * @return Session that member is in
     */
    public Session fetchMembersSession(@PathVariable String memberId) {
        Member member = memberRepository.findById(Long.valueOf(memberId))
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
        return sessionRepository.findById(member.getSessionId())
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));
    }
}
