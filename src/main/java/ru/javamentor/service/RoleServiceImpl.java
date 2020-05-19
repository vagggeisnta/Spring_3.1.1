package ru.javamentor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.javamentor.dao.RoleDAO;
import ru.javamentor.model.Role;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleDAO roleDAO;

    @Override
    public List<Role> listOfRoles() {
        return roleDAO.listOfRoles();
    }

    @Override
    public List<Role> getRolesByName(List<String> ids) {
        return roleDAO.getRolesByName(ids);
    }

    @Override
    public List<String> getRolesNames(List<Role> roles){
       return roles.stream().map(Role::getName).collect(Collectors.toList());
    }
}
