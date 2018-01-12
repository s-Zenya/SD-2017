function groupCreate(){

	var gid=document.getElementById("createGroupId").value;
	var gpw=document.getElementById("createGroupPass").value;
	var gname=document.getElementById("createGroupName").value;
    	fetch('/GroupCreate', {
    		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
    		credentials: 'include',
    		method: 'POST',
			body : 'gid='+gid+'&gpw='+gpw+'&gname='+gname,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
    	})
    	  .then(response => {
    		  console.log(response.status);
    		  createErrorCheck(response.status);
					if(200 == response.status) {
						document.getElementById("createForm").style.display="none";
						document.getElementById("inputForm").style.display="block";
					}
					return response.text();
    	  })

}

function groupLogin(){

	var gid=document.getElementById("LoginGroupId").value
	var gpw=document.getElementById("LoginGroupPass").value
	var cookie_all = document.cookie;
	var id;
	var tag;
	var i=0;
	
	//idに何も入力していない時にログインできないように処理
	if(gid == ""){
		loginErrorCheck(0);
		return;
	}

	while(cookie_all.split( '; ' )[ i ] != null){
		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'id'){
			id=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}
		i++;
	}
	id=decodeURIComponent(id);
//
//	var date1 = new Date();
//	date1.setTime(0);
  //有効期限を過去にして書き込む
//  document.cookie = "gid=;expires="+date1.toGMTString();

    	fetch('/GroupLogin', {
    		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
    		credentials: 'include',
    		redirect: 'follow',
    		method: 'POST',
			body : 'id='+id+'&gid='+gid+'&gpw='+gpw,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
    	})
    	  .then(response => {
    		  console.log(response);
    		  loginErrorCheck(response.status);
					if(response.status=="200"){
						location.href=response.url;
					}
    	    return response.text();
    	  })

}

//グループ作成画面の表示
function groupCreateOpen()
{
  document.getElementById("createForm").style.display="block";
  document.getElementById("inputForm").style.display="none";
  return null;
}
//グループログイン画面の表示
function groupInputOpen()
{
  document.getElementById("createForm").style.display="none";
  document.getElementById("inputForm").style.display="block";
  return null;
}

//入力値チェック（グループログイン）
function loginErrorCheck(responseStatus){
//	console.log(responseStatus);
	$("#addComment").remove();

	document.getElementById("loginGroupIdLabel").style.color = "black";
	document.getElementById("loginGroupPwLabel").style.color = "black";
	document.getElementById("createGroupIdLabel").style.color = "black";
	document.getElementById("createGroupPwLabel").style.color = "black";
	document.getElementById("createGroupNameLabel").style.color = "black";
	// 成功
	if(responseStatus == 200){
//		alert("アカウントを作成しました。");
		$('h2').append('<div id="addComment"><font color="green"><h4>グループに所属しました。</h4></font></div>');
		return;
	}
	// 失敗
	else{
		var gid=document.getElementById("LoginGroupId").value
		var gpw=document.getElementById("LoginGroupPass").value

		// 文字数確認
		if(gid.length >= 11 || gpw.length >= 11 || gid.length == 0 || gpw.length == 0 ){
			if(gid.length >= 11 || gid.length == 0){document.getElementById("loginGroupIdLabel").style.color = "red"}
			if(gpw.length >= 11 || gpw.length == 0){document.getElementById("loginGroupPwLabel").style.color = "red"}
			$('h2').append('<div id="addComment"><font color="red"><h4>error：赤く表示されている欄の文字数を確認してください。</h4></font></div>');
	        return;
		}

		$('h2').append('<div id="addComment"><font color="red"><h4>error：所属できませんでした。<br>IDまたはPWを確認してください。</h4></font></div>');
		return;
	}
}

//入力値チェック（グループアカウント作成）
function createErrorCheck(responseStatus){
	$("#addComment").remove();
	
	document.getElementById("loginGroupIdLabel").style.color = "black";
	document.getElementById("loginGroupPwLabel").style.color = "black";
	document.getElementById("createGroupIdLabel").style.color = "black";
	document.getElementById("createGroupPwLabel").style.color = "black";
	document.getElementById("createGroupNameLabel").style.color = "black";
	// 成功
	if(responseStatus == 200){
//		alert("アカウントを作成しました。");
		$('h2').append('<div id="addComment"><font color="green"><h4>グループを作成しました。</h4></font></div>');
		return;
	}
	// 失敗
	else{
		var gid=document.getElementById("createGroupId").value;
		var gpw=document.getElementById("createGroupPass").value;
		var gname=document.getElementById("createGroupName").value;

		// 文字数確認
		if(gid.length >= 11 || gpw.length >= 11 || gname.length >= 31 || gid.length == 0 || gpw.length == 0 || gname.length == 0){
			if(gid.length >= 11 || gid.length == 0){document.getElementById("createGroupIdLabel").style.color = "red"}
			if(gpw.length >= 11 || gpw.length == 0){document.getElementById("createGroupPwLabel").style.color = "red"}
			if(gname.length >= 31 || gname.length == 0){document.getElementById("createGroupNameLabel").style.color = "red"}
			$('h2').append('<div id="addComment"><font color="red"><h4>error：赤く表示されている欄の文字数を確認してください。</h4></font></div>');
	        return;
		}
		$('h2').append('<div id="addComment"><font color="red"><h4>error：グループを作成できませんでした。</h4></font></div>');
		return;
	}
}
