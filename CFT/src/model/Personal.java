package model;

public class Personal {

	private String id;
	private String groupId;
	private String pw;
	private String name;


	public Personal(){};

	public Personal(String id, String pw, String name, String groupId){
		this.id=id;
		this.groupId=groupId;
		this.pw=pw;
		this.name=name;
	}

	public String getId(){
		return id;
	}

	public String getGroupId(){
		return groupId;
	}

	public String getPw(){
		return pw;
	}

	public String getName(){
		return name;
	}

}
