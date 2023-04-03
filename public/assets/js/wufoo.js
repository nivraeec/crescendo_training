import helper from "./helper.js";

const _wufoo = {
  baseURL: 'https://crescendoc.wufoo.com/api/v3', 
  email: 'crescendodevwufoo@gmail.com',
  adminHash: 'O20S-EFSA-ZW5M-EOHJ', // CrescendoDev
  adminApiKey: 'O20S-EFSA-ZW5M-EOHJ', // CrescendoDev
  adminAccounts: ['crescendoc', 'CrescendoDev', 'Musabbir Khan'], 
  // password: 'WXsN{<3R;rxS', 
  bodyDiv: document.querySelector('body'),
  dataDiv: document.querySelector('#wufoo-data'),
  dialogDiv: document.querySelector('#dialog'),
  dialog:{
    main: document.querySelector('#dialog'),
    loader: document.querySelector('.dialog__content .loader'),
    description: document.querySelector(`.dialog__content .forms`),
    entries: document.querySelector(`.dialog__content .entries`),
    noresults: document.querySelector('.noresults'),
  },
  users: [],
  forms:[],
  // entries: [],
  set peste(name) { 
    this.users = name 
    console.log(this.users)
  },
  get getNames() { return this.users },
  init() {
    if(this.dataDiv === null) return

    // return
    // setting property
    Object.defineProperty(this, "setAllUsers", {
      set : (value) => {
          this.users = value;
          // console.log('Set Users', this.users)
      }
    });

    // getting property
    Object.defineProperty(this, "getAllUsers", {
      get : () => {
          return this.users;
      }
    });

    // this.getUsers()
    this
    .fetchData(this.adminApiKey, this.password, '/users', '')
    .then(result => { 
      let { Users } = result
        let html = ''
        let count = 0;

        html = `<table>`
        html += `<tr>
                    <th class="field-Hash"></th>
                    <th class="field-User"></th>
                    <th class="field-Email"></th>
                    <th class="field-Company"></th>
                 </tr>`
        Users.forEach((user, i) => {
          let Hash = user.Hash
          this.users[Hash] = user

          count = helper.textToCount(i)
          
          // if( !this.adminAccounts.includes(user.User) ) {
            html += `<tr data-hash="${user.Hash}" data-apikey="${user.ApiKey}">
                <td class=""><img src="${user.ImageUrlSmall}" alt="${user.Image}" /></td>
                <td class="alignLeft">
                  <h5><small>${'Email'.toUpperCase()}</small><br/>${user.Email}</h5>
                  <h5><small>${'Company'.toUpperCase()}</small><br/>${(user.Company ? user.Company.toUpperCase() : user.Email.split('@')[1].split('.')[0].toLowerCase())}</h5>
                </td>
                <td class="alignLeft">
                  <h5><small>${'APi-Key'.toUpperCase()}</small><br/>${user.ApiKey}</h5>
                  <h5><small>${'Hash'.toUpperCase()}</small><br/>${(user.Hash)}</h5>
                </td>
                <td class="alignLeft topAlign">
                  <h5>
                    <small>${'Permission'.toUpperCase()}</small><br />
                    <div class="icons flex">
                      <div class="icon">
                      ${(user.CreateForms === "1") ? '<i class="fa-sharp fa-solid fa-y"></i>' : '<i class="fa-sharp fa-solid fa-n"></i>'}
                    </div>
                    <div class="icon">
                      ${(user.CreateReports === "1") ? '<i class="fa-sharp fa-solid fa-y"></i>' : '<i class="fa-sharp fa-solid fa-n"></i>'}
                    </div>
                    <div class="icon">
                      ${(user.CreateThemes === "1") ? '<i class="fa-sharp fa-solid fa-y"></i>' : '<i class="fa-sharp fa-solid fa-n"></i>'}
                    </div>
                    </div>                  
                  </h5>
                </td>             
              </tr>`
          // } 
        });
        html += `</table>`
        this.dataDiv.innerHTML = html
     })
    .catch(error => { console.log(error) })
    
    
    this.getActions(this.users)

  }, 
  async fetchData(apikey, password, req, identifier=false) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic "+helper.stringToEncode(apikey, password));
    myHeaders.append("Cookie", "ep202=ASDqAkF48ZhjdpCpJJpJaPMBnNI=");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    return await fetch(`${this.baseURL}${req}${identifier}.json`, requestOptions)
      .then(response => response.json())
      .catch(error => { return error })
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
                    <th class="field-Hash"></th>
                    <th class="field-User"></th>
                    <th class="field-Email"></th>
                    <th class="field-Company"></th>
                 </tr>`
        Users.forEach((user, i) => {
          let Hash = user.Hash
          this.users[Hash] = user

          count = helper.textToCount(i)
          
          //if( !this.adminAccounts.includes(user.User) ) {
            // console.log(user)

            html += `<tr data-hash="${user.Hash}" data-apikey="${user.ApiKey}">
                <td class=""><img src="${user.ImageUrlSmall}" alt="${user.Image}" /></td>
                <td class="alignLeft">
                  <h5><small>${'Email'.toUpperCase()}</small><br/>${user.Email}</h5>
                  <h5><small>${'Company'.toUpperCase()}</small><br/>${(user.Company ? user.Company.toUpperCase() : user.Email.split('@')[1].split('.')[0].toLowerCase())}</h5>
                </td>
                <td class="alignLeft">
                  <h5><small>${'APi-Key'.toUpperCase()}</small><br/>${user.ApiKey}</h5>
                  <h5><small>${'Hash'.toUpperCase()}</small><br/>${(user.Hash)}</h5>
                </td>
                <td class="alignLeft topAlign">
                  <h5>
                    <small>${'Permission'.toUpperCase()}</small><br />
                    <div class="icons flex">
                      <div class="icon">
                      ${(user.CreateForms === "1") ? '<i class="fa-sharp fa-solid fa-y"></i>' : '<i class="fa-sharp fa-solid fa-n"></i>'}
                    </div>
                    <div class="icon">
                      ${(user.CreateReports === "1") ? '<i class="fa-sharp fa-solid fa-y"></i>' : '<i class="fa-sharp fa-solid fa-n"></i>'}
                    </div>
                    <div class="icon">
                      ${(user.CreateThemes === "1") ? '<i class="fa-sharp fa-solid fa-y"></i>' : '<i class="fa-sharp fa-solid fa-n"></i>'}
                    </div>
                    </div>                  
                  </h5>
                </td>             
              </tr>`
           // } 
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
      myHeaders.append("Authorization", "Basic "+helper.stringToEncode(ApiKey, this.password));
    } else {
      myHeaders.append("Authorization", "Basic "+helper.stringToEncode(this.adminHash, this.password));
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

        let haveEmails = 0

        Forms.forEach((form, i) => {
          let isTrue = i < 1000 ? true : false;
          let emails = form.Email.split(', ').filter(i=>i)
          count = helper.textToCount(i)

          if(isTrue)  {
            html += `<div class="form" data-hash="${form.Hash}">
              <div class="form-header flex justifyContentSpaceBetween">
                <div class="flex alignItemsCenter">
                  <div class="headerStatus">
                    <div class="icon-number">${count}</div>
                    <div class="icon-status ${(form.IsPublic === '1')?'isPublic':'isNot'} ">
                      ${(form.IsPublic === "1") ? `` : `<i class="fa-sharp fa-solid fa-circle"></i>`}
                    </div>
                  </div>
                  <div class="headerDetails">
                    <h3>${form.Name.toUpperCase()}</h3>
                    <small>${form.Hash}</small>
                  </div>
                </div>
                <div class="dateCreated">
                  <small>${helper.dateToMoment(form.DateCreated)}</small>
                </div>                
              </div>
              <div class="form-content">`
            html += (form.Description) ? `<div class="description">
                  <small>Description</small><br/>
                  ${!form.Description?'':helper.stringToHTMLv2(form.Description)}
                </div>` : ``   
            html += `<div class="redirectMessage">
                  <small>Redirect Message</small><br/>
                  ${!form.RedirectMessage?'':helper.stringToHTMLv2(form.RedirectMessage)}
                </div>
              </div>
              <div class="form-footer flex justifyContentSpaceBetween">
                <div class="left flex">
                  <div class="icon-text language"><i class="fa-solid fa-globe"></i>${form.Language}</div>`
            html += (emails.length) ? `<div class="icon-text email noTextTransform"><i class="fa-solid fa-envelope"></i>Email (x${+emails.length})</div>` : ''
            html += `</div>
                <div class="right flex">
                  <div class="icon-text expand"><i class="fa-sharp fa-solid fa-expand"></i>Expand</div>
                </div>
              </div>
            </div>`
          }
        });

        // console.log('haveEmails', haveEmails)

        html += `</table>`

        this.dialog.description.innerHTML = html
        this.dialog.loader.classList.toggle('hide')
      })
      .catch(error => console.log('error', error));  
  }, 
  async getFormsFields(Apikey, Hash) {
    this
    .fetchData(Apikey, this.password, '/forms', `/${Hash}/fields`)
    .then(result => {
      let {Fields} = result
      let html = ''
      if(Fields === undefined) return false
      
      Fields.forEach((field, i) => {
        console.log(field)
        html += `<div>
        <h3>${field.Title} • ${field.Type}</h3>
        <small>${field.Instructions}</small>
        </div>`
      })

      this.dialog.entries.innerHTML = html
      this.dialog.noresults.classList.add('hide')
    })
    .catch(error => { console.log(error) })
  },
  async getFormsEntries(ApiKey=false, Hash) {
    var myHeaders = new Headers();
    if(ApiKey) {
      myHeaders.append("Authorization", "Basic "+helper.stringToEncode(ApiKey, this.password));
    } else {
      myHeaders.append("Authorization", "Basic "+helper.stringToEncode(this.adminHash, this.password));
    }
    
    myHeaders.append("Cookie", "ep202=ASDqAkF48ZhjdpCpJJpJaPMBnNI=");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    await fetch(`https://crescendoc.wufoo.com/api/v3/forms/${Hash}/entries.json`, requestOptions)
      .then(response => response.json())
      .then(result => {
        let { Entries } = result
        let html = ''
        Entries.forEach(entry => {
          console.log(entry)
          // html +=`<div>${entry}</div>`
        });
        // this.dialog.entries.innerHTML += html
      })
      .catch(error => console.log('error', error));  
  },
  async getActions(data) {

    this.dataDiv.onclick = e => {
      let hash = e.target.closest('[data-hash]').getAttribute('data-hash')
      let apikey = e.target.closest('[data-apikey]').getAttribute('data-apikey')
      
      if(hash != null) {
        this.dialogDiv.classList.add('active')
        this.bodyDiv.classList.add('openDialog')
        this.getForms(apikey)        
        this.displayDialog(this.getAllUsers[hash] )
      }      
    }
    
    this.dialogDiv.onclick = e => {
      let parent = e.target.parentNode
      // console.log(e)
      if(parent.classList.contains('close')) {
        this.dialogDiv.classList.remove('active')
        this.bodyDiv.classList.remove('openDialog')
        this.dialog.loader.classList.toggle('hide')
        this.dialog.noresults.classList.remove('hide')
        this.dialog.entries.innerHTML = ''
      }
    }

    this.dialog.description.onclick = e => {
      if(e.target.classList.contains('expand')) {
        let hash = e.target.closest('[data-hash]').getAttribute('data-hash')
        let apikey = document.querySelector('.dialog__image [data-apikey]').getAttribute('data-apikey')
        this.getFormsFields(apikey, hash)
      }
    }
  },
  displayUsers(user) {
    let html = `<div class="user" data-hash="${user.Hash}" data-apikey="${user.ApiKey}">
      <div class="user-header">
        <div class="left flex">
          <div class="userImage"><img src="${user.ImageUrlSmall}" alt="${user.Image}" /></div>
          <div class="userData">
            <h3>${user.Email}</h3>
            <small>${user.Hash} • ${user.ApiKey}</small>
          </div>
        </div>
        <div class="right"></div>
      </div>
      <div class=""></div>
    </div>`
    this.dataDiv.innerHTML += html
  },
  displayDialog(data) {
    // console.log('data',data.User)
    let html = ''  
      html = `<div class="user" data-apikey="${data.ApiKey}">
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