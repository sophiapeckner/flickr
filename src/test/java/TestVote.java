import com.flickr.controllers.LogInEndpoint;
import com.flickr.entities.Member;
import com.flickr.storage.MemberRepository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class TestVote {

    @Mock
    private MemberRepository mockMemberRepository;

    @InjectMocks
    private LogInEndpoint memberServicesTestObj = new LogInEndpoint(mockMemberRepository);

    private final Member MEMBER = new Member("thisemail@gmail.net", "thisUsername", new BCryptPasswordEncoder().encode("thisPass"));

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMemberRepository = Mockito.mock(MemberRepository.class);
        memberServicesTestObj = new LogInEndpoint(mockMemberRepository);
    }
}
