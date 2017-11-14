package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dao.PersonalDAO;
import tool.Tool;

@WebServlet("/PersonalCreate")
public class PersonalCreate extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
		String id = Tool.escapeStr(request.getParameter("id"));
		String pw = Tool.escapeStr(request.getParameter("pw"));
		String name = Tool.escapeStr(request.getParameter("name"));

		// ユーザー作成成功
		PersonalDAO personalDAO = new PersonalDAO();
		if (personalDAO.add(id, pw, name, null)) {
			response.sendRedirect("/CFT/Login");
			System.out.println(name);

		} else {
			response.setContentType("application/json;charset=UTF-8");
			PrintWriter out = response.getWriter();
			response.sendError(HttpServletResponse.SC_CONFLICT);

		}

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.sendError(HttpServletResponse.SC_NOT_FOUND);

		// session = request.getSession(false);
		// if(session != null){
		 response.sendRedirect("/CFT/html/top/top.html");
		// }

	}

}