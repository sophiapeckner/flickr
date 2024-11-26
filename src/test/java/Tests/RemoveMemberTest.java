package Tests;

import com.flickr.controllers.JoinSessionEndpoint;
import com.flickr.controllers.ManageSessionEndpoint;
import com.flickr.entities.Member;
import com.flickr.entities.Session;
import com.flickr.services.MemberService;
import com.flickr.services.SessionService;
import com.flickr.storage.MemberRepository;

import com.flickr.storage.SessionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.*;

class RemoveMemberTest {

    @Mock
    SessionRepository mockSessionRepository;
    @Mock
    MemberRepository mockMemberRepository;
    MemberService mockMemberService;
    SessionService mockSessionService;

    private ManageSessionEndpoint manageSessionEndpointTestObj;
    private JoinSessionEndpoint joinSessionEndpointTestObj;

    private final Member sampleMember = new Member("thisEmail@gmail.com", "thisUser", "thisPass");
    private final Member otherSampleMember = new Member("otherEmail@gmail.com", "otherUser", "otherPass");
    private final Session sampleSession = new Session("BY432GDJ", sampleMember.getId().toString());
    private final List<Member> sampleMemberList = new ArrayList<>(List.of(sampleMember, otherSampleMember));
    private final List<Member> sampleMemberListPostRemoval = new ArrayList<>(List.of(sampleMember));


    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        mockSessionRepository = Mockito.mock(SessionRepository.class);
        mockMemberRepository = Mockito.mock(MemberRepository.class);
        mockMemberService = new MemberService(mockMemberRepository);
        mockSessionService = new SessionService(mockMemberRepository, mockSessionRepository);
        manageSessionEndpointTestObj = new ManageSessionEndpoint(mockSessionRepository, mockSessionService, mockMemberRepository, mockMemberService);
        joinSessionEndpointTestObj = new JoinSessionEndpoint(mockSessionRepository, mockMemberRepository, mockMemberService);
    }

    @Test
    void testRemoveMember(){
        Mockito.when(mockSessionRepository
                .findById(sampleSession.getId()))
                .thenReturn(Optional.of(sampleSession));
        Mockito.when(mockMemberRepository
                .findByEmail(sampleMember.getEmail()))
                .thenReturn(Optional.of(sampleMember));
        Mockito.when(mockMemberRepository
                .save(sampleMember))
                .thenReturn(sampleMember);
        Mockito.when(mockSessionRepository
                .save(sampleSession))
                .thenReturn(sampleSession);

        joinSessionEndpointTestObj.joinSession(sampleSession.getId(), sampleMember.getEmail());

        Mockito.when(mockMemberRepository
                .findByEmail(otherSampleMember.getEmail()))
                .thenReturn(Optional.of(otherSampleMember));
        Mockito.when(mockMemberRepository
                .save(otherSampleMember))
                .thenReturn(otherSampleMember);

        joinSessionEndpointTestObj.joinSession(sampleSession.getId(), otherSampleMember.getEmail());
        Assertions.assertEquals(sampleMemberList, sampleSession.getMembers());

        manageSessionEndpointTestObj.removeMember(sampleSession.getId(), 1);

        Assertions.assertEquals(sampleMemberListPostRemoval, sampleSession.getMembers());
        Assertions.assertEquals(0L, otherSampleMember.getSessionId());

        Mockito.verify(mockSessionRepository,
                Mockito.times(3))
                .findById(sampleSession.getId());
        Mockito.verify(mockMemberRepository,
                Mockito.times(1))
                .findByEmail(sampleMember.getEmail());
        Mockito.verify(mockMemberRepository,
                Mockito.times(1))
                .save(sampleMember);
        Mockito.verify(mockSessionRepository,
                Mockito.times(3))
                .save(sampleSession);
        Mockito.verify(mockMemberRepository,
                Mockito.times(1))
                .findByEmail(otherSampleMember.getEmail());
        Mockito.verify(mockMemberRepository,
                Mockito.times(1))
                .save(otherSampleMember);
    }

    @Test
    void testRemoveMemberFailure(){
        String expectedException = "Session not found";
        Mockito.when(mockSessionRepository
                .findById(sampleSession.getId()))
                .thenReturn(Optional.empty());

        Long sessionId = sampleSession.getId();
        Exception exception = Assertions.assertThrows(IllegalArgumentException.class,() ->{
            manageSessionEndpointTestObj.removeMember(sessionId, 1);
        });

        Assertions.assertEquals(expectedException, exception.getMessage());

        Mockito.verify(mockSessionRepository,
                        Mockito.times(1))
                .findById(sampleSession.getId());
        Mockito.verify(mockMemberRepository,
                        Mockito.times(0))
                .findByEmail(sampleMember.getEmail());
        Mockito.verify(mockMemberRepository,
                        Mockito.times(0))
                .save(sampleMember);
        Mockito.verify(mockSessionRepository,
                        Mockito.times(0))
                .save(sampleSession);
        Mockito.verify(mockMemberRepository,
                        Mockito.times(0))
                .findByEmail(otherSampleMember.getEmail());
        Mockito.verify(mockMemberRepository,
                        Mockito.times(0))
                .save(otherSampleMember);
    }


    @Test
    void testStartSession(){
        Mockito.when(mockMemberRepository.findById(sampleMember.getId())).thenReturn(Optional.of(sampleMember));
        Mockito.when(mockSessionRepository.findById(sampleMember.getSessionId())).thenReturn(Optional.of(sampleSession));
        Mockito.when(mockSessionRepository.save(sampleSession)).thenReturn(sampleSession);

        Assertions.assertEquals(sampleSession, manageSessionEndpointTestObj.startSession(sampleMember.getId().toString()));
        Assertions.assertTrue(sampleSession.isStarted());

        Mockito.verify(mockMemberRepository, Mockito.times(1)).findById(sampleMember.getId());
        Mockito.verify(mockSessionRepository, Mockito.times(1)).findById(sampleMember.getSessionId());
        Mockito.verify(mockSessionRepository, Mockito.times(1)).save(sampleSession);


    }

    @Test
    void testRemoveSession() {
        sampleSession.setMembers(List.of(sampleMember));
        Mockito.when(mockSessionRepository.findById(sampleSession.getId())).thenReturn(Optional.of(sampleSession));

        Assertions.assertEquals(sampleSession, manageSessionEndpointTestObj.removeSession(sampleSession.getId()));
        Assertions.assertEquals(0L, sampleMember.getSessionId());

        Mockito.verify(mockSessionRepository, Mockito.times(1)).findById(sampleSession.getId());
    }

    @Test
    void testRemoveSessionFailure(){
        String expectedException = "Session not found";
        Mockito.when(mockSessionRepository.findById(sampleSession.getId())).thenReturn(Optional.empty());

        Long sessionId = sampleSession.getId();
        Exception exception = Assertions.assertThrows(IllegalArgumentException.class,() ->{
            manageSessionEndpointTestObj.removeSession(sessionId);
        });
        Assertions.assertEquals(expectedException, exception.getMessage());

        Mockito.verify(mockSessionRepository, Mockito.times(1)).findById(sampleSession.getId());
        Mockito.verify(mockSessionRepository, Mockito.times(0)).save(sampleSession);
    }
}
