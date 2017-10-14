package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.DbConnection;
import model.Personal;

public class PersonalDAO {
	// DB接続パス
	private String connectionString = DbConnection.getPass();

	public List<Personal> findAll() {

		Connection conn = null;
		List<Personal> personalList = new ArrayList<Personal>();

		try {

			// JDBC Driver Read
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// SELECT文を準備
			String sql = "SELECT * FROM PERSONALTABLE";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			// SELECTを実行し、結果表を取得
			ResultSet rs = pStmt.executeQuery();

			while (rs.next()) {
				String id = rs.getString("ID");
				String pw = rs.getString("PW");
				String name = rs.getString("NAME");
				String groupId = rs.getString("GROUPID");
				Personal personal = new Personal(id, pw, name, groupId);
				personalList.add(personal);
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
		return personalList;
	}

	// ID指定で参照
	public Personal findSearch(String searchId) {

		Connection conn = null;
		List<Personal> personalList = new ArrayList<Personal>();
		Personal personal = new Personal();
		try {

			// JDBC Driver Read
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// SELECT文を準備
			String sql = "SELECT * FROM PERSONALTABLE WHERE ID=?";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			// 指定したIDで
			pStmt.setString(1, searchId);

			// SELECTを実行し、結果表を取得
			ResultSet rs = pStmt.executeQuery();

//			while (rs.next()) {
			rs.next();
				String id = rs.getString("ID");
				String pw = rs.getString("PW");
				String name = rs.getString("NAME");
				String groupId = rs.getString("GROUPID");
				personal = new Personal(id, pw, name, groupId);
//				personalList.add(personal);
//			}
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
		return personal;
	}

	// データ削除
	public boolean remove(String removeId) {
		Connection conn = null;

		try {
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// DELETE文を準備
			String sql = "DELETE FROM PERSONALTABLE WHERE ID=?";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			pStmt.setString(1, removeId);
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

	// データ追加
	public boolean add(String id, String pw, String name, String groupId) {
		Connection conn = null;

		try {
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// DELETE文を準備
			String sql = "INSERT INTO PERSONALTABLE (ID, PW, NAME, GROUPID) VALUES (?,?,?,?)";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			pStmt.setString(1, id);
			pStmt.setString(2, pw);
			pStmt.setString(3, name);
			pStmt.setString(4, groupId);

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
	
	// 指定されたIDにgroupIDをセット　戻り値boolean
	public boolean setGroupId(String id, String groupId) {
		Connection conn = null;

		try {
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// DELETE文を準備
			String sql = "update PERSONALTABLE set groupid = ? where id = ?";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			pStmt.setString(1, groupId);
			pStmt.setString(2, id);

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

	// IDとPWを貰って合致するか確認　戻り値boolean
	public boolean loginCheck(String searchId,String searchPw) {
		//System.out.println(searchId+":"+searchPw+":in dao>PersonalDAO>loginCheck()");

		Connection conn = null;
		List<Personal> personalList = new ArrayList<Personal>();

		try {

			// JDBC Driver Read
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// SELECT文を準備
			String sql = "SELECT * FROM PERSONALTABLE WHERE ID=? AND PW=?";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			// 指定したIDで
			pStmt.setString(1, searchId);
			pStmt.setString(2, searchPw);

			// SELECTを実行し、結果表を取得
			ResultSet rs = pStmt.executeQuery();

			while (rs.next()) {
				String id = rs.getString("ID");
				String pw = rs.getString("PW");
				String name = rs.getString("NAME");
				String groupId = rs.getString("GROUPID");
				Personal personal = new Personal(id, pw, name, groupId);
				personalList.add(personal);
				System.out.println("loginCheck OK");
				return true;
			}

		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		} catch (ClassNotFoundException e) {
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
		System.out.println("loginCheck NG");
		return false;
	}
}