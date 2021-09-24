package com.egor.radit.repository;

import com.egor.radit.model.Post;
import com.egor.radit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUser(User user);
//    List<Post> findAllByOrderByCreatedDateDesc();
    List<Post> findAllByOrderByVoteCountDesc();
}
