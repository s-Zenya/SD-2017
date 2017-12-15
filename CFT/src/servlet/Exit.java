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
		HttpSession session;
//		セッションを取得
		session = request.getSession(false);
//    セッション破棄
    session.invalidate();
		if(request.getSession(false) == null){
			response.sendRedirect("/Login");
      response.sendError(HttpServletResponse.SC_OK);
    }else{
			 response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);;
		}
	}

}
