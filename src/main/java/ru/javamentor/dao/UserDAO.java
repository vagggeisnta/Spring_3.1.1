package ru.javamentor.dao;



import ru.javamentor.model.User;

import java.util.List;

public interface UserDAO {

    List<User> listOfUsers();

    void addUser(User user);

    void deleteUser(Long id);

    void setUsername(Long id, String username);

    void setPassword(Long id, String username);

    User loadUserByUsername(String username);
}
