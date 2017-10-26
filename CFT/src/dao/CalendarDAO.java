package dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import model.Calendar;
import model.DbConnection;

public class CalendarDAO {
	// DB接続パス
	private String connectionString = DbConnection.getPass();

	// 指定されたgroupIdの全データ取得
	public  List<Calendar> findDateGroupIdAll(Date getDate, String groupId) {
//		System.out.println(getDate);
		SimpleDateFormat sdfYear = new SimpleDateFormat("yyyy");
		SimpleDateFormat sdfMonth = new SimpleDateFormat("mm");
		String yearString = sdfYear.format(getDate);
		String monthString = sdfMonth.format(getDate);
		int yearInt = Integer.parseInt(yearString);
		int monthInt = Integer.parseInt(monthString);
		monthInt++;
		monthString = String.valueOf(monthInt);
		
//		System.out.println("@@@@@:"+ yearString + ":" + monthString);

		Connection conn = null;
		List<Calendar> calendarList = new ArrayList<Calendar>();

		try {

			// JDBC Driver Read
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// SELECT文を準備
			String sql = "SELECT * FROM CALENDARTABLE WHERE GROUPID = ? AND DATE LIKE ?";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			pStmt.setString(1, groupId);
//			System.out.println(yearString + "-%" + monthString + "-%");
			pStmt.setString(2, yearString + "-%" + monthString + "-%");

			// SELECTを実行し、結果表を取得
			ResultSet rs = pStmt.executeQuery();

			while (rs.next()) {
				Integer calendarId = rs.getInt("CALENDARID");
				String groupId_tmp = rs.getString("GROUPID");
				Date date_tmp = rs.getDate("DATE");
				String contents = rs.getString("CONTENTS");
				String name = rs.getString("NAME");
				Calendar calendar = new Calendar(calendarId, groupId_tmp, date_tmp, contents, name);
				calendarList.add(calendar);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return null;
		} finally {

			// データベース切断
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
					return null;
				}
			}
		}
		return calendarList;
	}

	// データ追加
	public boolean add(String groupId, Date getDate, String contents, String name) {
		Connection conn = null;

		try {
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// INSERT文を準備
			String sql = "INSERT INTO CALENDARTABLE (GROUPID, DATE, CONTENTS, NAME) VALUES (?,?,?,?)";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			pStmt.setString(1, groupId);
			pStmt.setDate(2, getDate);
			pStmt.setString(3, contents);
			pStmt.setString(4, name);

			int r = pStmt.executeUpdate();

			return (r > 0);

		} catch (Exception e) {
			e.printStackTrace();
			return false;

		} finally {
			// データベース切断
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
					return false;
				}
			}
		}
	}

}