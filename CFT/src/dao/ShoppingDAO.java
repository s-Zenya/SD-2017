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
import model.Shopping;

public class ShoppingDAO {
	// DB接続パス
	private String connectionString = DbConnection.getPass();

	// 指定されたgroupIdの全データ取得
	public  List<Shopping> findGroupIdAll(String groupId) {

		Connection conn = null;
		List<Shopping> shoppingList = new ArrayList<Shopping>();

		try {

			// JDBC Driver Read
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// SELECT文を準備
			String sql = "SELECT * FROM SHOPPINGTABLE WHERE GROUPID = ?";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			pStmt.setString(1, groupId);

			// SELECTを実行し、結果表を取得
			ResultSet rs = pStmt.executeQuery();

			while (rs.next()) {
				Integer shoppingId = rs.getInt("SHOPPINGID");
				String groupId_tmp = rs.getString("GROUPID");
				Date date = rs.getDate("DATE");
				String contents = rs.getString("CONTENTS");
				boolean done = rs.getBoolean("DONE");
				Shopping shopping = new Shopping(shoppingId, groupId_tmp, date, contents, done);
				shoppingList.add(shopping);
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
		return shoppingList;
	}

	// データ追加 指定したgroupIDに任意のコメント(contents)と現在の時間(DATE)とfalse(DONE)を入れる
	public boolean add(String groupId, String contents) {
		Connection conn = null;

		try {
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// INSERT文を準備
			String sql = "INSERT INTO SHOPPINGTABLE (GROUPID, DATE, CONTENTS, DONE) VALUES (?,?,?,false)";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			pStmt.setString(1, groupId);
			pStmt.setTimestamp(2, new Timestamp(System.currentTimeMillis()));
			pStmt.setString(3, contents);

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
