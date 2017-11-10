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

import dao.MessageDAO;
import dao.PersonalDAO;
import model.Personal;
import tool.Tool;

@WebServlet("/Message")
public class Message extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
		String id = Tool.escapeStr(request.getParameter("id"));
		String gid = Tool.escapeStr(request.getParameter("gid"));
		String message = Tool.escapeStr(request.getParameter("message"));
		HttpSession session;
//		セッションを取得
		session = request.getSession(false);
		if(session == null){//セッションがあればTopにページ遷移
			response.sendRedirect("/CFT/html/personal/personalLogin.html");
			return;
		}

		if(gid.equals("undefined")){
			response.sendError(501);
		}else{
			// ユーザーメッセージ
			MessageDAO messageDAO = new MessageDAO();
			if (messageDAO.add(id, gid, message)) {
				response.sendError(HttpServletResponse.SC_OK);
			} else {
				response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);;
			}
		}
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
		String gid = request.getParameter("gid");
		Date date = Date.valueOf(request.getParameter("date"));
		MessageDAO messageDAO = new MessageDAO();
		List<model.Message> messageList = new ArrayList<model.Message>();
		messageList = messageDAO.get(gid, date);
		Personal personal = new Personal();
		PersonalDAO personalDAO = new PersonalDAO();
		String response_json="";
		HttpSession session;
//		セッションを取得
		session = request.getSession(false);
		if(session == null){//セッションがあればTopにページ遷移
			response.sendRedirect("/CFT/html/personal/personalLogin.html");
			return;
		}

		//メッセージ一覧の取得
		if(messageList != null){
			response_json += "{";
			Integer i = 0;
			for (model.Message messagebox : messageList) {
				response_json += "\"message"+i+"\":{";
				response_json +="\"messageId\":\""+messagebox.getMessageId()+"\",";
				personal=personalDAO.findSearch(messagebox.getId());
				response_json +="\"name\":\""+personal.getName()+"\",";
				response_json +="\"message\":\""+messagebox.getMessage()+"\"},";
				i++;
			}
			if(response_json != null && response_json.length() > 0){
				response_json = response_json.substring(0, response_json.length()-1);
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