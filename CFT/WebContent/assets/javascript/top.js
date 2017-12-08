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

	$('#groupInfo').append('<div>ユーザー：'+name+'<div>');
	$('#groupInfo').append('<div>グループ：'+gname+'<div>');
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
