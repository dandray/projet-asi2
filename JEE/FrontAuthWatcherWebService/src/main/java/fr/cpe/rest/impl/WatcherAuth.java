package fr.cpe.rest.impl;

import javax.inject.Inject;

import fr.cpe.model.UserModel;
import fr.cpe.rest.IWatcherAuth;
import fr.cpe.services.IWatcherAuthService;

public class WatcherAuth implements IWatcherAuth{

	@Inject
	IWatcherAuthService watcherAuthService;
	
	@Override
	public UserModel watcherAuthQuery(UserModel user) {
		return watcherAuthService.watcherAuthServiceQuery(user);
	}

	@Override
	public String watcherAuth() {
		return null;
	}
	
}
