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

import dao.PersonalDAO;
import dao.TodoDAO;
import model.Personal;
import tool.Tool;

@WebServlet("/ToDo")
public class Todo extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
		String gid = Tool.escapeStr(request.getParameter("gid"));
		String contents = Tool.escapeStr(request.getParameter("contents"));
		System.out.println("gid:"+gid + "contents"+contents);

		// ユーザーメッセージ
		TodoDAO todoDAO = new TodoDAO();
		if (todoDAO.add(gid, contents)) {
			response.sendError(HttpServletResponse.SC_OK);
			System.out.println("addMessage OK");

		} else {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);;


		}

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
		String gid = request.getParameter("gid");
		Date date = Date.valueOf(request.getParameter("date"));
		TodoDAO todoDAO = new TodoDAO();
		List<model.Todo> todoList = new ArrayList<model.Todo>();

		//日付指定の時の処理
		if(date != null){
		todoList = todoDAO.findSearch_date(gid, date);
		Personal personal = new Personal();
		PersonalDAO personalDAO = new PersonalDAO();
		String response_json="";
		if(todoList != null){
			response_json += "{";

			Integer i = 0;
			for (model.Todo todobox : todoList) {
				response_json += "\"todo"+i+"\":{";
				response_json +="\"todoId\":\""+todobox.getTodoId()+"\",";
				response_json +="\"groupId\":\""+todobox.getGroupId()+"\",";
				response_json +="\"date\":\""+todobox.getDate()+"\",";
				response_json +="\"contents\":\""+todobox.getContents()+"\",";
				response_json +="\"done\":\""+todobox.getDone()+"\"},";
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


		//日付抜きの時の処理
		if(date != null){
		todoList = todoDAO.findSearch_false(gid);
		Personal personal = new Personal();
		PersonalDAO personalDAO = new PersonalDAO();
		String response_json="";
		if(todoList != null){
			response_json += "{";

			Integer i = 0;
			for (model.Todo todobox : todoList) {
				response_json += "\"todo"+i+"\":{";
				response_json +="\"todoId\":\""+todobox.getTodoId()+"\",";
				response_json +="\"groupId\":\""+todobox.getGroupId()+"\",";
//				response_json +="\"date\":\""+todobox.getDate()+"\",";
				response_json +="\"contents\":\""+todobox.getContents()+"\",";
				response_json +="\"done\":\""+todobox.getDone()+"\"},";
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

}