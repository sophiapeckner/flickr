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

    public String createUser(String email, String username, String password) {
        if (memberRepository.findByEmail(email).isPresent()) {
            return "Email already in use";
        } else if (memberRepository.findByUsername(username).isPresent()) {
            return "Username already in use";
        } else {
            Member member = new Member(email, username, password);
            memberRepository.save(member);
            return "Account created";
        }
    }

    public String login(String email, String password) {
        Optional<Member> memberOptional = memberRepository.findByEmail(email);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if (encoder.matches(password, member.getPass())) {
                return member.getId().toString();
            }
            else {
                return "Wrong password";
            }
        } else {
            return "User Not found";
        }
    }

    public Optional<Member> getMember(String id) {
        // Add try and except block to parse the long
        return memberRepository.findById(Long.valueOf(id));
    }

    public void updateUser(String og_email, String new_email, String new_username) {
        Optional<Member> memberOptional = memberRepository.findByEmail(og_email);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setEmail(new_email);
            member.setUsername(new_username);
            memberRepository.save(member);
        }
    }

}
