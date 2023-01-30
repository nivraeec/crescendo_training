const func = {
    init() {
        console.log(document.querySelectorAll("input"));
        
        const fname = document.querySelector('[name="firstname"]');
        const lname = document.querySelector('[name="lastname"]');
        const mname = document.querySelector('[name="middlename"]');
        const address = document.querySelector('[name="address"]');
        const course = document.querySelector('[name="course"]');
        const form = document.querySelector('form');
 
        form.onsubmit = (e) => {
            e.preventDefault();
            const fnameIndex = fname.value.split(' ');
            const mnameIndex = mname.value.split(' ');
            const lnameIndex = lname.value.split(' ');
            const addressIndex = address.value.split(' ');
            
           if(fnameIndex[0] === '') {
                this.errorMessage(fname.parentNode, "<div class='errorMessage'>Please enter your first name </div>");
           }
           if(mnameIndex[0] === '') {
                this.errorMessage(mname.parentNode, "<div class='errorMessage'>Please enter your middle name </div>");
           }
           if(lnameIndex[0] === '') {
                this.errorMessage(lname.parentNode, "<div class='errorMessage'>Please enter your last name </div>");
           }
           if(addressIndex[0] === '') {
                this.errorMessage(address.parentNode, "<div class='errorMessage'>Please enter your address </div>");
           }

           if(!course.value) this.errorMessage(course.parentNode, "<div class='errorMessage'>Please select the course </div>");
           
        }

        course.onchange = () =>{
        
            if (course.value.length) this.removeErrorMessage(course.parentNode);
            console.log(course.value);
        }

     

        fname.onkeyup = () => {
           if(!fname.value.length) this.errorMessage(fname.parentNode, "<div class='errorMessage'> Please enter your first name </div>");
           else this.removeErrorMessage(fname.parentNode);
        }
        mname.onkeyup = () => {
            if(!mname.value.length) this.errorMessage(mname.parentNode, "<div class='errorMessage'> Please enter your middle name </div>");
            else this.removeErrorMessage(mname.parentNode);
         }
        lname.onkeyup = () => {
            if(!lname.value.length) this.errorMessage(lname.parentNode, "<div class='errorMessage'> Please enter your last name </div>");
            else this.removeErrorMessage(lname.parentNode);
        }
        address.onkeyup = () => {
            if(!address.value.length) this.errorMessage(address.parentNode, "<div class='errorMessage'> Please enter your address </div>");
            else this.removeErrorMessage(address.parentNode);
        }
        
    },
    errorMessage(container, errorText) {
        if(!container.classList.contains("form__input--invalid")){
         container.classList.add("form__input--invalid");
         container.insertAdjacentHTML('beforeend', `<div class="form__input--errorText">${errorText}</div>`);
        } 
    },
    removeErrorMessage(container) {
        if(container.classList.contains("form__input--invalid")){
         container.classList.remove("form__input--invalid");  
         container.querySelector(".form__input--errorText").remove();
        }   
    }
};



export default { ...func };