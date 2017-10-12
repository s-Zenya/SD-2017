package model;

public class Message {

	private String message;
	private String id;
	private String messageId;
	private String date;
	private String groupId;

	public Message(){};

	public Message(String message,String id, String date, String messageId, String groupId){
		this.id=id;
		this.date=date;
		this.messageId = messageId;
		this.message=message;
		this.groupId=groupId;
	}

	public String getId(){
		return id;
	}

	public void setId(String id){
		this.id = id;
	}

	public String getDate(){
		return date;
	}

	public void setDate(String date){
		this.date = date;
	}

	public String getMessageId(){
		return messageId;
	}

	public void setMessageId(String messageId){
		this.messageId = messageId;
	}

	public String getMessage(){
		return message;
	}

	public void setMessage(String message){
		this.message = message;
	}

	public String getGroupId(){
		return groupId;
	}

	public void setGroupId(String groupId){
		this.groupId = groupId;
	}

}

