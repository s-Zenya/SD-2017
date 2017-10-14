package model;

import java.util.Date;

public class Calendar {
	private Integer calendarId;
	private String groupId;
	private Date date;
	private String contents;
	private String name;

	public Calendar(){};

	public Calendar( Integer calendarId, String groupId,Date date, String contents,String name){
		this.calendarId=calendarId;
		this.groupId=groupId;
		this.date=date;
		this.contents=contents;
	}

	public Integer getCalendarId(){
		return calendarId;
	}

	public void setCalendarId(Integer calendarId){
		this.calendarId = calendarId;
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

	public String getName(){
		return name;
	}

	public void setName(String name){
		this.name = name;
	}
}
