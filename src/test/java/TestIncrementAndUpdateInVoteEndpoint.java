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

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class TestIncrementAndUpdateInVoteEndpoint {

    @Mock
    private SessionRepository mockSessionRepository;
    @Mock
    private MovieRepository mockMovieRepository;
    @Mock
    private SessionMovieRepository mockSessionMovieRepository;
    @Mock
    private MemberRepository mockMemberRepository;
    @Mock
    private SessionService mockSessionService;
    @Mock
    private MemberService mockMemberService;

    @InjectMocks
    private VoteEndpoint voteEndpointTestObj = new VoteEndpoint(mockSessionRepository, mockMovieRepository, mockSessionMovieRepository, mockMemberRepository, mockSessionService, mockMemberService);

    private final Member sampleMember = new Member("thisemail@gmail.net", "thisUsername", new BCryptPasswordEncoder().encode("thisPass"));
    private final Movie sampleMovie = new Movie();
    private final Map <String, Integer> sampleRequestBody = new HashMap<>();
    private final SessionMovie sampleSessionMovie = new SessionMovie();

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockSessionRepository = Mockito.mock(SessionRepository.class);
        mockMovieRepository = Mockito.mock(MovieRepository.class);
        mockSessionMovieRepository = Mockito.mock(SessionMovieRepository.class);
        mockMemberRepository = Mockito.mock(MemberRepository.class);
        mockSessionService = Mockito.mock(SessionService.class);
        voteEndpointTestObj = new VoteEndpoint(mockSessionRepository, mockMovieRepository, mockSessionMovieRepository, mockMemberRepository, mockSessionService, mockMemberService);
        sampleRequestBody.put("movieIndex", 6);
    }

    @Test
    public void testIncrementMovieCountSuccess(){
        Mockito.when(mockSessionMovieRepository.findById(sampleMovie.getId())).thenReturn(Optional.of(sampleSessionMovie));
        Mockito.when(mockSessionMovieRepository.save(sampleSessionMovie)).thenReturn(sampleSessionMovie);

        Assertions.assertEquals(sampleSessionMovie, voteEndpointTestObj.incrementMovieVoteCount(sampleMember.getId()));

        Mockito.verify(mockSessionMovieRepository, Mockito.times(1)).findById(Mockito.any(Long.class));
        Mockito.verify(mockSessionMovieRepository, Mockito.times(1)).save(Mockito.any(SessionMovie.class));
    }

    @Test
    public void testIncrementMovieCountFailure(){
        String expectedException = "SessionMovie not found";
        Mockito.when(mockSessionMovieRepository.findById(sampleMovie.getId())).thenReturn(Optional.empty());

        Exception exception = Assertions.assertThrows(RuntimeException.class, () -> {
            voteEndpointTestObj.incrementMovieVoteCount(sampleMovie.getId());
        });

        Assertions.assertEquals(expectedException, exception.getMessage());

        Mockito.verify(mockSessionMovieRepository, Mockito.times(1)).findById(Mockito.any(Long.class));
        Mockito.verify(mockSessionMovieRepository, Mockito.times(0)).save(Mockito.any(SessionMovie.class));
    }

    @Test
    void testUpdateMemberMovieIndexSuccess(){
        Mockito.when(mockMemberRepository.findById(sampleMember.getId())).thenReturn(Optional.of(sampleMember));
        Mockito.when(mockMemberRepository.save(sampleMember)).thenReturn(sampleMember);

        Assertions.assertEquals(sampleMember, voteEndpointTestObj.updateMemberMovieIndex(sampleMember.getId().toString(), sampleRequestBody));

        Mockito.verify(mockMemberRepository, Mockito.times(1)).findById(Mockito.any(Long.class));
        Mockito.verify(mockMemberRepository, Mockito.times(1)).save(Mockito.any(Member.class));
    }

    @Test
    void testUpdateMemberMovieIndexFailure(){
        String expectedException = "Member not found";
        Mockito.when(mockMemberRepository.findById(sampleMember.getId())).thenReturn(Optional.empty());

        Exception exception = Assertions.assertThrows(IllegalAccessException.class, () -> {
            voteEndpointTestObj.updateMemberMovieIndex(sampleMember.getId().toString(), sampleRequestBody);
        });

        Assertions.assertEquals(expectedException, exception.getMessage());

        Mockito.verify(mockMemberRepository, Mockito.times(1)).findById(Mockito.any(Long.class));
        Mockito.verify(mockMemberRepository, Mockito.times(0)).save(Mockito.any(Member.class));
    }
}
