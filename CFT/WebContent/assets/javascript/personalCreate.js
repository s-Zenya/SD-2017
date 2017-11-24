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
	
	document.getElementById("idLabel").style.color = "black";
	document.getElementById("pwLabel").style.color = "black";
	document.getElementById("nameLabel").style.color = "black";
	// 成功
	if(responseStatus == 200){
		alert("アカウントを作成しました。");
	}
	// 失敗
	else{
		var id=document.getElementById("id").value
		var pw=document.getElementById("pw").value
		var name=document.getElementById("name").value
		
		// 文字数確認
		if(id.length >= 11 || pw.length >= 11 || name.length >= 31){
			if(id.length >= 11){document.getElementById("idLabel").style.color = "red"}
			if(pw.length >= 11){document.getElementById("pwLabel").style.color = "red"}
			if(name.length >= 31){document.getElementById("nameLabel").style.color = "red"}
	        alert("error：赤く表示されている欄の文字数を確認してください。");
	        return;
		}
		// ID欄が空白じゃないか
		else if(id.length == 0){
			document.getElementById("idLabel").style.color = "red";
			alert("error：IDを入力してください。");
			return;
		}
		
		alert("error：アカウントを作成できませんでした。");
	}
}