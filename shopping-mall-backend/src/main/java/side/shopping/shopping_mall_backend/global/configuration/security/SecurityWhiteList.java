package side.shopping.shopping_mall_backend.global.configuration.security;

public class SecurityWhiteList {
    public static final String[] AUTH_WHITELIST = {
            "/api/member/join",
            "/api/member/login",
            "/api/member/wallet-login",
            "/api/auth/logout",
            "/api/auth/get_token_info"
    };
}
