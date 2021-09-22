package com.egor.radit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoteDto {
    @Range(min = -1, max = 1, message = "Vote not valid")
    private int direction;
    private Long postId;
}
