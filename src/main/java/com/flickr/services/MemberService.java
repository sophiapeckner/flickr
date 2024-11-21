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
    public Member getMember(String memberId) {
        return memberRepository.findById(Long.valueOf(memberId))
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
    }

    /**
     * Fetch the member's current display name
     * @param memberId String representation of member's ID
     * @return Display name
     */
    public String getMemberDisplayName(String memberId) {
        return getMember(memberId).getDisplayName();
    }

    public Set<String> getMemberStreamingPlatforms(String memberId) { return getMember(memberId).getStreamingPlatforms(); }
}


