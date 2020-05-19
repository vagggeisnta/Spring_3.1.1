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
        return entityManager.createQuery("FROM Role").getResultList();
    }

    @Override
    public List<Role> getRolesByName(List<String> ids){
        return entityManager.createQuery("from Role role where role.name in (:ids)").setParameter("ids", ids).getResultList();

    }

}
