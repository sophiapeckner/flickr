package com.flickr.control;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;

@Endpoint
@AnonymousAllowed
public class MovieListController {

    public String[] getSelectedMovieList() {
        return new String[]{"Step Brothers", "Ted"};
    }
}
