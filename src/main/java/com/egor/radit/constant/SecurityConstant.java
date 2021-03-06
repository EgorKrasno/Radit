package com.egor.radit.constant;

public class SecurityConstant {
    public static final long EXPIRATION_TIME = 432_000_000;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String JWT_TOKEN_HEADER = "Jwt-Token";
    public static final String ISSUER = "RD";
    public static final String UNAUTHENTICATED_MESSAGE = "You need to log in to access this page";
    public static final String FORBIDDEN_MESSAGE = "You do not have permission to access this page";
    public static final String OPTIONS_HTTP_METHOD = "OPTIONS";
    public static final String[] PUBLIC_URLS = {"/j/*", "/ws/**", "/api/user/register", "/api/leaderboard/top", "/api/user/health", "/api/user/login", "/api/user/data/*", "/api/comments/*", "/", "/static/**", "/manifest.json", "/*.png", "/*.ico"};
}
