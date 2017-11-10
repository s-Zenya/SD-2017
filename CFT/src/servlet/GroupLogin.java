
package servlet;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dao.GroupDAO;
import dao.PersonalDAO;
import model.Group;
import tool.Tool;
@WebServlet("/GroupLogin")
public class GroupLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
	HttpSession session;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
		String id = Tool.escapeStr(request.getParameter("id"));
		String gid = Tool.escapeStr(request.getParameter("gid"));
		String gpw = Tool.escapeStr(request.getParameter("gpw"));
		HttpSession session;
//		セッションを取得
		session = request.getSession(false);
		if(session == null){//セッションがあればTopにページ遷移
			response.sendRedirect("/CFT/html/personal/personalLogin.html");
			return;
		}

		// ログイン成功
		GroupDAO groupDAO = new GroupDAO();
		if (groupDAO.loginCheck(gid,gpw)) {
			//ユーザにgroupIdを登録
			PersonalDAO personalDAO = new PersonalDAO();
			if(personalDAO.setGroupId(id, gid)){
//				groupNameを取得
				Group group = new Group();
				group = groupDAO.findSearch(gid);
				//cookieに追加
				Cookie cookie = new Cookie("gId",URLEncoder.encode(gid, "UTF-8"));
				cookie.setPath("/");
				response.addCookie(cookie);
				cookie = new Cookie("gName",URLEncoder.encode(group.getGroupName(), "UTF-8"));
				cookie.setPath("/");
				response.addCookie(cookie);

				response.sendRedirect("/CFT/html/top/top.html");
			}else{
				response.sendError(HttpServletResponse.SC_FORBIDDEN);

			}
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