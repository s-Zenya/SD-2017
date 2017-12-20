package dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import model.DbConnection;
import model.Message;

public class MessageDAO {
	// DB接続パス
	private String connectionString = DbConnection.getPath();
	private String dbUser = DbConnection.getUser();
	private String dbPass = DbConnection.getPass();
	private String dbSchema = DbConnection.getSchema();
	private String dbDriver = DbConnection.getDriver();


	// 指定されたgroupIdの全データ取得
	public  List<Message> findGroupIdAll(String groupId) {

		Connection conn = null;
		List<Message> messageList = new ArrayList<Message>();

		try {

			// JDBC Driver Read
			Class.forName(dbDriver);

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, dbUser, dbPass);

			// SELECT文を準備
			String sql = "SELECT * FROM "+dbSchema+"MESSAGETABLE WHERE GROUPID = ?";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			pStmt.setString(1, groupId);

			// SELECTを実行し、結果表を取得
			ResultSet rs = pStmt.executeQuery();

			while (rs.next()) {
				Integer messageId = rs.getInt("MESSAGEID");
				String Id = rs.getString("ID");
				String groupId_tmp = rs.getString("GROUPID");
				Date date = rs.getDate("DATE");
				String message_tmp = rs.getString("MESSAGE");
				Message message = new Message(messageId, Id, groupId_tmp, date, message_tmp);
				messageList.add(message);
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
		return messageList;
	}

	// データ追加 指定したId・groupIDで任意のコメント(message)と現在の時間(DATE)とfalse(DONE)を入れる
	public boolean add(String Id, String groupId, String message) {
		Connection conn = null;

		try {
			Class.forName(dbDriver);

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, dbUser, dbPass);

			// INSERT文を準備
			String sql = "INSERT INTO "+dbSchema+"MESSAGETABLE (ID, GROUPID, DATE, MESSAGE) VALUES (?,?,?,?)";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			pStmt.setString(1, Id);
			pStmt.setString(2, groupId);
			pStmt.setTimestamp(3, new Timestamp(System.currentTimeMillis()));
			pStmt.setString(4, message);

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

	//その日のメッセージを取得
	public  List<Message> get(String groupId, Date date) {

		Connection conn = null;
		List<Message> messageList = new ArrayList<Message>();

		try {

			// JDBC Driver Read
			Class.forName(dbDriver);

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, dbUser, dbPass);

			// SELECT文を準備
			String sql = "SELECT * FROM "+dbSchema+"MESSAGETABLE WHERE GROUPID = ? AND DATE = ?";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			pStmt.setString(1, groupId);
			pStmt.setDate(2,date);

			// SELECTを実行し、結果表を取得
			ResultSet rs = pStmt.executeQuery();

			while (rs.next()) {
				Integer messageId = rs.getInt("MESSAGEID");
				String Id = rs.getString("ID");
				String groupId_tmp = rs.getString("GROUPID");
				Date date_tmp = rs.getDate("DATE");
				String message_tmp = rs.getString("MESSAGE");
				Message message = new Message(messageId, Id, groupId_tmp, date_tmp, message_tmp);
				messageList.add(message);
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
		return messageList;
	}

}