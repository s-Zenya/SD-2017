package model;

import java.util.Date;

public class Message {

	private String groupId;
	private String id;
	private Integer messageId;
	private Date date;
	private String message;

	public Message(){};

	public Message( Integer messageId, String id,String groupId, Date date,String message){
		this.messageId = messageId;
		this.id=id;
		this.groupId=groupId;
		this.date=date;
		this.message=message;

	}

	public Integer getMessageId(){
		return messageId;
	}

	public void setMessageId(Integer messageId){
		this.messageId = messageId;
	}

	public String getId(){
		return id;
	}

	public void setId(String id){
		this.id = id;
	}

	public String getGroupId(){
		return groupId;
	}

	public void setGroupId(String groupId){
		this.groupId = groupId;
	}

	public Date getDate(){
		return date;
	}

	public void setDate(Date date){
		this.date = date;
	}

	public String getMessage(){
		return message;
	}

	public void setMessage(String message){
		this.message = message;
	}

}

