package com.egor.radit.controller;

import com.egor.radit.dto.VoteDto;
import com.egor.radit.exception.RaditException;
import com.egor.radit.service.VoteService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class VoteController {

    private final VoteService voteService;

    @PostMapping("/vote")
    public ResponseEntity<?> vote(Authentication auth, @RequestBody VoteDto voteDto) throws RaditException {
        voteService.vote(auth, voteDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
