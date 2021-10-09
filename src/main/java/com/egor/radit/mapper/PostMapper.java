package com.egor.radit.mapper;

import com.egor.radit.dto.PostResponseDto;
import com.egor.radit.exception.RaditException;
import com.egor.radit.model.Award;
import com.egor.radit.model.Post;
import com.egor.radit.model.User;
import com.egor.radit.model.Vote;
import com.egor.radit.repository.UserRepository;
import com.egor.radit.repository.VoteRepository;
import com.github.marlonlom.utilities.timeago.TimeAgo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;


import java.util.*;

@Mapper(componentModel = "spring")
public abstract class PostMapper {

    @Value("${S3}")
    private String url;

    @Autowired
    public VoteRepository voteRepository;

    @Mapping(target = "id", source = "post.postId")
    @Mapping(target = "title", source = "post.title")
    @Mapping(target = "content", source = "post.content")
    @Mapping(target = "userName", source = "post.user.username")
    @Mapping(target = "section", source = "post.section.name")
    @Mapping(target = "commentCount", source = "post.commentCount")
    @Mapping(target = "voteCount", source = "post.voteCount")
    @Mapping(target = "awards", expression = "java(getAwards(post))")
    @Mapping(target = "duration", expression = "java(getDuration(post))")
    @Mapping(target = "userVote", expression = "java(getVote(user, post))")
    @Mapping(target = "imageUrl", expression = "java(getImageUrl(post))")
    public abstract PostResponseDto mapToDto(Post post, User user);


    String getDuration(Post post) {
        return TimeAgo.using(post.getCreatedDate().toEpochMilli());
    }

    String getImageUrl(Post post) {
        if (post.getImageFileName() != null) {
            return url + post.getImagePath() + "/" + post.getImageFileName();
        } else {
            return "";
        }
    }

    int getVote(User user, Post post) {
        if (user != null) {
            Optional<Vote> vote = voteRepository.findByPostAndUser(post, user);
            return vote.map(Vote::getDirection).orElse(0);
        } else {
            return 0;
        }
    }

    Map<Long, Integer> getAwards(Post post) {
        Map<Long, Integer> awards = new HashMap<>();
        for (Award award : post.getAwards()) {
            awards.put(award.getId(), (int) post.getAwards().stream().filter(x -> x.getId() == award.getId()).count());
        }
        return awards;
    }
}