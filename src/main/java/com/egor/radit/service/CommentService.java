package com.egor.radit.service;

import com.egor.radit.dto.CommentDto;
import com.egor.radit.exception.RaditException;
import com.egor.radit.model.Comment;
import com.egor.radit.model.Post;
import com.egor.radit.model.User;
import com.egor.radit.repository.CommentRepository;
import com.egor.radit.repository.PostRepository;
import com.egor.radit.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CommentService {
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public void save(Authentication auth, CommentDto commentDto) throws RaditException {
        Post post = postRepository.findById(commentDto.getPostId())
                .orElseThrow(() -> new RaditException("Post not found"));

        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RaditException("User not found"));

        post.setCommentCount(post.getCommentCount() + 1);
        postRepository.save(post);

        Comment newComment = new Comment();
        newComment.setPost(post);
        newComment.setText(commentDto.getText());
        newComment.setCreatedDate(Instant.now());
        newComment.setUser(user);
        commentRepository.save(newComment);
    }

    public List<CommentDto> getAllCommentsForPost(Long postId) throws RaditException {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RaditException("Post not found"));
        List<Comment> foundComments = commentRepository.findByPost(post);
        List<CommentDto> response = new ArrayList<>();
        for (Comment comment : foundComments) {
            CommentDto commentDto = new CommentDto();
            commentDto.setCreatedDate(comment.getCreatedDate());
            commentDto.setPostId(comment.getPost().getPostId());
            commentDto.setText(comment.getText());
            commentDto.setId(comment.getId());
            commentDto.setUserName(comment.getUser().getUsername());
            response.add(commentDto);
        }
        return response;
    }

}
