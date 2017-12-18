
showMessage();
function addMessage(){
	var cookie_all = document.cookie;
	var gid;
	var id;
	var message=document.getElementById("addMessage").value
	var i=0;
	if(message!=''){
		while(cookie_all.split( '; ' )[ i ] != null){

			if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
				gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
			}
			if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'id'){
				id=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
			}
			i++;
		}
		gid=decodeURIComponent(gid);
		id=decodeURIComponent(id);
		fetch('/Message', {
			mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
			credentials: 'include',
			redirect: 'follow',
			method: 'POST',
			body : 'id='+id+'&gid='+gid+'&message='+message,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
		})
		.then(response => {
			console.log(response);
			//    		  errorCheck(response.status);
			if(response.status=="200"){
				//入力欄を空欄にする
				document.getElementById("addMessage").value=null;
				//メッセージを更新
				showMessage();
			}
			return response.text();
		})
	}
}

function showMessage(){

	var date_source  = new Date();
	var date = date_source.getFullYear()+"-"+(date_source.getMonth()+1)+"-"+date_source.getDate();
	var cookie_all = document.cookie;
	var gid = null;
	var i=0;
	while(cookie_all.split( '; ' )[ i ] != null){

		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
			gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}
		i++;
	}
	if(gid != null){
		gid=decodeURIComponent(gid);
		var url= '/Message?gid='+gid+'&date='+date;
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
			writeMessage($.parseJSON(text));
		});
	}else{
		$('#message table tbody').append('<tr id="caution"><td></td><td><b>家族グループにログインしてください</b></td></tr>');
		$('#caution').css('color','#ff0000');
	}
}

//メッセージの書き換え
function writeMessage(messageObj){
	console.log("writte");
	//	message要素の削除
	$("#message table tbody").empty();
	//    messageObjを一行ずつ表示
	for(let k in messageObj) {
		$('#message table tbody').append('<tr id='+messageObj[k].messageId+'><td>'+messageObj[k].name+'</td><td>'+messageObj[k].message+'</td></tr>');
	}
	//  messageTableを一番下までスクロール
	$("#message").scrollTop($("#message")[0].scrollHeight);
}

//入力値チェック
//更新のタイミング的に使えないのでなかったことに！！！
//function errorCheck(responseStatus){
//	console.log(responseStatus);
//	$("#addMessageComment").remove();
//
//	// 成功
//	if(responseStatus == 200){
//		console.log("追加");
//		$('#addMessage_form').append('<div id="addMessageComment"><font color="green"><h5>メッセージを追加しました。</h5></font></div>');
//		return;
//	}
//	// 失敗
//	else{
//		var addMessage=document.getElementById("addMessage").value
//
//		// 文字数確認
//		if(addMessage.length >= 101 || addMessage.length == 0){
//			$('#addMessage_form').append('<div id="addMessageComment"><font color="red"><h5>error：赤く表示されている欄の文字数を確認してください。</h5></font></div>');
//	        return;
//		}
//
//		$('#addMessage_form').append('<div id="addMessageComment"><font color="red"><h5>error：メッセージを追加できませんでした。</h5></font></div>');
//		return;
//	}
//}
