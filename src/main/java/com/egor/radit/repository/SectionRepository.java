package com.egor.radit.repository;

import com.egor.radit.model.Section;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SectionRepository extends CrudRepository<Section, Long> {
    Optional<Section> findByName(String name);
}
