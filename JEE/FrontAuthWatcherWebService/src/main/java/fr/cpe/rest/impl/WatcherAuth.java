package fr.cpe.rest.impl;

import javax.inject.Inject;

import fr.cpe.model.UserModel;
import fr.cpe.rest.IWatcherAuth;
import fr.cpe.services.IWatcherAuthService;
import fr.cpe.services.MessageReceiverSyncLocal;
import fr.cpe.services.MessageSenderLocal;

public class WatcherAuth implements IWatcherAuth{

	@Inject
	IWatcherAuthService watcherAuthService;
	
	
	@Inject
	MessageSenderLocal sender;
	
	@Inject
	MessageReceiverSyncLocal receiver;
	
	@Override
	public UserModel watcherAuthQuery(UserModel user) {
		
		sender.sendMessage(user);
		UserModel userResponse = receiver.receiveMessage();
		return userResponse;
	}

	@Override
	public String watcherAuth() {
		return null;
	}

}
