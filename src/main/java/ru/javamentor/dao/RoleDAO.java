package ru.javamentor.dao;

import ru.javamentor.model.Role;

import java.util.List;

public interface RoleDAO {

    List<Role> listOfRoles();

    List<Role> getRolesByName(List<String> ids);
}
