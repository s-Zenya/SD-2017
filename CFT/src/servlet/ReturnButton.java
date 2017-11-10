package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dao.MessageDAO;
import dao.PersonalDAO;
import model.Personal;
import tool.Tool;

@WebServlet("/ReturnButton")
public class ReturnButton extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		String id = Tool.escapeStr(request.getParameter("id"));
		String gid = Tool.escapeStr(request.getParameter("gid"));
		// String name = Tool.escapeStr(request.getParameter("name"));
		String selectName = Tool.escapeStr(request.getParameter("selectName"));
//		System.out.println("id:" + id + ",gid:" + gid + "selectName:" + selectName);
		HttpSession session;
//		セッションを取得
		session = request.getSession(false);
		if(session == null){//セッションがあればTopにページ遷移
			response.sendRedirect("/CFT/html/personal/personalLogin.html");
			return;
		}

		Personal personal = new Personal();
		PersonalDAO personalDAO = new PersonalDAO();
		personal = personalDAO.findSearch(id);

		String message = "";
		if (selectName.equals("帰りますボタン")) {
			message = personal.getName() + "が急いで帰ります。";
		} else {
			message = personal.getName() + "が" + selectName + "に帰りなさいと激怒した。";
		}

		// ユーザーメッセージ
		MessageDAO messageDAO = new MessageDAO();
		if (messageDAO.add(id, gid, message)) {
			response.sendError(HttpServletResponse.SC_OK);
			System.out.println("addMessage OK");

		} else {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);

		}

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("UTF-8");
		String gid = request.getParameter("gid");

		PersonalDAO personalDAO = new PersonalDAO();
		List<Personal> personalList = personalDAO.nameSearch(gid);
		Personal personal = new Personal();

		String response_json = "";
		if (personalList != null) {
			response_json += "{";

			Integer i = 0;
			for (model.Personal personalbox : personalList) {
				response_json += "\"personal" + i + "\":{";
				response_json += "\"name\":\"" + personalbox.getName() + "\"},";
				i++;
			}
			if (response_json != null && response_json.length() > 0) {
				response_json = response_json.substring(0, response_json.length() - 1);
			}
			response_json += "}";
			//メッセージがなかった場合
			if(i==0){
				response_json="{}";
			}
		}
		response.setContentType("application/json;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.print(response_json);

	}

}