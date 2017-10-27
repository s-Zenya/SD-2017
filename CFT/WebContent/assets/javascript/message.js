getMessage();



function addMessage(){
	var cookie_all = document.cookie;
	var gid;
	var id;
	var message=document.getElementById("addMessage").value
	var i=0;
	while(cookie_all.split( '; ' )[ i ] != null){

		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
			gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}
		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'id'){
			id=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}
		i++;
	}
	console.log(id+":"+gid+":"+message);

    	fetch('/CFT/Message', {
    		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
    		credentials: 'include',
    		redirect: 'follow',
    		method: 'POST',
			body : 'id='+id+'&gid='+gid+'&message='+message,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded' }),
    	})
    	  .then(response => {
    		  console.log(response);
					if(response.status=="200"){
						getMessage();
					}
    	    return response.text();
    	  })


}

function getMessage(){

	var date_source  = new Date();
	var date = date_source.getFullYear()+"-"+(date_source.getMonth()+1)+"-"+date_source.getDate();
	var cookie_all = document.cookie;
	var gid;
	var i=0;


	while(cookie_all.split( '; ' )[ i ] != null){

		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
			gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}
		i++;
	}
	console.dir(date);

		var url= '/CFT/Message?gid='+gid+'&date='+date;
    	fetch(url, {
    		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
    		credentials: 'include',
    		redirect: 'follow',
    		method: 'GET',
    	})
    	  .then(response => {
    		  console.log(response);
    		  if(response.status=="200"){
    		  }
    	    return response.text();
    	  }).then(text => {
//    		  メッセージの書き換え
    		  writeMessage($.parseJSON(text));
    	  });
}


//メッセージの書き換え
function writeMessage(messageObj){
//	message要素の削除
	$("#message table tbody").empty();
//    messageObjを一行ずつ表示
    for(let k in messageObj) {
	    $('#message table tbody').append('<tr><td>'+messageObj[k].name+'</td><td>'+messageObj[k].message+'</td></tr>');
    }
//  messageTableを一番下までスクロール
    $("#message").scrollTop($("#message")[0].scrollHeight);
}
