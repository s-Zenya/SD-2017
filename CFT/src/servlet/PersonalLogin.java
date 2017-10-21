package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dao.PersonalDAO;
import model.Personal;

@WebServlet("/PersonalLogin")
public class PersonalLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
	HttpSession session;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// HttpSession session;
		// セッションがある場合top.htmlに飛ばす
		session = request.getSession(false);
		if (session != null) {
			response.sendRedirect("/CFT/html/top/top.html");
		}

		String id = request.getParameter("id");
		String pw = request.getParameter("pw");

		// ログイン成功
		PersonalDAO personalDAO = new PersonalDAO();

		if (personalDAO.loginCheck(id,pw)) {
			//cookieに追加
			Personal personal = new Personal();
			personal = personalDAO.findSearch(id);
			Cookie cookie = new Cookie("id", id);
			cookie.setPath("/");
			response.addCookie(cookie);
			cookie = new Cookie("name", personal.getName());
			cookie.setPath("/");
			response.addCookie(cookie);
			cookie = new Cookie("groupId", personal.getGroupId());
			cookie.setPath("/");
			response.addCookie(cookie);
			//セッションを開始
			session = request.getSession(true);

			response.sendRedirect("/CFT/html/top/top.html");
		} else {
			response.sendRedirect("/CFT/html/personal/personalLogin.html");
			PrintWriter out = response.getWriter();
			out.print("ログインに失敗しました");
		}
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.sendError(HttpServletResponse.SC_NOT_FOUND);
	}
}
