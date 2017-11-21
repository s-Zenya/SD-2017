package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dao.ShoppingDAO;
import tool.Tool;

@WebServlet("/ChangeDone_shopping")
public class ChangeDone_shopping extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("post");

		request.setCharacterEncoding("UTF-8");
		String gid = Tool.escapeStr(request.getParameter("gid"));
//		String judge = request.getParameter("judge");
		String shoppingId_tmp = request.getParameter("shoppingId");
		int shoppingId = Integer.parseInt(shoppingId_tmp);
		System.out.println("gid:"+gid);
		ShoppingDAO shoppingDAO = new ShoppingDAO();
		HttpSession session;
//		セッションを取得
		session = request.getSession(false);
		if(session == null){//セッションがあればTopにページ遷移
			response.sendRedirect("html/personal/personalLogin.html");
			return;
		}

		//todoチェックチェンジ
			if (shoppingDAO.changeDone(shoppingId,gid)) {
				response.sendError(HttpServletResponse.SC_OK);
				System.out.println("changeDone OK");

			} else {
				System.out.println("1111");
				response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);;
			}
//		}
	}
}