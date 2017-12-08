var headerHTML = '<TABLE border="0" bgcolor="#ffffff" width="100%" cellspacing="0" cellpadding="0" height="50">';
headerHTML += '<TR><TD>&nbsp;<FONT color="#000000" size="5">CFT</FONT>';
headerHTML += '<FONT color="#424242" size="4">.CommunicationFamliyTool<button class="btn btn-primary col-sm-2" onClick="recStart()">rec</button><br></FONT></TD></TR>';
headerHTML += '<TR bgcolor="#424242" height="2"><TD></TD></TR></TABLE>';
document.write(headerHTML);
console.log("hoge");


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
	var eWork = ["ToDo","Shopping","Calendar"];

	var nowDate=new Date();
	var year = nowDate.getFullYear();
	var mon = 0;
	var date = 0;
	var tool;
	var str = "";
	var speechContent = ''
	//時間を探索
	for (var i = 0; i < when.length; i++) {
		for (var j = 0; j < when[i].length; j++) {
			if ((result.match(when[i][j]) != null) && (i < 3)) {
				speechContent += result.match(when[i][j]);
				nowDate.setDate(nowDate.getDate()+i);
			}
			if ((result.match(/\d{1,2}月/) != null) && (0 == mon)) {
					str = result.match(/\d{1,2}月/);
					speechContent += str;
					nowDate.setMonth((str.toString().match(/\d{1,2}/)) -  1);
          mon = 1;
			}
			if ((result.match(/\d{1,2}日/) != null) && (0 == date)) {
				str = result.match(/\d{1,2}日/).toString();
				speechContent += str;
				nowDate.setDate(str.toString().match(/\d{1,2}/));
        date = 1;
			}
		}
	}
	speechContent += "の";
	//機能を探索
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
	date = (year+"-"+(("0"+mon).slice(-2))+"-"+(("0"+date).slice(-2))).toString();
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
  console.log(text);
  		var dataObj = $.parseJSON(text);
  		// ===================================================================================
  		var i = 0;
  		if ("ToDo" == tool) {
  			//speechContentにやることを追加
  			speechContent += "やることは";
  			for(let k in dataObj) {
  				if (dataObj[k].done == "false") {
  					speechContent += dataObj[k].contents+",";
  					i = 1;
  				}
  			}
  			if (0 == i) {
  				speechContent += "ありません";
  			}
  			else {
  				speechContent = speechContent.slice(0,-1);
  				speechContent += "です。";
  			}
  		}
  		else if ("Shopping" == tool) {
  			//speechContentに買うものを追加
  			var replace = 1;
  			speechContent += "買うものは";
  			for(let k in dataObj) {
  				if (dataObj[k].done == "false") {
  					speechContent += dataObj[k].contents+",";
  					i = 1;
  				}
  			}
  			for (;;) {
  				speechContent = speechContent.replace("&nbsp;","");
  				if (speechContent.indexOf("&nbsp;") == -1) {
  					break;
  				}
  			}
  			if (0 == i) {
  				speechContent += "ありません";
  			}
  			else {
  				speechContent = speechContent.slice(0,-1);
  				speechContent += "です。";
  			}

  		}
  		else if ('Calendar' == tool) {
  			//speechContentに予定を追加
  			speechContent += "予定は";
  			for(let k in dataObj) {
  				if (dataObj[k].date == date) {
  					speechContent += dataObj[k].content+"と";
  					i = 1;
  				}
  			}
  			if (0 == i) {
  				speechContent += "ありません";
  			}
  			else {
  				speechContent = speechContent.slice(0,-1);
  				speechContent += "です。";
  			}
  		}
  		else {
  			speechContent = "音声が取得できませんでした";
  		}
  		say(speechContent);
  		// showCalendar($.parseJSON(text),date);
  	});
  }

  function say(content) {
  	var synthes = new SpeechSynthesisUtterance();
  	synthes.voiceURI = 'native';
  	synthes.volume = 1;
  	synthes.rate = 0.6;
  	synthes.pitch = 4;
  	synthes.text = content;
  	synthes.lang = 'ja-JP';
  	synthes.onend = function(e) {
  	    alert(content);
  	};
  	speechSynthesis.speak(synthes);
  }
}
// ------------------------------------------------------------------------------------------------------

function recStart(){
	recognition.start();
}
