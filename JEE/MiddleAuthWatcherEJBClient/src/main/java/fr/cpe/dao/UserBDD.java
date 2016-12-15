package fr.cpe.dao;

import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import fr.cpe.model.UserModel;
import fr.cpe.services.MessageReceiverSyncLocal;

@Stateless
public class UserBDD implements IUserBDD{

    @PersistenceContext
    private EntityManager entityManager;

    Logger logger = Logger.getLogger(MessageReceiverSyncLocal.class.getName());
	
	public UserModel checkUserBDD (UserModel user){
		
		try{
			UserModel userResponse = (UserModel)entityManager.createQuery("from UserModel u where u.login = :login AND u.password = :password")
					.setParameter("login", user.getLogin())
					.setParameter("password", user.getPassword())
					.getSingleResult();
					return userResponse;
					
		} catch (NoResultException nre) {
			logger.info("NoResultException UserBDD");
		}
		return null;
	}
}
