package com.egor.radit.model.chat;

import com.egor.radit.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long conversationId;

    @ManyToOne
    private User user1;

    @ManyToOne
    private User user2;

    private boolean user1Viewed = true;
    private boolean user2Viewed = true;

    private Instant createdDate;
}
