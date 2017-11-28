//function getName(){
getTop();
// getWeather();

function getTop(){
	var cookie_all = document.cookie;
	var name;
	var gname;
	var i=0;
	while(cookie_all.split( '; ' )[ i ] != null){
		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'name'){
			name=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}
		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gName'){
			gname=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}
		i++;
	}
	if(gname==null){
		gname='';
	}
	//文字のデコード
	name=decodeURIComponent(name);
	gname=decodeURIComponent(gname);

	$('#groupInfo').append('<div>'+name+'<div>');
	$('#groupInfo').append('<div>'+gname+'<div>');
}

// ==音声認識========================================================================

var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
var recognition = new webkitSpeechRecognition();
var speechRecognitionList = new webkitSpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'ja-JP';
recognition.interimResults = false;
recognition.maxAlternatives = 1; //配列の数

recognition.onresult = function(event) {
  var result = event.results[0][0].transcript;
	//探索する値
	var when = [["今日"],["明日","翌日"],["明後日"],[/\d{1,2}日/],[/\d{1,2}月/]];
	var jWork = [["やること"],["買"],["予定"]];
	var eWork = ["Todo","Shopping","Calendar"];

	var nowDate=new Date();
	var year = nowDate.getFullYear();
	var mon;
	var date;
	var tool;
	var str = "";
	console.log("leng:"+when.length);
	for (var i = 0; i < when.length; i++) {
		for (var j = 0; j < when[i].length; j++) {
			if ((result.match(when[i][j]) != null) && (i < 3)) {
				nowDate.setDate(nowDate.getDate()+i);
			}
			if (result.match(/\d{1,2}月/) != null) {
					str = result.match(/\d{1,2}月/);
					nowDate.setMonth((str.toString().match(/\d{1,2}/)) -  1);
			}
			if (result.match(/\d{1,2}日/) != null) {
				str = result.match(/\d{1,2}日/).toString();
				nowDate.setDate(str.toString().match(/\d{1,2}/));
			}
		}

	}
	for (var i = 0; i < jWork.length; i++) {
		for (var j = 0; j < jWork[i].length; j++) {
			if ( result.indexOf(jWork[i][j]) != -1) {
				tool = eWork[i];
			}
		}
	}
	date = nowDate.getDate();
	year = nowDate.getFullYear();
	mon = nowDate.getMonth()+1;
	alert(year+":"+mon+":"+date+":"+tool);
	date = (year+"-"+(("0"+mon).slice(-2))+"-"+(("0"+date).slice(-2))).toString();
	console.log(date);
// -----ここに音声取得後の処理-----------------------------------------------------------------------------

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
	var url= '/'+tool+'?gid='+gid+'&date='+date;
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
		console.dir(text);
		// showCalendar($.parseJSON(text),date);
	});
}
// ------------------------------------------------------------------------------------------------------
}
function recStart(){
	recognition.start();
}






// --天気取得---------------------------------------------------------------------
// function getWeather(){





// 	var i=0;
// 	var url= 'http://api.openweathermap.org/data/2.5/forecast?q=Tokyo,jp&units=metric&APPID=e4eabde8b2fd7bedbfda7d0f87285092';
// 	fetch(url, {
// 		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
// 		// credentials: 'include',
// 		// redirect: 'follow',
// 		method: 'GET',
// 		dataType: "json"
// 	// headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
// 	}).then(response => {
// 		// if(response.status=="200"){
// 			// console.log("deleteCalendar OK");
// 			console.dir(response);
// 		// }
// 		console.dir(response.status);
// 		// return response.text();
// 	}).then(data => {
// 		console.dir(data);
// 	});
// // }
