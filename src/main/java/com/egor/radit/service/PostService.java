package com.egor.radit.service;

import com.egor.radit.dto.PostRequest;
import com.egor.radit.dto.PostResponse;
import com.egor.radit.exception.RaditException;
import com.egor.radit.model.Post;
import com.egor.radit.model.User;
import com.egor.radit.model.Vote;
import com.egor.radit.repository.PostRepository;
import com.egor.radit.repository.UserRepository;
import com.egor.radit.repository.VoteRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final VoteRepository voteRepository;

    public void save(Authentication auth, PostRequest postRequest) throws RaditException {
        Post newPost = new Post();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow(() -> new RaditException("User not found"));
        newPost.setUser(user);

        newPost.setTitle(postRequest.getTitle());
        newPost.setContent(postRequest.getContent());
        newPost.setCreatedDate(Instant.now());
        newPost.setCreatedDate(Instant.now());
        newPost.setVoteCount(0);
        newPost.setCommentCount(0);

        postRepository.save(newPost);
    }

    //Convert to Mapper method
    public List<PostResponse> getAllPosts(Authentication auth) throws RaditException {
        List<Post> posts = postRepository.findAllByOrderByVoteCountDesc();
        List<PostResponse> response = new ArrayList<>();
        for (Post post : posts) {
            PostResponse postResponse = new PostResponse();
            if (auth != null) {
                Optional<User> user = userRepository.findByUsername(auth.getName());
                Optional<Vote> vote = voteRepository.findByPostAndUser(post, user.get());
                postResponse.setUserVote(vote.map(Vote::getDirection).orElse(0));
            }

            postResponse.setId(post.getPostId());
            postResponse.setTitle(post.getTitle());
            postResponse.setContent(post.getContent());
            postResponse.setUserName(post.getUser().getUsername());
            postResponse.setVoteCount(post.getVoteCount());
            postResponse.setCommentCount(post.getCommentCount());
            //check if user requesting posts has already votes on the specific post
            response.add(postResponse);
        }
        return response;
    }
}
