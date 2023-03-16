const _form = {
  forms: document.querySelectorAll('form'),
  fields: document.querySelectorAll('input'),
  init() {
    if(this.form === null) return;

    this.fields.forEach(field => {
      this.validates(field)
    })
  },
  validates(field) {
      field.onkeyup = (e) => {
        return this.regex( field.type, field.value ) ? field.classList.remove('error') : field.classList.add('error')
      }
  }, 
  regex(field, text, expressions) {
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
        break;
      case 'tel':
        validRegex = /^(?:\+?\d{2}[- ]?\d{3}[- ]?\d{3}[- ]?\d{4})$/
        break;
      default:
        validRegex = text
        break
    }
    return text.match(validRegex) ? true : false
  },
}

export default {..._form}