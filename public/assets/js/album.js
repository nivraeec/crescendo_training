const _album = {
  albumDiv: document.querySelector('.albums'),
  likesDiv: document.querySelector('.likes'),
  dialogDiv: document.querySelector('.dialog'),
  sortBtn: document.querySelectorAll('[data-sort]'),
  albums: [],
  likes: [],
  sort: [],
  init() {
    if(this.albumDiv === null) return;
    
    // // store data on browser
    // this.getData()

    this.fetchData().then(result => {
      let {
        author,
        entry,
        icon,
        rights,
        title,
        updated
      } = result.feed

      entry.forEach((album, i) => {
        let {id} = album
        let {'im:id': ref } = id.attributes
        
        this.albums[ref] = album
        this.displayDataV2(ref, i)
      });

    })

    // 
    this.getLikes()
    this.getFilterV2()

  },
  set yawa(data) {
    this.albums = data
    // console.log(this.albums)
  },
  get huh() {
    return this.albums
  },
  async fetchData() {
    return await fetch('https://itunes.apple.com/us/rss/topalbums/limit=150/json')
    .then((response) => response.json())
    .catch((error) => console.error(error))
  },
  getData() {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=150/json')
    .then((response) => response.json())
    .then((data) => {
      let { feed } = data      
      let { entry, author } = feed
      let { name, uri } = author

      // console.log('fetchData', data)

      let tmp_albums = []

      entry.forEach((el, i) => {
        let id = el['id']['attributes']['im:id']
        
        tmp_albums[id] = el
        // this.displayData(el, i)
        // this.displayDataV2(el, i)
        // this.storage(id, el)
        this.displayDataV2(el, i)
      });

      this.albums = tmp_albums
      this.yawa = this.albums
      
      // display stored data
      // this.displayAllDataV2()
      

    })
    .catch((error) => console.error(error))
  }, 
  async getDatav2() {
    const response = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=150/json');
    const albums = await response.json();
    return albums;
  },
  storage(id, data) {
    return localStorage.setItem(id, JSON.stringify(data));
  },
  getLikes() {
    let likes = this.likes

    let refresh = () => {
      this.likesDiv.innerHTML = ''
      likes.forEach(el => {
        this.displayLikesV2(el)
      })
    }

    setInterval(refresh, 1000)    
  },
  displayAllDataV2() {

    let object = localStorage
    
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        this.displayDataV2(key)
        // console.log(key)
      }
    }
  },
  displayDataV2(album, i) {
    if(!album) return

    // album = JSON.parse(localStorage.getItem(album))
    // console.log(album)
    album = this.albums[album]

    // return 
    let  {
      id,
      'im:artist': artist,
      'im:image': image,
      'im:name': name,
    } = album
    
    let [img0, img1, img2] = image
    let { label } = name
    let { label: arlabel } = artist

    let html = `<div class="music__list album col-md-2 col-sm-3" data-id="${id.attributes['im:id']}">
              <div class="music__image">
                <img src="${img2.label}" alt="${label}">
                <div class="music__options">
                  <div class="music__option play">
                    <i class="fas fa-play"></i>
                    <i class="fas fa-pause"></i>
                  </div>
                  <div class="music__option heart">
                    <i class="fa-regular fa-heart"></i>
                    <i class="fas fa-heart"></i>
                  </div>
                  <div class="music__option plus">
                    <i class="fas fa-plus"></i>
                    <i class="fas fa-check"></i>
                  </div>
                </div>
              </div>
              <div class="music__desc">
                <label>${label}</label>
                <p>${arlabel}</p>
              </div>
            </div>`

    this.albumDiv.innerHTML += html
    this.getActions(this.albumDiv, this.likes)
  },  
  displayLikesV2(album) {
    let html = ''
    album = this.albums[album]

    let  {
      id,
      'im:artist': artist,
      'im:image': image,
      'im:name': name,
    } = album

    let {'im:id':albumId} = id.attributes
    let [img0, img1, img2] = image
    let { label: albumLabel } = name
    let { label: artistLabel } = artist
    
    html = `<div class="song flex" data-id="${albumId}">
              <img src="${img1.label}" alt="${albumLabel}"><div class="desc">
              <h5 class="title">${albumLabel}</h5>
              <label>${artistLabel}</label>
            </div>`
    this.likesDiv.innerHTML += html
  },
  displayDialogV2(album) {
    let data = this.albums[album]
    
    // console.log(this.albums)
    console.log(data)

    

    // if(!data['im:artist']['attributes']) {
    //   data['im:artist']['attributes'] = []
    //   data['im:artist']['attributes']['href'] = '#'
    // } 
    
    let html = `<div class="dialog__image">
                <img src="${data['im:image'][2]['label']}" alt="${data['title']['label']}">
            </div>
            <div class="dialog__description">
                <h2 class="title">${data['im:name']['label']}</h2>
                <h6 class="info">
                    <a href="${data['im:artist']['attributes']['href'] || '#' }" target="_blank" class="artist">${data['im:artist']['label']}</a> | 
                    <a href="${data['link']['attributes']['href']}" target="_blank" class="album">Album</a> | 
                    <a href="${data['category']['attributes']['scheme']}" target="_blank" class="category">${data['category']['attributes']['label']}</a>
                </h6>

                <p>Total Songs: <span class="total">${data['im:itemCount']['label']}</span></p>
                <p>Release Date: <span class="release">${data['im:releaseDate']['attributes']['label']}</span></p>

                <p class="price">${data['im:price']['label']}</p>
                <div class="dialog__buttons">
                    <a href="#" class="button heart"><i class="fas fa-heart"></i> Add to Favorites</a>
                    <a href="#" target="_blank" class="button visit"><i class="fas fa-globe"></i>Buset iTunes</a>
                </div>
            </div>`
    
    document.querySelector('.dialog__content').innerHTML = html    
    this.dialogDiv.setAttribute('data-id', album)
    this.getActionsDialogV2()
    this.displayActions(album)
  },
  displayActions(id) {
    let album = document.querySelector(`.album[data-id="${id}"] .heart`)
    let heart = document.querySelector('.dialog__buttons .heart')
    let html = ''

    if(this.likes.includes(id)){
      album.classList.add('active')
      heart.innerHTML = '<i class="fa-regular fa-heart"></i> Remove from Favorites'
    } else {
      album.classList.remove('active')
      heart.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites'
    }
    
    return html
  },
  getActions(el, arr) {
    el.onclick = (e) => {
      let parentNode = e.target.parentNode
      let id = parentNode.closest('[data-id]').getAttribute('data-id')

      if(parentNode.classList.contains('heart')) {
        parentNode.classList.toggle('active')

        console.log('huh')
        
        if(arr.includes(id)) {
          arr.splice(arr.indexOf(id), 1)
        } else {
          arr.push(id)
        }

        window.likes = arr
      }

      if(parentNode.classList.contains('music__image')) {
        // console.log('showdialog', id)

        console.log('id', id)
        this.displayDialogV2(id)
        this.dialogDiv.classList.add('active')
      }
    }

    document.querySelector('.album__search').onclick = e => {      
      console.log(e)

      let target = e.target      
      if(target.classList.contains('album__search')) {
        document.querySelector('nav .search').classList.toggle('hide')
      }

    }

    document.querySelector('.searchDropdown.text').onkeyup = e => {
      let searchText = e.target.value
      let result = this.querySearch(searchText, this.albums)
      
      document.querySelectorAll('.album').forEach(el=>{
        let id = el.getAttribute('data-id')

        if(!result.includes(id)) {
          el.classList.add('hide')
        } else {
          el.classList.remove('hide')
        }
      })
    }
  },
  getActionsDialogV2() {
    const el = this.dialogDiv
    let arr = this.likes

    el.onclick = (e) => {
      let target = e.target 
      let current = e.target.parentNode.closest('#dialog')
      let id = current.getAttribute('data-id')

      if(e.target.parentNode.classList.contains('close')) {
        el.classList.remove('active')
      }

      if(e.target.classList.contains('heart')) {
        e.target.classList.toggle('active')

        if(arr.includes(id)) {
          arr.splice(arr.indexOf(id), 1)
        } else {
          arr.push(id)
        }
        // window.likes = arr

        this.displayActions(id)
      }
      // Next and Prev
      if(e.target.parentNode.classList.contains('right')) {        
        let nextItem = document.querySelector(`.albums div[data-id="${id}"]`).nextElementSibling
        if(!nextItem) return
        let nextID = nextItem.getAttribute('data-id')
        
        this.displayDialogV2(nextID)
      }
      if(e.target.parentNode.classList.contains('left')) {
        let prevItem = document.querySelector(`.albums div[data-id="${id}"]`).previousElementSibling
        if(!prevItem) return
        let prevID = prevItem.getAttribute('data-id')
        
        this.displayDialogV2(prevID)
      }
      // endof Next and Prev
    }
  },  
  getFilterV2() {
    let el = document.querySelector('.album__header')
    el.onclick = (e) => {
      let datas = this.albums
      // let 0 - Default 
      // let 1 - Ascending
      // ket 2 - Descending
      // console.log(datas)    
    }
  },
  querySearch(needle, set) {
    let results = new Array()
    // console.log('searching...')

    for (const key in set) {
      if (Object.hasOwnProperty.call(set, key)) {
        let element = set[key];
        element = JSON.stringify(element)

        if(element.includes(needle)) {
          results.push(key)
        }
      }
    }

    if (results.length) {
      return JSON.stringify(results)
    } else {
      return "No Match!"      
    }
  },
}

export default {..._album};