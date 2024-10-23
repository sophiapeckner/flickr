package com.flickr.services;

import com.flickr.entities.User;
import com.flickr.respository.UserRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.ListRepositoryService;

@BrowserCallable
@AnonymousAllowed
public class UserService extends ListRepositoryService<User, Long, UserRepository> {
}