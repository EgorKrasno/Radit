package com.egor.radit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private Long id;
    private Long postId;
    private Instant createdDate;
    @NotBlank
    private String text;
    private String userName;
}
