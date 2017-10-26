package model;

public class Group {
	private String groupId;
	private String groupPw;
	private String groupName;

	public Group(){}

	public Group( String groupId, String groupPw, String groupName){
		this.groupId=groupId;
		this.groupPw=groupPw;
		this.groupName=groupName;
	}

	public String getGroupId(){
		return groupId;
	}

	public void setGroupId(String groupId){
		this.groupId = groupId;
	}

	public String getGroupPw(){
		return groupPw;
	}

	public void setGroupPw(String groupPw){
		this.groupPw = groupPw;
	}

	public String getGroupName(){
		return groupName;
	}

	public void setGroupName(String groupName){
		this.groupName = groupName;
	}


}
