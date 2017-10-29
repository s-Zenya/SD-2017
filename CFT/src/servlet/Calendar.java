package servlet;

import java.io.IOException;
import java.sql.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/Calendar")
public class Calendar extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

//        request.setCharacterEncoding("UTF-8");
//		String id = Tool.escapeStr(request.getParameter("id"));
//		String gid = Tool.escapeStr(request.getParameter("gid"));
//		String message = Tool.escapeStr(request.getParameter("message"));
//		System.out.println("id:"+id+",gid:"+gid+",message:"+message);
//
//		// ユーザーメッセージ
//		MessageDAO messageDAO = new MessageDAO();
//		if (messageDAO.add(id, gid, message)) {
//			response.sendError(HttpServletResponse.SC_OK);
//			System.out.println("addMessage OK");
//
//		} else {
//			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);;
//
//
//		}

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
		String gid = request.getParameter("gid");
		Date date;

//		カレンダートップにページ遷移したいとき
		if(gid==null){
			System.out.println("redirect");
			response.sendRedirect("/CFT/html/calendar/calendarTop.html");
		}else{
			date=Date.valueOf(request.getParameter("date"));
			response.sendError(HttpServletResponse.SC_NOT_FOUND);
		}

	}

}