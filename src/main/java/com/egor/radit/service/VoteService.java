package com.egor.radit.service;

import com.egor.radit.dto.VoteDto;
import com.egor.radit.exception.RaditException;
import com.egor.radit.model.Post;
import com.egor.radit.model.User;
import com.egor.radit.model.Vote;
import com.egor.radit.model.chat.Message;
import com.egor.radit.repository.PostRepository;
import com.egor.radit.repository.UserRepository;
import com.egor.radit.repository.VoteRepository;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
    private final SimpMessagingTemplate simpMessagingTemplate;

    public void vote(Authentication auth, VoteDto voteDto) throws RaditException {
        User user = userRepository.findByUsername(auth.getName()).orElseThrow(() -> new RaditException("User not found"));
        Post post = postRepository.findById(voteDto.getId()).orElseThrow(() -> new RaditException("Post not found"));
        User poster = userRepository.findByUsername(post.getUser().getUsername()).orElseThrow(() -> new RaditException("Original poster not found"));

        Optional<Vote> vote = voteRepository.findByPostAndUser(post, user);

        if(voteDto.getDirection() > 0 && user != poster){
            simpMessagingTemplate.convertAndSendToUser(
                    poster.getUsername(), "/reply", new Message("toast", "Someone upvoted your Post!"));
        }

        if (vote.isEmpty()) {
            //update posts vote count
            post.setVoteCount(post.getVoteCount() + voteDto.getDirection());
            postRepository.save(post);

            //update OPs voteCounter
            poster.setVoteCount(poster.getVoteCount() + voteDto.getDirection());
            userRepository.save(poster);

            //save new vote and link it to the voter
            Vote newVote = new Vote();
            newVote.setUser(user);
            newVote.setDirection(voteDto.getDirection());
            newVote.setPost(post);
            voteRepository.save(newVote);
        } else {
            Vote foundVote = vote.get();
            if (foundVote.getDirection() != voteDto.getDirection()) {
                post.setVoteCount(post.getVoteCount() + (voteDto.getDirection() * 2));
                postRepository.save(post);

                poster.setVoteCount(poster.getVoteCount() + (voteDto.getDirection() * 2));
                userRepository.save(poster);

                foundVote.setUser(user);
                foundVote.setDirection(voteDto.getDirection());
                foundVote.setPost(post);
                voteRepository.save(foundVote);
            }
        }
    }
}
