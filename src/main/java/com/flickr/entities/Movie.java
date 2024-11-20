package com.flickr.entities;
import jakarta.persistence.*;

@Entity
public class Movie {
    @Id
    @GeneratedValue
    private Long id;

    private String title;

    @Column(length = 2048)
    private String overview;

    private String imgURL;

    private String release;

    public Movie(String title, String overview, String imgURL, String release) {
        this.title = title;
        this.overview = overview;
        this.imgURL = "https://image.tmdb.org/t/p/w500/" + imgURL;
        this.release = release;
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
}
