package fr.cpe.services;

import javax.ejb.Local;

import fr.cpe.model.UserModel;

@Local
public interface IUserBDD {
	
	public UserModel checkUserBDD (UserModel user);
}
