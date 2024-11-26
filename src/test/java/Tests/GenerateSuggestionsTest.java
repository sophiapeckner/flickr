package Tests;

import com.flickr.controllers.JoinSessionEndpoint;
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

import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

class GenerateSuggestionsTest {

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
    private JoinSessionEndpoint joinSessionEndpointTestObj;


    private final Member sampleMember = new Member("thisemail@gmail.net", "thisUsername", new BCryptPasswordEncoder().encode("thisPass"));
    private final Map <String, Integer> sampleRequestBody = new HashMap<>();
    private final Session sampleSession = new Session("GroupCode", sampleMember.getId().toString());
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
        joinSessionEndpointTestObj = new JoinSessionEndpoint(mockSessionRepository, mockMemberRepository, mockMemberService);
        sampleRequestBody.put("movieIndex", 6);
    }


    /**
     * This method is being used for the purpose of loop testing
     * This specific test is for the standard use and maximum use of the loop
     */
    @Test
    void testGenerateSuggestions() throws JSONException, IOException, InterruptedException{
        sampleSession.setLanguages(Set.of("any"));
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

    @Test
    void testGenerateSuggestionsLanguageParam() throws JSONException, IOException, InterruptedException{
        sampleSession.setLanguages(Set.of("it"));
        Mockito.when(mockMemberRepository.findById(sampleMember.getId())).thenReturn(Optional.of(sampleMember));
        Mockito.when(mockSessionRepository.findById(sampleMember.getSessionId())).thenReturn(Optional.of(sampleSession));
        Mockito.when(mockMovieRepository.save(Mockito.any(Movie.class))).thenReturn(new Movie());
        Mockito.when(mockSessionMovieRepository.save(Mockito.any(SessionMovie.class))).thenReturn(new SessionMovie());
        Mockito.when(mockSessionRepository.save(sampleSession)).thenReturn(sampleSession);

        Assertions.assertEquals(sampleSession, voteEndpointTestObj.generateSuggestions(sampleMember.getId().toString()));
        //Asserts that the loop has been run through the maximum amount of times (20). This would fill the List with 20 movies
        Assertions.assertEquals(20, sampleSession.getMovies().size());

        Mockito.verify(mockMemberRepository, Mockito.times(1)).findById(sampleMember.getId());
        Mockito.verify(mockSessionRepository, Mockito.times(1)).findById(sampleMember.getSessionId());
        Mockito.verify(mockMovieRepository, Mockito.times(20)).save(Mockito.any(Movie.class));
        Mockito.verify(mockSessionMovieRepository, Mockito.times(20)).save(Mockito.any(SessionMovie.class));
        Mockito.verify(mockSessionRepository, Mockito.times(1)).save(sampleSession);
    }

    @Test
    void testHighSpecificityGenerateSuggestions() throws JSONException, IOException, InterruptedException{
        sampleSession.setStreamingPlatforms(Set.of("2", "9", "15"));
        sampleSession.setGenres(Set.of("28", "12", "16", "35", "80", "99", "18", "10751", "14"));
        Mockito.when(mockSessionRepository.findById(sampleSession.getId())).thenReturn(Optional.of(sampleSession));
        Mockito.when(mockMemberRepository.findByEmail(sampleMember.getEmail())).thenReturn(Optional.of(sampleMember));
        Mockito.when(mockMemberRepository.save(sampleMember)).thenReturn(sampleMember);
        Mockito.when(mockSessionRepository.save(sampleSession)).thenReturn(sampleSession);

        joinSessionEndpointTestObj.joinSession(sampleSession.getId(), sampleMember.getEmail());

        Mockito.when(mockMemberRepository.findById(sampleMember.getId())).thenReturn(Optional.of(sampleMember));
        Mockito.when(mockMovieRepository.save(Mockito.any(Movie.class))).thenReturn(new Movie());
        Mockito.when(mockSessionMovieRepository.save(Mockito.any(SessionMovie.class))).thenReturn(new SessionMovie());

        voteEndpointTestObj.generateSuggestions(sampleMember.getId().toString());
        //This shows that the method will always run the loop 20 times, regardless of how specific the API request is
        Assertions.assertEquals(20, sampleSession.getMovies().size());

        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByEmail(sampleMember.getEmail());
        Mockito.verify(mockMemberRepository, Mockito.times(1)).findById(sampleMember.getId());
        Mockito.verify(mockSessionRepository, Mockito.times(2)).findById(sampleMember.getSessionId());
        Mockito.verify(mockMovieRepository, Mockito.times(20)).save(Mockito.any(Movie.class));
        Mockito.verify(mockSessionMovieRepository, Mockito.times(20)).save(Mockito.any(SessionMovie.class));
        Mockito.verify(mockSessionRepository, Mockito.times(2)).save(sampleSession);



    }

}
