package model;

public class Personal {
	
	private String id;
	private String pw;
	private String name;
	private String groupId;
	
	public Personal(String id, String pw, String name, String groupId){
		this.id=id;
		this.pw=pw;
		this.name=name;
		this.groupId=groupId;
	}
	
	public String getId(){
		return id;
	}
	
	public String getPw(){
		return pw;
	}
	
	public String getName(){
		return name;
	}
	
	public String getGroupId(){
		return groupId;
	}
}
