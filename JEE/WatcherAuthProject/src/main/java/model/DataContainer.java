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
		if(users.contains(user)){
			return "OK";
		}
		for (UserModel u : users)
		{
			if(u.getLogin()==user.getLogin() && u.getPassword()==user.getPassword()){
				return "OK";
			}
			else{
				return "KO";
			}
		}
		return null;
	}

}
