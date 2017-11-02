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
//		String name = Tool.escapeStr(request.getParameter("name"));
		String selectName = Tool.escapeStr(request.getParameter("selectName"));
		System.out.println("id:"+id+",gid:"+gid+"selectName:"+selectName);
		
		Personal personal = new Personal();
		PersonalDAO personalDAO = new PersonalDAO();
		personal = personalDAO.findSearch(id);
		
		String message="";
		if(selectName.equals("帰りますボタン")){
			message = personal.getName() + "が急いで帰ります。";
		}else{
			message = personal.getName() + "が"+selectName+"に帰りなさいと激怒した。";
		}
		System.out.println("RETURNBUTTON.JAVA:"+id+gid+message+selectName);

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
		Date date = Date.valueOf(request.getParameter("date"));
		MessageDAO messageDAO = new MessageDAO();
		List<model.Message> messageList = new ArrayList<model.Message>();

		messageList = messageDAO.get(gid, date);
		Personal personal = new Personal();
		PersonalDAO personalDAO = new PersonalDAO();
		String response_json="";
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
		}
		response.setContentType("application/json;charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.print(response_json);

	}


}