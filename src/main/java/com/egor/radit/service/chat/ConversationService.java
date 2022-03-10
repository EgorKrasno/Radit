package com.egor.radit.service.chat;

import com.egor.radit.dto.ConversationDto;
import com.egor.radit.exception.RaditException;
import com.egor.radit.model.User;
import com.egor.radit.model.chat.Conversation;
import com.egor.radit.repository.UserRepository;
import com.egor.radit.repository.chat.ConversationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ConversationService {
    private final UserRepository userRepository;
    private final ConversationRepository conversationRepository;

    public Conversation createConversation(Authentication auth, String username) throws RaditException {
        //user 1 is the creator
        User user1 = userRepository.findByUsername(auth.getName()).orElseThrow(() -> new RaditException("User not found"));
        //user 2 is the receiver
        User user2 = userRepository.findByUsername(username).orElseThrow(() -> new RaditException("User not found"));

        //See if conversation between them already exists
        if (conversationRepository.existsByUser1AndUser2(user2, user1)) {
            throw new RaditException("Conversation already exists");
        }

        Conversation conversation = new Conversation();
        conversation.setUser1(user1);
        conversation.setUser2(user2);
        conversation.setUser1Viewed(true);
        conversation.setUser2Viewed(true);
        conversation.setCreatedDate(Instant.now());

        return conversationRepository.save(conversation);
    }

    public List<ConversationDto> getAll(String username) throws RaditException {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RaditException("User not found"));
        List<Conversation> conversations = conversationRepository.findAllByUser1OrUser2(user, user);

        List<ConversationDto> conversationsDtos = new ArrayList<>();

        for (Conversation conversation : conversations) {
            ConversationDto conversationDto = new ConversationDto();

            conversationDto.setId(conversation.getConversationId());

            if (user.getUsername().equals(conversation.getUser1().getUsername())) {
                conversationDto.setViewed(conversation.isUser1Viewed());
            } else {
                conversationDto.setViewed(conversation.isUser2Viewed());
            }
            System.out.println(conversationDto.isViewed());

            conversationDto.setUser(user.getUsername().equals(conversation.getUser1().getUsername()) ?
                    conversation.getUser2().getUsername() : conversation.getUser1().getUsername());
            conversationsDtos.add(conversationDto);
        }
        return conversationsDtos;
    }


    public Conversation viewConversation(Authentication auth, long id) throws RaditException {
        Conversation conversation = conversationRepository.findById(id).orElseThrow(() -> new RaditException("Conversation"));
        String username = auth.getName();

        //Requester viewed the notification
        if (conversation.getUser1().getUsername().equals(username)) {
            conversation.setUser1Viewed(true);
        } else {
            conversation.setUser2Viewed(true);
        }

        conversationRepository.save(conversation);
        return conversation;
    }

    public boolean read(Authentication auth) throws RaditException {
        User user = userRepository.findByUsername(auth.getName()).orElseThrow(() -> new RaditException("User not found"));
        List<Conversation> conversations = conversationRepository.findAllByUser1OrUser2(user, user);
        for (Conversation c : conversations) {
            if (user.getUsername().equals(c.getUser1().getUsername())) {
                if (!c.isUser1Viewed()) return false;
            } else {
                if (!c.isUser2Viewed()) return false;
            }
        }
        return true;
    }
}