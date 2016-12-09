package fr.cpe.rest;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import fr.cpe.model.UserModel;

@Path("/WatcherAuth")
public interface IWatcherAuth{
		
	@GET		
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/")
	String watcherAuth();
	
	@POST		
	@Produces(MediaType.APPLICATION_JSON)
	UserModel watcherAuthQuery(UserModel user);

}

