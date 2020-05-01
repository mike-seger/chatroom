package com.com.net128.application.chatroom;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
public class Response {
	public String user;
	public ZonedDateTime dateTime;
	public String message;
}