package fr.cpe.services.impl;

import java.util.logging.Logger;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.Message;
import javax.jms.ObjectMessage;
import javax.jms.TextMessage;
import javax.jms.Topic;

import fr.cpe.model.UserModel;
import fr.cpe.services.MessageReceiverSyncLocal;

@Stateless
@LocalBean
public class MessageReceiverSync implements MessageReceiverSyncLocal {
	
	Logger logger = Logger.getLogger(MessageReceiverSyncLocal.class);
	@Inject
	JMSContext context;
	@Resource(mappedName = "java:/jms/queue/watcherqueue")
	Topic topic;
	
public UserModel receiveMessage() {
	
	Message message = context.createConsumer(topic).receive(1000);
		if (message instanceof TextMessage){
			logger.log(((TextMessage) message).getText());
		}
		else if (message instanceof ObjectMessage){
			UserModel obj = (UserModel) ((ObjectMessage) message).getObject();
			return obj;
		}
		else {
			return (UserModel) message;
		}
	}
}