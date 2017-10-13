package model;

import java.util.Date;

public class Todo {
	private Integer todoId;
	private String groupId;
	private Date date;
	private String contents;
	private boolean done;


	public Todo(){}

	public Todo( Integer todoId,String groupId, Date date,String contents,boolean done){
		this.todoId = todoId;
		this.groupId=groupId;
		this.date=date;
		this.contents=contents;
		this.done=done;

	}

	public Integer getTodoId(){
		return todoId;
	}

	public void setTodoId(Integer todoId){
		this.todoId = todoId;
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

	public String getContents(){
		return contents;
	}

	public void setContents(String contents){
		this.contents = contents;
	}

	public boolean getDone(){
		return done;
	}

	public void setDone(boolean done){
		this.done = done;
	}

}

