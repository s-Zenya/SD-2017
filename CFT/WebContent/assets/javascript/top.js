//function getName(){

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

//}