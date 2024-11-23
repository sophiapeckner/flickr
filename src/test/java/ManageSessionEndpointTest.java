import com.flickr.controllers.ManageSessionEndpoint;
import com.flickr.entities.Member;
import com.flickr.services.MemberService;
import com.flickr.services.SessionService;
import com.flickr.storage.MemberRepository;

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

public class ManageSessionEndpointTest {

    @Mock
    SessionRepository mockSessionRepository;
    @Mock
    SessionService mockSessionService;
    @Mock
    MemberRepository mockMemberRepository;
    MemberService mockMemberService;

    @InjectMocks
    private ManageSessionEndpoint manageSessionEndpointTestObj;

    private final Member sampleMember = new Member("thisEmail@gmail.com", "thisUser", "thisPass");
    private final Map<String,String> sampleRequestBody = new HashMap<>();

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        mockSessionRepository = Mockito.mock(SessionRepository.class);
        mockSessionService = Mockito.mock(SessionService.class);
        mockMemberRepository = Mockito.mock(MemberRepository.class);
        mockMemberService = new MemberService(mockMemberRepository);
        manageSessionEndpointTestObj = new ManageSessionEndpoint(mockSessionRepository, mockSessionService, mockMemberRepository, mockMemberService);
        sampleRequestBody.put("displayName", "updated");
    }

    @Test
    void testUpdateMEmberDisplayName(){
        String expected = "Member not found";
        Mockito.when(mockMemberRepository
                .findById(sampleMember.getId()))
                .thenReturn(Optional.empty());

        Exception exception = Assertions.assertThrows(IllegalArgumentException.class, () -> {
            manageSessionEndpointTestObj
                    .updateDisplayName(sampleMember.getId().toString(), sampleRequestBody);
        });
        Assertions.assertEquals(expected, exception.getMessage());

        Mockito.verify(mockMemberRepository,
                Mockito.times(1))
                .findById(Mockito.any(Long.class));
        Mockito.verify(mockMemberRepository,
                Mockito.times(0))
                .save(Mockito.any(Member.class));
    }
}
