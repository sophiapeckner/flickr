package com.flickr.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.*;

@Entity
public class Session {
    @Id
    @GeneratedValue
    private Long id;

    private String groupCode;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Member> members;
    // Session can have many members where each member belongs to only one session

//    @ManyToMany
//    private List<Movie> movies = new ArrayList<>();
//    // Each Movie can be in many Session; each Session can have many Movie

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<SessionMovie> movies = new ArrayList<>();

    @ElementCollection
    private Set<String> genres = new HashSet<>();

    @ElementCollection
    private Set<String> streamingPlatforms = new HashSet<>();

    public Session(String groupCode) {
        this.groupCode = groupCode;
        this.members = new ArrayList<>();
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

    public Set<String> getGenres() { return genres; }

    public void setGenres(HashSet<String> genres) { this.genres = genres; }

    public Set<String> getStreamingPlatforms() { return streamingPlatforms; }

    public void setStreamingPlatforms(HashSet<String> streaming_platforms) { this.streamingPlatforms = streaming_platforms; }

    public List<SessionMovie> getMovies() { return movies; }

    public void setMovies(List<SessionMovie> movies) { this.movies = movies; }
}
