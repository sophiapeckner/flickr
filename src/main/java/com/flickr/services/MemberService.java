package com.flickr.services;

import com.flickr.entities.Member;
import com.flickr.storage.MemberRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;

import java.util.Set;

@AnonymousAllowed
@Endpoint
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    /**
     * Fetch member by ID
     * @param memberId String representation of member's ID
     * @return Member with member ID
     */
    public Member getMemberById(String memberId) {
        return memberRepository.findById(Long.valueOf(memberId))
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
    }

    /**
     * Fetch member by email (requires Member to be authenticated)
     * @param email Member's email
     * @return Member with corresponding email
     */
    public Member getMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Member not found with email: " + email));
    }

    /**
     * Fetch the member's current display name
     * @param memberId String representation of member's ID
     * @return Display name
     */
    public String getMemberDisplayName(String memberId) {
        return getMemberById(memberId).getDisplayName();
    }

    public Set<String> getMemberStreamingPlatforms(String memberId) { return getMember(memberId).getStreamingPlatforms(); }
}


