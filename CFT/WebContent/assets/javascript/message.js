function addMessage(){

//	var Date  = new Date();
//	var year = Date.getFullYear();
//	var month = Date.getMonth()+1;
//	var day = Date.getDate();
//	var date = year+ "-" + month + "-" + day ;

	var cookie_all = document.cookie;
	var gid;
	var id;
	var message=document.getElementById("addMessage").value
	var i=0;


	while(cookie_all.split( '; ' )[ i ] != null){

		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'gId'){
			gid=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}
		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'id'){
			id=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
		}
		i++;
	}
	console.log(id+":"+gid+":"+message);

    	fetch('/CFT/Message', {
    		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
    		credentials: 'include',
    		redirect: 'follow',
    		method: 'POST',
			body : 'id='+id+'&gid='+gid+'&message='+message,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded' }),
    	})
    	  .then(response => {
    		  console.log(response);
					if(response.status=="200"){
					}
    	    return response.text();
    	  })


}
console.log("-----------------------------------------------------------");