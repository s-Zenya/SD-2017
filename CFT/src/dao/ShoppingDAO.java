//package dao;
//
//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.PreparedStatement;
//import java.sql.SQLException;
//
//import model.DbConnection;
//
//public class ShoppingDAO {
//	// DB接続パス
//	private String connectionString = DbConnection.getPass();
//
//	// データ追加
//	public boolean add(String id, String pw, String name, String groupId) {
//		Connection conn = null;
//
//		try {
//			Class.forName("org.h2.Driver");
//
//			// データベースへ接続
//			conn = DriverManager.getConnection(connectionString, "sa", "");
//
//			// DELETE文を準備
//			String sql = "INSERT INTO PERSONALTABLE (ID, PW, NAME, GROUPID) VALUES (?,?,?,?)";
//			PreparedStatement pStmt = conn.prepareStatement(sql);
//
//			pStmt.setString(1, id);
//			pStmt.setString(2, pw);
//			pStmt.setString(3, name);
//			pStmt.setString(4, groupId);
//
//			int r = pStmt.executeUpdate();
//
//			return (r > 0);
//
//		} catch (Exception e) {
//			e.printStackTrace();
//			return false;
//
//		} finally {
//			// データベース切断
//			if (conn != null) {
//				try {
//					conn.close();
//				} catch (SQLException e) {
//					e.printStackTrace();
//					return false;
//				}
//			}
//		}
//	}
//
//}
