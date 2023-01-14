let registerForm = document.getElementById('registerForm')
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

const validate = {
    textfield(text) {
      var validRegex = /^[a-zA-Z\s]*$/;
      return text.match(validRegex) ? true : false
    },
    emailfield(text) {
      // var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return text.match(validRegex) ? true : false
    },
    passwordfield(text) {
      var validRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      return text.match(validRegex) ? true : false
    },
};

const validation = {
  textfield: function(){
    textfields.forEach((elem, index) => {
      
      // elem.onchange = function(){
      elem.onkeyup = function(){
        let value = elem.value
        if (validate.textfield(value)) {
          elem.classList.remove('error')
        } else {
          elem.classList.add('error')
        } 
        console.log(value)
      }
    })
  },
  emailfield: function() {
    emailfields.forEach((elem, index) => {
      elem.onkeyup = function(){
        let value = elem.value
        if (validate.emailfield(value)) {
          elem.classList.remove('error')
        } else {
          elem.classList.add('error')
        } 
        console.log(value)
      }
    })
  }, 
  passwordfield: function() {
    passwordfields.forEach((elem, index) => {
      elem.onkeyup = function() {
        let value = elem.value
        if(validate.passwordfield(value)) {
          elem.classList.remove('error')
        } else {
          elem.classList.add('error')
        } 
      }
    })    
  }
  
}

// export default {
//   ...validation
// }

validation.textfield()
validation.emailfield()
validation.passwordfield()
init()
