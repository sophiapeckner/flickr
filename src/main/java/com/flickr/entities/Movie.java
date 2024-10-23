package com.flickr.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.Date;
import java.util.List;

@Entity
public class Movie {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
//     private String date;

    private List<String> genres;

    private String overview;

    private String imgURL;

    private String release;

    private Integer votes;

    public Movie(String title, String imgURL) {
        this.title = title;
        this.imgURL = "https://image.tmdb.org/t/p/w500/" + imgURL;
    }

    public Movie(String title, List<String> genres, String overview, String imgURL, String release) {
        this.title = title;
        this.genres = genres;
        this.overview = overview;
        this.imgURL = "https://image.tmdb.org/t/p/w500/" + imgURL;
        this.release = release;
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
