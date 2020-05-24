package ru.javamentor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.javamentor.model.User;
import ru.javamentor.service.UserService;


@Controller
public class AuthUserController1 {

    @Autowired
    UserService userService;

    @GetMapping(value = "/user")
    public String userInfo() {
        return "User";
    }

    @GetMapping(value = "/user/authuser")
    @ResponseBody
    public User getUser(Authentication authentication){
        return (User) authentication.getPrincipal();
    }
}
