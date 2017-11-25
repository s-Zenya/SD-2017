function personalCreate(){

	var id=document.getElementById("id").value
	var pw=document.getElementById("pw").value
	var name=document.getElementById("name").value
    	fetch('/PersonalCreate', {
    		method: 'POST',
			body : 'id='+id+'&pw='+pw+'&name='+name,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
    	})
    	  .then(response => {
//    		  console.log(response.status);
    		  errorCheck(response.status);
    		  
    	    return response.text();
    	  })

}

function errorCheck(responseStatus){
	console.log(responseStatus);
	$("#addComment").remove();
	
	document.getElementById("idLabel").style.color = "black";
	document.getElementById("pwLabel").style.color = "black";
	document.getElementById("nameLabel").style.color = "black";
	// 成功
	if(responseStatus == 200){
//		alert("アカウントを作成しました。");
		$('h1').append('<div id="addComment"><font color="green"><h4>アカウントを作成しました。</h4></font></div>');
		return;
	}
	// 失敗
	else{
		var id=document.getElementById("id").value
		var pw=document.getElementById("pw").value
		var name=document.getElementById("name").value
		
		// 文字数確認
		if(id.length >= 11 || pw.length >= 11 || name.length >= 31 || id.length == 0 || pw.length == 0 || name.length == 0){
			if(id.length >= 11 || id.length == 0){document.getElementById("idLabel").style.color = "red"}
			if(pw.length >= 11 || pw.length == 0){document.getElementById("pwLabel").style.color = "red"}
			if(name.length >= 31 || name.length == 0){document.getElementById("nameLabel").style.color = "red"}
			$('h1').append('<div id="addComment"><font color="red"><h4>error：赤く表示されている欄の文字数を確認してください。</h4></font></div>');
//	        alert("error：赤く表示されている欄の文字数を確認してください。");
	        return;
		}
		
		$('h1').append('<div id="addComment"><font color="red"><h4>error：アカウントを作成できませんでした。</h4></font></div>');
		return;
	}
}