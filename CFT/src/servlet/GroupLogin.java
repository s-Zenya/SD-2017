
package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dao.GroupDAO;
import dao.PersonalDAO;
@WebServlet("/GroupLogin")
public class GroupLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
	HttpSession session;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String id = request.getParameter("id");
		String gid = request.getParameter("gid");
		String gpw = request.getParameter("gpw");

		// ログイン成功
		GroupDAO groupDAO = new GroupDAO();
		if (groupDAO.loginCheck(gid,gpw)) {
			//ユーザにgroupIdを登録
			PersonalDAO personalDAO = new PersonalDAO();
			System.out.println(personalDAO.setGroupId(id, gid));
			//cookieに追加
			Cookie cookie = new Cookie("gid", gid);
			cookie.setPath("/");
			response.addCookie(cookie);
			System.out.print("Login");
			response.sendRedirect("/CFT/html/top/top.html");
		} else {

			response.sendError(HttpServletResponse.SC_FORBIDDEN);
		}

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.sendError(HttpServletResponse.SC_NOT_FOUND);
	}

}