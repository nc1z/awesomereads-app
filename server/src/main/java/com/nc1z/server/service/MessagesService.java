package com.nc1z.server.service;

import com.nc1z.server.dao.MessageRepository;
import com.nc1z.server.entity.Message;
import com.nc1z.server.model.AdminReplyRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MessagesService {

    @Autowired
    private MessageRepository messageRepository;

    public void postMessage(Message messageRequest, String userEmail) {
        Message message = new Message(messageRequest.getTitle(), messageRequest.getQuestion());
        message.setUserEmail(userEmail);
        messageRepository.save(message);
    }

    public void putMessage(AdminReplyRequest adminReplyRequest, String userEmail) throws Exception {
        Optional<Message> message = messageRepository.findById(adminReplyRequest.getId());

        if (!message.isPresent()) {
            throw new Exception("Message does not exist");
        }

        message.get().setAdminEmail(userEmail);
        message.get().setResponse(adminReplyRequest.getResponse());
        message.get().setClosed(true);
        messageRepository.save(message.get());
    }
}
