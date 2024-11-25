import com.flickr.controllers.JoinSessionEndpoint;
import com.flickr.entities.Member;
import com.flickr.entities.Session;
import com.flickr.storage.MemberRepository;

import com.flickr.storage.SessionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

public class JoinSessionEndpointTest {
    @Mock
    private SessionRepository mockSessionRepository;
    @Mock
    private MemberRepository mockMemberRepository;

    private JoinSessionEndpoint joinSessionEndpointTestObj = new JoinSessionEndpoint(
            mockSessionRepository, mockMemberRepository);

    private final Session sampleSession = new Session("D4572HF3");
    private final String sampleEmail = "thisEmail@gmial.com";
    private final Member sampleMember = new Member(
            "sampleEmail@gmail.com", "sampleUser", "samplePass");

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
        Mockito.when(mockSessionRepository
                .findById(sampleSession.getId()))
                .thenReturn(Optional.empty());

        Exception exception = Assertions.assertThrows(IllegalArgumentException.class, () -> {
            joinSessionEndpointTestObj
                    .joinSession(sampleSession.getId(), sampleEmail);
        });
        Assertions.assertEquals(expected, exception.getMessage());

        Mockito.verify(mockSessionRepository, Mockito
                .times(1))
                .findById(sampleSession.getId());
        Mockito.verify(mockMemberRepository, Mockito
                .times(0))
                .findByEmail(Mockito.any(String.class));
        Mockito.verify(mockMemberRepository, Mockito
                .times(0))
                .save(Mockito.any(Member.class));
        Mockito.verify(mockSessionRepository, Mockito
                .times(0))
                .save(Mockito.any(Session.class));
    }

    // so instead of checking for the ID matching like I usually do,
    // in this test I just mkae sure that the size of the members list is long enough
    @Test
    void testJoinSessionAnonJoin(){
        String expected = sampleMember.getId().toString();
        Mockito.when(mockSessionRepository
                .findById(sampleSession.getId()))
                .thenReturn(Optional.of(sampleSession));
        Mockito.when(mockMemberRepository
                .save(Mockito.any(Member.class)))
                .thenReturn(sampleMember);
        Mockito.when(mockSessionRepository
                .save(sampleSession))
                .thenReturn(sampleSession);

       joinSessionEndpointTestObj
                .joinSession(sampleSession.getId(), "");
        Assertions.assertEquals(sampleSession.getMembers().size(), 1);

        Mockito.verify(mockSessionRepository, Mockito
                .times(1))
                .findById(sampleSession.getId());
        Mockito.verify(mockMemberRepository, Mockito
                .times(0))
                .findByEmail(Mockito.any(String.class));
        Mockito.verify(mockMemberRepository, Mockito
                .times(1))
                .save(Mockito.any(Member.class));
        Mockito.verify(mockSessionRepository, Mockito
                .times(1))
                .save(sampleSession);
    }

    @Test
    void testJoinSessionMemberJoin(){
        Mockito.when(mockSessionRepository
                .findById(sampleSession.getId()))
                .thenReturn(Optional.of(sampleSession));
        Mockito.when(mockMemberRepository
                .findByEmail(sampleEmail))
                .thenReturn(Optional.of(sampleMember));
        Mockito.when(mockMemberRepository
                .save(sampleMember))
                .thenReturn(sampleMember);
        Mockito.when(mockSessionRepository
                .save(sampleSession))
                .thenReturn(sampleSession);

        String expected = sampleMember.getId().toString();
        String actual = joinSessionEndpointTestObj
                .joinSession(sampleSession.getId(), sampleEmail);
        Assertions.assertEquals(expected, actual);
        Assertions.assertEquals(sampleSession.getMembers().size(), 1);

        Mockito.verify(mockSessionRepository, Mockito
                .times(1))
                .findById(sampleSession.getId());
        Mockito.verify(mockMemberRepository, Mockito
                .times(1))
                .findByEmail(sampleEmail);
        Mockito.verify(mockMemberRepository, Mockito
                .times(1))
                .save(sampleMember);
        Mockito.verify(mockSessionRepository, Mockito
                .times(1))
                .save(sampleSession);
    }

    @Test
    void testJoinSessionMemberByEmailFail(){
        String expected = "Member not found with email: " + sampleEmail;
        Mockito.when(mockSessionRepository
                .findById(sampleSession.getId()))
                .thenReturn(Optional.of(sampleSession));
        Mockito.when(mockMemberRepository
                .findByEmail(sampleEmail))
                .thenReturn(Optional.empty());

        Exception exception = Assertions.assertThrows(IllegalArgumentException.class, () -> {
            joinSessionEndpointTestObj
                    .joinSession(sampleSession.getId(), sampleEmail);
        });
        Assertions.assertEquals(expected, exception.getMessage());

        Mockito.verify(mockSessionRepository, Mockito
                        .times(1))
                .findById(sampleSession.getId());
        Mockito.verify(mockMemberRepository, Mockito
                        .times(1))
                .findByEmail(sampleEmail);
        Mockito.verify(mockMemberRepository, Mockito
                        .times(0))
                .save(Mockito.any(Member.class));
        Mockito.verify(mockSessionRepository, Mockito
                        .times(0))
                .save(Mockito.any(Session.class));
    }
}
