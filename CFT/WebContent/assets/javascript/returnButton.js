//帰りますボタンで使用
nameGet();


// 帰りますボタン
function returnButton(getName){
	var cookie_all = document.cookie;
	var gid;
	var id;
	var name="";
	var selectName=getName;
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
	gid=decodeURIComponent(gid);
	id=decodeURIComponent(id);

//	console.log(id+":"+gid+":"+name+":"+selectName);

	fetch('/ReturnButton', {
		mode: 'cors', // クロスオリジンリクエストをするのでCORSモードにする
		credentials: 'include',
		redirect: 'follow',
		method: 'POST',
		body : 'id='+id+'&gid='+gid+'&name='+name+'&selectName='+selectName,
		headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
	})
	.then(response => {
		console.log(response);
		if(response.status=="200"){
			// メッセージを更新
			showMessageFromButton();
		}
		return response.text();
	})


}
// 帰りなさいボタン
function goHomeButton(){
	var selectName="";
	// 指定された名前取得
	var f = document.selectBox.groupMember;
	for(var i = 1 ; i < f.options.length ; i++){
		if(f.options[i].selected){
			selectName=f.options[i].value;
			break;
		}
	}
//	console.log(selectName);
	if(selectName!=""){
		returnButton(selectName);
	}else{
		alert("グループメンバー名を選択してください。");
	}
}

function showMessageFromButton(){

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

	gid=decodeURIComponent(gid);
// console.dir(date);

	var url= '/Message?gid='+gid+'&date='+date;
	fetch(url, {
		mode: 'cors', // クロスオリジンリクエストをするのでCORSモードにする
		credentials: 'include',
		redirect: 'follow',
		method: 'GET',
		headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
	})
	.then(response => {
		// console.log(response);
		if(response.status=="200"){
		}
		return response.text();
	}).then(text => {
// メッセージの書き換え
		writeMessage($.parseJSON(text));
	});
}

// メッセージの書き換え
function writeMessage(messageObj){
// message要素の削除
	$("#message table tbody").empty();
// messageObjを一行ずつ表示
	for(let k in messageObj) {
		$('#message table tbody').append('<tr id='+messageObj[k].messageId+'><td>'+messageObj[k].name+'</td><td>'+messageObj[k].message+'</td></tr>');
	}
// messageTableを一番下までスクロール
	$("#message").scrollTop($("#message")[0].scrollHeight);
}


// 帰りなさいボタンのselectBoxに同じグループメンバーの名前を入れていく
function nameGet(){

	var cookie_all = document.cookie;
	var gid;
	var name;
	var i=0;

	while(cookie_all.split( '; ' )[ i ] != null){

		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
			gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}
		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'name'){
			name=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}
		i++;
	}
	// 文字のデコード
	name=decodeURIComponent(name);
	gid=decodeURIComponent(gid);

	var url= '/ReturnButton?gid='+gid;
	fetch(url, {
		mode: 'cors', // クロスオリジンリクエストをするのでCORSモードにする
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
		// メンバーセット
		nameSet($.parseJSON(text),name);
	});

}


function nameSet(memberObj,name){
	$('#selectName').append('<option>選択してください</option>');
	// メンバー数ループ
	for(let k in memberObj){
		// 自分は除く
		if(memberObj[k].name != name){
			$('#selectName').append('<option>'+memberObj[k].name+'</option>');  
		}
	}
}