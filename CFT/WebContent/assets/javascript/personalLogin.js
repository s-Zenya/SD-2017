//
//fetch('http://localhost:8080/SampleServlet').
//	then(response => {
//		console.log(response.status);
//	    return response.text();
//	 });


//function hoge(){
//
//	fetch('http://localhost:8080/SampleServlet').
//		then(response => {
//			console.log(response.status);
//		    return response.text();
//		 });




//	console.log("hoge");
//    	fetch('http://localhost:8080/SampleServlet?id="so"&pass="no"', {
//    		method: 'GET',
//    		parameter:{
//   		  	id: "idid",
//   		  	pass: "passpass"
//    	}
//
//
//
//    	})
//
//
//    	  .then(response => {
//    		  console.log(response.status);
//    	    return response.text();
//    	  })
//
//
//
//
//
//    	  .then((text) => {
//    		  var data = text;
//    		  var obj = (new Function("return " + data))();
//    		  console.dir(obj);
//    		  });

//}

function personalLogin(){

	var inputId=document.getElementById("id").value
	var inputPw=document.getElementById("pw").value
	var cookie_all = document.cookie;
	var id;
	var tag;
	var i=0;

	while(cookie_all.split( '; ' )[ i ] != null){
		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'id'){
			id=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
//			console.log("i="+i);
		}
		i++;
	}
	id=decodeURIComponent(id);
//
// var date1 = new Date();
// date1.setTime(0);
  // 有効期限を過去にして書き込む
// document.cookie = "gid=;expires="+date1.toGMTString();
//		console.log(inputId+","+inputPw);
    	fetch('/PersonalLogin', {
    		mode: 'cors', // クロスオリジンリクエストをするのでCORSモードにする
    		credentials: 'include',
//    		redirect: 'follow',
    		method: 'POST',
			body : 'id='+inputId+'&pw='+inputPw,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
    	})
    	  .then(response => {
//    		  console.log("::::"+response.status);
    		  errorCheck(response.status);
					if(response.status=="200"){
						 location.href=response.url;
					}
//    	    return response.text();
    	  })

}

function errorCheck(responseStatus){
	console.log(responseStatus);
	
	document.getElementById("idLabel").style.color = "black";
	document.getElementById("pwLabel").style.color = "black";
	
	// 成功
	if(responseStatus == 200){
		alert("ログインしました。\nトップページへ移動します。");
	}
	// 失敗
	else{
		var id=document.getElementById("id").value
		var pw=document.getElementById("pw").value
		
		// 文字数確認
		if(id.length >= 11 || pw.length >= 11){
			if(id.length >= 11){document.getElementById("idLabel").style.color = "red"}
			if(pw.length >= 11){document.getElementById("pwLabel").style.color = "red"}

	        alert("error：赤く表示されている欄の文字数を確認してください。");
	        return;
		}
		// ID欄が空白じゃないか
		else if(id.length == 0){
			document.getElementById("idLabel").style.color = "red";
			alert("error：IDを入力してください。");
			return;
		}
		
		alert("error：ログインできませんでした。\nIDまたはPWを確認してください。");
	}
}