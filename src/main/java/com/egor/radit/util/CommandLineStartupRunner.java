package com.egor.radit.util;

import com.egor.radit.model.Role;
import com.egor.radit.model.Section;
import com.egor.radit.model.User;
import com.egor.radit.repository.SectionRepository;
import com.egor.radit.repository.UserRepository;
import com.egor.radit.service.MyUserDetailsService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class CommandLineStartupRunner implements CommandLineRunner {
    private final MyUserDetailsService userService;
    private final UserRepository userRepository;
    private final SectionRepository sectionRepository;

    @Value("${PASSWORD}")
    private String secret;

    @Override
    public void run(String... args) throws Exception {
        sectionRepository.save(new Section(1L, "rarememes"));
        sectionRepository.save(new Section(2L, "beans"));
        sectionRepository.save(new Section(3L, "programming"));
        sectionRepository.save(new Section(4L, "random"));

        if (userRepository.findByUsername("admin").isPresent()) {
            return;
        }
        userService.saveRole(new Role(1L, "ROLE_USER"));
        userService.saveRole(new Role(2L, "ROLE_ADMIN"));
        userService.saveRole(new Role(3L, "ROLE_SUPER_ADMIN"));
        userService.register(new User(1L, "admin", secret, new ArrayList<>(), 0, 0, 0));
        userService.addRoleToUser("Admin", "ROLE_SUPER_ADMIN");
    }
}
