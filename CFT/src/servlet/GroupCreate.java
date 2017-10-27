package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dao.GroupDAO;

@WebServlet("/GroupCreate")
public class GroupCreate extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
//		System.out.println(request);
        request.setCharacterEncoding("UTF-8");
		String gid = request.getParameter("gid");
		String gpw = request.getParameter("gpw");
		String gname = request.getParameter("gname");

		System.out.print(" id="+gid);
		System.out.print(" pass="+gpw);
		System.out.print(" name="+gname);

		// ユーザー作成成功
		GroupDAO groupDAO = new GroupDAO();
		if (groupDAO.add(gid, gpw, gname)) {
			response.sendError(HttpServletResponse.SC_OK);


		} else {
			response.sendError(HttpServletResponse.SC_CONFLICT);

		}

	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.sendError(HttpServletResponse.SC_NOT_FOUND);

	}
}