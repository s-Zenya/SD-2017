package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.DbConnection;
import model.Group;

public class GroupDAO {
	// DB接続パス
	private String connectionString = DbConnection.getPass();

	public List<Group> findAll() {

		Connection conn = null;
		List<Group> groupList = new ArrayList<Group>();

		try {

			// JDBC Driver Read
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// SELECT文を準備
			String sql = "SELECT * FROM GROUPTABLE";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			// SELECTを実行し、結果表を取得
			ResultSet rs = pStmt.executeQuery();

			while (rs.next()) {
				String groupId = rs.getString("GROUPID");
				String groupPw = rs.getString("GROUPPW");
				String groupName = rs.getString("GROUPNAME");
				Group group = new Group(groupId, groupPw, groupName);
				groupList.add(group);
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
		return groupList;
	}

	// データ追加 指定したgroupId・groupPw・groupNameを登録
	public boolean add(String groupId, String groupPw, String groupName) {
		Connection conn = null;

		try {
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// INSERT文を準備
			String sql = "INSERT INTO GROUPTABLE VALUES (?,?,?)";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			pStmt.setString(1, groupId);
			pStmt.setString(2, groupPw);
			pStmt.setString(3, groupName);

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

	// groupIDとgroupPWを貰って合致するか確認 戻り値boolean
	public boolean loginCheck(String searchGroupId, String searchGroupPw) {

		Connection conn = null;
		List<Group> groupList = new ArrayList<Group>();

		try {

			// JDBC Driver Read
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// SELECT文を準備
			String sql = "SELECT * FROM GROUPTABLE WHERE GROUPID=? AND GROUPPW=?";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			// 指定したIDで
			pStmt.setString(1, searchGroupId);
			pStmt.setString(2, searchGroupPw);

			// SELECTを実行し、結果表を取得
			ResultSet rs = pStmt.executeQuery();

			while (rs.next()) {
				String groupId = rs.getString("GROUPID");
				String groupPw = rs.getString("GROUPPW");
				String groupName = rs.getString("GROUPNAME");
				Group group = new Group(groupId, groupPw, groupName);
				groupList.add(group);
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

	// ID指定で参照
	public Group findSearch(String searchId) {

		Connection conn = null;
		List<Group> groupList = new ArrayList<Group>();
		Group group = new Group();
		try {

			// JDBC Driver Read
			Class.forName("org.h2.Driver");

			// データベースへ接続
			conn = DriverManager.getConnection(connectionString, "sa", "");

			// SELECT文を準備
			String sql = "SELECT * FROM GROUPTABLE WHERE GROUPID=?";
			PreparedStatement pStmt = conn.prepareStatement(sql);

			// 指定したIDで
			pStmt.setString(1, searchId);

			// SELECTを実行し、結果表を取得
			ResultSet rs = pStmt.executeQuery();

			// while (rs.next()) {
			rs.next();
			String groupId = rs.getString("GROUPID");
			String groupPw = rs.getString("GROUPPW");
			String groupName = rs.getString("GROUPNAME");
			group = new Group(groupId, groupPw, groupName);
//			groupList.add(group_tmp);
			// groupList.add(group);
			// }
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
		return group;
	}
}