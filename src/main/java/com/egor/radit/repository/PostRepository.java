package com.egor.radit.repository;

import com.egor.radit.model.Post;
import com.egor.radit.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends PagingAndSortingRepository<Post, Long> {
    List<Post> findByUser(User user);
}
