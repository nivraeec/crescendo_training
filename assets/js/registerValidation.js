const form = document.querySelector(".inputLine");
const requiredInput = form.querySelectorAll("input[required]");
const requiredSelect = form.querySelectorAll("select[required]");
const submitButton = document.querySelector(".inputLine__submit");
const slideShow = document.querySelector(".pageLayout__left");

// <IMAGES SLIDESHOW
slideShow1();
function slideShow1() {
    slideShow.style.backgroundImage = "url('/assets/img/pexels-inga-seliverstova-3394310.jpg')";
    setTimeout(() => {
        slideShow.style.backgroundImage = "url('/assets/img/pexels-askar-abayev-5638747.jpg')";
        slideShow2();
    }, 8000);
}
function slideShow2() {
    setTimeout(() => {
        slideShow.style.backgroundImage = "url('/assets/img/pexels-jill-burrow-6858660.jpg')";
        slideShow3();
    }, 8000);
}
function slideShow3() {
    setTimeout(() => {
        slideShow.style.backgroundImage = "url('/assets/img/pexels-maria-orlova-4946404.jpg')";
        slideShow4();
    }, 8000);
}
function slideShow4() {
    setTimeout(() => {
        slideShow.style.backgroundImage = "url('/assets/img/pexels-taha-samet-arslan-7711151.jpg')";
        slideShow1();
    }, 8000);
}
// IMAGES SLIDESHOW>

// <REMOVE ERROR TEXTS ON KEYUP/CHANGE
requiredInput.forEach(function(item){
    if (item.name == "birthday") {
        item.addEventListener("change", function(){
            if (item.nextElementSibling.classList.contains("error")) {
                item.nextElementSibling.style.display = "none";
            }
        });
    } else {
        item.addEventListener("keyup", function(){
            if (item.nextElementSibling.classList.contains("error")) {
                item.nextElementSibling.style.display = "none";
            }
            if (item.name == "password" && document.querySelector(".inputLine input[name=confirmPassword]").nextElementSibling.classList.contains("error") && item.value == document.querySelector(".inputLine input[name=confirmPassword]").value) {
                document.querySelector(".inputLine input[name=confirmPassword]").nextElementSibling.style.display = "none";
            }
        });
    }
});
requiredSelect.forEach(function(item){
    item.addEventListener("change", function(){
        if (item.nextElementSibling.classList.contains("error")) {
            item.nextElementSibling.style.display = "none";
        }
    });
});
// REMOVE ERROR TEXTS ON KEYUP/CHANGE>

// <VALIDATIONS ON SUBMIT
submitButton.onclick = function() {
    var isValid = true;
    requiredInput.forEach(function(item){
        if (item.value == "" || null || undefined) {
            isValid = false;
            var errorText = document.createElement("p");
            errorText.classList.add('error');
            if (item.name == "userName" || item.name == "password") {
                errorText.innerHTML = "Please provide a " + item.placeholder + ".";
            } else if (item.name == "confirmPassword") {
                errorText.innerHTML = "Please confirm your password.";
            } else {
                errorText.innerHTML = "Please provide your " + item.placeholder + ".";
            }
            if (item.nextElementSibling.classList.contains("error")) {
                if (item.name == "confirmPassword") {
                    item.nextElementSibling.textContent = "Passwords do not match.";
                }
                item.nextElementSibling.style.display = "block";
            } else {
                insertAfter(item, errorText);
            }
        }
    });
    requiredSelect.forEach(function(item){
        if (item.value == "" || null || undefined) {
            isValid = false;
            var errorText = document.createElement("p");
            errorText.classList.add('error');
            errorText.innerHTML = "Please select your " + item.name + ".";
            if (item.nextElementSibling.classList.contains("error")) {
                item.nextElementSibling.style.display = "block";
            } else {
                insertAfter(item, errorText);
            }
        }
    });
    var rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (document.querySelector(".inputLine input[name=password]").value != "" && !document.querySelector(".inputLine input[name=password]").value.match(rePassword)) {
        console.log("sdasdada");
        isValid = false;
        var errorText = document.createElement("p");
        errorText.classList.add('error');
        errorText.innerHTML = "Password must be at least 6 characters, with at least one uppercase and lowercase letters, number, and special character.";
        if (document.querySelector(".inputLine input[name=password]").nextElementSibling.classList.contains("error")) {
            document.querySelector(".inputLine input[name=password]").nextElementSibling.textContent = "Password must be at least 6 characters, with at least one uppercase and lowercase letters, number, and special character.";
            document.querySelector(".inputLine input[name=password]").nextElementSibling.style.display = "block";
        } else {
            insertAfter(document.querySelector(".inputLine input[name=password]"), errorText);
        }
    }
    if (document.querySelector(".inputLine input[name=confirmPassword]").value != document.querySelector(".inputLine input[name=password]").value) {
        isValid = false;
        var errorText = document.createElement("p");
        errorText.classList.add('error');
        errorText.innerHTML = "Passwords do not match.";
        if (document.querySelector(".inputLine input[name=confirmPassword]").nextElementSibling.classList.contains("error")) {
            document.querySelector(".inputLine input[name=confirmPassword]").nextElementSibling.textContent = "Passwords do not match.";
            document.querySelector(".inputLine input[name=confirmPassword]").nextElementSibling.style.display = "block";
        } else {
            insertAfter(document.querySelector(".inputLine input[name=confirmPassword]"), errorText);
        }
    }
    console.log(isValid);

    // <IF FORM IS VALID
    setTimeout(() => {
        if (isValid == true) {
            alert("Form Valid!");
        }
    }, 500);
    // IF FORM IS VALID>
}
// VALIDATIONS ON SUBMIT>

// <HTML APPEND FUNCTION
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
// HTML APPEND FUNCTION>