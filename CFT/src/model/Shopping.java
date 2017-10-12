package model;

public class Shopping {

	private String contents;
	private String done;
	private String shoppingId;
	private String date;
	private String groupId;

	public Shopping(String contents,String done, String date, String shoppingId, String groupId){
		this.contents=contents;
		this.date=date;
		this.shoppingId = shoppingId;
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

	public String getShoppingId(){
		return shoppingId;
	}

	public void setShoppingId(String shoppingId){
		this.shoppingId = shoppingId;
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
