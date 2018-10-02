window.onload = function () {
    if (hasToken()){
        getAgencies(this.localStorage.getItem('token'))
    }
  
    var submitButton = document.getElementById('submit')    
    submitButton.addEventListener('click', function(event) {
        event.preventDefault()
         var clientId =getClientId()
        var clientSecret = getClientSecret()
         login(clientId,clientSecret)
    })
}
function hasToken(){
    var token = localStorage.getItem('token')
    if(token){
        var loginForm = document.getElementById('login-form')
        //loginForm.classList.add('is-invisible')
        loginForm.style.display = 'none'

        return true
       
    }
    else{
        return false    
    }
}
function getClientId(){
    var clientId = document.getElementById('client-id')
        return clientId.value
    }
function getClientSecret(){
    var  clientSecret = document.getElementById('client-secret')
     return clientSecret.value
}
function login(clientId,clientSecret){
            // From whereismytransport developer page
            var CLIENT_ID = clientId;
            var CLIENT_SECRET = clientSecret;
            var payload = {
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'grant_type': 'client_credentials',
            'scope': 'transportapi:all'
};
var request = new XMLHttpRequest();
request.open('POST', 'https://identity.whereismytransport.com/connect/token', true);
request.addEventListener('load', function () {
var response = JSON.parse(this.responseText);
var token = response.access_token;
window.token = token;
localStorage.setItem('token',token)
localStorage.setItem('storageDate',Date.now().toLocaleString())
//   var resultWindow = document.getElementById('result')
//   resultWindow.textContent=token
});
request.setRequestHeader('Accept', 'application/json');
var formData = new FormData();

for (var key in payload) {
  formData.append(key, payload[key]);
}

request.send(formData);
}
function getAgencies(token){
    var request = new XMLHttpRequest();
    request.addEventListener('load', function () {
        var response = JSON.parse(this.responseText);
        var agenciesList = document.getElementById('agencies-list')
        agenciesList.textContent = this.responseText
    });

    request.open('GET', 'https://platform.whereismytransport.com/api/agencies', true);
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.send();
}
//login()