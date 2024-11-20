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

    @InjectMocks
    private LogInEndpoint memberServicesTestObj = new LogInEndpoint(mockMemberRepository);

    private final String USERNAME = "thisUser";
    private final String PASSWORD = new BCryptPasswordEncoder().encode("thisPass");
    private final String EMAIL = "thisemail@gmail.com";

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateUserSuccess() {
        String expected = "Account Created";
        Mockito.when(mockMemberRepository.findByUsername(USERNAME)).thenReturn(Optional.empty());
        Mockito.when(mockMemberRepository.findByEmail(EMAIL)).thenReturn(Optional.empty());
        Mockito.when(mockMemberRepository.save(new Member(USERNAME, PASSWORD, EMAIL))).thenReturn(new Member());

        Assertions.assertEquals(expected, memberServicesTestObj.createUser(USERNAME, PASSWORD, EMAIL));

        Mockito.verify(mockMemberRepository, Mockito.times(1)).save(Mockito.any(Member.class));
        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByEmail(Mockito.any(String.class));
        Mockito.verify(mockMemberRepository, Mockito.times(1)).findByUsername(Mockito.any(String.class));
    }
}
