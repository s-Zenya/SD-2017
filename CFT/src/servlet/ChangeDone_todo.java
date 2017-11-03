package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dao.TodoDAO;
import tool.Tool;

@WebServlet("/ChangeDone_todo")
public class ChangeDone_todo extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("post");

		request.setCharacterEncoding("UTF-8");
		String gid = Tool.escapeStr(request.getParameter("gid"));
//		String judge = request.getParameter("judge");
		String todoId_tmp = request.getParameter("todoId");
		int todoId = Integer.parseInt(todoId_tmp);
		System.out.println("gid:"+gid);
		TodoDAO todoDAO = new TodoDAO();

		//todoチェックチェンジ
			if (todoDAO.changeDone(gid, todoId)) {
				response.sendError(HttpServletResponse.SC_OK);
				System.out.println("changeDone OK");

			} else {
				System.out.println("1111");
				response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);;
			}
//		}
	}
}