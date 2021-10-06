package com.egor.radit.repository;

import com.egor.radit.model.Award;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AwardRepository extends CrudRepository<Award, Long> {
}
