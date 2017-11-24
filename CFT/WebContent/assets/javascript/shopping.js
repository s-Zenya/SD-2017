showShopping();
showShopping_all();

function checkChange(shoppingId){
//	var todoId = null;
	var cookie_all = document.cookie;
	var gid;
//	todoId = document.getElementById("todoId").value
	var i=0;


		while(cookie_all.split( '; ' )[ i ] != null){

			if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
				gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
			}
			i++;
		}
		gid=decodeURIComponent(gid);

		console.log(gid+":"+shoppingId);

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
//						document.getElementById("Todoadd").value=null;
//						メッセージを更新
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

		console.log(gid+":"+contents);

    	fetch('/Shopping', {
    		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
    		credentials: 'include',
    		redirect: 'follow',
    		method: 'POST',
			body : 'gid='+gid+'&contents='+name+'      '+contents+'   ×'+amount,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
    	})
    	  .then(response => {
    		  console.log(response);
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
//	var date_source = new Date();
//	var date = date_source.getFullYear()+"-"+(date_source.getMonth()+1)+"-"+date_source.getDate();
	var i=0;


	while(cookie_all.split( '; ' )[ i ] != null){

		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
			gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}
		i++;
	}
	gid=decodeURIComponent(gid);

		var url= '/Shopping?gid='+gid;

//		console.log("showtodo");
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
    	    $('#toDayShopping table tbody').prepend('<tr id='+shoppingObj[k].shoppingId+'><td><input type="checkbox" name="" id="shoppingId" value="'+shoppingObj[k].shoppingId+'" onClick="checkChange('+shoppingObj[k].shoppingId+')"></td><td>'+shoppingObj[k].date+'</td><td>'+shoppingObj[k].contents+'</td></tr>');

    	}
    	else{
    	    $('#toDayShopping table tbody').prepend('<tr id='+shoppingObj[k].shoppingId+'><td><input type="checkbox" checked = "checked" name="" id="shoppingId" value="'+shoppingObj[k].shoppingId+'" onClick="checkChange('+shoppingObj[k].shoppingId+')"></td><td>'+shoppingObj[k].date+'</td><td>'+shoppingObj[k].contents+'</td></tr>');

    	}
    }
//  messageTableを一番下までスクロール
//    $("#toDayTodo").scrollTop($("#toDayTodo")[0].scrollHeight);
}

//メッセージの書き換え
function writeShopping_all(shoppingObj){
//	message要素の削除
	$("#allDayShopping table tbody").empty();

//    messageObjを一行ずつ表示
    for(let k in shoppingObj) {
    	    $('#allDayShopping table tbody').prepend('<tr id='+shoppingObj[k].shoppingId+'><td><input type="checkbox" name="" id="shoppingId" value="'+shoppingObj[k].shoppingId+'" onClick="checkChange('+shoppingObj[k].shoppingId+')"></td><td>'+shoppingObj[k].date+'</td><td>'+shoppingObj[k].contents+'</td></tr>');


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
return null;
}

function toDayTableOpen()
{
//	console.log("222");
document.getElementById("allDayShopping").style.display="block";
document.getElementById("toDayShopping").style.display="none";

return null;
}


