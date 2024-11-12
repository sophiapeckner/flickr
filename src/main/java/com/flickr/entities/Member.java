package com.flickr.entities;

import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;

@Entity
public class Member {
    @Id
    @GeneratedValue
    private Long id;

    private String email;

    private String password;

    private String username;

    private int movieIndex;

    public Member(String email, String username, String password) {
        this.email = email;
        this.password = password;
        this.username = username;
    }

    public Member() {
        // Used for defining an Anon user
        // Because Hilla expects all member variable to be non-null, email & pass are set to dummy values
        this.email = "anon@gmail.com";
        this.password = "anon";
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
        return password;
    }

    public void setPass(String pass) {
        this.password = pass;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @PrePersist
    public void encryptPassword() {
        this.password = new BCryptPasswordEncoder().encode(this.password);
    }

    public int getMovieIndex() { return movieIndex; }

    public void setMovieIndex(int movieIndex) { this.movieIndex = movieIndex; }
}