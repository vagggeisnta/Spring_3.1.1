package ru.javamentor.dao;
import org.springframework.stereotype.Repository;
import ru.javamentor.model.Role;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class RoleDAOImpl implements RoleDAO {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Role> listOfRoles() {
        return entityManager.createQuery("SELECT u.roles FROM User u").getResultList();
    }

    @Override
    public List<Role> getRolesById(List<Long> ids){
        return entityManager.createQuery("from Role role where role.id in (:ids)").setParameter("ids", ids).getResultList();

    }

}
