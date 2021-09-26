package com.egor.radit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private String userName;
    private String imageUrl;
    private int voteCount;
    private int commentCount;
    private int userVote;
}
