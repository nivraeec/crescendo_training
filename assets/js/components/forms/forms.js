import settings from "../../config.js";

const forms = {
    form: settings.forms.form,
    load() {
        this.required();
        this.password();
        this.phone();
        this.submit();
    },
    phone() {
        this.form.querySelector("[data-phone]").onkeypress = (e) => {
            if(e.keyCode <= 47 || e.keyCode >= 58 || e.target.value.length > 10) {
                e.preventDefault();
            }
        }
    },
    password() {
        const pass = this.form.querySelectorAll('[type="password"]');
        pass[1].onkeyup = (el) => {
            const parent = pass[1].parentNode;

            if (pass[0].value.length) {
                if (el.value != pass[0].value) {
                    this.addError(parent, true, "Password doesn't match");  
                } else {
                    this.addError(parent, false);  
                }
            }   
        }
    },
    required(isSubmit = false) {
        settings.forms.requiredFields.forEach((name) => {
            const el        = this.form.querySelector(`[name="${name}"]`);
            const parent    = el.parentNode;


            if (isSubmit) {
                if(el.value.length <= 0) this.addError(parent); else this.addError(parent, false);
            } else {
                el.onblur = (e) => {
                    if(el.value.length <= 0) {
                        this.addError(parent);           
                    }
                }
            }
            

            
        });
    },
    submit() {
        this.form.onsubmit = (e) => {
            this.required(true);

            if (document.querySelectorAll('.form__input--error').length) {
                e.preventDefault();
            }

        }
    },
    addError(parent, type = true, msg = settings.forms.requiredMessage) {
        if (type) {
            if (!parent.classList.contains('form__input--error')) {
                parent.classList.add('form__input--error');
                parent.insertAdjacentHTML('beforeend', `<div class="form__input--error_msg">${msg}</div>`);
            }
        } else {
            if (parent.classList.contains('form__input--error')) {
                parent.classList.remove('form__input--error');
                parent.querySelector('.form__input--error_msg').remove(); 
            }
        }
        
    }
};

export default { ...forms };