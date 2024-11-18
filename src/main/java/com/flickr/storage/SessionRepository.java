package com.flickr.storage;

import com.flickr.entities.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session, Long> {
    // findBy is a query pattern recognized by JPA!
    Optional<Session> findByGroupCode(String groupCode);
}
