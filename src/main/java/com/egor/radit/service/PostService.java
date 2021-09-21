package com.egor.radit.service;

import com.egor.radit.dto.PostRequest;
import com.egor.radit.dto.PostResponse;
import com.egor.radit.exception.RaditException;
import com.egor.radit.model.Post;
import com.egor.radit.model.User;
import com.egor.radit.repository.PostRepository;
import com.egor.radit.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public void save(Authentication auth, PostRequest postRequest) throws RaditException {
        Post newPost = new Post();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow(()-> new RaditException("User not found"));
        newPost.setUser(user);

        newPost.setTitle(postRequest.getTitle());
        newPost.setContent(postRequest.getContent());
        newPost.setCreatedDate(Instant.now());

        postRepository.save(newPost);
    }

    //Convert to Mapper method
    public List<PostResponse> getAllPosts() {
        List<Post> posts =  postRepository.findAll();
        List<PostResponse> response = new ArrayList<>();
        for(Post post: posts){
            PostResponse postResponse = new PostResponse();
            postResponse.setId(post.getPostId());
            postResponse.setTitle(post.getTitle());
            postResponse.setContent(post.getContent());
            postResponse.setUserName(post.getUser().getUsername());
            response.add(postResponse);
        }
        return response;
    }
}
