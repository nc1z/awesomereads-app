package com.nc1z.server.controller;

import com.nc1z.server.entity.Message;
import com.nc1z.server.model.AdminReplyRequest;
import com.nc1z.server.service.MessagesService;
import com.nc1z.server.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:5173/"})
@RestController
@RequestMapping("/api/messages")
public class MessagesController {

    @Autowired
    private MessagesService messagesService;

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token, @RequestBody Message messageRequest) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        messagesService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value = "Authorization") String token, @RequestBody AdminReplyRequest adminReplyRequest) throws  Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Page restricted to admins only.");
        }
        messagesService.putMessage(adminReplyRequest, userEmail);
    }
}
