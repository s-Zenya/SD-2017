package model;

import java.util.Date;

public class Shopping {

	private Integer shoppingId;
	private String groupId;
	private Date date;
	private String contents;
	private boolean done;


	public Shopping(){}

	public Shopping( Integer shoppingId,String groupId, Date date,String contents,boolean done){
		this.shoppingId = shoppingId;
		this.groupId=groupId;
		this.date=date;
		this.contents=contents;
		this.done=done;

	}


	public Integer getShoppingId(){
		return shoppingId;
	}

	public void setShoppingId(Integer shoppingId){
		this.shoppingId = shoppingId;
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
