import com.flickr.controllers.ManageProfileEndpoint;
import com.flickr.services.MemberService;
import com.flickr.services.SessionService;
import com.flickr.controllers.VoteEndpoint;
import com.flickr.entities.Member;

import com.flickr.entities.Movie;
import com.flickr.entities.SessionMovie;
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

public class TbhIdkTest {

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

    private final Member sampleMember = new Member("thisemail@gmail.net", "thisUsername", new BCryptPasswordEncoder().encode("thisPass"));
    private final Movie sampleMovie = new Movie();
    private final Map <String, Integer> sampleRequestBody = new HashMap<>();
    private final SessionMovie sampleSessionMovie = new SessionMovie();
    private final List<String> voterList = new ArrayList<>(List.of("thisUsername"));


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
        sampleRequestBody.put("movieIndex", 6);
    }

    @Test
    void testAddVoterSuccess(){
        Mockito.when(mockMemberRepository
                .findById(sampleMember.getId()))
                .thenReturn(Optional.of(sampleMember));
        Mockito.when(mockSessionMovieRepository
                .findById(sampleMovie.getId()))
                .thenReturn(Optional.of(sampleSessionMovie));
        Mockito.when(mockSessionMovieRepository
                .save(sampleSessionMovie))
                .thenReturn(sampleSessionMovie);

        Assertions.assertEquals(sampleSessionMovie, voteEndpointTestObj.addVoter(sampleMovie.getId(), sampleMember.getId().toString()));
        Assertions.assertEquals(sampleSessionMovie.getVoters(), voterList);

        Mockito.verify(mockMemberRepository,
                Mockito.times(1))
                .findById(sampleMember.getId());
        Mockito.verify(mockSessionMovieRepository,
                Mockito.times(1))
                .findById(sampleMovie.getId());
        Mockito.verify(mockSessionMovieRepository,
                Mockito.times(1))
                .save(sampleSessionMovie);
    }

    @Test
    void testAddVoterFailure(){
        String expectedException = "SessionMovie not found";
        Mockito.when(mockMemberRepository
                .findById(sampleMember.getId()))
                .thenReturn(Optional.of(sampleMember));
        Mockito.when(mockSessionMovieRepository
                .findById(sampleMovie.getId()))
                .thenReturn(Optional.empty());

        Exception exception = Assertions.assertThrows(RuntimeException.class, () -> {
            voteEndpointTestObj.addVoter(sampleMovie.getId(), sampleMember.getId().toString());
        });
        Assertions.assertEquals(expectedException, exception.getMessage());

        Mockito.verify(mockMemberRepository,
                Mockito.times(1))
                .findById(sampleMember.getId());
        Mockito.verify(mockSessionMovieRepository,
                Mockito.times(1))
                .findById(sampleMovie.getId());
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

}
