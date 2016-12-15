package fr.cpe.ejb;

import java.util.Date;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.inject.Inject;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;
import javax.jms.TextMessage;

import fr.cpe.model.UserModel;
import fr.cpe.services.MessageSenderQueueLocal;
import fr.cpe.services.UserBDD;



@MessageDriven(
		activationConfig = {
					@ActivationConfigProperty(
							propertyName = "destinationType",
							propertyValue = "javax.jms.Topic"),
					@ActivationConfigProperty(
							propertyName = "destination",
							propertyValue = "java:/jms/watcherAuthJMS")
		})

public class AuthWatcherMsgDrivenEJB implements MessageListener {
	
	@Inject MessageSenderQueueLocal sender;

	@Inject
	private UserBDD userBDD;
	
	public AuthWatcherMsgDrivenEJB() {	}
	
	public void onMessage(Message message) {
		try {
			if (message instanceof TextMessage) {
				System.out.println("Topic: J'ai recu un message à "+ new Date());
				TextMessage msg = (TextMessage) message;
				System.out.println("Le message est : " + msg.getText());
				
			} else if (message instanceof ObjectMessage) {
				System.out.println("Topic: J'ai recu un message à "	
						+ new Date());
					ObjectMessage msg = (ObjectMessage) message;
				if( msg.getObject() instanceof UserModel){
					UserModel user=(UserModel)msg.getObject();
					System.out.println("User Details: ");
					System.out.println("login:"+user.getLogin());
					System.out.println("pwd:"+user.getPassword());
					UserModel currentTestRole=userBDD.checkUserBDD(user);
				if( currentTestRole.getRole() == null || currentTestRole.getRole().isEmpty()){
					sender.sendMessage(user);
				}else{
					user.setRole(currentTestRole.getRole());
					sender.sendMessage(user);
					}
				}
			} else {
			System.out.println("Message non valide pour cette Queue MDB");
			}
		} catch (JMSException e) {
			e.printStackTrace();
			}
	}
}
