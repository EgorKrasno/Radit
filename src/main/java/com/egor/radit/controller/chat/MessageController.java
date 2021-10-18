package com.egor.radit.controller.chat;

import com.egor.radit.dto.MessageDto;
import com.egor.radit.exception.RaditException;
import com.egor.radit.model.User;
import com.egor.radit.repository.RoleRepository;
import com.egor.radit.repository.UserRepository;
import com.egor.radit.service.chat.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class MessageController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final SimpUserRegistry simpUserRegistry;
    private final MessageService messageService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @GetMapping("/api/messages/{conversationId}")
    public ResponseEntity<List<MessageDto>> getAllMessages(@PathVariable long conversationId) throws RaditException {
        return new ResponseEntity<>(messageService.getAll(conversationId), HttpStatus.OK);
    }


    @MessageMapping("/sendPrivateMessage")
    public void sendPrivateMessage(Principal principal, @Payload MessageDto messageRequest) throws RaditException {
        messageService.saveMessage(messageRequest, principal);
        System.out.println(simpUserRegistry.getUser(messageRequest.getRecipient()));


        simpMessagingTemplate.convertAndSendToUser(
                        messageRequest.getRecipient(), "/reply", messageRequest);
    }


    @MessageMapping("/blastAll")
    @SendTo("/topic/all")
    public String send(Principal principal, @Payload String message) throws RaditException {
        if (!isAdmin(principal)) throw new RaditException("Not Admin");
        return message;
    }

    public boolean isAdmin(Principal principal) throws RaditException {
        if (principal != null) {
            User user = userRepository.findByUsername(principal.getName()).orElseThrow(() -> new RaditException("User not found"));
            return user.getRoles().contains(roleRepository.findByName("ROLE_SUPER_ADMIN"));
        }
        return false;
    }
}