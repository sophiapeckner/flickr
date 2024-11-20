import com.flickr.endpoints.MemberServices;
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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestLogin {

    @Mock
    private MemberRepository mockMemberRepository;

    @InjectMocks
    private MemberServices memberServicesTestObj = new MemberServices(mockMemberRepository);

    private final Member MEMBER = new Member("thisemail@gmail.net", "thisUsername", "thisPass");

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
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
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String expected = MEMBER.getId().toString();
        Mockito.when(mockMemberRepository.findByEmail(MEMBER.getEmail())).thenReturn(Optional.empty());
        Mockito.when(mockMemberRepository.findByUsername(MEMBER.getUsername())).thenReturn(Optional.empty());
        Mockito.when(mockMemberRepository.save(MEMBER)).thenReturn(MEMBER);
        memberServicesTestObj.createUser("thisemail@gmail.net", "thisUsername", "thisPass");

        Mockito.when(mockMemberRepository.findByEmail(MEMBER.getEmail())).thenReturn(Optional.of(MEMBER));
//        When trying to do encoder.matches in MemberServices.login(), the passwords say that they don't match since they are not encoded correctly
//        WARN org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder -- Encoded password does not look like BCrypt
        Assertions.assertEquals(expected, memberServicesTestObj.login(MEMBER.getEmail(), MEMBER.getPass()));

        Mockito.verify(mockMemberRepository, Mockito.times(2)).findByEmail(MEMBER.getEmail());
        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByUsername(MEMBER.getUsername());
        Mockito.verify(mockMemberRepository, Mockito.times(1)).save(MEMBER);

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