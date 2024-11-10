package com.flickr.endpoints;

import com.flickr.entities.Member;
import com.flickr.storage.MemberRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;

import java.util.concurrent.atomic.AtomicReference;

@AnonymousAllowed
@Endpoint
public class MemberServices {
    private MemberRepository memberRepository;

    public MemberServices(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public void createUser(String email, String username, String password) {
        Member member = new Member(email, username, password);
        memberRepository.save(member);
    }

    public Member login(String email, String password) {
        AtomicReference<Member> user = new AtomicReference<>();
        memberRepository.findByEmail(email).ifPresent(member -> {
            if (member.getPass().equals(password)) {
                user.set(member);
            }
        });
        return user.get();
    }

}
