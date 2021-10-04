package com.egor.radit.controller;

import com.egor.radit.dto.PostResponseWrapper;
import com.egor.radit.exception.RaditException;
import com.egor.radit.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Optional;

@RestController
@AllArgsConstructor
@Validated
public class PostController {
    private final PostService postService;

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @PostMapping(path = "/api/posts",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Void> createPost(Authentication auth,
                                           @RequestParam("title") @NotBlank @Size(max = 75) String title,
                                           @RequestParam(value = "section", defaultValue = "random") @NotBlank String section,
                                           @RequestParam(value = "content", required = false) @Size(max = 1500) String content,
                                           @RequestParam(value = "file", required = false) MultipartFile file
    ) throws RaditException {
        postService.save(auth, title, content, section, file);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @GetMapping("/j/{section}")
    public ResponseEntity<PostResponseWrapper> getAllPosts(Authentication auth,
                                                           @PathVariable String section,
//                                                           @PathVariable Optional<String> sortBy,
                                                           @RequestParam(defaultValue = "voteCount") String sortBy,
                                                           @RequestParam(defaultValue = "0") int pageNo,
                                                           @RequestParam(defaultValue = "5") int pageSize
//                                                           @RequestParam(defaultValue = "all") String section
    ) throws RaditException {
//        String sort = sortBy.isEmpty() ? "voteCount" : sortBy.get();
        return new ResponseEntity<>(postService.getAllPosts(auth, pageNo, pageSize, sortBy, section), HttpStatus.OK);
    }

    @DeleteMapping("/api/posts/{postId}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    @ResponseStatus(HttpStatus.OK)
    public void deletePost(Authentication auth, @PathVariable long postId) throws RaditException {
        postService.deletePost(auth, postId);
    }


}
