package com.egor.radit.exception;

import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ConstraintViolationException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.PAYLOAD_TOO_LARGE;

@ControllerAdvice
public class ExceptionHandling implements ErrorController {

    @ExceptionHandler(RaditException.class)
    public ResponseEntity<String> handleException(RaditException ex) {
        System.out.println(ex.getMessage());
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> badCredentialsException() {
        return new ResponseEntity<>("Password or username is incorrect", BAD_REQUEST);
    }

    @ExceptionHandler(SizeLimitExceededException.class)
    public ResponseEntity<String> imageSizeLimitExceeded() {
        return new ResponseEntity<>("Images must be under 2MB", PAYLOAD_TOO_LARGE);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> validationFailed() {
        return new ResponseEntity<>("Form data invalid", BAD_REQUEST);
    }
}
