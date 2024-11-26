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

import java.util.*;

class UpdatePreferencesTest {

    @Mock
    SessionRepository mockSessionRepository;
    @Mock
    MemberRepository mockMemberRepository;

    MemberService mockMemberService;
    SessionService mockSessionService;

    private ManageSessionEndpoint manageSessionEndpointTestObj;

    private final Member sampleMember = new Member("thisEmail@gmail.com", "thisUser", "thisPass");

    private final Map<String,String> sampleRequestBody = new HashMap<>(){{
        put("displayName", "updated");
    }};
    private final Map<String,String> sampleRequestBody2 = new HashMap<>(){{
        put("language", "en");
    }};
    private final Map<String,String> sampleRequestBody3 = new HashMap<>(){{
        put("displayName", "");
    }};
    private final Session sampleSession = new Session("432b423d", sampleMember.getId().toString());
    private final Set<String> sampleGenreSet =
            new HashSet<>(Arrays.asList("war", "romance"));
    private final Set<String> samplePlatformSet =
            new HashSet<>(Arrays.asList("Netflix", "Hulu"));
    private final List<String> sampleGenreList =
            new ArrayList<>(List.of("war", "romance"));
    private final List<String> samplePlatformList =
            new ArrayList<>(List.of("Netflix", "Hulu"));


    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        mockSessionRepository = Mockito.mock(SessionRepository.class);
        mockMemberRepository = Mockito.mock(MemberRepository.class);
        mockMemberService = new MemberService(mockMemberRepository);
        mockSessionService = new SessionService(mockMemberRepository, mockSessionRepository);
        manageSessionEndpointTestObj = new ManageSessionEndpoint(mockSessionRepository, mockSessionService, mockMemberRepository, mockMemberService);
    }

    @Test
    void testUpdateGenres(){
        Mockito.when(mockMemberRepository
                        .findById(sampleMember.getId()))
                .thenReturn(Optional.of(sampleMember));
        Mockito.when(mockSessionRepository
                        .findById(sampleMember.getSessionId()))
                .thenReturn(Optional.of(sampleSession));
        Mockito.when(mockSessionRepository
                        .save(sampleSession))
                .thenReturn(sampleSession);


        Assertions.assertEquals(sampleSession, manageSessionEndpointTestObj.updateGenres(sampleMember.getId().toString(), sampleGenreList));
        Assertions.assertEquals(sampleGenreSet, sampleSession.getGenres());

        Mockito.verify(mockMemberRepository,
                        Mockito.times(1))
                .findById(sampleMember.getId());
        Mockito.verify(mockSessionRepository,
                        Mockito.times(1))
                .findById(sampleMember.getSessionId());
        Mockito.verify(mockSessionRepository,
                        Mockito.times(1))
                .save(sampleSession);
    }

    @Test
    void testUpdateStreamingPlatforms(){
        Mockito.when(mockMemberRepository
                        .findById(sampleMember.getId()))
                .thenReturn(Optional.of(sampleMember));
        Mockito.when(mockSessionRepository
                        .findById(sampleMember.getSessionId()))
                .thenReturn(Optional.of(sampleSession));
        Mockito.when(mockSessionRepository
                        .save(sampleSession))
                .thenReturn(sampleSession);


        Assertions.assertEquals(sampleSession, manageSessionEndpointTestObj.updateStreamingPlatforms(sampleMember.getId().toString(), samplePlatformList));
        Assertions.assertEquals(samplePlatformSet, sampleSession.getStreamingPlatforms());

        Mockito.verify(mockMemberRepository,
                        Mockito.times(1))
                .findById(sampleMember.getId());
        Mockito.verify(mockSessionRepository,
                        Mockito.times(1))
                .findById(sampleMember.getSessionId());
        Mockito.verify(mockSessionRepository,
                        Mockito.times(1))
                .save(sampleSession);
    }

    @Test
    void testUpdateLanguage() {
        Mockito.when(mockMemberRepository
                        .findById(sampleMember.getId()))
                .thenReturn(Optional.of(sampleMember));

        Mockito.when(mockSessionRepository
                        .findById(sampleMember.getSessionId()))
                .thenReturn(Optional.of(sampleSession));

        Mockito.when(mockSessionRepository
                        .save(sampleSession))
                .thenReturn(sampleSession);

        Assertions.assertEquals(
                manageSessionEndpointTestObj.updateLanguages(sampleMember.getId().toString(), sampleRequestBody2).getLanguages(),
                Set.of("en")
        );

        Mockito.verify(mockMemberRepository,
                        Mockito.times(1))
                .findById(sampleMember.getId());

        Mockito.verify(mockSessionRepository,
                        Mockito.times(1))
                .findById(sampleSession.getId());

        Mockito.verify(mockSessionRepository,
                        Mockito.times(1))
                .save(sampleSession);
    }

    @Test
    void testUpdateMemberDisplayNameSuccess(){
        Mockito.when(mockMemberRepository
                .findById(sampleMember.getId()))
                .thenReturn(Optional.of(sampleMember));
        Mockito.when(mockMemberRepository
                .save(sampleMember))
                .thenReturn(sampleMember);

        Assertions.assertEquals(sampleMember, manageSessionEndpointTestObj.updateDisplayName(sampleMember.getId().toString(), sampleRequestBody));
        //Assert updated to "updated" as described in the setup()
        Assertions.assertEquals("updated", sampleMember.getDisplayName());

        Mockito.verify(mockMemberRepository,
                Mockito.times(1))
                .findById(sampleMember.getId());
        Mockito.verify(mockMemberRepository,
                Mockito.times(1))
                .save(sampleMember);
    }

    @Test
    void testUpdateMemberDisplayNameSuccessAnon(){
        Mockito.when(mockMemberRepository
                        .findById(sampleMember.getId()))
                .thenReturn(Optional.of(sampleMember));
        Mockito.when(mockMemberRepository
                        .save(sampleMember))
                .thenReturn(sampleMember);

        Assertions.assertEquals(sampleMember, manageSessionEndpointTestObj.updateDisplayName(sampleMember.getId().toString(), sampleRequestBody3));
        Assertions.assertEquals("Anonymous", sampleMember.getDisplayName());

        Mockito.verify(mockMemberRepository,
                        Mockito.times(1))
                .findById(sampleMember.getId());
        Mockito.verify(mockMemberRepository,
                        Mockito.times(1))
                .save(sampleMember);
    }

    @Test
    void testUpdateMemberDisplayNameGetMemberFail(){
        String expected = "Member not found";
        Mockito.when(mockMemberRepository
                        .findById(sampleMember.getId()))
                .thenReturn(Optional.empty());

        String memberId = sampleMember.getId().toString();
        Exception exception = Assertions.assertThrows(IllegalArgumentException.class, () -> {
            manageSessionEndpointTestObj
                    .updateDisplayName(memberId, sampleRequestBody);
        });
        Assertions.assertEquals(expected, exception.getMessage());

        Mockito.verify(mockMemberRepository,
                        Mockito.times(1))
                .findById(sampleMember.getId());
        Mockito.verify(mockMemberRepository,
                        Mockito.times(0))
                .save(Mockito.any(Member.class));
    }

}
