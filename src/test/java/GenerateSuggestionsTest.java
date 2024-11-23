import com.flickr.services.MemberService;
import com.flickr.services.SessionService;
import com.flickr.controllers.VoteEndpoint;
import com.flickr.entities.Member;

import com.flickr.entities.Movie;
import com.flickr.entities.Session;
import com.flickr.entities.SessionMovie;
import com.flickr.storage.MemberRepository;
import com.flickr.storage.MovieRepository;
import com.flickr.storage.SessionMovieRepository;
import com.flickr.storage.SessionRepository;

import org.json.JSONException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerateSuggestionsTest {

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

    private final Member sampleMember = new Member("thisemail@gmail.net", "thisUsername", new BCryptPasswordEncoder().encode("thisPass"));
    private final Map <String, Integer> sampleRequestBody = new HashMap<>();
    private final Session sampleSession = new Session();
    private final Movie sampleMovie = new Movie();
    private final SessionMovie sampleSessionMovie = new SessionMovie();

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockSessionRepository = Mockito.mock(SessionRepository.class);
        mockMovieRepository = Mockito.mock(MovieRepository.class);
        mockSessionMovieRepository = Mockito.mock(SessionMovieRepository.class);
        mockMemberRepository = Mockito.mock(MemberRepository.class);
        mockMemberService = new MemberService(mockMemberRepository);
        mockSessionService = new SessionService(mockMemberRepository, mockSessionRepository);
        voteEndpointTestObj = new VoteEndpoint(mockSessionRepository, mockMovieRepository, mockSessionMovieRepository, mockMemberRepository, mockSessionService, mockMemberService);
        sampleRequestBody.put("movieIndex", 6);
    }


    /**
     * Might move this into the other Vote Endpoint testing class because I don't know what other tests to write
     * Maybe Sophia can explain some other possibilities that are worth testing
     * But until then this will stay here
     */
    @Test
    public void testGenerateSuggestions() throws JSONException, IOException, InterruptedException{
        Mockito.when(mockMemberRepository.findById(sampleMember.getId())).thenReturn(Optional.of(sampleMember));
        Mockito.when(mockSessionRepository.findById(sampleMember.getSessionId())).thenReturn(Optional.of(sampleSession));
        Mockito.when(mockMovieRepository.save(Mockito.any(Movie.class))).thenReturn(new Movie());
        Mockito.when(mockSessionMovieRepository.save(Mockito.any(SessionMovie.class))).thenReturn(new SessionMovie());
        Mockito.when(mockSessionRepository.save(sampleSession)).thenReturn(sampleSession);

        Assertions.assertEquals(sampleSession, voteEndpointTestObj.generateSuggestions(sampleMember.getId().toString()));

        Mockito.verify(mockMemberRepository, Mockito.times(1)).findById(sampleMember.getId());
        Mockito.verify(mockSessionRepository, Mockito.times(1)).findById(sampleMember.getSessionId());
        Mockito.verify(mockMovieRepository, Mockito.times(20)).save(Mockito.any(Movie.class));
        Mockito.verify(mockSessionMovieRepository, Mockito.times(20)).save(Mockito.any(SessionMovie.class));
        Mockito.verify(mockSessionRepository, Mockito.times(1)).save(sampleSession);
    }

//    @Test
//    public void testIncrementMovieCountFailure(){
////        String expectedException = "SessionMovie not found";
////        Mockito.when(mockSessionMovieRepository.findById(sampleMovie.getId())).thenReturn(Optional.empty());
////
////        Exception exception = Assertions.assertThrows(RuntimeException.class, () -> {
////            voteEndpointTestObj.incrementMovieVoteCount(sampleMovie.getId());
////        });
////
////        Assertions.assertEquals(expectedException, exception.getMessage());
////
////        Mockito.verify(mockSessionMovieRepository, Mockito.times(1)).findById(Mockito.any(Long.class));
////        Mockito.verify(mockSessionMovieRepository, Mockito.times(0)).save(Mockito.any(SessionMovie.class));
//    }

//    @Test
//    void testUpdateMemberMovieIndexSuccess(){
////        Mockito.when(mockMemberRepository.findById(sampleMember.getId())).thenReturn(Optional.of(sampleMember));
////        Mockito.when(mockMemberRepository.save(sampleMember)).thenReturn(sampleMember);
////
////        Assertions.assertEquals(sampleMember, voteEndpointTestObj.updateMemberMovieIndex(sampleMember.getId().toString(), sampleRequestBody));
////
////        Mockito.verify(mockMemberRepository, Mockito.times(1)).findById(Mockito.any(Long.class));
////        Mockito.verify(mockMemberRepository, Mockito.times(1)).save(Mockito.any(Member.class));
//    }

//    @Test
//    void testUpdateMemberMovieIndexFailure(){
////        String expectedException = "Member not found";
////        Mockito.when(mockMemberRepository.findById(sampleMember.getId())).thenReturn(Optional.empty());
////
////        Exception exception = Assertions.assertThrows(IllegalAccessException.class, () -> {
////            voteEndpointTestObj.updateMemberMovieIndex(sampleMember.getId().toString(), sampleRequestBody);
////        });
////
////        Assertions.assertEquals(expectedException, exception.getMessage());
////
////        Mockito.verify(mockMemberRepository, Mockito.times(1)).findById(Mockito.any(Long.class));
////        Mockito.verify(mockMemberRepository, Mockito.times(0)).save(Mockito.any(Member.class));
//    }
}
