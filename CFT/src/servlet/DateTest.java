package servlet;

import java.sql.Timestamp;

public class DateTest {
	public static void main(String[] args){
		Timestamp ts = new Timestamp(System.currentTimeMillis());
		System.out.println(ts);
	}
}
