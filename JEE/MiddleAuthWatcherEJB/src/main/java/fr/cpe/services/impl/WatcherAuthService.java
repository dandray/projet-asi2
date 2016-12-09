package fr.cpe.services.impl;

import javax.ejb.Stateless;

import fr.cpe.model.UserModel;
import fr.cpe.services.IWatcherAuthService;

@Stateless
public class WatcherAuthService implements IWatcherAuthService{

	@Override
	public UserModel watcherAuthServiceQuery(UserModel user) {
		user.setFirstName("Mouchou");
		user.setLastName("Sabbioni");
		return user;
	}
	
}