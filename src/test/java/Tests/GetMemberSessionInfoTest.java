package Tests;

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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.*;

class GetMemberSessionInfoTest {

    @Mock
    private SessionRepository mockSessionRepository;
    @Mock
    private MemberRepository mockMemberRepository;

    private SessionService mockSessionService;
    private MemberService mockMemberService;

    private ManageSessionEndpoint manageSessionEndpointTestObj;

    private final Member sampleMember = new Member("thisemail@gmail.net", "thisUsername", new BCryptPasswordEncoder().encode("thisPass"));
    private final Map<String, Integer> sampleRequestBody = new HashMap<>();
    private final Map <String, String> sampleRequestBody2 = new HashMap<>();
    private final Session sampleSession = new Session("groupcode", sampleMember.getId().toString());


    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockSessionRepository = Mockito.mock(SessionRepository.class);
        mockMemberRepository = Mockito.mock(MemberRepository.class);
        mockSessionService = new SessionService(mockMemberRepository, mockSessionRepository);
        mockMemberService = new MemberService(mockMemberRepository);
        manageSessionEndpointTestObj = new ManageSessionEndpoint(mockSessionRepository, mockSessionService, mockMemberRepository, mockMemberService);
        sampleRequestBody.put("movieIndex", 6);
        sampleRequestBody2.put("language", "en");
    }

    @Test
    void testGetDispayName() {
        Mockito.when(mockMemberRepository
                        .findById(sampleMember.getId()))
                .thenReturn(Optional.of(sampleMember));

        sampleMember.setDisplayName("AHH");

        Assertions.assertEquals(
                "AHH",
                mockMemberService.getMemberDisplayName(sampleMember.getId().toString())
        );

        Mockito.verify(mockMemberRepository,
                        Mockito.times(1))
                .findById(sampleMember.getId());
    }

    @Test
    void testGetMemberStreamingPlatforms () {
        Mockito.when(mockMemberRepository
                        .findById(sampleMember.getId()))
                .thenReturn(Optional.of(sampleMember));

        sampleMember.setStreamingPlatforms(Set.of("Netflix"));

        Assertions.assertEquals(
                mockMemberService.getMemberStreamingPlatforms(sampleMember.getId().toString()),
                Set.of("Netflix")
        );

        Mockito.verify(mockMemberRepository,
                        Mockito.times(1))
                .findById(sampleMember.getId());
    }

    @Test
    void testFetchSessionByGroupCode() {
        Mockito.when(mockSessionRepository
                        .findByGroupCode(sampleSession.getGroupCode()))
                .thenReturn(Optional.of(sampleSession));

        Assertions.assertEquals(
                manageSessionEndpointTestObj.fetchSessionByGroupCode(sampleSession.getGroupCode()),
                sampleSession
        );

        Mockito.verify(mockSessionRepository,
                        Mockito.times(1))
                .findByGroupCode(sampleSession.getGroupCode());
    }

    @Test
    void testFetchSessionByGroupCodeFailure() {
        Mockito.when(mockSessionRepository
                        .findByGroupCode("INVALID"))
                .thenReturn(Optional.empty());

        Exception exception = Assertions.assertThrows(IllegalArgumentException.class, () -> {
            manageSessionEndpointTestObj.fetchSessionByGroupCode("INVALID");
        });
        Assertions.assertEquals("Session not found", exception.getMessage());

        Mockito.verify(mockSessionRepository,
                        Mockito.times(1))
                .findByGroupCode("INVALID");
    }

}
