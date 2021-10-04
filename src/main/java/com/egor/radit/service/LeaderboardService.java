package com.egor.radit.service;

import com.egor.radit.dto.LeaderboardDto;
import com.egor.radit.model.User;
import com.egor.radit.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaderboardService {
    private final UserRepository userRepository;

    public List<LeaderboardDto> getTop() {
        List<User> topUsers = userRepository.findTop5ByOrderByVoteCountDesc();

        List<LeaderboardDto> leaderboard = new ArrayList<>();
        for (User user : topUsers) {
            LeaderboardDto leaderboardDto = new LeaderboardDto();
            leaderboardDto.setUsername(user.getUsername());
            leaderboardDto.setScore(user.getVoteCount());
            leaderboard.add(leaderboardDto);
        }
        return leaderboard;

    }

}
