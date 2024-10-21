package com.flickr.entities;
import java.util.Date;

public class Movie {
    private String title;
    private String date;
    private String imgURL;
    private Integer votes;

    public Movie(String title, String date, String imageURL) {
        this.title = title;
        // Check if the current date is later than the date of the movie
        this.date = date;
        this.imgURL = "https://image.tmdb.org/t/p/w500/" + imageURL;
        this.votes = 1;
    }

}
