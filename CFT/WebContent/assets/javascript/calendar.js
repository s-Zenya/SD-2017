 // showCalendar();
// addCalendar();
getCalendar();

function showCalendar(planObj){
	//htmlへ書き込み
	for(let k in planObj) {
		$('#'+planObj[k].date).append(planObj[k].content+'<br>');
	}
}

//予定の追加
function addCalendar(){
	var cookie_all = document.cookie;
	var gid;
	var date;
	// var date = document.getElementById("");//ここで日付を取得
	// var content=document.getElementById("").value; //ここで予定を取得
	var name;
	var i=0;
//----テスト(一時的)-------------------------------------------
	date="2017-11-03";
	content="hgoehoge";
// -----------------------------------------------------------
	if(content!=''){
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

   	fetch('/CFT/Calendar', {
   		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
   		credentials: 'include',
   		redirect: 'follow',
   		method: 'POST',
			body : 'gid='+gid+'&date='+date+'&content='+content+'&name='+name,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
   	}).then(response => {
			console.log(response);
			if(response.status=="200"){
			}
			console.dir(response.status);
			return response.text();
		});
	}
}

//予定の取得
function getCalendar(){
	var cookie_all = document.cookie;
	var gid;
	var date;
	// var date = document.getElementById("");//ここで日付を取得
	// var content=document.getElementById("").value; //ここで予定を取得
	var i=0;
//----テスト(一時的)-------------------------------------------
	date="2017-11-02";
// -----------------------------------------------------------
	if(date!=''){
		while(cookie_all.split( '; ' )[ i ] != null){

			if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
				gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
			}
			i++;
		}
		gid=decodeURIComponent(gid);

		var url= '/CFT/Calendar?gid='+gid+'&date='+date;
		fetch(url, {
			mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
			credentials: 'include',
			redirect: 'follow',
			method: 'GET',
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
		}).then(response => {
			if(response.status=="200"){
			}
			return response.text();
		}).then(text => {
//    		  予定の書き換え
			showCalendar($.parseJSON(text));
		});
	}
}
