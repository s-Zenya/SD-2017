
function logout(){

  fetch('/Logout', {
    mode: 'cors', //クロスオリジンリクエストをするのでCORSモードにする
    credentials: 'include',
    redirect: 'follow',
    method: 'GET',
    headers : new Headers({'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8' })
  })  .then(response => {
      return response.text();
    })

}
