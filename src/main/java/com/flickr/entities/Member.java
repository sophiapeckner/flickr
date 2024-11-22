package com.flickr.entities;

import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.security.SecureRandom;
import java.util.HashSet;
import java.util.Set;


@Entity
public class Member {
    @Id
    private Long id;

    private String email;

    private String password;

    private String username;

    private String displayName = "";

    private Long sessionId;

    private int movieIndex;

    @ElementCollection
    private Set<String> streamingPlatforms = new HashSet<>();

    public Member(String email, String username, String password) {
        this.id = new SecureRandom().nextLong() >>> 1;
        this.email = email;
        this.password = password;
        this.username = username;
        this.displayName = username;
    }

    public Member() {
        // Used for defining an Anon user
        // Because Hilla expects all member variable to be non-null, email & pass are set to dummy values
        this.id = new SecureRandom().nextLong() >>> 1;
        this.email = "anon@gmail.com";
        this.password = "anon";
        this.username = "Anonymous";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPass() {
        return password;
    }

    public void setPass(String pass) {
        this.password = pass;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @PrePersist
    public void encryptPassword() {
        this.password = new BCryptPasswordEncoder().encode(this.password);
    }

    public int getMovieIndex() { return movieIndex; }

    public void setMovieIndex(int movieIndex) { this.movieIndex = movieIndex; }

    public Long getSessionId() { return sessionId; }

    public void setSessionId(Long sessionId) { this.sessionId = sessionId; }

    public String getDisplayName() { return displayName; }

    public void setDisplayName(String displayName) { this.displayName = displayName; }

    public Set<String> getStreamingPlatforms() { return streamingPlatforms; }

    public void setStreamingPlatforms(Set<String> streamingPlatforms) { this.streamingPlatforms = streamingPlatforms; }
}