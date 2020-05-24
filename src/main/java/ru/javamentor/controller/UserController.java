package ru.javamentor.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.javamentor.model.User;
import ru.javamentor.service.RoleService;
import ru.javamentor.service.UserService;


@RestController
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    RoleService roleService;

    @PostMapping(value = "admin/users", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> add(@RequestBody User user){
        user.setRoles(roleService.getRolesByName(roleService.getRolesNames(user.getRoles())));
        HttpStatus httpStatus = userService.addUser(user) ? HttpStatus.CREATED : HttpStatus.BAD_GATEWAY;
        return new ResponseEntity<>(httpStatus);
    }

    @GetMapping(value = "admin/users", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> read(){
        return new ResponseEntity<>(userService.listOfUsers(), HttpStatus.OK);
    }

    @PutMapping(value = "admin/users/{id}")
    public void update(@RequestBody User user){
        user.setRoles(roleService.getRolesByName(roleService.getRolesNames(user.getRoles())));
        userService.updateUser(user);
    }

    @DeleteMapping(value = "admin/users/{id}")
    public void delete(@PathVariable(name = "id") long id){
        userService.deleteUser(id);
    }
}
