window.onload = function () {
    var submitButton = document.getElementById('submit')
    
    submitButton.addEventListener('click', function(event) {
        event.preventDefault()
        validateName() 
        validateSurname()
        validateAge()
        validatePhone()
    })
}


/**
 * This function gets the name 
 * from the name input
 */
function validateName() {
    var name = document.getElementById('name')
    var nameErrorMessage = document.getElementById('name-error')
    if(name.value ==="" || name.value === undefined)
    // show error message
    {
       nameErrorMessage.classList.remove('is-invisible')
 
    }
    else{
        nameErrorMessage.classList.add('is-invisible')
  
    }

}

/**
 * This function gets the surname
 * from the surname input
 */
function  validateSurname() {
    var surname = document.getElementById('surname')
    var surnameErrorMessage = document.getElementById('surname-error')
    if(surname.value ==="" || surname.value === undefined)
    // show error message
    {
       surnameErrorMessage.classList.remove('is-invisible')
 
    }
    else{
        surnameErrorMessage.classList.add('is-invisible')
  
    }

}


/**
 * This function gets the age
 * from the age input
 */
function validateAge(){
    var age = document.getElementById('age')
    var tooYoungMessage = document.getElementById('age-error-young')
    var middleErrorMessage = document.getElementById('age-error-middle')
    var oldErrorMessage =document.getElementById('age-error-old')
    if(age.value < 18){     
     tooYoungMessage.classList.remove('is-invisible')
    }
    else if(age.value > 38 && age.value < 42){
        middleErrorMessage.classList.remove('is-invisible')
    }
    else if(age.value > 64){
        oldErrorMessage.classList.remove('is-invisible')
    }
}

/**
 * This function gets the phone
 * number form the phone input
 */
function  validatePhone() {
    var phone = document.getElementById('phone')
    var phoneErrorMessage=document.getElementById('phone-error')
    var codeErrorMessage= document.getElementById('code-error')
    if(phone.length !==10 && phone.value !==073 ){
        phoneErrorMessage.classList.remove('is-invisible')
    }
    else{
        codeErrorMessage.classList.remove('is-invisible')
    }
}
