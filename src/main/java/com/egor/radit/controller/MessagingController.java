package com.egor.radit.controller;

import com.egor.radit.dto.WsMessage;
import com.egor.radit.exception.RaditException;
import com.egor.radit.model.User;
import com.egor.radit.repository.RoleRepository;
import com.egor.radit.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class MessagingController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @MessageMapping("/sendPrivateMessage")
    public void sendPrivateMessage(Principal principal, @Payload WsMessage wsMessage) throws RaditException {

        simpMessagingTemplate.convertAndSendToUser(
                wsMessage.getRecipient(), "/reply", wsMessage);
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