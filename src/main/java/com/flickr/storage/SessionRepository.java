package com.flickr.storage;

import com.flickr.entities.Movie;
import com.flickr.entities.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, Long> {
}
