package servlet;

public class DbTest {
	public static void main(String[] args) {
//----------------------------------- CALENDAR ---------------------------------------------
//		// テーブルの全レコードを取得
//		Date date = new Date(0);
//		CalendarDAO calendarDAO = new CalendarDAO();
//		List<Calendar> calendarList = calendarDAO.findDateGroupIdAll(date, "0001");
//		Calendar calendar = new Calendar();
//
//		// 取得したレコードの内容を出力
//		for (Calendar calendarbox : calendarList) {
//			System.out.println("CALENDARID:" + calendarbox.getCalendarId());
//			System.out.println("GROUPID:" + calendarbox.getGroupId());
//			System.out.println("DATE:" + calendarbox.getDate());
//			System.out.println("CONTENTS:" + calendarbox.getContents());
//			System.out.println("NAME:" + calendarbox.getName() + "\n");
//		}実装
//		
//		calendarDAO.add("0002", date, "hogehoge","user02");
//----------------------------------- MESSAGE ---------------------------------------------
//		// テーブルの全レコードを取得
//		MessageDAO messageDAO = new MessageDAO();
//		List<Message> messageList = messageDAO.findGroupIdAll("0001");
//		Message message = new Message();
//
//		// 取得したレコードの内容を出力
//		for (Message messagebox : messageList) {
//			System.out.println("MESSAGEID:" + messagebox.getMessageId());
//			System.out.println("ID:" + messagebox.getId());
//			System.out.println("GROUPID:" + messagebox.getGroupId());
//			System.out.println("DATE:" + messagebox.getDate());
//			System.out.println("MESSAGE:" + messagebox.getMessage() + "\n");
//		}
		
//		MessageDAO messageDAO = new MessageDAO();
//		
//		messageDAO.add("00001","0001", "test2");

//----------------------------------- TODO ---------------------------------------------
//		// テーブルの全レコードを取得
//		TodoDAO todoDAO = new TodoDAO();
//		List<Todo> todoList = todoDAO.findGroupIdAll("0001");
//		Todo todo = new Todo();
//
//		// 取得したレコードの内容を出力
//		for (Todo todobox : todoList) {
//			System.out.println("TODOID:" + todobox.getTodoId());
//			System.out.println("GROUPID:" + todobox.getGroupId());
//			System.out.println("DATE:" + todobox.getDate());
//			System.out.println("CONTENTS:" + todobox.getContents());
//			System.out.println("DONE:" + todobox.getDone() + "\n");
//		}
		
//		TodoDAO todoDAO = new TodoDAO();
//		
//		todoDAO.add("0001", "test2");
		
//----------------------------------- SHOPPING ---------------------------------------------
//		// テーブルの全レコードを取得
//		ShoppingDAO shoppingDAO = new ShoppingDAO();
//		List<Shopping> shoppingList = shoppingDAO.findGroupIdAll("0001");
//		Shopping shopping = new Shopping();
//
//		// 取得したレコードの内容を出力
//		for (Shopping shoppingbox : shoppingList) {
//			System.out.println("SHOPPINGID:" + shoppingbox.getShoppingId());
//			System.out.println("GROUPID:" + shoppingbox.getGroupId());
//			System.out.println("DATE:" + shoppingbox.getDate());
//			System.out.println("CONTENTS:" + shoppingbox.getContents());
//			System.out.println("DONE:" + shoppingbox.getDone() + "\n");
//		}
		
//		ShoppingDAO shoppingDAO = new ShoppingDAO();
//		
//		shoppingDAO.add("0001", "test2");

//----------------------------------- PERSONAL ---------------------------------------------

//		// personalテーブルの全レコードを取得
//		PersonalDAO personalDAO = new PersonalDAO();
//		List<Personal> personalList = personalDAO.findAll();
//		Personal personal = new Personal();
//
//		// 取得したレコードの内容を出力
//		for (Personal personalbox : personalList) {
//			System.out.println("ID:" + personalbox.getId());
//			System.out.println("PW:" + personalbox.getPw());
//			System.out.println("NAME:" + personalbox.getName());
//			System.out.println("GROUPID:" + personalbox.getGroupId() + "\n");
//		}
		
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

//		IDとPWが合致するか確認
//		boolean box = personalDAO.loginCheck("00001", "oic");
//		System.out.println(box);
		
//----------------------------------- GROUP ---------------------------------------------
//
//		//groupテーブルの全レコードを取得
//		GroupDAO groupDAO = new GroupDAO();
//		List<Group> groupList = groupDAO.findAll();
//		Group group = new Group();
//
//		//取得したレコードの内容を出力
//		for (Group groupbox : groupList) {
//			System.out.println("ID:" + groupbox.getGroupId());
//			System.out.println("PW:" + groupbox.getGroupPw());
//			System.out.println("NAME:" + groupbox.getGroupName() + "\n");
//		}
//		
//		//groupテーブルに値を追加
//		boolean box = groupDAO.add("0003", "3333", "hoge3");
//		System.out.println(box);
//
//
//		//groupテーブルの値をID指定で取得
//		group = groupDAO.findSearch("0003");
//		System.out.println(group.getGroupId() + group.getGroupName() + group.getGroupPw());
//
//		//IDとPWが合致するか確認
//		boolean box2 = groupDAO.loginCheck("0003", "3333");
//		System.out.println(box2);
	}
}
