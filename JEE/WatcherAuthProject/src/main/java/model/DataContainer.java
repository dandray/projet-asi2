package model;

import java.util.ArrayList;
import java.util.List;

import fr.cpe.model.UserModel;

public class DataContainer {
	
	List<UserModel> users = new ArrayList<UserModel>();
	
	public UserModel saveUser (UserModel user)
	{
		users.add(user);
		return user;
		
	}
	public String checkUser(UserModel user) {

		for (UserModel u : users)
		{
			if(u.getLogin().equals(user.getLogin()) && u.getPassword().equals(user.getPassword())){
			return "admin";
			}
			else{
				return "watcher";
			}
		}
		return null;

	}
}
