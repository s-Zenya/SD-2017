showShopping();

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

    	fetch('/CFT/ChangeDone_shopping', {
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
					}
    	    return response.text();
    	})
	}




function addshopping(){

	var cookie_all = document.cookie;
	var gid;
	var contents=document.getElementById("addshopping").value
	var amount=document.getElementById("amount").value
	var i=0;

	if(contents!=''){
		while(cookie_all.split( '; ' )[ i ] != null){

			if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
				gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
			}
			i++;
		}
		gid=decodeURIComponent(gid);

		console.log(gid+":"+contents);

    	fetch('/CFT/Shopping', {
    		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
    		credentials: 'include',
    		redirect: 'follow',
    		method: 'POST',
			body : 'gid='+gid+'&contents='+contents+'    ×'+amount,
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

		var url= '/CFT/Shopping?gid='+gid+'&date='+date;

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
    		  writeShopping($.parseJSON(text));
    	  });

}



//メッセージの書き換え
function writeShopping(shoppingObj){
//	message要素の削除
	$("#shopping table tbody").empty();

//    messageObjを一行ずつ表示
    for(let k in shoppingObj) {
    	if(shoppingObj[k].done == "false"){
    	    $('#shopping table tbody').prepend('<tr id='+shoppingObj[k].shoppingId+'><td><input type="checkbox" name="" id="shoppingId" value="'+shoppingObj[k].shoppingId+'" onClick="checkChange('+shoppingObj[k].shoppingId+')"></td><td>'+shoppingObj[k].date+'</td><td>'+shoppingObj[k].contents+'</td></tr>');

    	}
    	else{
    	    $('#shopping table tbody').prepend('<tr id='+shoppingObj[k].shoppingId+'><td><input type="checkbox" checked = "checked" name="" id="shoppingId" value="'+shoppingObj[k].shoppingId+'" onClick="checkChange('+shoppingObj[k].shoppingId+')"></td><td>'+shoppingObj[k].date+'</td><td>'+shoppingObj[k].contents+'</td></tr>');

    	}
    }
//  messageTableを一番下までスクロール
//    $("#toDayTodo").scrollTop($("#toDayTodo")[0].scrollHeight);
}




