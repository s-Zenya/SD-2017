package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dao.MessageDAO;

@WebServlet("/Message")
public class Message extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String id = request.getParameter("id");
		String gid = request.getParameter("gid");
		String message = request.getParameter("message");

		// ユーザーメッセージ
		MessageDAO messageDAO = new MessageDAO();
		if (messageDAO.add(id, gid, message)) {
			response.sendError(HttpServletResponse.SC_OK);
			System.out.println("addMessage OK");

		} else {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);;


		}

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.sendError(HttpServletResponse.SC_NOT_FOUND);

//		 response.sendRedirect("/CFT/html/top/top.html");
		// }

	}

}