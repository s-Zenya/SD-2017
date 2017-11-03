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

import dao.CalendarDAO;
import tool.Tool;

@WebServlet("/Calendar")
public class Calendar extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
		String gid = Tool.escapeStr(request.getParameter("gid"));
		Date date = Date.valueOf(Tool.escapeStr(request.getParameter("date")));
		String content = Tool.escapeStr(request.getParameter("content"));
		String name = Tool.escapeStr(request.getParameter("name"));
		// ユーザーメッセージ
		CalendarDAO calendarDAO = new CalendarDAO();
		if (calendarDAO.add(gid, date, content , name)) {
			response.sendError(HttpServletResponse.SC_OK);
		} else {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);;
		}

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
		String gid = Tool.escapeStr(request.getParameter("gid")+"");
		String dateStr = request.getParameter("date");

		if(dateStr==null){	//カレンダートップにページ遷移したいとき
			response.sendRedirect("/CFT/html/calendar/CalendarTop.html");
		}else{
			Date date = Date.valueOf(Tool.escapeStr(dateStr));
			CalendarDAO calendarDAO = new CalendarDAO();
			List<model.Calendar> calendarList = new ArrayList<model.Calendar>();
			//予定リストを検索
			calendarList = calendarDAO.findDateGroupIdAll(date, gid);
			Calendar calendar = new Calendar();
			String response_json = "";
			if(calendarList != null){
				response_json += "{";
				Integer i = 0;
				for (model.Calendar calendarbox : calendarList) {
					response_json += "\"plan"+i+"\":{";
					response_json +="\"calendarId\":\""+calendarbox.getCalendarId()+"\",";
					response_json +="\"date\":\""+calendarbox.getDate()+"\",";
					response_json +="\"content\":\""+calendarbox.getContents()+"\",";
					response_json +="\"name\":\""+calendarbox.getName()+"\"},";
					i++;
				}
				if(response_json != null && response_json.length() > 0){
					response_json = response_json.substring(0, response_json.length()-1);
				}
				response_json += "}";
				//予定一覧がない時の処理
				if(i==0){
					response_json="{}";
				}
			}
			response.setContentType("application/json;charset=UTF-8");
			PrintWriter out = response.getWriter();
			out.print(response_json);
		}
	}

}