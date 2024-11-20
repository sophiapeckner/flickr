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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestMemberServices {

    @Mock
    private MemberRepository mockMemberRepository;

    @InjectMocks
    private MemberServices memberServicesTestObj = new MemberServices(mockMemberRepository);

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
}