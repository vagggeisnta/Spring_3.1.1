package ru.javamentor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.javamentor.dao.RoleDAO;
import ru.javamentor.model.Role;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleDAO roleDAO;

    @Override
    public List<Role> listOfRoles() {
        return roleDAO.listOfRoles();
    }

    @Override
    public List<Role> getRolesById(List<Long> ids) {
        return roleDAO.getRolesById(ids);
    }
}
