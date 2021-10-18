package com.egor.radit.model.chat;

import lombok.*;

import javax.persistence.*;
import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String type;
    private String sender;
    private String recipient;
    @Lob
    private String message;
    private Instant createdDate;

    @ManyToOne
    @JoinColumn(name = "conversationId", referencedColumnName = "conversationId")
    private Conversation conversation;

    public Message(String type, String message) {
        this.type = type;
        this.message = message;
    }
}
