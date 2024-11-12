package com.flickr.storage;

import com.flickr.entities.Member;
import com.flickr.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    // findBy is a query pattern recognized by JPA!
    Optional<Member> findByEmail(String email);
}
