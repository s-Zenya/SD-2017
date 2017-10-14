package servlet;

import java.util.List;

import dao.PersonalDAO;
import model.Personal;

public class DbTest {
	public static void main(String[] args) {

		// personalテーブルの全レコードを取得
		PersonalDAO personalDAO = new PersonalDAO();
		List<Personal> personalList = personalDAO.findAll();
		Personal personal = new Personal();

		// 取得したレコードの内容を出力
		for (Personal personalbox : personalList) {
			System.out.println("ID:" + personalbox.getId());
			System.out.println("PW:" + personalbox.getPw());
			System.out.println("NAME:" + personalbox.getName());
			System.out.println("GROUPID:" + personalbox.getGroupId() + "\n");
		}
		
//		指定されたIDにgroupIDをセット
//		boolean box = personalDAO.setGroupId("hoge","0002");
//		System.out.println(box);

//		personalテーブルに値を追加
//		boolean box = personalDAO.add("00001", "1111", "hage", "0001");
//		System.out.println(box);

//		personalテーブルの値を削除
//		boolean box2 = personalDAO.remove("00002");
//		System.out.println(box2);

//		personalテーブルの値をID指定で取得
//		personal = personalDAO.findSearch("00001");

//		personalDAO idPwCheck(ID,PW) return boolean
//		boolean box = personalDAO.loginCheck("00001", "oic");
//		System.out.println(box);
	}
}
