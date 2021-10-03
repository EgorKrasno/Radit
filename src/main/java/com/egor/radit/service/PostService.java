package com.egor.radit.service;

import com.egor.radit.dto.PostResponseDto;
import com.egor.radit.dto.PostResponseWrapper;
import com.egor.radit.exception.RaditException;
import com.egor.radit.mapper.PostMapper;
import com.egor.radit.model.Post;
import com.egor.radit.model.Section;
import com.egor.radit.model.User;
import com.egor.radit.model.Vote;
import com.egor.radit.repository.*;
import com.github.marlonlom.utilities.timeago.TimeAgo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;
import static org.apache.http.entity.ContentType.*;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final VoteRepository voteRepository;
    private final CommentRepository commentRepository;
    private final SectionRepository sectionRepository;
    private final FileStore fileStore;
    private final PostMapper postMapper;

    @Value("${BUCKET}")
    private String bucket;

    public void save(Authentication auth, String title, String content, String sectionName, MultipartFile file) throws RaditException {
        Post newPost = new Post();
        User user = userRepository.findByUsername(auth.getName()).orElseThrow(() -> new RaditException("User not found"));
        Section section = sectionRepository.findByName(sectionName).orElseThrow(() -> new RaditException("Section not found"));


        newPost.setUser(user);
        newPost.setSection(section);
        newPost.setTitle(title);
        newPost.setContent(content);
        newPost.setCreatedDate(Instant.now());
        newPost.setVoteCount(0);
        newPost.setCommentCount(0);

        user.setPostCount(user.getPostCount() + 1);
        userRepository.save(user);

        if (file != null) {
            String path = String.format("%s/%s", bucket, UUID.randomUUID());
            String fileName = String.format("%s", file.getOriginalFilename());
            uploadFile(file, path, fileName);
            newPost.setImagePath(path);
            newPost.setImageFileName(fileName);
        }
        postRepository.save(newPost);
    }

    //Convert to Mapper method
    public PostResponseWrapper getAllPosts(Authentication auth, int pageNo, int pageSize, String sortBy, String section) throws RaditException {
        Page<Post> pageResult;
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy).descending());


        Optional<Section> foundSection = sectionRepository.findByName(section);

        if (section.equals("all")) {
            pageResult = postRepository.findAll(paging);
        } else {
            pageResult = postRepository.findAllBySection(foundSection.get(), paging);
        }

        // If the current page is empty
        // return empty list with false
        if (!pageResult.hasContent()) {
            PostResponseWrapper response = new PostResponseWrapper();
            response.setPosts(new ArrayList<>());
            response.setHasNext(pageResult.hasNext());
            return response;
        }

        //Map all responses
        List<PostResponseDto> postList = pageResult.getContent().stream()
                .map(x -> postMapper.mapToDto(x, auth))
                .collect(toList());

        PostResponseWrapper response = new PostResponseWrapper();
        response.setPosts(postList);
        response.setHasNext(pageResult.hasNext());
        return response;
    }


    public void deletePost(Authentication auth, long postId) throws RaditException {
        User user = userRepository.findByUsername(auth.getName()).orElseThrow(() -> new RaditException("User not found"));
        Post post = postRepository.findById(postId).orElseThrow(() -> new RaditException("Post not found"));
        if (user != post.getUser()) {
            throw new RaditException("You can only delete your own posts");
        }

        voteRepository.deleteByPost(post);
        commentRepository.deleteByPost(post);
        if (post.getImagePath() != null) {
            fileStore.delete(post.getImagePath(), post.getImageFileName());
        }
        postRepository.delete(post);
    }

    private void uploadFile(MultipartFile file, String path, String fileName) {
        if (!Arrays.asList(IMAGE_PNG.getMimeType(),
                IMAGE_BMP.getMimeType(),
                IMAGE_GIF.getMimeType(),
                IMAGE_JPEG.getMimeType()).contains(file.getContentType())) {
            throw new IllegalStateException("File uploaded is not an image");
        }

        //get file metadata
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());

        try {
            fileStore.upload(path, fileName, Optional.of(metadata), file.getInputStream());
        } catch (IOException e) {
            throw new IllegalStateException("Failed to upload file", e);
        }
    }
}
