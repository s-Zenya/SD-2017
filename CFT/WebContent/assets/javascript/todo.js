

function addTodo(){
	var cookie_all = document.cookie;
	var gid;
	var todo=document.getElementById("addTodo").value
	var i=0;
	if(message!=''){
		while(cookie_all.split( '; ' )[ i ] != null){

			if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
				gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
			}
			i++;
		}
		gid=decodeURIComponent(gid);

		console.log(gid+":"+contents);

    	fetch('/CFT/Todo', {
    		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
    		credentials: 'include',
    		redirect: 'follow',
    		method: 'POST',
			body : '&gid='+gid+'&todo='+todo,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
    	})
    	  .then(response => {
    		  console.log(response);
					if(response.status=="200"){
						//入力欄を空欄にする
						document.getElementById("addTodo").value=null;
//						メッセージを更新
						showMessage();
					}
    	    return response.text();
    	})
	}


}

function showMessage(){

	var cookie_all = document.cookie;
	var gid;
	var i=0;


	while(cookie_all.split( '; ' )[ i ] != null){

		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
			gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}
		i++;
	}

	gid=decodeURIComponent(gid);

		var url= '/CFT/Todo?gid='+gid;
    	fetch(url, {
    		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
    		credentials: 'include',
    		redirect: 'follow',
    		method: 'GET',
    		headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
    	})
    	  .then(response => {
    		  console.log(response);
    		  if(response.status=="200"){
    		  }
    	    return response.text();
    	  }).then(text => {
//    		  メッセージの書き換え
    		  writeTodo($.parseJSON(text));
    	  });
}

//メッセージの書き換え
function writeTodo(todoObj){
//	message要素の削除
	$("#todo table tbody").empty();
//    messageObjを一行ずつ表示
    for(let k in todoObj) {
	    $('#todo table tbody').prepend('<tr id='+todoObj[k].todoId+'><td><input type="checkbox" name="" value=""></td><td>'+todoObj[k].contents+'</td></tr>');
    }
//  messageTableを一番下までスクロール
    $("#todo").scrollTop($("#todo")[0].scrollHeight);
}
