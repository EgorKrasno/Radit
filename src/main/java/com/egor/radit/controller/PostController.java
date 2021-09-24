package com.egor.radit.controller;

import com.egor.radit.dto.PostRequest;
import com.egor.radit.dto.PostResponse;
import com.egor.radit.exception.RaditException;
import com.egor.radit.model.Post;
import com.egor.radit.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts/")
@AllArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping("/save")
    public ResponseEntity<Void> createPost(Authentication auth, @RequestBody PostRequest postRequest) throws RaditException {
        postService.save(auth, postRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<PostResponse>> getAllPosts(Authentication auth) throws RaditException {
        return new ResponseEntity<>(postService.getAllPosts(auth), HttpStatus.OK);
    }
}
