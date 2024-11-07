package com.flickr.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.*;

@Entity
public class Movie {
    @Id
    private Long id;

    private String title;

    private List<String> genres;

    private List<String> overview;

    private String imgURL;

    private String release;

    private Integer votes;

    public Movie(Long id, String title, String genres, String overview, String imgURL, String release) {
        this.id = id;
        this.title = title;

        // Genre Ids from movie db
        HashMap<Integer, String> genreMap = new HashMap<>();
        genreMap.put(28, "action");
        genreMap.put(16, "animated");
        genreMap.put(99, "documentary");
        genreMap.put(18, "drama");
        genreMap.put(10751, "family");
        genreMap.put(14, "fantasy");
        genreMap.put(36, "history");
        genreMap.put(35, "comedy");
        genreMap.put(10752, "war");
        genreMap.put(80, "crime");
        genreMap.put(10402, "music");
        genreMap.put(9648, "mystery");
        genreMap.put(10749, "romance");
        genreMap.put(878, "sci fi");
        genreMap.put(27, "horror");
        genreMap.put(10770, "TV movie");
        genreMap.put(53, "thriller");
        genreMap.put(37, "western");
        genreMap.put(12, "adventure");

        // Convert Genre Id to the name
        this.genres = new ArrayList<>();
        String modifiedGenre = genres.replace("[", "").replace("]", "");
        String[] genreIdArray = modifiedGenre.split(",");
        for (String s : genreIdArray) {
            Integer genreId = Integer.valueOf(s);
            String genreName = genreMap.get(genreId);
            if (genreName != null) {
                this.genres.add(genreName);
            }
        }

        // Save the overview in an array of strings in case it is over the character limit
        int start = 0;
        int end = 255;
        this.overview = new ArrayList<>();
        if (overview.length() < 255) {
            this.overview.add(overview);
        } else {
            while (end < overview.length()) {
                this.overview.add(overview.substring(start, end));
                start = start + 255;
                end = end + 255;
            }
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

    public List<String> getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview.add(overview);
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
