window.onload = function () {
    show('login-form')

    try{
      getToken()
        show('journey-form')
     

    } catch (error){
        console.log("unable to get token")
    }
      
    loadmap()
    loadButtonEvent()
} 
    function loadmap(){
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2ltYW1rZWxlIiwiYSI6ImNqbXQ5bHoybjA1aTkzdnMwZ2hkcW9hbDEifQ.1vyvKiOzmVpUyG6R3o-Zkg';
        window.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v10',
          center: [18.4241,-33.9249],
          zoom:9
        })
        window.startPin = new mapboxgl.Marker({draggable:true}).setLngLat([0,0])
        window.destinationPin = new mapboxgl.Marker({draggable:true}).setLngLat([0,0]).addTo(window.map)

        window.map.on('click',function(event){         
           if(window.startPoint == true){
               window.destinationPin.setLngLat(event.lngLat)
               window.startPoint = false
               document.getElementById('destination').value =event.lngLat.lng + ','+ event.lngLat.lat

               
           }
           else {
               window.startPin.setLngLat(event.lngLat)
               window.startPoint = true
               document.getElementById('start').value = event.lngLat.lng + ','+ event.lngLat.lat

           }
        })
    }
    
    function loadButtonEvent(){  
    var submitButton = document.getElementById('submit')    
    submitButton.addEventListener('click', function(event) {
        event.preventDefault()
         var clientId =getClientId()
        var clientSecret = getClientSecret()
         login(clientId,clientSecret)
    })
  var logoutButton = document.getElementById('logout-form')
       logoutButton.addEventListener('click', function(event){
           event.preventDefault()
           localStorage.removeItem('token')
           localStorage.removeItem('storageDate')

           show('login-form')
       })
       var journeyButton = document.getElementById('submit-journey')
       journeyButton.addEventListener('click',function(event){
           event.preventDefault()
           var start = document.getElementById('start').value
           var destination = document.getElementById('destination').value

           alert(start + ',' + destination)
       })
    
    var submitAgency = document.getElementById('submit-agency')    
    submitAgency.addEventListener('click', function(event) {
        event.preventDefault()
        var agenciesSelectDropdown = document.getElementById('agencies-select')
        var selectedAgency = agenciesSelectDropdown.options
        [agenciesSelectDropdown.selectedIndex].value            
        getLines(getToken(),selectedAgency)
    })
    var backButton = document.getElementById('back')    
    backButton.addEventListener('click', function(event) {
        event.preventDefault()
        show('agencies')
    })
  
}
function show(formId){
    document.getElementById('login-form').style.display='none'
    document.getElementById('agencies').style.display ='none'
    document.getElementById('lines').style.display ='none'
    document.getElementById('logout-form').style.display ='none'
    document.getElementById('map-form').style.display = 'none'

    document.getElementById(formId).style.display = 'block'
    if(formId == 'journey-form'){
        document.getElementById('logout-form').style.display = 'block'
        document.getElementById('map-form').style.display = 'block'
    }
}
function getToken(){
    var token = this.localStorage.getItem('token')
    if(token == null || token == undefined || token == 'undefined'){
      throw new Error('Token invalid')
    }
    return token
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
if(this.status == 200) {
    localStorage.setItem('token', token)
    localStorage.setItem('storageDate', Date.now().toLocaleString())

        show('journey-form')
        getAgencies(getToken())
} else {
    console.log("get token call failed")
}

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
        var agenciesList = document.getElementById('agencies-select')
        agenciesList.textContent = this.responseText
        addAgenciesToDropDown(response)
  
    });

    request.open('GET','https://platform.whereismytransport.com/api/agencies', true);
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.send();
}
function addAgenciesToDropDown(agenciesList) {
    var agenciesSelect = document.getElementById('agencies-select')
        agenciesSelect.options.length = 0
        agenciesSelect.options.add(new Option("Select an option", null, true, true))
        agenciesList.forEach(function(agency) {
        agenciesSelect.options.add(new Option(agency.name, agency.id, false, false))
    })
}
function getLines(token,agency){
    var request = new XMLHttpRequest();
    request.addEventListener('load', function () {
        var response = JSON.parse(this.responseText);
        var linesList = document.getElementById('lines-select')
            linesList.textContent = this.responseText

            show('lines')
            addLinesToDropDown(response)
  
    });

    request.open('GET', 'https://platform.whereismytransport.com/api/lines?agencies=' + agency, true);
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + token);
    request.send();
}
function addLinesToDropDown(lineslist){
    var linesSelect = document.getElementById('lines-select')
        linesSelect.options.length = 0
        linesSelect.options.add(new Option("Select an option", null, true, true))
        lineslist.forEach(function(lines) {
        linesSelect.options.add(new Option(lines.name, lines.id, false, false))
})  
}
