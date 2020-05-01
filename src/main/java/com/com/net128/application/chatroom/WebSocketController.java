package com.com.net128.application.chatroom;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.ZonedDateTime;

@Controller
public class WebSocketController {
	private final SimpMessagingTemplate template;

	public WebSocketController(SimpMessagingTemplate template){
		this.template = template;
	}

	@RequestMapping("/start")
	public String start() {
		return "start";
	}

	@MessageMapping("/send/message")
	public void onSendMessage(Message message) {
		this.template.convertAndSend("/message",
			new Response(message.getUser(),
				ZonedDateTime.now(), message.getMessage()));
	}
}
