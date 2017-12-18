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
	private String connectionString = DbConnection.getPath();
	private String dbUser = DbConnection.getUser();
	private String dbPass = DbConnection.getPass();
	private String dbSchema = DbConnection.getSchema();
	private String dbDriver = DbConnection.getDriver();


	// 指定されたgroupIdの全データ取得
	public List<Shopping> findGroupIdAll(String groupId) {

		Connection conn = null;
		List<Shopping> shoppingList = new ArrayList<Shopping>();

		try {

			// JDBC Driver Read
			Class.forName(dbDriver);

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, dbUser, dbPass);

			// SELECT文を準備
			String sql = "SELECT * FROM "+dbSchema+"SHOPPINGTABLE WHERE GROUPID = ?";
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

	// 指定されたgroupIdの指定された日付の全データ取得
	public List<Shopping> findGroupIdDateAll(String groupId, Date getdate) {

		Connection conn = null;
		List<Shopping> shoppingList = new ArrayList<Shopping>();

		try {

			// JDBC Driver Read
			Class.forName(dbDriver);

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, dbUser, dbPass);

			// SELECT文を準備
			String sql = "SELECT * FROM "+dbSchema+"SHOPPINGTABLE WHERE GROUPID = ? AND DATE = ?";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			pStmt.setString(1, groupId);
			pStmt.setDate(2, getdate);

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

	// 指定されたgroupIdのDoneがfalseの全データ取得
	public List<Shopping> findGroupIdFalseAll(String groupId) {

		Connection conn = null;
		List<Shopping> shoppingList = new ArrayList<Shopping>();

		try {

			// JDBC Driver Read
			Class.forName(dbDriver);

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, dbUser, dbPass);

			// SELECT文を準備
			String sql = "SELECT * FROM "+dbSchema+"SHOPPINGTABLE WHERE GROUPID = ? AND DONE = FALSE";
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

	// trueからfalseに、falseからtrueに変換
	public boolean changeDone(Integer shoppingId, String groupId) {
		Connection conn = null;
		int r = 0;
		boolean rt = false;
		try {
			Class.forName(dbDriver);

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, dbUser, dbPass);

			// SELECT文を準備
			String sql = "SELECT * FROM "+dbSchema+"SHOPPINGTABLE WHERE GROUPID=? AND SHOPPINGID = ?";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			// 指定したIDで
			pStmt.setString(1, groupId);
			pStmt.setInt(2, shoppingId);

			// SELECTを実行し、結果表を取得
			ResultSet rs = pStmt.executeQuery();

			boolean done = false;

			while (rs.next()) {
				boolean doneTmp = rs.getBoolean("DONE");
				done = doneTmp;
			}


			if (done == false) {
				// INSERT文を準備
				String sql_true = "UPDATE "+dbSchema+"SHOPPINGTABLE SET DONE = TRUE WHERE GROUPID = ? AND SHOPPINGID = ?";
				PreparedStatement pStmt_true = conn.prepareStatement(sql_true);

				pStmt_true.setString(1, groupId);
				pStmt_true.setInt(2, shoppingId);

				pStmt_true.executeUpdate();
				rt = true;
			} else if (done == true) {
				// INSERT文を準備
				String sql_false = "UPDATE "+dbSchema+"SHOPPINGTABLE SET DONE = FALSE WHERE GROUPID = ? AND SHOPPINGID = ?";
				PreparedStatement pStmt_false = conn.prepareStatement(sql_false);

				pStmt_false.setString(1, groupId);
				pStmt_false.setInt(2, shoppingId);

				pStmt_false.executeUpdate();
				rt = true;
			}

			// return (r > 0);

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
		return rt;
	}

	// データ追加 指定したgroupIDに任意のコメント(contents)と現在の時間(DATE)とfalse(DONE)を入れる
	public boolean add(String groupId, String contents) {
		Connection conn = null;

		try {
			Class.forName(dbDriver);

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, dbUser, dbPass);

			// INSERT文を準備
			String sql = "INSERT INTO "+dbSchema+"SHOPPINGTABLE (GROUPID, DATE, CONTENTS, DONE) VALUES (?,?,?,false)";
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
