package Tests;

import com.flickr.controllers.LogInEndpoint;
import com.flickr.controllers.ManageProfileEndpoint;
import com.flickr.services.MemberService;
import com.flickr.services.SessionService;
import com.flickr.controllers.VoteEndpoint;
import com.flickr.entities.Member;

import com.flickr.storage.MemberRepository;
import com.flickr.storage.MovieRepository;
import com.flickr.storage.SessionMovieRepository;
import com.flickr.storage.SessionRepository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.*;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

class UpdateUserTest {

    @Mock
    private SessionRepository mockSessionRepository;
    @Mock
    private MovieRepository mockMovieRepository;
    @Mock
    private SessionMovieRepository mockSessionMovieRepository;
    @Mock
    private MemberRepository mockMemberRepository;

    private SessionService mockSessionService;
    private MemberService mockMemberService;

    private VoteEndpoint voteEndpointTestObj;
    private ManageProfileEndpoint manageProfileEndpointTestObj;
    private LogInEndpoint loginEndpointTestObj;

    private final Member sampleMember = new Member("thisemail@gmail.net", "thisUsername", new BCryptPasswordEncoder().encode("thisPass"));
    private final Map <String, Integer> sampleRequestBody = new HashMap<>();
    private final Map <String, String> sampleRequestBody2 = new HashMap<>();

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockSessionRepository = Mockito.mock(SessionRepository.class);
        mockMovieRepository = Mockito.mock(MovieRepository.class);
        mockSessionMovieRepository = Mockito.mock(SessionMovieRepository.class);
        mockMemberRepository = Mockito.mock(MemberRepository.class);
        mockSessionService = new SessionService(mockMemberRepository, mockSessionRepository);
        mockMemberService = new MemberService(mockMemberRepository);
        voteEndpointTestObj = new VoteEndpoint(mockSessionRepository, mockMovieRepository, mockSessionMovieRepository, mockMemberRepository, mockSessionService, mockMemberService);
        manageProfileEndpointTestObj = new ManageProfileEndpoint(mockMemberRepository);
        loginEndpointTestObj = new LogInEndpoint(mockMemberRepository);
        sampleRequestBody.put("movieIndex", 6);
        sampleRequestBody2.put("language", "en");
    }

    @Test
    void testUpdateUser(){
        String newEmail = "newEmail@gmail.com";
        String newUsername = "newUsername";
        Set<String> newPlatforms = new HashSet<>(){{
            add("Netflix");
        }};
        Mockito.when(mockMemberRepository
                .findById(sampleMember.getId()))
                .thenReturn(Optional.of(sampleMember));
        Mockito.when(mockMemberRepository
                .save(sampleMember))
                .thenReturn(sampleMember);

        manageProfileEndpointTestObj.updateUser(sampleMember.getId().toString(), newEmail, newUsername, newPlatforms);
        Assertions.assertEquals(sampleMember.getEmail(), newEmail);
        Assertions.assertEquals(sampleMember.getUsername(), newUsername);
        Assertions.assertEquals(sampleMember.getStreamingPlatforms(), newPlatforms);

        Mockito.verify(mockMemberRepository,
                Mockito.times(1))
                .findById(sampleMember.getId());
        Mockito.verify(mockMemberRepository,
                Mockito.times(1))
                .save(sampleMember);
    }

    @Test
    void testUpdateUserAnon(){
        String newEmail = "newEmail@gmail.com";
        String newUsername = "newUsername";
        Set<String> newPlatforms = new HashSet<>(){{
            add("Netflix");
        }};

        Mockito.when(mockMemberRepository
                        .findById(0L))
                .thenReturn(Optional.empty());

        manageProfileEndpointTestObj.updateUser("0", newEmail, newUsername, newPlatforms);
        Assertions.assertEquals("thisemail@gmail.net", sampleMember.getEmail());
        Assertions.assertEquals("thisUsername", sampleMember.getUsername());
        Assertions.assertEquals(sampleMember.getStreamingPlatforms(), Set.of());

        Mockito.verify(mockMemberRepository,
                        Mockito.times(1))
                .findById(0L);
    }

    @Test
    void testFetchMemberById() {
        Mockito.when(mockMemberRepository
                        .findById(sampleMember.getId()))
                .thenReturn(Optional.of(sampleMember));

        Assertions.assertEquals(
                voteEndpointTestObj.fetchMemberById(sampleMember.getId().toString()),
                sampleMember
        );

        Mockito.verify(mockMemberRepository,
                        Mockito.times(1))
                .findById(sampleMember.getId());
    }

    @Test
    void testGetMember() {
        Mockito.when(mockMemberRepository
                        .findById(sampleMember.getId()))
                .thenReturn(Optional.of(sampleMember));

        Assertions.assertEquals(
                loginEndpointTestObj.getMember(sampleMember.getId().toString()),
                Optional.of(sampleMember)
        );

        Mockito.verify(mockMemberRepository,
                        Mockito.times(1))
                .findById(sampleMember.getId());
    }

}
