package com.egor.radit.controller;

import com.egor.radit.dto.LeaderboardDto;
import com.egor.radit.service.LeaderboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("api/leaderboard")
@RequiredArgsConstructor
public class LeaderboardController {
    private final LeaderboardService leaderboardService;

    @GetMapping("/top")
    public ResponseEntity<List<LeaderboardDto>> getTop() {
        return new ResponseEntity<>(leaderboardService.getTop(), OK);
    }
}
