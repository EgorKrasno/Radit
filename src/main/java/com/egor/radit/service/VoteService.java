package com.egor.radit.service;

import com.egor.radit.dto.VoteDto;
import com.egor.radit.exception.RaditException;
import com.egor.radit.model.Post;
import com.egor.radit.model.User;
import com.egor.radit.model.Vote;
import com.egor.radit.repository.PostRepository;
import com.egor.radit.repository.UserRepository;
import com.egor.radit.repository.VoteRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class VoteService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final VoteRepository voteRepository;

    public void vote(Authentication auth, VoteDto voteDto) throws RaditException {
        User user = userRepository.findByUsername(auth.getName()).orElseThrow(() -> new RaditException("User not found"));
        Post post = postRepository.findById(voteDto.getPostId()).orElseThrow(() -> new RaditException("Post not found"));

        Optional<Vote> vote = voteRepository.findByPostAndUser(post, user);

        if (vote.isEmpty()) {
            post.setVoteCount(post.getVoteCount() + voteDto.getDirection());
            postRepository.save(post);
            Vote newVote = new Vote();
            newVote.setUser(user);
            newVote.setDirection(voteDto.getDirection());
            newVote.setPost(post);
            voteRepository.save(newVote);
        } else {
            throw new RaditException("You already voted");
        }
    }
}
