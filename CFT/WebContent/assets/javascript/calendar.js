 // showCalendar();
 // addCalendar();
 var NowDate=new Date();
 //(例)'2017-11-01'
 var dateStr=NowDate.getFullYear()+'-'+("0"+(NowDate.getMonth()+1)).slice(-2)+'-'+("0"+NowDate.getDate()).slice(-2);
getCalendar(dateStr);

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
		addCalendarHtml+='<button type="button" class="btn btn-primary"  data-dismiss="modal">削除とか？</button>';
		addCalendarHtml+='</div>';
		addCalendarHtml+='</div>';
		addCalendarHtml+='</div>';
		addCalendarHtml+='</div>';
		$('#'+planObj[k].date).append(addCalendarHtml);
	}
}

//予定の追加
function addCalendar(year,mon,day){
	var cookie_all = document.cookie;
	var gid;
	var date = year+"-"+("0"+mon).slice(-2)+"-"+("0"+day).slice(-2);//ここで日付を取得
	var content=$("#calendar_content_form_"+date).val();
	var name;
	var i=0;
	console.log(date+":"+content);
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
				getCalendar(date);
			}
			console.dir(response.status);
			return response.text();
		});
	}
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
console.log(date);
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
			console.log(text);
			showCalendar($.parseJSON(text),date);
		});
	}
}
