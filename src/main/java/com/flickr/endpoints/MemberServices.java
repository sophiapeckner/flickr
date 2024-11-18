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

    public void createUser(String email, String username, String password) {
        Member member = new Member(email, username, password);
        memberRepository.save(member);
    }

    Logger logger = Logger.getLogger(getClass().getName());

    public Optional<Member> login(String email, String password) {
        Optional<Member> memberOptional = memberRepository.findByEmail(email);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            logger.info("User found");
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if (encoder.matches(password, member.getPass())) {
                logger.info("Login successful");
                return Optional.of(member);
            }
            else {
                logger.info("Wrong password");
                return Optional.empty();
            }
        } else {
            logger.info("User not found");
        }
        return Optional.empty();
    }

    public void updateUser(String ogEmail, String newEmail, String newUsername) {
        Optional<Member> memberOptional = memberRepository.findByEmail(ogEmail);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setEmail(newEmail);
            member.setUsername(newUsername);
            memberRepository.save(member);
        }
    }
}
