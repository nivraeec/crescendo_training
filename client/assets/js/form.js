let registerForm = document.getElementById('registerForm')

function init() { 
  registerForm.onsubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("username", "justjoe");
    formData.append("firstname", "John");

    // console.log('form',  formData)

    let response = await fetch('/register', {
      method: 'POST',
      // body: new FormData(registerForm),
      // body: {
      //   firstname: 'Just',
      //   lastname: 'Joe',
      //   username: 'justjoe'
      // }
      body: formData
    })/*.then(function(res){
      console.log('ambot res', res)
    }).catch(function(err){
      console.log('yawa error', err)
    });*/

    let result = await response.json();

    console.log('result', result)

    alert(result.message);
  };
}

init()