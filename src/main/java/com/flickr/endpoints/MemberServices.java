package com.flickr.endpoints;

import com.flickr.entities.Member;
import com.flickr.storage.MemberRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

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

    public Optional<Member> login(String email, String password) {
        Optional<Member> memberOptional = memberRepository.findByEmail(email);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            System.out.println("User found");
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if (encoder.matches(password, member.getPass())) {
                System.out.println("Login successful");
                return Optional.of(member);
            }
            else {
                System.out.println("Wrong password");
                return Optional.empty();
            }
        } else {
            System.out.println("User Not found");
        }
        return Optional.empty();
    }

}
