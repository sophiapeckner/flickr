package com.flickr.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Member {
    @Id
    @GeneratedValue
    private Long id;

    private String email;
    private String pass;
    private String username;
    private List<String> watchProviders = new ArrayList<>();;

    private Long sessionID;
    private int currentMovieIndex;

    @ManyToOne
    private Session session;

    public Member(String email, String pass, String username) {
        this.email = email;
        this.pass = pass;
        this.username = username;
    }

    public Member() {
        // Used for defining an Anon user
        // Because Hilla expects all memember variable to be non-null, email & pass are set to dummy values
        this.email = "anon@gmail.com";
        this.pass = "anon";
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
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getWatchProviders() {
        return watchProviders;
    }

    public void setWatchProviders(List<String> watchProviders) {
        this.watchProviders = watchProviders;
    }
}
