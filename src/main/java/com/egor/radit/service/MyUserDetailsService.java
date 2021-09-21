package com.egor.radit.service;

import com.egor.radit.exception.RaditException;
import com.egor.radit.model.Role;
import com.egor.radit.model.User;
import com.egor.radit.repository.RoleRepository;
import com.egor.radit.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Slf4j
public class MyUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;


    public MyUserDetailsService(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder passwordEncoder, @Lazy AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("User not found in the database"));
        return new UserPrincipal(user);
    }

    public void register(User request) throws RaditException {
        validateUser(request);
        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));

        Role userRole = roleRepository.findByName("ROLE_USER");
        newUser.getRoles().add(userRole);
        userRepository.save(newUser);
    }

    public User login(User loginAttemptUser) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginAttemptUser.getUsername(), loginAttemptUser.getPassword()));

        //Auth Passed
        User loginUser = userRepository.findByUsername(loginAttemptUser.getUsername()).get();
        userRepository.save(loginUser);
        return loginUser;
    }

    public Role saveRole(Role role) {
        log.info("Saving new {} to the database", role.getName());
        return roleRepository.save(role);
    }

    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role: {} to user: {}", roleName, username);
        User user = userRepository.findByUsername(username).get();
        Role roleToAdd = roleRepository.findByName(roleName);
        user.getRoles().add(roleToAdd);
        //don't have to call save because of @Transactional?
    }

    private void validateUser(User request) throws RaditException {
        if (userRepository.existsByUsername(request.getUsername().trim())){
            throw new RaditException("Username is taken");
        }
    }

//    public User getUser(String username) {
//        log.info("Fetching user: {}", username);
//        return userRepository.findByUsername(username);
//    }
//
//    public List<User> getUsers() {
//        log.info("Fetching all users");
//        return userRepository.findAll();
//    }
}
