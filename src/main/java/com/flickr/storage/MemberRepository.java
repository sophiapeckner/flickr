package com.flickr.storage;

import com.flickr.entities.Member;
import com.flickr.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
