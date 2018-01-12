showShopping();
wshowShopping_all();

function checkChange(shoppingId){
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
	fetch('/ChangeDone_shopping', {
		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
		credentials: 'include',
		redirect: 'follow',
		method: 'POST',
		body : 'gid='+gid+'&shoppingId='+shoppingId,
		headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
	})
	.then(response => {
		console.log(response);
		if(response.status=="200"){
			//入力欄を空欄にする
			showShopping();
			showShopping_all();
		}
		return response.text();
	})
}

function addshopping(){
	var cookie_all = document.cookie;
	var gid;
	var name;
	var contents=document.getElementById("addshopping").value
	var amount=document.getElementById("amount").value
	var i=0;
	if(contents!=''){
		while(cookie_all.split( '; ' )[ i ] != null){
			if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
				gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
			}
			if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'name'){
				name=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
			}
			i++;
		}
		gid=decodeURIComponent(gid);
		name=decodeURIComponent(name);
		console.log(amount);
		var bodyContent;
		if('' == amount) {
			bodyContent = 'gid='+gid+'&contents='+contents+'    登録者:' + name;
		}
		else {
			bodyContent = 'gid='+gid+'&contents='+contents+' '+amount+'個 登録者:'+name;
		}
		fetch('/Shopping', {
			mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
			credentials: 'include',
			redirect: 'follow',
			method: 'POST',
			body : bodyContent,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
		})
		.then(response => {
			console.log(response);
			errorCheck(response.status);
			if(response.status=="200"){
				//入力欄を空欄にする
				document.getElementById("addshopping").value=null;
				document.getElementById("amount").value=null;
				//						メッセージを更新
				showShopping();
				showShopping_all();
			}
			return response.text();
		})
	}
}

function showShopping(){
	var cookie_all = document.cookie;
	var gid;
	var date_source = new Date();
	var date = date_source.getFullYear()+"-"+(date_source.getMonth()+1)+"-"+date_source.getDate();
	var i=0;
	while(cookie_all.split( '; ' )[ i ] != null){
		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
			gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}
		i++;
	}
	gid=decodeURIComponent(gid);
	var url= '/Shopping?gid='+gid+'&date='+date;
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
		writeShopping($.parseJSON(text));
	});
}

function showShopping_all(){
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
	var url= '/Shopping?gid='+gid;
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
		writeShopping_all($.parseJSON(text));
	});
}
//メッセージの書き換え
function writeShopping(shoppingObj){
	//	message要素の削除
	$("#toDayShopping table tbody").empty();
	//    messageObjを一行ずつ表示
	for(let k in shoppingObj) {
		if(shoppingObj[k].done == "false"){
			$('#toDayShopping table tbody').prepend('<tr style="border-bottom: solid 1px #eee;" id='+shoppingObj[k].shoppingId+'><td><input type="checkbox" name="" id="shoppingId" value="'+shoppingObj[k].shoppingId+'" onClick="checkChange('+shoppingObj[k].shoppingId+')"></td><td>'+shoppingObj[k].date+'</td><td>'+shoppingObj[k].contents+'</td></tr>');
		}
		else{
			$('#toDayShopping table tbody').prepend('<tr style="border-bottom: solid 1px #eee;" id='+shoppingObj[k].shoppingId+'><td><input type="checkbox" checked = "checked" name="" id="shoppingId" value="'+shoppingObj[k].shoppingId+'" onClick="checkChange('+shoppingObj[k].shoppingId+')"></td><td>'+shoppingObj[k].date+'</td><td>'+shoppingObj[k].contents+'</td></tr>');
		}
	}
	//  messageTableを一番下までスクロール
	//    $("#toDayTodo").scrollTop($("#toDayTodo")[0].scrollHeight);
}
//メッセージの書き換え
function writeShopping_all(shoppingObj){
	$("#allDayShopping table tbody").empty();
	for(let k in shoppingObj) {
		$('#allDayShopping table tbody').prepend('<tr style="border-bottom: solid 1px #eee;" id='+shoppingObj[k].shoppingId+'><td><input type="checkbox" name="" id="shoppingId" value="'+shoppingObj[k].shoppingId+'" onClick="checkChange('+shoppingObj[k].shoppingId+')"></td><td>'+shoppingObj[k].date+'</td><td>'+shoppingObj[k].contents+'</td></tr>');
	}
	//  messageTableを一番下までスクロール
	//    $("#toDayTodo").scrollTop($("#toDayTodo")[0].scrollHeight);
}
//グループ作成画面の表示切り替え
function allDayTableOpen()
{
	//	console.log("1111");
	document.getElementById("toDayShopping").style.display="block";
	document.getElementById("allDayShopping").style.display="none";
	document.getElementsByClassName("dayBtn")[0].style.display="block";
	document.getElementsByClassName("allBtn")[0].style.display="none";
	return null;
}

function toDayTableOpen()
{
	//	console.log("222");
	document.getElementById("allDayShopping").style.display="block";
	document.getElementById("toDayShopping").style.display="none";
	document.getElementsByClassName("dayBtn")[0].style.display="none";
	document.getElementsByClassName("allBtn")[0].style.display="block";
	return null;
}

//入力値チェック
function errorCheck(responseStatus){
	console.log(responseStatus);
	$("#addComment").remove();
	// 成功
	if(responseStatus == 200){
		$('h1').append('<div id="addComment"><font color="green"><h4>買い物予定を追加しました。</h4></font></div>');
	}
	// 失敗
	else{
		var addShopping=document.getElementById("addshopping").value
		// 文字数確認
		if(addShopping.length >= 101 || addShopping.length == 0){
			$('h1').append('<div id="addComment"><font color="red"><h4>error：入力した文字数を確認してください。</h4></font></div>');
			return;
		}
		$('h1').append('<div id="addComment"><font color="red"><h4>error：買い物予定を追加できませんでした。</h4></font></div>');
		return;
	}
}
