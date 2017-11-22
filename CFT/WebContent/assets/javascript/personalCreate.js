function personalCreate(){

	var id=document.getElementById("id").value
	var pw=document.getElementById("pw").value
	var name=document.getElementById("name").value
    	fetch('/PersonalCreate', {
    		method: 'POST',
			body : 'id='+id+'&pw='+pw+'&name='+name,
			headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
    	})
    	  .then(response => {
    		  console.log(response.status);
    	    return response.text();
    	  })

}