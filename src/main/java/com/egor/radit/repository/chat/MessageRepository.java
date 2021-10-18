package com.egor.radit.repository.chat;

import com.egor.radit.model.chat.Conversation;
import com.egor.radit.model.chat.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends CrudRepository<Message, Long> {
    List<Message> findAllByConversationOrderByCreatedDate(Conversation conversation);
}
