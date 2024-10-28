package com.flickr.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Session {
    @Id
    @GeneratedValue
    private Long id;

    private String groupCode;
    @OneToMany
    // Session can have many members where each member belongs to only one session
    private List<User> members;
    @ManyToMany
    // Each Movie can be in many Session
    // Each Session can have many Movie
    private List<Movie> movies;

    public Session(String groupCode) {
        this.groupCode = groupCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGroupCode() {
        return groupCode;
    }

    public void setGroupCode(String groupCode) {
        this.groupCode = groupCode;
    }

    public List<User> getMembers() {
        return members;
    }

    public void setMembers(List<User> members) {
        this.members = members;
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }
}
