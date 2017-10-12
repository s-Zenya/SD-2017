package model;

public class Calendar {
	private String calendarId;
	private String groupId;
	private String date;
	private String contents;

	public Calendar(){};

	public Calendar(String calendarId, String groupId, String date, String contents){
		this.calendarId=calendarId;
		this.groupId=groupId;
		this.date=date;
		this.contents=contents;
	}

	public String getCalendarId(){
		return calendarId;
	}

	public void setCalendarId(String calendarId){
		this.calendarId = calendarId;
	}

	public String getGroupId(){
		return groupId;
	}

	public void setGroupId(String groupId){
		this.groupId = groupId;
	}

	public String getDate(){
		return date;
	}

	public void setDate(String date){
		this.date = date;
	}

	public String getContents(){
		return contents;
	}

	public void setContents(String contents){
		this.contents = contents;
	}

}
