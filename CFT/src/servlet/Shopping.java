package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dao.ShoppingDAO;
import tool.Tool;

@WebServlet("/Shopping")
public class Shopping extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("post");

		request.setCharacterEncoding("UTF-8");
		String gid = Tool.escapeStr(request.getParameter("gid"));
		String contents = Tool.escapeStr(request.getParameter("contents"));
		System.out.println("gid:"+gid + "contents:"+contents);
		ShoppingDAO shoppingDAO = new ShoppingDAO();
		HttpSession session;
//		セッションを取得
		session = request.getSession(false);
		if(session == null){//セッションがあればTopにページ遷移
			response.sendRedirect("/CFT/html/personal/personalLogin.html");
			return;
		}

		// ユーザーメッセージ
		if (shoppingDAO.add(gid, contents)) {
			response.sendError(HttpServletResponse.SC_OK);
			System.out.println("addShopping OK");

		} else {
			System.out.println("222");

			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);;
		}
}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
		String gid = request.getParameter("gid");
		String dateStr = request.getParameter("date");
		ShoppingDAO shoppingDAO = new ShoppingDAO();
		List<model.Shopping> shoppingList = new ArrayList<model.Shopping>();
		Date date = null;
		HttpSession session;
//		セッションを取得
		session = request.getSession(false);
		if(session == null){//セッションがあればTopにページ遷移
			response.sendRedirect("/CFT/html/personal/personalLogin.html");
			return;
		}

		if(dateStr != null){
			date=Date.valueOf(dateStr);
		}

		System.out.println(date);


		//日付指定の時の処理
		if(date != null){
		shoppingList = shoppingDAO.findGroupIdDateAll(gid,date);
		String response_json="";
		if(shoppingList != null){
			response_json += "{";

			Integer i = 0;
			for (model.Shopping shoppingbox : shoppingList) {
				response_json += "\"shopping"+i+"\":{";
				response_json +="\"shoppingId\":\""+shoppingbox.getShoppingId()+"\",";
				response_json +="\"groupId\":\""+shoppingbox.getGroupId()+"\",";
				response_json +="\"date\":\""+shoppingbox.getDate()+"\",";
				response_json +="\"contents\":\""+shoppingbox.getContents()+"\",";
				response_json +="\"done\":\""+shoppingbox.getDone()+"\"},";
				i++;
			}
			if(response_json != null && response_json.length() > 0){
				response_json = response_json.substring(0, response_json.length()-1);
			}
			response_json += "}";
			if(i==0){
				response_json = "{}";
			}
		}
		response.setContentType("application/json;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.print(response_json);
		}



	//日付なしの時の処理
	if(date == null){
	shoppingList = shoppingDAO.findGroupIdFalseAll(gid);
	String response_json="";
	if(shoppingList != null){
		response_json += "{";

		Integer i = 0;
		for (model.Shopping shoppingbox : shoppingList) {
			response_json += "\"shopping"+i+"\":{";
			response_json +="\"shoppingId\":\""+shoppingbox.getShoppingId()+"\",";
			response_json +="\"groupId\":\""+shoppingbox.getGroupId()+"\",";
			response_json +="\"date\":\""+shoppingbox.getDate()+"\",";
			response_json +="\"contents\":\""+shoppingbox.getContents()+"\",";
			response_json +="\"done\":\""+shoppingbox.getDone()+"\"},";
			i++;
		}
		if(response_json != null && response_json.length() > 0){
			response_json = response_json.substring(0, response_json.length()-1);
		}
		response_json += "}";
		if(i==0){
			response_json = "{}";
		}
	}
	response.setContentType("application/json;charset=UTF-8");
	PrintWriter out = response.getWriter();
	out.print(response_json);
	}

}


}