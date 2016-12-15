package fr.cpe.services.impl;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.jms.ObjectMessage;
import javax.jms.Queue;

import fr.cpe.model.UserModel;
import fr.cpe.services.MessageSenderQueueLocal;

/**
 * Session Bean implementation class MessageSenderQueue
 */
@Stateless
@LocalBean
public class MessageSenderQueue implements MessageSenderQueueLocal {
	@Inject
	JMSContext context;
	@Resource(mappedName = "java:/jms/queue/watcherqueue")
	Queue queue;
	public void sendMessage(String message) {
	context.createProducer().send(queue, message);
	}
	public void sendMessage(UserModel user) {
	try {
	ObjectMessage message = context.createObjectMessage();
	message.setObject(user);
	context.createProducer().send(queue, user);
	} catch (JMSException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		}
    }

}
