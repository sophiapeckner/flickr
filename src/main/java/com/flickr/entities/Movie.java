package com.flickr.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Movie {
    @Id
    private Long id;

    private String title;

    private List<String> genres;

    private String overview;

    private String imgURL;

    private String release;

    private Integer votes;


    public Movie(Long id, String title, String overview, String imgURL, String release) {
        this.id = id;
        this.title = title;
        // Figure out how to map genre ids to the genres
        this.genres = new ArrayList<>();

        // Figure out a better way to save the entire overview
        if (overview.length() < 255) {
            this.overview = overview;
        }
        else {
            this.overview = overview.substring(0, 255);
        }

        this.imgURL = "https://image.tmdb.org/t/p/w500/" + imgURL;
        this.release = release;
        this.votes = 0;
    }

    public Movie() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getImgURL() {
        return imgURL;
    }

    public void setImgURL(String imgURL) {
        this.imgURL = imgURL;
    }

    public String getRelease() {
        return release;
    }

    public void setRelease(String release) {
        this.release = release;
    }

    public Integer getVotes() {
        return votes;
    }

    public void setVotes(Integer votes) {
        this.votes = votes;
    }
}
