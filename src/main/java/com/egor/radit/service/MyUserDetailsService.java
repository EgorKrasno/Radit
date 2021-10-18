package com.egor.radit.service;

import com.egor.radit.dto.UserDataDto;
import com.egor.radit.exception.RaditException;
import com.egor.radit.model.Role;
import com.egor.radit.model.User;
import com.egor.radit.repository.RoleRepository;
import com.egor.radit.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found in the database"));
        return new UserPrincipal(user);
    }

    public User register(User request) throws RaditException {
        validateUser(request);
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setDateCreated(Instant.now());

        Role userRole = roleRepository.findByName("ROLE_USER");
        newUser.getRoles().add(userRole);
        userRepository.save(newUser);
        return newUser;
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

    public UserDataDto getUserData(String username) throws RaditException {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RaditException("User not found"));

        UserDataDto userDataDto = new UserDataDto();
        userDataDto.setPostCount(user.getPostCount());
        userDataDto.setVoteCount(user.getVoteCount());
        userDataDto.setCommentCount(user.getCommentCount());

        SimpleDateFormat formatter = new SimpleDateFormat("MMMM dd, yyyy");
        userDataDto.setDateCreated(formatter.format(Date.from(user.getDateCreated())));
        return userDataDto;
    }

    public List<String> getAll() {
        return userRepository.findAll().stream().map(User::getUsername).collect(Collectors.toList());
    }

    private void validateUser(User request) throws RaditException {
        if (userRepository.existsByUsername(request.getUsername().trim())) {
            throw new RaditException("Username is taken");
        }
        if (request.getUsername().equalsIgnoreCase("undefined")) {
            throw new RaditException("What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little \"clever\" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.");
        }
    }



    public boolean health(Authentication auth) {
        return userRepository.existsByUsername(auth.getName());
    }

//    public User getUser(String username) {
//        log.info("Fetching user: {}", username);
//        return userRepository.findByUsername(username);
//    }
//

}
