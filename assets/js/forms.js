const func = {
    init() {
        console.log("test");
        
        const fname = document.querySelector('[name="firstname"]');
        const form = document.querySelector('form');
        form.onsubmit = (e) => {
            e.preventDefault();
            const fnameIndex = fname.value.split(' ');
           if(fnameIndex[0] === '') {
                this.errorMessage(fname.parentNode, "Please enter your first name");
           }
           console.log(fnameIndex);
        }
        fname.onkeyup = () => {
           if(!fname.value.length) this.errorMessage(fname.parentNode, "Please enter your first name");
           else this.removeErrorMessage(fname.parentNode);
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