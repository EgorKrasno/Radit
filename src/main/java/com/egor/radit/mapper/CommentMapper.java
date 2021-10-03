package com.egor.radit.mapper;

import com.egor.radit.dto.CommentDto;
import com.egor.radit.model.Comment;
import com.egor.radit.model.Post;
import com.egor.radit.model.User;
import com.github.marlonlom.utilities.timeago.TimeAgo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public abstract class CommentMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "text", source = "commentDto.text")
    @Mapping(target = "createdDate", expression = "java(java.time.Instant.now())")
    @Mapping(target = "post", source = "post")
    @Mapping(target = "user", source = "user")
    public abstract Comment map(CommentDto commentDto, Post post, User user);

    @Mapping(target="id", source = "comment.id")
    @Mapping(target="text", source = "comment.text")
    @Mapping(target="duration", expression = "java(getDuration(comment))")
    @Mapping(target = "postId", source = "comment.post.postId")
    @Mapping(target = "userName", source = "comment.user.username")
    public abstract CommentDto mapToDto(Comment comment);

    String getDuration(Comment comment){
        return TimeAgo.using(comment.getCreatedDate().toEpochMilli());
    }
}
