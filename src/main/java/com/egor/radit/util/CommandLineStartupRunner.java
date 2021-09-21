package com.egor.radit.util;

import com.egor.radit.model.Role;
import com.egor.radit.model.User;
import com.egor.radit.repository.RoleRepository;
import com.egor.radit.repository.UserRepository;
import com.egor.radit.service.MyUserDetailsService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
@AllArgsConstructor
public class CommandLineStartupRunner implements CommandLineRunner {
    private final MyUserDetailsService userService;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        if(userRepository.findByUsername("admin").isPresent()){
            return;
        }
        userService.saveRole(new Role(1L, "ROLE_USER"));
        userService.saveRole(new Role(2L, "ROLE_ADMIN"));
        userService.saveRole(new Role(3L, "ROLE_SUPER_ADMIN"));

        userService.register(new User(1L, "Test Admin", "admin", "password", new ArrayList<>()));
        userService.addRoleToUser("Admin", "ROLE_SUPER_ADMIN");
    }
}
