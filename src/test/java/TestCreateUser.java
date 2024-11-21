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

public class TestCreateUser {
    @Mock
    private MemberRepository mockMemberRepository;

    private LogInEndpoint logInEndpointTestObj = new LogInEndpoint(mockMemberRepository);

    private final String USERNAME = "thisUser";
    private final String PASSWORD = new BCryptPasswordEncoder().encode("thisPass");
    private final String EMAIL = "thisemail@gmail.com";

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMemberRepository = Mockito.mock(MemberRepository.class);
        logInEndpointTestObj = new LogInEndpoint(mockMemberRepository);
    }

    @Test
    public void testCreateUserSuccess() {
        String expected = "Account created";
        Mockito.when(mockMemberRepository.findByUsername(USERNAME)).thenReturn(Optional.empty());
        Mockito.when(mockMemberRepository.findByEmail(EMAIL)).thenReturn(Optional.empty());
        Mockito.when(mockMemberRepository.save(new Member(USERNAME, PASSWORD, EMAIL))).thenReturn(new Member());

        Assertions.assertEquals(expected, logInEndpointTestObj.createUser(EMAIL, PASSWORD, USERNAME));

        Mockito.verify(mockMemberRepository, Mockito.times(1)).save(Mockito.any(Member.class));
        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByEmail(Mockito.any(String.class));
        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByUsername(Mockito.any(String.class));
    }

    @Test
    public void testCreateUserEmailUsed(){
        String expected = "Email already in use";
        Mockito.when(mockMemberRepository.findByEmail(EMAIL)).thenReturn(Optional.of(new Member()));

        Assertions.assertEquals(expected, logInEndpointTestObj.createUser(EMAIL, USERNAME, PASSWORD));

        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByEmail(Mockito.any(String.class));
        Mockito.verify(mockMemberRepository, Mockito.times(0)).findByUsername(Mockito.any(String.class));
        Mockito.verify(mockMemberRepository, Mockito.times(0)).save(Mockito.any(Member.class));
    }

    @Test
    public void testCreateUserNameUsed(){
        String expected = "Username already in use";
        Mockito.when(mockMemberRepository.findByEmail(EMAIL)).thenReturn(Optional.empty());
        Mockito.when(mockMemberRepository.findByUsername(USERNAME)).thenReturn(Optional.of(new Member()));

        Assertions.assertEquals(expected, logInEndpointTestObj.createUser(EMAIL, USERNAME, PASSWORD));

        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByEmail(Mockito.any(String.class));
        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByUsername(Mockito.any(String.class));
        Mockito.verify(mockMemberRepository, Mockito.times(0)).save(Mockito.any(Member.class));
    }

    @Test
    public void testCreateUserFiller(){
        //We need to find some test to fill this lol
    }
}