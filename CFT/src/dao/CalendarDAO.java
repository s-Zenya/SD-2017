package dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.Calendar;
import model.DbConnection;

public class CalendarDAO {
	// DB接続パス
	private String connectionString = DbConnection.getPath();
	private String dbUser = DbConnection.getUser();
	private String dbPass = DbConnection.getPass();
	private String dbSchema = DbConnection.getSchema();
	private String dbDriver = DbConnection.getDriver();

	// 指定されたgroupId,dateの前後1か月の全データ取得
	public  List<Calendar> findDateGroupIdAll(Date getDate, String groupId) {
		String dateStr=getDate.toString();
		dateStr=dateStr.substring(0,8)+"01";
		System.out.println(dateStr);
		Connection conn = null;
		List<Calendar> calendarList = new ArrayList<Calendar>();
		try {

			// JDBC Driver Read
			Class.forName(dbDriver);

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, dbUser, dbPass);

			// SELECT文を準備
			String sql = "SELECT * FROM "+dbSchema+"CALENDARTABLE WHERE GROUPID = ? AND DATE >= DATEADD(MONTH,-1,?) AND DATE <= DATEADD(DAY,-1,DATEADD(MONTH,2,?)) ORDER BY DATE";
			PreparedStatement pStmt = conn.prepareStatement(sql);
			pStmt.setString(1, groupId);
			pStmt.setString(2, dateStr);
			pStmt.setString(3, dateStr);

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
			Class.forName(dbDriver);

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, dbUser, dbPass);

			// INSERT文を準備
			String sql = "INSERT INTO "+dbSchema+"CALENDARTABLE (GROUPID, DATE, CONTENTS, NAME) VALUES (?,?,?,?)";
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
	// データ削除
	public boolean delete(int calendarId) {
		Connection conn = null;
		//		boolean rt = false;
		try {
			Class.forName(dbDriver);

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, dbUser, dbPass);

			// INSERT文を準備
			String sql = "DELETE FROM "+dbSchema+"CALENDARTABLE WHERE CALENDARID = ?";
			PreparedStatement pStmt = conn.prepareStatement(sql);
			pStmt.setInt(1, calendarId);

			int r = pStmt.executeUpdate();
			//
			//			String sql2 = "SELECT * FROM "+dbSchema+"CALENDARTABLE WHERE CALENDARID = ?";
			//			PreparedStatement pStmt2 = conn.prepareStatement(sql2);
			//			pStmt2.setInt(1, calendarId);
			//			ResultSet rs = pStmt.executeQuery();
			//
			//			String contents = rs.getString("CONTENTS");
			//			if(contents == null){
			//				rt = true;
			//			}

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
		//		return rt;
	}
}
