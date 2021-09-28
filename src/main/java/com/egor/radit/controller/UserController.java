package com.egor.radit.controller;


import com.egor.radit.constant.SecurityConstant;
import com.egor.radit.dto.RoleToUserDto;
import com.egor.radit.exception.RaditException;
import com.egor.radit.model.Role;
import com.egor.radit.model.User;
import com.egor.radit.service.MyUserDetailsService;
import com.egor.radit.service.UserPrincipal;
import com.egor.radit.util.JwtTokenProvider;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final MyUserDetailsService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/user/register")
    public ResponseEntity<User> saveUser(@RequestBody User user) throws RaditException {
        User newUser = userService.register(user);
        HttpHeaders jwtHeader = getJwtHeader(new UserPrincipal(newUser));
        return new ResponseEntity<>(newUser, jwtHeader, HttpStatus.CREATED);
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User loginUser = userService.login(user);
        HttpHeaders jwtHeader = getJwtHeader(new UserPrincipal(loginUser));
        return new ResponseEntity<>(jwtHeader, OK);
    }

    @PostMapping("/role/save")
    public ResponseEntity<Role> saveRole(@RequestBody Role role) {
        return new ResponseEntity<>(userService.saveRole(role), HttpStatus.CREATED);
    }

    @PostMapping("/role/addtouser")
    public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUserDto form) {
        userService.addRoleToUser(form.getUsername(), form.getRoleName());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @GetMapping("/testuser")
    public ResponseEntity<String> testUser(Authentication authentication) {
        return new ResponseEntity<>(authentication.getName(), HttpStatus.I_AM_A_TEAPOT);
    }

    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    @GetMapping("/testadmin")
    public ResponseEntity<String> testAdmin(Authentication authentication) {
        return new ResponseEntity<>(authentication.getName(), HttpStatus.I_AM_A_TEAPOT);
    }

    @GetMapping("/user/health")
    public ResponseEntity<?> health(Authentication auth) {
        if (userService.health(auth)) return new ResponseEntity<>(OK);
        return new ResponseEntity<>(BAD_REQUEST);
    }

    private HttpHeaders getJwtHeader(UserPrincipal userPrincipal) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(SecurityConstant.JWT_TOKEN_HEADER, jwtTokenProvider.generateJwtToken(userPrincipal));
        return headers;
    }
}
