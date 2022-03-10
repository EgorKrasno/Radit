package com.egor.radit.controller.chat;

import com.egor.radit.dto.ConversationDto;
import com.egor.radit.exception.RaditException;
import com.egor.radit.model.User;
import com.egor.radit.model.chat.Conversation;
import com.egor.radit.service.chat.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/conversation")
@RequiredArgsConstructor
public class ConversationController {
    private final ConversationService conversationService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Conversation> createConversation(Authentication auth, @RequestBody User user) throws RaditException {
        return new ResponseEntity<>(conversationService.createConversation(auth, user.getUsername()), OK);
    }

    @PostMapping("/view")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Conversation> viewConversation(Authentication auth, @RequestBody ConversationDto conversationDto) throws RaditException {
        return new ResponseEntity<>(conversationService.viewConversation(auth, conversationDto.getId()), OK);
    }

    @GetMapping("/{username}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<List<ConversationDto>> getAllConversations(@PathVariable String username) throws RaditException {
        return new ResponseEntity<>(conversationService.getAll(username), OK);
    }

    //returns true if all conversations are read
    @GetMapping("/read")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Boolean> read(Authentication auth) throws RaditException {
        return new ResponseEntity<>(conversationService.read(auth), OK);
    }


}
