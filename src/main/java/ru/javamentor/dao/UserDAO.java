package ru.javamentor.dao;



import ru.javamentor.model.Role;
import ru.javamentor.model.User;

import java.util.List;

public interface UserDAO {

    List<User> listOfUsers();

    void addUser(User user);

    void deleteUser(Long id);

   void updateUser(User user);

    User loadUserByUsername(String username);

    boolean isUserExist(User user);
}
