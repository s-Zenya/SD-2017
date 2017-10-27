//function getName(){

	var cookie_all = document.cookie;
	var name;
	var groupName;
	var i=0;

	while(cookie_all.split( '; ' )[ i ] != null){

		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'name'){
			name=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}
		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'groupName'){
			groupName=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}

		i++;
	}
	if(groupName==null){
		groupName='';
	}
	$('#groupInfo').append('<div>'+name+'<div>');
	$('#groupInfo').append('<div>'+groupName+'<div>');

//}