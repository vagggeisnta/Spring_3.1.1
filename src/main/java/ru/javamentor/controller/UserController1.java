package ru.javamentor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.javamentor.service.UserService;


@Controller
@RequestMapping("/user")
public class UserController1 {

    @Autowired
    UserService userService;

    @GetMapping
    public String userInfo(Authentication authentication, ModelMap modelMap) {
        modelMap.addAttribute("user", authentication.getPrincipal());
        return "User";
    }
}
