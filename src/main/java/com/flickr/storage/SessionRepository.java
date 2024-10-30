package com.flickr.storage;

import com.flickr.entities.Session;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, Long> {
    // findBy is a query pattern recognized by JPA!
    Optional<Session> findByGroupCode(String groupCode);
}
