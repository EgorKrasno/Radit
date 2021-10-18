package com.egor.radit.service;

import com.egor.radit.dto.CommentDto;
import com.egor.radit.exception.RaditException;
import com.egor.radit.mapper.CommentMapper;
import com.egor.radit.model.Comment;
import com.egor.radit.model.Post;
import com.egor.radit.model.User;
import com.egor.radit.model.chat.Message;
import com.egor.radit.repository.CommentRepository;
import com.egor.radit.repository.PostRepository;
import com.egor.radit.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final CommentMapper commentMapper;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public void save(Authentication auth, CommentDto commentDto) throws RaditException {
        Post post = postRepository.findById(commentDto.getPostId())
                .orElseThrow(() -> new RaditException("Post not found"));

        User user = userRepository.findByUsername(auth.getName())
                .orElseThrow(() -> new RaditException("User not found"));

        Comment newComment = commentMapper.map(commentDto, post, user);
        commentRepository.save(newComment);

        post.setCommentCount(post.getCommentCount() + 1);
        postRepository.save(post);

        user.setCommentCount(user.getCommentCount() + 1);
        userRepository.save(user);

        if (post.getUser() != user) {
            simpMessagingTemplate.convertAndSendToUser(
                    post.getUser().getUsername(), "/reply", new Message("toast",
                            String.format("%s commented on your post", StringUtils.capitalize(user.getUsername()))));
        }
    }

    public List<CommentDto> getAllCommentsForPost(Long postId) throws RaditException {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RaditException("Post not found"));
        List<Comment> comments = commentRepository.findByPost(post);
        return comments.stream().map(commentMapper::mapToDto).collect(Collectors.toList());
    }

}
