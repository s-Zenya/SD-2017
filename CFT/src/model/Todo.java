package model;

public class Todo {
	private String contents;
	private String done;
	private String todoId;
	private String date;
	private String groupId;

	public Todo(){}

	public Todo(String contents,String done, String date, String todoId, String groupId){
		this.contents=contents;
		this.date=date;
		this.todoId = todoId;
		this.done=done;
		this.groupId=groupId;
	}

	public String getContents(){
		return contents;
	}

	public void setContents(String contents){
		this.contents = contents;
	}

	public String getDate(){
		return date;
	}

	public void setDate(String date){
		this.date = date;
	}

	public String getTodoId(){
		return todoId;
	}

	public void setTodoId(String todoId){
		this.todoId = todoId;
	}

	public String getDone(){
		return done;
	}

	public void setDone(String done){
		this.done = done;
	}

	public String getGroupId(){
		return groupId;
	}

	public void setGroupId(String groupId){
		this.groupId = groupId;
	}

}

