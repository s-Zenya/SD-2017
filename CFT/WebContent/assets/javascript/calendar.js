 // showCalendar();
 // addCalendar();
 var NowDate=new Date();
 //(例)'2017-11-01'
 var dateStr=NowDate.getFullYear()+'-'+("0"+(NowDate.getMonth()+1)).slice(-2)+'-'+("0"+NowDate.getDate()).slice(-2);
// getCalendar(dateStr);

function showCalendar(planObj,dateMain){
	var displayYear = [];//先月、今月、来月の西暦が入る
	var displayMon = [];//先月、今月、来月の月が入る
	var startMon = dateMain.substr(5,2)-1;
	for(var i=0;i<3;i++){
		displayYear[i]=dateMain.substr(0,4);
		displayMon[i]=startMon+i%13;
		if(displayMon[i]==0){//月の繰り下がりの処理
			displayYear[i]--;
			displayMon[i]=12;
		}else if(displayMon[i]==13){//月の繰り上がりの処理
			displayYear[i]++;
			displayMon[i]=1;
		}
	}
	//データの削除
	for(var i=0;i<3;i++){
		for(var j=1;j<=31;j++){
			$('#'+displayYear[i]+'-'+("0"+displayMon[i]).slice(-2)+'-'+("0"+j).slice(-2)).empty();
		}
	}
	//htmlへ書き込み
	for(let k in planObj) {
		var addCalendarHtml="";
		addCalendarHtml+='<button id="plans" class="btn btn-mini btn-plan" data-toggle="modal" data-target="#modal_'+planObj[k].calendarId+'">'+planObj[k].content+'</button><br>';
		addCalendarHtml+='<div class="modal" id="modal_'+planObj[k].calendarId+'" tabindex="-1">';
		addCalendarHtml+='<div class="modal-dialog">';
		addCalendarHtml+='<div class="modal-content">';
		addCalendarHtml+='<div class="modal-header">';
		addCalendarHtml+='<h4 class="modal-title" id="modal-label">詳細</h4>';//ここヘッダー
		addCalendarHtml+='<button type="button" class="close" data-dismiss="modal">';
		addCalendarHtml+='<span aria-hidden="true">&times;</span>';//閉じるボタン(右上)
		addCalendarHtml+='</button>';
		addCalendarHtml+='</div>';
		addCalendarHtml+='<div class="modal-body">';//ここからモーダルのbody
		addCalendarHtml+='<span id="calendar_plan_form_'+planObj[k].calendarId+'">日付:'+planObj[k].date+'</span><br>';
		addCalendarHtml+='<span>作成者:'+planObj[k].name+'</span><br>';
		addCalendarHtml+='<span>内容:'+planObj[k].content+'</span><br>';
		addCalendarHtml+='</div>';
		addCalendarHtml+='<div class="modal-footer">';
		addCalendarHtml+='<button type="button" class="btn btn-default" data-dismiss="modal">閉じる</button>';
		addCalendarHtml+='<button type="button" class="btn btn-primary" onclick = "deleteCalendar('+planObj[k].calendarId+')"  data-dismiss="modal">削除</button>';
		addCalendarHtml+='</div>';
		addCalendarHtml+='</div>';
		addCalendarHtml+='</div>';
		addCalendarHtml+='</div>';
		$('#'+planObj[k].date).append(addCalendarHtml);
	}
}

// Topページでのカレンダー描画-
function showCalendarTop(planObj,dateMain){
  var countPlan = 0;
	//htmlへ書き込み
	for(let k in planObj) {
		var addCalendarHtml="";
		addCalendarHtml+='<tr>';
		addCalendarHtml+='<td>'+planObj[k].date+'</td>';
		addCalendarHtml+='<td>'+planObj[k].content+'</td>';
		addCalendarHtml+='</tr>';
    if(dateStr<=planObj[k].date){
  		$('#calendar_table tbody').append(addCalendarHtml);
      countPlan++;
    }
    if(20<countPlan){
      break;
    }
	}
}
//予定の追加
function addCalendar(year,mon,day){
	var cookie_all = document.cookie;
	var gid;
	var date = year+"-"+("0"+mon).slice(-2)+"-"+("0"+day).slice(-2);//ここで日付を取得
	var content=$("#calendar_content_form_"+date).val();
  document.getElementById("calendar_content_form_"+date).value = "";
	var name;
	var i=0;
	if(content.length>0){
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

   	fetch('/Calendar', {
   		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
   		credentials: 'include',
   		redirect: 'follow',
   		method: 'POST',
			body : 'gid='+gid+'&date='+date+'&content='+content+'&name='+name,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
   	}).then(response => {
   		errorCheck(response.status,year,mon,day);
			if(response.status=="200"){
				getCalendar(date);
			}
			console.dir(response.status);
			return response.text();
		});
	}
}

//予定の削除
function deleteCalendar(calendarId){
	var cookie_all = document.cookie;
	var calendarId;
	var i=0;
	var url= '/Calendar?calendarId='+calendarId;
   	fetch(url, {
   		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
   		credentials: 'include',
   		redirect: 'follow',
   		method: 'GET',
		headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
   	}).then(response => {
			if(response.status=="200"){
				// console.log("deleteCalendar OK");
				getCalendar(dateStr);
			}
			console.dir(response.status);
			return response.text();
		});
}

//予定の取得
function getCalendar(date){
	var cookie_all = document.cookie;
	var gid;
	var i=0;
	if(date!=''){
		while(cookie_all.split( '; ' )[ i ] != null){
			if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
				gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
			}
			i++;
		}
		gid=decodeURIComponent(gid);
		var url= '/Calendar?gid='+gid+'&date='+date;
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
			// console.log(text);
			showCalendar($.parseJSON(text),date);
		});
	}
}



//Top画面用予定の取得
function getCalendarTop(date){
	var cookie_all = document.cookie;
	var gid;
	var i=0;
	if(date!=''){
		while(cookie_all.split( '; ' )[ i ] != null){
			if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
				gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
			}
			i++;
		}
		gid=decodeURIComponent(gid);
		var url= '/Calendar?gid='+gid+'&date='+date;
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
			// console.log(text);
			showCalendarTop($.parseJSON(text),date);
		});
	}
}


//入力値チェック
function errorCheck(responseStatus,year,mon,day){
	// console.log(responseStatus);
	$("#addComment").remove();

	// 成功
	if(responseStatus == 200){
		$('h1').append('<div id="addComment"><font color="green"><h4>予定を追加しました。</h4></font></div>');
	}
	// 失敗
	else{
		var date = year+"-"+("0"+mon).slice(-2)+"-"+("0"+day).slice(-2);//ここで日付を取得
		var content=$("#calendar_content_form_"+date).val();

		// 文字数確認
		if(content.length >= 101 || content.length == 0){
			$('h1').append('<div id="addComment"><font color="red"><h4>error：入力した文字数を確認してください。</h4></font></div>');
	        return;
		}

		$('h1').append('<div id="addComment"><font color="red"><h4>error：予定を追加できませんでした。</h4></font></div>');
		return;
	}
}
