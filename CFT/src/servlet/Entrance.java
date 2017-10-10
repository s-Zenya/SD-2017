package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/Login")
public class Entrance extends HttpServlet  {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request,
		      HttpServletResponse response)
		      throws ServletException, IOException {
		HttpSession session;
//		セッションを取得
		session = request.getSession(false);
		if(session != null){//セッションがあればTopにページ遷移
			response.sendRedirect("/CFT/html/top/top.html");
		}else{//セッションがなければLogin画面へ遷移
			response.sendRedirect("/CFT/html/personalLogin/personalLogin.html");
		}
	}
}
