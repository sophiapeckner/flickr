package com.flickr.controllers;

import com.flickr.entities.Member;
import com.flickr.storage.MemberRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;

import java.util.Optional;
import java.util.Set;

@Endpoint
@AnonymousAllowed
public class ManageProfileEndpoint {
    private final MemberRepository memberRepository;

    public ManageProfileEndpoint(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public void updateUser(String id, String newEmail, String newUsername, Set<String> newStreamingPlatforms) {
        Optional<Member> memberOptional = memberRepository.findById(Long.valueOf(id));
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setEmail(newEmail);
            member.setUsername(newUsername);
            member.setStreamingPlatforms(newStreamingPlatforms);
            memberRepository.save(member);
        }
    }
}
