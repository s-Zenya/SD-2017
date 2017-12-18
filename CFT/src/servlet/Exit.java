package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/Logout")
public class Exit extends HttpServlet  {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request,
	HttpServletResponse response)
	throws ServletException, IOException {
		//		セッションを取得
		HttpSession session = request.getSession(false);
		//    セッション破棄
		session.invalidate();
		session = request.getSession(true);
		if(session == null){
			response.sendRedirect("html/personal/personalLogin.html");
		}else{
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

}
