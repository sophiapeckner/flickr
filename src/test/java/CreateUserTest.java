import com.flickr.controllers.LogInEndpoint;
import com.flickr.entities.Member;
import com.flickr.storage.MemberRepository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

class CreateUserTest {
    @Mock
    private MemberRepository mockMemberRepository;

    private LogInEndpoint logInEndpointTestObj = new LogInEndpoint(mockMemberRepository);

    private final String sampleUsername = "thisUser";
    private final String samplePass = new BCryptPasswordEncoder().encode("thisPass");
    private final String sampleEmail = "thisemail@gmail.com";

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        mockMemberRepository = Mockito.mock(MemberRepository.class);
        logInEndpointTestObj = new LogInEndpoint(mockMemberRepository);
    }

    @Test
    void testCreateUserSuccess() {
        String expected = "Account created";
        Mockito.when(mockMemberRepository.findByUsername(sampleUsername)).thenReturn(Optional.empty());
        Mockito.when(mockMemberRepository.findByEmail(sampleEmail)).thenReturn(Optional.empty());
        Mockito.when(mockMemberRepository.save(new Member(sampleUsername, samplePass, sampleEmail))).thenReturn(new Member());

        Assertions.assertEquals(expected, logInEndpointTestObj.createUser(sampleEmail, samplePass, sampleUsername));

        Mockito.verify(mockMemberRepository, Mockito.times(1)).save(Mockito.any(Member.class));
        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByEmail(Mockito.any(String.class));
        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByUsername(Mockito.any(String.class));
    }

    @Test
    void testCreateUserEmailUsed(){
        String expected = "Email already in use";
        Mockito.when(mockMemberRepository.findByEmail(sampleEmail)).thenReturn(Optional.of(new Member()));

        Assertions.assertEquals(expected, logInEndpointTestObj.createUser(sampleEmail, sampleUsername, samplePass));

        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByEmail(Mockito.any(String.class));
        Mockito.verify(mockMemberRepository, Mockito.times(0)).findByUsername(Mockito.any(String.class));
        Mockito.verify(mockMemberRepository, Mockito.times(0)).save(Mockito.any(Member.class));
    }

    @Test
    void testCreateUserNameUsed(){
        String expected = "Username already in use";
        Mockito.when(mockMemberRepository.findByEmail(sampleEmail)).thenReturn(Optional.empty());
        Mockito.when(mockMemberRepository.findByUsername(sampleUsername)).thenReturn(Optional.of(new Member()));

        Assertions.assertEquals(expected, logInEndpointTestObj.createUser(sampleEmail, sampleUsername, samplePass));

        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByEmail(Mockito.any(String.class));
        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByUsername(Mockito.any(String.class));
        Mockito.verify(mockMemberRepository, Mockito.times(0)).save(Mockito.any(Member.class));
    }

}