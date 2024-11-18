package com.flickr.storage;

import com.flickr.entities.SessionMovie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionMovieRepository extends JpaRepository<SessionMovie, Long> {
}
