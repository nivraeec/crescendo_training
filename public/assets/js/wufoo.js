const _wufoo = {
  email: 'crescendodevwufoo@gmail.com',
  adminHash: 'O20S-EFSA-ZW5M-EOHJ', // CrescendoDev
  adminAccounts: ['crescendoc', 'CrescendoDev', 'Musabbir Khan'], 
  password: 'WXsN{<3R;rxS',
  bodyDiv: document.querySelector('body'),
  dataDiv: document.querySelector('#wufoo-data'),
  dialogDiv: document.querySelector('#dialog'),
  dialog:{
    main: document.querySelector('#dialog'),
    loader: document.querySelector('.dialog__description .loader'),
    description: document.querySelector(`.dialog__description .forms`),    
  },
  users: [],
  forms:[],
  entries: [],
  set peste(name) { 
    this.users = name 
    console.log(this.users)
  },
  get getNames() { return this.users },
  init() {
    if(this.dataDiv === null) return

    // setting property
    Object.defineProperty(this, "setAllUsers", {
      set : (value) => {
          this.users = value;
          console.log('Set Users', this.users)
      }
    });

    // getting property
    Object.defineProperty(this, "getAllUsers", {
      get : () => {
          console.log('Get Users')
          return this.users;
      }
    });

    this.getUsers()
    this.getActions(this.users)

  }, 
  stringToEncode(username, password) {
    return btoa(username+':'+password)
  },
  textToCount(i) {
    return (i >= 9) ? (i < 99) ? `0${i+1}` : i + 1 : `00${i+1}`
  },
  async getUsers() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic "+this.stringToEncode(this.adminHash, this.password));
    myHeaders.append("Cookie", "ep202=ASDqAkF48ZhjdpCpJJpJaPMBnNI=");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    await fetch("https://crescendoc.wufoo.com/api/v3/users.json", requestOptions)
      .then(response => response.json())
      .then(result => {
        let { Users } = result
        let html = ''
        let count = 0;

        html = `<table>`
        html += `<tr>
                    <th class="field-Hash">No.</th>
                    <th class="field-User">User</th>
                    <th class="field-Email">Email</th>
                    <th class="field-Company">Company</th>
                    <!--th class="field-ApiKey">API Key</th-->
                    <th class="field-CreateForms">Forms</th>
                    <th class="field-CreateReports">Reports</th>
                    <th class="field-CreateThemes">Themes</th>
                 </tr>`
        Users.forEach((user, i) => {
          let Hash = user.Hash
          this.users[Hash] = user

          // count = (i >= 9) ? i + 1 : `0${i+1}`
          count = this.textToCount(i)
          
          if( !this.adminAccounts.includes(user.User) ) {
            
            html += `<tr data-hash="${user.Hash}" data-apikey="${user.ApiKey}">`
              html += `<td class="">${count}</td>`
              html += `<td class="alignLeft">${user.User}</td>`
              html += `<td class="">${user.Email}</td>`
              html += `<td>${(user.Company ? user.Company.toUpperCase() : user.Email.split('@')[1].split('.')[0].toLowerCase())}</td>`
              html += `<!--td>${user.ApiKey}</td-->`
              html += `<td>${(user.CreateForms === "1" ? 'Yes' : 'No')}</td>`
              html += `<td>${(user.CreateReports === "1" ? 'Yes' : 'No')}</td>`
              html += `<td>${(user.CreateThemes === "1" ? 'Yes' : 'No')}</td>`
            html += `</tr>`

            // this.getForms(user.ApiKey)
          } else {
            html += `<tr class="admin" data-hash="${user.Hash}" data-apikey="${user.ApiKey}">`
              html += `<td>${count}</td>`           
              html += `<td colspan="6">${user.User}</td>`              
            html += `</tr>`
          }
        });
        html += `</table>`
        this.dataDiv.innerHTML = html
        this.setAllUsers = this.users
      })
      .catch(error => console.log('error', error));
  },
  async getForms(ApiKey=false) {

    var myHeaders = new Headers();
    if(ApiKey) {
      myHeaders.append("Authorization", "Basic "+this.stringToEncode(ApiKey, this.password));
    } else {
      myHeaders.append("Authorization", "Basic "+this.stringToEncode(this.adminHash, this.password));
    }
    
    myHeaders.append("Cookie", "ep202=ASDqAkF48ZhjdpCpJJpJaPMBnNI=");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    await fetch("https://crescendoc.wufoo.com/api/v3/forms.json", requestOptions)
      .then(response => response.json())
      .then(result => {
        let { Forms } = result
        let html = ''
        let count = 0

        html = `<table>`
          html += `<tr>`
            html += `<th><p>No.</p></th>`
            html += `<th><p>Name</p></th>`
            html += `<th><p>Hash</p></th>`
            html += `<th><p>Email</p></th>`
            html += `<th><p>IsPublic</p></th>`
          html += `</tr>`
        
        let haveEmails = 0

        Forms.forEach((form, i) => {
          let isTrue = i < 1000 ? true : false;
          let emails = form.Email.split(', ').filter(i=>i)
          count = this.textToCount(i)

          if(isTrue)  {
            
            // console.log(`${form.Hash} - ${emails}`)
            // html += `<tr data-email="${emails.length}">`
            //   html += `<td class="alignLeft"><p>${count}</p></td>`
            //   html += `<td class="alignLeft"><p>${form.Name}</p></td>`
            //   html += `<td>${form.Hash}</td>`
            //   html += `<td>`
              
            //   if(emails.length) {
            //     haveEmails++
            //     emails.forEach((mail, i) => {
            //       html += `<a class="icon" href="mailto:${mail}"><i class="fa-sharp fa-solid fa-envelope"></i></a>`
            //     })
            //   } else {
            //     html += `<a class="icon" href="#" style="color:red"><i class="fa-sharp fa-solid fa-mailbox-flag-up">N</i></a>`
            //   }
                 
              
            //   html += `</td>`
            //   html += `<td>${(form.IsPublic === "1") ? "Yes" : "No"}</td>`
            // html += `</tr>`

            html += `<div class="form">
                      <div class="icon">
                        <i class="fa-solid fa-table-list"></i>
                      </div>
                      <div class="details">
                        <h5>${form.Name}</h5>
                        <p>${(form.Description) ? '<i class="fa-sharp fa-solid fa-message fa-message-lines"></i>' : '<i class="fa-sharp fa-solid fa-message-slash"></i>'}</p>
                        <p>${form.RedirectMessage}</p>
                        <small>${form.Url}</small>
                      </div>
                    </div>`

          }
        });

        console.log('haveEmails', haveEmails)

        html += `</table>`

        this.dialog.description.innerHTML = html
        this.dialog.loader.classList.toggle('hide')
      })
      .catch(error => console.log('error', error));  
  }, 
  async getFormsEntries(ApiKey=false, Hash) {
    var myHeaders = new Headers();
    if(ApiKey) {
      myHeaders.append("Authorization", "Basic "+this.stringToEncode(ApiKey, this.password));
    } else {
      myHeaders.append("Authorization", "Basic "+this.stringToEncode(this.adminHash, this.password));
    }
    
    myHeaders.append("Cookie", "ep202=ASDqAkF48ZhjdpCpJJpJaPMBnNI=");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    await fetch(`https://crescendoc.wufoo.com/api/v3/forms/${Hash}/entries/count.json`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // let { Forms } = result
        console.log(result)
        let html = ''
      })
      .catch(error => console.log('error', error));  
  },
  async getActions(data) {
    const apikey = this.dataDiv
    apikey.onclick = e => {
      let hash = e.target.parentNode.getAttribute('data-hash')
      let apikey = e.target.parentNode.getAttribute('data-apikey')
      if(hash != null) {
        this.dialogDiv.classList.add('active')
        this.bodyDiv.classList.add('openDialog')
        this.getForms(apikey)        
        this.displayDialog(this.getAllUsers[hash] )
      }      
    }
    
    this.dialogDiv.onclick = e => {
      let parent = e.target.parentNode
      console.log(e)
      if(parent.classList.contains('close')) {
        this.dialogDiv.classList.remove('active')
        this.bodyDiv.classList.remove('openDialog')
        this.dialog.loader.classList.toggle('hide')
      }
    }
  },
  displayDialog(data) {
    console.log('data',data.User)
    let html = ''  
      html = `<div class="user">
        <div class="profile">
          <div class="photo"><img src="${data.ImageUrlBig}" alt="${data.Image}" /></div>
          <p>${data.Email}</p>
          <small>${(data.Company ? data.Company.toUpperCase() : data.Email.split('@')[1].split('.')[0].toUpperCase())}</small>
        </div>
        <div class="details">
          <div class="desc">
            <div class="icon">
              <i class="fa-sharp fa-solid fa-table-list"></i>
            </div>
            <div class="label">
              <span>Hash</span>
              <small>${data.Hash}</small>
            </div>
          </div>
          <div class="desc">
            <div class="icon">
              <i class="fa-sharp fa-solid fa-hard-drive"></i>
            </div>
            <div class="label">
              <span>API Key</span>
              <small>${data.ApiKey}</small>
            </div>
          </div>
          <div class="desc">
            <div class="icon">
              ${(data.CreateForms === "1") ? '<i class="fa-sharp fa-solid fa-y"></i>' : '<i class="fa-sharp fa-solid fa-n"></i>'}
            </div>
            <div class="label">
              <span>CreateForms</span>
            </div>
          </div>
          <div class="desc">
            <div class="icon">
              ${(data.CreateReports === "1") ? '<i class="fa-sharp fa-solid fa-y"></i>' : '<i class="fa-sharp fa-solid fa-n"></i>'}
            </div>
            <div class="label">
              <span>CreateReports</span>
            </div>
          </div>
          <div class="desc">
            <div class="icon">
              ${(data.CreateThemes === "1") ? '<i class="fa-sharp fa-solid fa-y"></i>' : '<i class="fa-sharp fa-solid fa-n"></i>'}
            </div>
            <div class="label">
              <span>CreateThemes</span>
            </div>
          </div>
          
        </div>
      </div>`
    document.querySelector('.dialog__image').innerHTML = html
  }
}


const huh = {
  yawa: 'yawa',
  set peste(name) {
    this.yawa = name
  },
  get ambot() {
    return this.yawa;
  }
}

// console.log(huh.yawa)
// console.log(huh.ambot)
// huh.peste = 'ASD'
// console.log(huh.yawa)
// console.log(huh.ambot)

export default {..._wufoo}