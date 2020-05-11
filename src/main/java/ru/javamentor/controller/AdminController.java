package ru.javamentor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.javamentor.model.Role;
import ru.javamentor.model.User;
import ru.javamentor.service.RoleService;
import ru.javamentor.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Controller
@RequestMapping("/admin")
@SessionAttributes({"isVisible", "id"})
public class AdminController {

    @Autowired
    UserService userService;
    @Autowired
    RoleService roleService;

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public String deleteUser(@RequestParam("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String addUser(@ModelAttribute User user, @RequestParam List<Long> roles) {
        user.setRoles(roleService.getRolesById(roles));
        userService.addUser(user);
        return "redirect:/admin";
    }

    @RequestMapping(method = RequestMethod.GET)
    public String printUsers(ModelMap modelMap, HttpServletRequest httpServletRequest) {
        List<User> users = userService.listOfUsers();
        List<Role> roles = roleService.listOfRoles();
        User user = (User) httpServletRequest.getSession().getAttribute("user");
        modelMap.addAttribute("users", users);
        modelMap.addAttribute("user", user);
        modelMap.addAttribute("roles", roles);
        return "users";
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public String editUser(@ModelAttribute User user, @RequestParam(required = false) List<Long> roles, ModelMap modelMap) {
        user.setRoles(roleService.getRolesById(roles));
        userService.updateUser(user);
        return "redirect:/admin";
    }
}
