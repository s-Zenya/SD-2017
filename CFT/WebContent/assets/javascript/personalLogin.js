//
//fetch('http://localhost:8080/CFT/SampleServlet').
//	then(response => {
//		console.log(response.status);
//	    return response.text();
//	 });


//function hoge(){
//
//	fetch('http://localhost:8080/CFT/SampleServlet').
//		then(response => {
//			console.log(response.status);
//		    return response.text();
//		 });




//	console.log("hoge");
//    	fetch('http://localhost:8080/CFT/SampleServlet?id="so"&pass="no"', {
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
			console.log("i="+i);
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
    	fetch('/CFT/PersonalLogin', {
    		mode: 'cors', // クロスオリジンリクエストをするのでCORSモードにする
    		credentials: 'include',
//    		redirect: 'follow',
    		method: 'POST',
			body : 'id='+inputId+'&pw='+inputPw,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
    	})
    	  .then(response => {
    		  console.log(response);
//    		  console.log("ff");
//    		  alert("f");
					if(response.status=="200"){
						 location.href=response.url;
					}
//    	    return response.text();
    	  })

}