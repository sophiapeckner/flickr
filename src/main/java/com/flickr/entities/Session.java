package com.flickr.entities;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Session {
    @Id
    @GeneratedValue
    private Long id;

    private String groupCode;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Member> members;
    // Session can have many members where each member belongs to only one session

    @ManyToMany
    private List<Movie> movies;
    // Each Movie can be in many Session; each Session can have many Movie

    public Session(String groupCode) {
        this.groupCode = groupCode;
        this.members = new ArrayList<>();
        this.movies = new ArrayList<>();
    }

    public Session() {
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

    public List<Member> getMembers() {
        return members;
    }

    public void setMembers(List<Member> members) {
        this.members = members;
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }
}
