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
import model.Personal;
import tool.Tool;

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
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=utf-8");
		String id = Tool.escapeStr(request.getParameter("id"));
		String pw = Tool.escapeStr(request.getParameter("pw"));

		// ログイン成功
		PersonalDAO personalDAO = new PersonalDAO();

		if (personalDAO.loginCheck(id,pw)) {

			//cookieにid,nameを追加
			Personal personal = new Personal();
			personal = personalDAO.findSearch(id);
			Cookie cookie = new Cookie("id", URLEncoder.encode(id, "UTF-8"));
			cookie.setPath("/");
			response.addCookie(cookie);
			cookie = new Cookie("name",URLEncoder.encode(personal.getName(), "UTF-8") );
			cookie.setPath("/");
			response.addCookie(cookie);

//			groupNameを取得
			GroupDAO groupDAO = new GroupDAO();
			Group group = new Group();
//			ユーザにgroupIdが登録されている場合
			if(personal.getGroupId()!=null){

//				cookieにgroupId,groupNameを追加
				cookie = new Cookie("gId",URLEncoder.encode( personal.getGroupId(), "UTF-8"));
				cookie.setPath("/");
				response.addCookie(cookie);
//				cookieにgroupNameを追加
				group = groupDAO.findSearch(personal.getGroupId());
				cookie = new Cookie("gName",URLEncoder.encode(group.getGroupName(), "UTF-8") );
				cookie.setPath("/");
				response.addCookie(cookie);
			}else{
//				ユーザにグループがセットされていない場合groupのcookieを削除
				cookie = new Cookie("gId",URLEncoder.encode("", "UTF-8"));
				cookie.setPath("/");
				cookie.setMaxAge(0);
				response.addCookie(cookie);
				group = groupDAO.findSearch(personal.getGroupId());
				cookie = new Cookie("gName",URLEncoder.encode("", "UTF-8"));
				cookie.setPath("/");
				cookie.setMaxAge(0);
				response.addCookie(cookie);

			}
			//セッションを開始
			session = request.getSession(true);
			
			response.sendRedirect("/CFT/html/top/top.html");
			return;
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
