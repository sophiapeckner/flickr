import com.flickr.controllers.JoinSessionEndpoint;
import com.flickr.controllers.LogInEndpoint;
import com.flickr.entities.Member;
import com.flickr.entities.Session;
import com.flickr.storage.MemberRepository;

import com.flickr.storage.SessionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class TestJoinSessionEndpoint {
    @Mock
    private SessionRepository mockSessionRepository;
    @Mock
    private MemberRepository mockMemberRepository;

    private JoinSessionEndpoint joinSessionEndpointTestObj = new JoinSessionEndpoint(mockSessionRepository, mockMemberRepository);

    private final Session sampleSession = new Session();
    private final String sampleEmail = "thisEmail@gmial.com";
    private final Member sampleMember = new Member("sampleEmail@gmail.com", "sampleUser", "samplePass");

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockSessionRepository = Mockito.mock(SessionRepository.class);
        mockMemberRepository = Mockito.mock(MemberRepository.class);
        joinSessionEndpointTestObj = new JoinSessionEndpoint(mockSessionRepository, mockMemberRepository);
    }

    @Test
    void testJoinSessionNotFound(){
        String expected = "Session not found";
        Mockito.when(mockSessionRepository.findById(sampleSession.getId())).thenReturn(Optional.of(sampleSession));

        Exception exception = Assertions.assertThrows(IllegalArgumentException.class, () -> {
            joinSessionEndpointTestObj.joinSession(sampleSession.getId(), sampleEmail);
        });
        Assertions.assertEquals(expected, exception.getMessage());

        Mockito.verify(mockSessionRepository, Mockito.times(1)).findById(Mockito.any(Long.class));
        Mockito.verify(mockMemberRepository, Mockito.times(0)).findByEmail(Mockito.any(String.class));
        Mockito.verify(mockMemberRepository, Mockito.times(0)).save(Mockito.any(Member.class));
        Mockito.verify(mockSessionRepository, Mockito.times(0)).save(Mockito.any(Session.class));
    }

    @Test
    void testJoinSessionAnonJoin(){
        String expected = sampleMember.getId().toString();
        Mockito.when(mockSessionRepository.findById(sampleSession.getId())).thenReturn(Optional.of(sampleSession));
        Mockito.when(mockMemberRepository.save(sampleMember)).thenReturn(sampleMember);
        Mockito.when(mockSessionRepository.save(sampleSession)).thenReturn(sampleSession);

        String actualResult = joinSessionEndpointTestObj.joinSession(sampleSession.getId(), "");
        Assertions.assertEquals(expected, actualResult);

        Mockito.verify(mockSessionRepository, Mockito.times(1)).findById(Mockito.any(Long.class));
        Mockito.verify(mockMemberRepository, Mockito.times(0)).findByEmail(Mockito.any(String.class));
        Mockito.verify(mockMemberRepository, Mockito.times(1)).save(Mockito.any(Member.class));
        Mockito.verify(mockSessionRepository, Mockito.times(1)).save(Mockito.any(Session.class));
    }

    @Test
    void testJoinSessionMemberJoin(){
        String expected = sampleMember.getId().toString();
        Mockito.when(mockSessionRepository.findById(sampleSession.getId())).thenReturn(Optional.of(sampleSession));
        Mockito.when(mockMemberRepository.findByEmail(sampleEmail)).thenReturn(Optional.of(sampleMember));
        String actual = joinSessionEndpointTestObj.joinSession(sampleSession.getId(), sampleEmail);
        Assertions.assertEquals(expected, actual);
    }
}
