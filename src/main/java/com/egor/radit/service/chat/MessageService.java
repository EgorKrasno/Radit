package com.egor.radit.service.chat;

import com.egor.radit.dto.MessageDto;
import com.egor.radit.exception.RaditException;
import com.egor.radit.model.chat.Conversation;
import com.egor.radit.model.chat.Message;
import com.egor.radit.repository.chat.ConversationRepository;
import com.egor.radit.repository.chat.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    public void saveMessage(MessageDto messageRequest, Principal principal) throws RaditException {
        Message newMessage = new Message();
        Conversation conversation = conversationRepository.findById(messageRequest.getConversationId()).orElseThrow(() -> new RaditException("Conversation not found"));

        //set other person to not viewed
        if (conversation.getUser1().getUsername().equals(principal.getName())) {
            conversation.setUser2Viewed(false);
        } else {
            conversation.setUser1Viewed(false);
        }
        conversationRepository.save(conversation);

        newMessage.setCreatedDate(Instant.now());
        newMessage.setMessage(messageRequest.getMessage());
        newMessage.setRecipient(messageRequest.getRecipient());
        newMessage.setSender(principal.getName());
        newMessage.setType(messageRequest.getType());
        newMessage.setConversation(conversation);


        messageRepository.save(newMessage);
    }

    public List<MessageDto> getAll(long conversationId) throws RaditException {
        Conversation conversation = conversationRepository.findById(conversationId).orElseThrow(() -> new RaditException("Conversation not found"));
        List<Message> messages = messageRepository.findAllByConversationOrderByCreatedDate(conversation);

        List<MessageDto> messageDtos = new ArrayList<>();
        for (Message message : messages) {
            MessageDto messageDto = new MessageDto();
            messageDto.setMessage(message.getMessage());
            messageDto.setRecipient(message.getRecipient());
            messageDto.setConversationId(message.getConversation().getConversationId());
            messageDto.setType(message.getType());
            messageDtos.add(messageDto);
        }
        return messageDtos;
    }


}
