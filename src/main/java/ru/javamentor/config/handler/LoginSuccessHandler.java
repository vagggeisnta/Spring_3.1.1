package ru.javamentor.config.handler;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import ru.javamentor.model.User;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
                                        HttpServletResponse httpServletResponse,
                                        Authentication authentication) throws IOException, ServletException {
        User user = (User) authentication.getPrincipal();
        HttpSession httpSession = httpServletRequest.getSession();
        httpSession.setAttribute("user", user);
        boolean isAdmin = user.getRoles().stream().anyMatch(x -> x.getName().contains("ROLE_ADMIN"));
        String redirect = isAdmin ? "/admin" : "/user";
        httpServletResponse.sendRedirect(redirect);
    }
}