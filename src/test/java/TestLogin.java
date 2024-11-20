import com.flickr.controllers.LogInEndpoint;
import com.flickr.entities.Member;
import com.flickr.storage.MemberRepository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@ExtendWith(MockitoExtension.class)
public class TestLogin {

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

    @Test
    public void testLoginAbsent(){
        String logEmail = "thisemail@gmail.net";
        String logPassword = "thisPass";
        final String expected = "User Not found";
        Mockito.when(mockMemberRepository.findByEmail(logEmail)).thenReturn(Optional.empty());

        Assertions.assertEquals(expected, memberServicesTestObj.login(logEmail, logPassword));

        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByEmail(logEmail);
    }

    @Test
    public void testLoginPresent(){
        String nonEncryptPass = "thisPass";
        String expected = MEMBER.getId().toString();
        Mockito.when(mockMemberRepository.findByEmail(MEMBER.getEmail())).thenReturn(Optional.of(MEMBER));
//        Mockito.when(mockMemberRepository.findByUsername(MEMBER.getUsername())).thenReturn(Optional.empty());
//        Mockito.when(mockMemberRepository.save(new Member())).thenReturn(new Member());
        // need to figure out how to make this create user method use the same Member object as the save mockito call.
//        memberServicesTestObj.createUser(MEMBER.getEmail(), MEMBER.getUsername(), MEMBER.getPass());

//        Mockito.when(mockMemberRepository.findByEmail(MEMBER.getEmail())).thenReturn(Optional.of(MEMBER));
        Assertions.assertEquals(expected, memberServicesTestObj.login(MEMBER.getEmail(), nonEncryptPass));

        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByEmail(MEMBER.getEmail());
//        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByUsername(MEMBER.getUsername());
//        Mockito.verify(mockMemberRepository, Mockito.times(1)).save(MEMBER);

//        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByEmail(member.getEmail());
    }

    @Test
    public void testLoginWrongPass(){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        Member testMember = new Member("thisemail@gmail.net", "thisUsername", encoder.encode("thisPass"));
        String wrongPass = "wrongPass";
        String expected = "Wrong password";
        Mockito.when(mockMemberRepository.findByEmail(testMember.getEmail())).thenReturn(Optional.of(testMember));
        Assertions.assertEquals(expected, memberServicesTestObj.login(testMember.getEmail(), wrongPass));

        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByEmail(testMember.getEmail());
    }

    @Test
    public void testLoginFiller(){
        //We need to come up with another test here
    }
}