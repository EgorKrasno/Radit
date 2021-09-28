package com.egor.radit.controller;

import com.egor.radit.dto.PostResponse;
import com.egor.radit.dto.PostResponseDto;
import com.egor.radit.exception.RaditException;
import com.egor.radit.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts/")
@AllArgsConstructor
@Validated
public class PostController {
    private final PostService postService;

    @PostMapping(path = "/save",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Void> createPost(Authentication auth,
                                           @RequestParam("title") @NotBlank @Size(max = 50) String title,
                                           @RequestParam(value = "content", required = false) @Size(max = 500) String content,
                                           @RequestParam(value = "file", required = false) MultipartFile file
    ) throws RaditException {
        postService.save(auth, title, content, file);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @GetMapping("/all")
    public ResponseEntity<PostResponseDto> getAllPosts(Authentication auth,
                                                       @RequestParam(defaultValue = "0") int pageNo,
                                                       @RequestParam(defaultValue = "7") int pageSize,
                                                       @RequestParam(defaultValue = "voteCount") String sortBy
    ) throws RaditException {
        return new ResponseEntity<>(postService.getAllPosts(auth, pageNo, pageSize, sortBy), HttpStatus.OK);
    }
}
