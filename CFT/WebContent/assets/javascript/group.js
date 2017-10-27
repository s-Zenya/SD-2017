function groupCreate(){

	var gid=document.getElementById("createGroupId").value
	var gpw=document.getElementById("createGroupPass").value
	var gname=document.getElementById("createGroupName").value
    	fetch('/CFT/GroupCreate', {
    		method: 'POST',
			body : 'gid='+gid+'&gpw='+gpw+'&gname='+gname,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
    	})
    	  .then(response => {
    		  console.log(response.status);
    	    return response.text();
    	  })

}

function groupLogin(){

	var gid=document.getElementById("LoginGroupId").value
	var gpw=document.getElementById("LoginGroupPass").value
	var cookie_all = document.cookie;
	var id;
	var tag;
	var i=0;

	while(cookie_all.split( '; ' )[ i ] != null){
		if(cookie_all.split( '; ' )[ i ].split( '=' )[ 0 ] == 'id'){
			id=cookie_all.split('; ')[ i ].split( '=' )[ 1 ];
			console.log("i="+i);
		}
		i++;
	}
//
//	var date1 = new Date();
//	date1.setTime(0);
  //有効期限を過去にして書き込む
//  document.cookie = "gid=;expires="+date1.toGMTString();

    	fetch('/CFT/GroupLogin', {
    		mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
    		credentials: 'include',
    		redirect: 'follow',
    		method: 'POST',
			body : 'id='+id+'&gid='+gid+'&gpw='+gpw,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
    	})
    	  .then(response => {
    		  console.log(response);
					if(response.status=="200"){
						 location.href=response.url;
					}
    	    return response.text();
    	  })

}

//グループ作成画面の表示
function groupCreateOpen()
{
  document.getElementById("createForm").style.display="block";

  return null;
}