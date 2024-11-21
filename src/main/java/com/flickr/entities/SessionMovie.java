package com.flickr.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class SessionMovie {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private Movie movie;

    @ManyToOne
    @JsonBackReference
    private Session session;

    private Integer voteCount = 0;

    @ElementCollection
    private List<String> voters = new ArrayList<>();

    public SessionMovie() {}

    public SessionMovie(Movie movie, Session session) {
        this.movie = movie;
        this.session = session;
        this.voteCount = 0;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public Integer getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(Integer voteCount) {
        this.voteCount = voteCount;
    }

    public List<String> getVoters() { return voters; }

    public void setVoters(List<String> voters) { this.voters = voters; }
}
