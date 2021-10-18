package com.egor.radit.repository.chat;

import com.egor.radit.model.User;
import com.egor.radit.model.chat.Conversation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends CrudRepository<Conversation, Long> {
    List<Conversation> findAllByUser1OrUser2(User user1, User user2);
    boolean existsByUser1AndUser2(User user1, User user2);
}
