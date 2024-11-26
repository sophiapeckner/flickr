package Tests;

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

class SignUpLogInTest {
    @Mock
    private MemberRepository mockMemberRepository;

    private LogInEndpoint logInEndpointTestObj;

    private final String sampleUsername = "thisUser";
    private final String samplePass = new BCryptPasswordEncoder().encode("thisPass");
    private final String sampleEmail = "thisemail@gmail.com";

    private final Member sampleMember = new Member(sampleEmail, sampleUsername, samplePass);


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

    @Test
    void testLoginAbsent(){
        String logEmail = "thisemail@gmail.net";
        String logPassword = "thisPass";
        final String expected = "User Not found";
        Mockito.when(mockMemberRepository.findByEmail(logEmail)).thenReturn(Optional.empty());

        Assertions.assertEquals(expected, logInEndpointTestObj.login(logEmail, logPassword));

        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByEmail(logEmail);
    }

    @Test
    void testLoginPresent(){
        String nonEncryptPass = "thisPass";
        String expected = sampleMember.getId().toString();
        Mockito.when(mockMemberRepository.findByEmail(sampleMember.getEmail())).thenReturn(Optional.of(sampleMember));

        Assertions.assertEquals(expected, logInEndpointTestObj.login(sampleMember.getEmail(), nonEncryptPass));

        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByEmail(sampleMember.getEmail());
    }

    @Test
    void testLoginWrongPass(){
        String wrongPass = "wrongPass";
        String expected = "Wrong password";
        Mockito.when(mockMemberRepository.findByEmail(sampleMember.getEmail())).thenReturn(Optional.of(sampleMember));

        Assertions.assertEquals(expected, logInEndpointTestObj.login(sampleMember.getEmail(), wrongPass));

        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByEmail(sampleMember.getEmail());
    }

}