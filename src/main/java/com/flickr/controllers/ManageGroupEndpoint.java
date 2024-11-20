package com.flickr.controllers;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Endpoint
@AnonymousAllowed
@RestController
@RequestMapping("/api/group")
public class ManageGroupEndpoint {

}
