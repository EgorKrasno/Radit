package com.egor.radit.service;

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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.*;

import static org.apache.http.entity.ContentType.*;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final VoteRepository voteRepository;
    private final FileStore fileStore;

    public void save(Authentication auth, String title, String content, MultipartFile file) throws RaditException {
        Post newPost = new Post();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow(() -> new RaditException("User not found"));
        newPost.setUser(user);

        newPost.setTitle(title);
        newPost.setContent(content);
        newPost.setCreatedDate(Instant.now());
        newPost.setCreatedDate(Instant.now());
        newPost.setVoteCount(0);
        newPost.setCommentCount(0);

        if (file != null) {
            if (!Arrays.asList(IMAGE_PNG.getMimeType(),
                    IMAGE_BMP.getMimeType(),
                    IMAGE_GIF.getMimeType(),
                    IMAGE_JPEG.getMimeType()).contains(file.getContentType())) {
                throw new IllegalStateException("File uploaded is not an image");
            }

            //get file metadata
            Map<String, String> metadata = new HashMap<>();
            metadata.put("Content-Type", file.getContentType());
            String path = String.format("%s/%s", "radit-bucket", UUID.randomUUID());
            String fileName = String.format("%s", file.getOriginalFilename());

            try {
                fileStore.upload(path, fileName, Optional.of(metadata), file.getInputStream());
            } catch (IOException e) {
                throw new IllegalStateException("Failed to upload file", e);
            }

            newPost.setImagePath(path);
            newPost.setImageFileName(fileName);
        }


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

            if (post.getImageFileName() != null){
                postResponse.setImageUrl("https://s3.us-east-2.amazonaws.com/"+ post.getImagePath()+ "/" + post.getImageFileName());
            }

            //check if user requesting posts has already votes on the specific post
            response.add(postResponse);
        }
        return response;
    }
}
