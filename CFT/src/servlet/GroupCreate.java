package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dao.GroupDAO;
import tool.Tool;

@WebServlet("/GroupCreate")
public class GroupCreate extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
		String gid = Tool.escapeStr(request.getParameter("gid"));
		String gpw = Tool.escapeStr(request.getParameter("gpw"));
		String gname = Tool.escapeStr(request.getParameter("gname"));
		HttpSession session;
//		セッションを取得
		session = request.getSession(false);
		if(session == null){//セッションがあればTopにページ遷移
			response.sendRedirect("html/personal/personalLogin.html");
			return;
		}

		// ユーザー作成成功
		GroupDAO groupDAO = new GroupDAO();
		if (groupDAO.add(gid, gpw, gname)) {
			response.sendError(HttpServletResponse.SC_OK);
			return;

		} else {
			response.sendError(HttpServletResponse.SC_CONFLICT);
			return;
		}
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.sendError(HttpServletResponse.SC_NOT_FOUND);
	}
}