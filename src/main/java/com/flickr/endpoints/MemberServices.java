package com.flickr.endpoints;

import com.flickr.entities.Member;
import com.flickr.storage.MemberRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.logging.Logger;
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

    Logger logger = Logger.getLogger(getClass().getName());

    public String login(String email, String password) {
        Optional<Member> memberOptional = memberRepository.findByEmail(email);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            logger.info("User found");
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if (encoder.matches(password, member.getPass())) {
                logger.info("Login successful");
                return member.getId().toString();
            }
            else {
                logger.info("Wrong password");
                return "Wrong password";
            }
        } else {
            logger.info("User not found");
            return "User Not found";
        }
    }

    public Optional<Member> getMember(String id) {
        // Add try and except block to parse the long
        return memberRepository.findById(Long.valueOf(id));
    }

    public void updateUser(String id, String newEmail, String newUsername) {
        Optional<Member> memberOptional = memberRepository.findById(Long.valueOf(id));
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setEmail(newEmail);
            member.setUsername(newUsername);
            memberRepository.save(member);
        }
    }
}
