package com.egor.radit.controller;

import com.egor.radit.dto.CommentDto;
import com.egor.radit.exception.RaditException;
import com.egor.radit.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments/")
@AllArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/save")
    public ResponseEntity<Void> createComment(Authentication auth, @RequestBody CommentDto commentDto) throws RaditException {
        commentService.save(auth, commentDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<CommentDto>> getAllCommentsByPost(Authentication auth, @PathVariable Long postId) throws RaditException {
        return new ResponseEntity<>(commentService.getAllCommentsForPost(postId), HttpStatus.OK);
    }
}
