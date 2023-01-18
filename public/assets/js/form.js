let registerForm = document.getElementById('registerForm')
let inputs = document.querySelectorAll('input')

let datefields = document.querySelectorAll('input[type="date"]')
let textfields = document.querySelectorAll('input[type="text"]')
let emailfields = document.querySelectorAll('input[type="email"]')
let passwordfields = document.querySelectorAll('input[type="password"]')

let username = document.querySelector('input[name="username"]')
let firstname = document.querySelector('input[name="firstname"]')

function init_fetch() { 
  registerForm.onsubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("username", username);
    formData.append("firstname",firstname);    

    let exData = {
      "username": 'justjoe',
      "password": 'justjoe',
      "repassword": 'justjoe',
    }

    console.log('formData',formData)

    let response = await fetch('/register', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: formData, // body data type must match "Content-Type" header
      // query: JSON.stringify( formData ),     
    })/*.then(function(res){
      console.log('ambot res', res)
    }).catch(function(err){
      console.log('yawa error', err)
    });*/

    console.log('form',  JSON.stringify(new FormData(registerForm)))

    let result = await response.json();

    console.log('result', result)

    alert(result.message);
  };
}

function init_request() {
  var clientServerOptions = {
      uri: '/register',
      body: JSON.stringify(postData),
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
  }
  request(clientServerOptions, function (error, response) {
      console.log(error,response.body);
      return;
  });
}



function init(){
  registerForm.onsubmit = async (e) => {
    // e.preventDefault();
    let formData = new FormData(registerForm)
    console.log('formData', formData)
  }
}

function getDate() {
  let today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth()+1
  let yyyy = today.getFullYear()

  return date = yyyy + '-' + mm + '-' + dd;
}

function maxrange(limit='today') {
  let today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth()+1
  let yyyy = today.getFullYear()

  if( limit === 'must18'){
    yyyy -= 18
  }

  if(dd < 10) { dd = '0' + dd}
  if(mm < 10) { mm = '0' + mm}

  let date = yyyy + '-' + mm + '-' + dd;

  let agefield = document.querySelector('input[name="age"]')

  datefields.forEach((elem, index) => {
    elem.onclick = function() {
      this.showPicker();
    }
    elem.onkeyup = function(e) {
      return e.preventDefault();
    }
    elem.onchange = function() {      
      let getyear = (elem.value).split('-')
      agefield.value = today.getFullYear() - getyear[0]
      console.log( agefield.value)
    }
    elem.setAttribute('max', date)
  })

  function validates() {

  }
}

function validates(field, text) {
  let validRegex = ''
  switch(field){
    case 'text':
      validRegex = /^[a-zA-Z\s]*$/
      break;
    case 'email':
      validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      break;
    case 'password':
      validRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      // Test@123
      // At least one upper case English letter, (?=.*?[A-Z])
      // At least one lower case English letter, (?=.*?[a-z])
      // At least one digit, (?=.*?[0-9])
      // At least one special character, (?=.*?[#?!@$%^&*-])
      // passwordfields.forEach((elem, index) => {
      //   // console.log(elem.value)
      //   console.log(elem[0])
      // })
      break;
    case 'tel':
      validRegex = /^(?:\+?\d{2}[- ]?\d{3}[- ]?\d{3}[- ]?\d{4})$/
      break;
    default:
      validRegex = text
      break
  }
  // console.log(`${field} ${text}`, text.match(validRegex))
  return text.match(validRegex) ? true : false
}

function validations() {
  inputs.forEach((elem, index) => {
    elem.onkeyup = function() {
      let value = elem.value
      
      // check if they have attr data-type
      // if(elem.getAttribute('data-type')) 
      // console.log(elem.getAttribute('data-type'))

      if( validates(elem.type, value) ) {
        elem.classList.remove('error')
      } else {
        elem.classList.add('error')
      }
    }
  })
}

function eyeslash() {
  let eyes = document.querySelectorAll('input[type="password"] ~ .fas')  
  eyes.forEach((elem, index) => {
    elem.onclick = function() {
      const password = elem.parentNode.children[0]
      const type = password.getAttribute("type") === "password" ? "text" : "password"
      password.setAttribute("type", type)
      elem.classList.toggle("fa-eye")
    }
  })
}

validations()
eyeslash()
maxrange('must18')
init()
 // console.dir(eyes)
