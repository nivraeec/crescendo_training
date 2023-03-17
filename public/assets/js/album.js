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
    
    // store data on browser
    this.getData()

    

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
  getData() {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=150/json')
    .then((response) => response.json())
    .then((data) => {
      let { feed } = data      
      let { entry, author } = feed
      let { name, uri } = author

      window.itunesName = name
      window.itunesLink = uri

      let tmp_albums = []

      entry.forEach((el, i) => {
        let id = el['id']['attributes']['im:id']
        
        tmp_albums[id] = el
        // this.displayData(el, i)
        // this.displayDataV2(el, i)
        this.storage(id, el)
      });

      this.albums = tmp_albums
      this.yawa = this.albums
      
      // display stored data
     this.displayAllDataV2()

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
        // this.displayLikes(el)
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
  displayData(album, i) {
    if(!album) return

    const musicListDiv = document.createElement('div')
    const musicImageDiv = document.createElement('div')
    const musicImage = document.createElement('img')
    const musicOptionDiv = document.createElement('div')

    const musicOptionIconDiv0 = document.createElement('div')
    const musicOptionIcon0 = document.createElement('i')
    const musicOptionIcon00 = document.createElement('i')
    const musicOptionIconDiv1 = document.createElement('div')
    const musicOptionIcon1 = document.createElement('i')
    const musicOptionIcon10 = document.createElement('i')
    const musicOptionIconDiv2 = document.createElement('div')
    const musicOptionIcon2 = document.createElement('i')
    const musicOptionIcon20 = document.createElement('i')
    
    const musicDescDiv = document.createElement('div')
    const musicDescLabel = document.createElement('label')
    const musicDescP = document.createElement('p')
    
    musicListDiv.classList.add('music__list')
    musicListDiv.setAttribute('data-id', album['id']['attributes']['im:id'])

    musicListDiv.classList.add('col-md-2')
    musicListDiv.classList.add('col-sm-3')
    
    musicImageDiv.classList.add('music__image')                
    
    musicImage.setAttribute('src', album['im:image'][2]['label'])
    musicImage.setAttribute('alt', album['im:name']['label'])
    
    musicOptionDiv.classList.add('music__options')                
    
    musicOptionIconDiv0.classList.add('music__option')
    musicOptionIconDiv0.classList.add('play')
    musicOptionIcon0.classList.add('fas')
    musicOptionIcon0.classList.add('fa-play')
    musicOptionIcon00.classList.add('fas')
    musicOptionIcon00.classList.add('fa-pause')

    musicOptionIconDiv0.appendChild(musicOptionIcon0)
    musicOptionIconDiv0.appendChild(musicOptionIcon00)
    musicOptionDiv.appendChild(musicOptionIconDiv0)

    musicOptionIconDiv1.classList.add('music__option')
    musicOptionIconDiv1.classList.add('heart')
    // musicOptionIconDiv1.setAttribute('data-id', album['id']['attributes']['im:id'])
    musicOptionIcon1.classList.add('fa-regular')
    musicOptionIcon1.classList.add('fa-heart')
    musicOptionIcon10.classList.add('fas')
    musicOptionIcon10.classList.add('fa-heart')

    musicOptionIconDiv1.appendChild(musicOptionIcon1)
    musicOptionIconDiv1.appendChild(musicOptionIcon10)
    musicOptionDiv.appendChild(musicOptionIconDiv1)

    musicOptionIconDiv2.classList.add('music__option')
    musicOptionIconDiv2.classList.add('plus')
    musicOptionIcon2.classList.add('fas')
    musicOptionIcon2.classList.add('fa-plus')
    musicOptionIcon20.classList.add('fas')
    musicOptionIcon20.classList.add('fa-check')

    musicOptionIconDiv2.appendChild(musicOptionIcon2)
    musicOptionIconDiv2.appendChild(musicOptionIcon20)
    musicOptionDiv.appendChild(musicOptionIconDiv2)
    
    musicImageDiv.appendChild(musicImage)
    musicImageDiv.appendChild(musicOptionDiv)
    
    musicDescDiv.classList.add('music__desc')
    
    musicDescLabel.innerHTML = album['im:name']['label']
    
    musicDescP.innerHTML = album['im:artist']['label']
    
    musicDescDiv.appendChild(musicDescLabel)
    musicDescDiv.appendChild(musicDescP)
    
    musicListDiv.appendChild(musicImageDiv)
    musicListDiv.appendChild(musicDescDiv)

    this.albumDiv.appendChild(musicListDiv)
    this.getActions(musicListDiv, this.likes)
  }, 
  displayDataV2(album, i) {
    if(!album) return

    album = JSON.parse(localStorage.getItem(album))

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
  displayLikes(album) {
    if(!album) return

    let el = this.albums[album]
    
    let _id = el['id']['attributes']['im:id']
    let _image = el['im:image'][1]['label']
    let _title = el['im:name']['label']
    let _artist = el['im:artist']['label']
    let _alt = el['title']['label']

    const songDiv = document.createElement('div')
    const image = document.createElement('img')
    const descDiv = document.createElement('div')
    const h5 = document.createElement('h5')
    const label = document.createElement('label')
    const options = document.createElement('div')
    const opt_play = document.createElement('div')
    const opt_play0 = document.createElement('i')
    const opt_play1 = document.createElement('i')
    const opt_heart = document.createElement('div')
    const opt_heart0 = document.createElement('i')
    const opt_heart1 = document.createElement('i')
    const opt_plus = document.createElement('div')
    const opt_plus0 = document.createElement('i')
    const opt_plus1 = document.createElement('i')

    songDiv.classList.add('song')
    songDiv.classList.add('flex')
    songDiv.setAttribute('data-id', _id)

    image.setAttribute('src', _image)
    image.setAttribute('alt', `${_alt}`)

    descDiv.classList.add('desc')

    h5.classList.add('title')
    h5.innerHTML = _title

    label.innerHTML = _artist
    
    options.classList.add('music__options')
    opt_play.classList.add('music__option', 'play')
    opt_play0.classList.add('fas', 'fa-play')
    opt_play1.classList.add('fas', 'fa-pause')
    opt_play.appendChild(opt_play0)
    opt_play.appendChild(opt_play1)

    opt_heart.classList.add('music__option', 'heart')
    opt_heart0.classList.add('fa-regular', 'fa-heart')
    opt_heart1.classList.add('fas', 'fa-heart')
    opt_heart.appendChild(opt_heart0)
    opt_heart.appendChild(opt_heart1)

    opt_plus.classList.add('music__option', 'plus')
    opt_plus0.classList.add('fas', 'fa-plus')
    opt_plus1.classList.add('fas', 'fa-check')
    opt_plus.appendChild(opt_plus0)
    opt_plus.appendChild(opt_plus1)

    options.appendChild(opt_play)
    options.appendChild(opt_heart)
    options.appendChild(opt_plus)

    descDiv.appendChild(h5)
    descDiv.appendChild(label)

    songDiv.appendChild(image)
    songDiv.appendChild(descDiv)
    songDiv.appendChild(options)

    this.likesDiv.appendChild(songDiv)

    songDiv.onclick = (e) => {
      let _e = e.target.parentNode
      // console.log(_e)
      if( _e.closest('[data-id]') ) {
        let id = _e.closest('[data-id]').getAttribute('data-id')
        // console.log(id)
        document.querySelector('#dialog').classList.add('active')
        this.displayDialog(id)
      }
      
    }
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
  displayDialog(album) {
    let el = this.albums[album]

    let id = el['id']['attributes']['im:id']
    let image = el['im:image'][2]['label']
    let alt = el['title']['label']
    let title = el['im:name']['label']
    let artist = el['im:artist']['label']
    let artistLink = el['im:artist']//['attributes']['href']      
    let albumLink = el['id']['label']
    let category = el['category']['attributes']['label']
    let categoryLink = el['category']['attributes']['scheme']    
    let price = el['im:price']['label']
    let total = el['im:itemCount']['label']
    let release = el['im:releaseDate']['attributes']['label']
    
    let _dialog = document.querySelector('.dialog')
    let _image = document.querySelector('.dialog img')
    let _title = document.querySelector('.dialog .title')
    let _artist = document.querySelector('.dialog .artist')
    let _album = document.querySelector('.dialog .album')
    let _category = document.querySelector('.dialog .category')
    let _price = document.querySelector('.dialog .price')
    let _total = document.querySelector('.dialog .total')
    let _release = document.querySelector('.dialog .release')
    let _visit = document.querySelector('.dialog .visit')
    let _heart = document.querySelector('.dialog .heart')

    // _visit.setAttribute('href', window.itunesLink.label)
    
    _dialog.setAttribute('data-id', id)

    _image.setAttribute('src', image)
    _image.setAttribute('alt', alt)

    _title.innerHTML = title

    let {attributes, label} = artistLink
    
    if(!attributes) {
      artistLink['attributes'] = []
      artistLink['attributes']['href'] = '#'
    } else {
      let href = attributes['href']
    }
    

    _artist.setAttribute('href', attributes['href'])
    _artist.innerHTML = artist

    _album.setAttribute('href', albumLink)
  
    _category.setAttribute('href', categoryLink)
    _category.innerHTML = category

    _price.innerHTML = price
    _total.innerHTML = total
    _release.innerHTML = release

    let arr = this.likes
    let inArr = arr.includes(id)

    this.displayActions(id, inArr, _heart)

    // Show Dialog
    _dialog.onclick = (e) => {

      let target = e.target 

      if(e.target.parentNode.classList.contains('close')) {
        _dialog.classList.remove('active')
      }

      if(e.target.classList.contains('heart')) {
        e.target.classList.toggle('active')

        if(arr.includes(id)) {
          arr.splice(arr.indexOf(id), 1)
        } else {
          arr.push(id)
        }
        window.likes = arr

        this.displayActions(id, arr.includes(id), target)
      }

      if(e.target.parentNode.classList.contains('right')) {
        let current = e.target.parentNode.closest('#dialog')
        let currentID = current.getAttribute('data-id')

        let nextItem = document.querySelector(`.albums div[data-id="${currentID}"]`).nextElementSibling
        if(!nextItem) return
        let nextID = nextItem.getAttribute('data-id')
        
        this.displayDialog(nextID)
      }
      if(e.target.parentNode.classList.contains('left')) {
        let current = e.target.parentNode.closest('#dialog')
        let currentID = current.getAttribute('data-id')

        let prevItem = document.querySelector(`.albums div[data-id="${currentID}"]`).previousElementSibling
        if(!prevItem) return
        let prevID = prevItem.getAttribute('data-id')
        
        this.displayDialog(prevID)
      }
    }
  },
  displayDialogV2(album) {    
    let data = this.albums[album]
    let jsdata = localStorage.getItem(album)
    
    data = JSON.parse(jsdata)
    let  {
      category,
      id,
      'im:artist': artist,
      'im:image': image,
      'im:itemCount': itemCount,
      'im:price': price,
      'im:releaseDate': releaseDate,
      'im:name': name,
      link,
      title,
    } = data

    let {'im:id':albumId} = id.attributes
    let [img0, img1, img2] = image
    let { label: albumLabel } = name
    let { label: artistLabel } = artist
    let { label: titleLabel } = title

    if(!artist.attributes) {
      artist.attributes = []
      artist.attributes.href = '#'
    } 

    let html = ''
    html = `<div class="dialog__image">
                <img src="${img2.label}" alt="${titleLabel}">
            </div>
            <div class="dialog__description">
                <h2 class="title">${albumLabel}</h2>
                <h6 class="info">
                    <a href="${artist.attributes.href}" target="_blank" class="artist">${artistLabel}</a> | 
                    <a href="${link.attributes.href}" target="_blank" class="album">Album</a> | 
                    <a href="${category.attributes.scheme}" target="_blank" class="category">${category.attributes.label}</a>
                </h6>

                <p>Total Songs: <span class="total">${itemCount.label}</span></p>
                <p>Release Date: <span class="release">${releaseDate.attributes.label}</span></p>

                <p class="price">${price.label}</p>
                <div class="dialog__buttons">
                    ${this.displayActionsv2(id.attributes['im:id'])}
                    <a href="#" target="_blank" class="button visit"><i class="fas fa-globe"></i>Buset iTunes</a>
                </div>
            </div>`
    
    document.querySelector('.dialog__content').innerHTML = html

    this.dialogDiv.setAttribute('data-id', id.attributes['im:id'])
    this.getActionsDialogV2()
  },
  displayActions(id, isTrue, target) {
    let huh = document.querySelector(`[data-id="${id}"] .heart`)
    // huh.classList.toggle('active')
    if(isTrue) {
      target.innerHTML = '<i class="fa-regular fa-heart"></i> Remove from Favorites'
      huh.classList.add('active')
    } else {
      target.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites'
      huh.classList.remove('active')
    }
  },
  displayActionsv2(id) {
    let album = document.querySelector(`.album[data-id="${id}"] .heart`)
    album.classList.toggle('active')
    
    return `${(this.likes.includes(id)) ? 
    '<a href="#" class="button heart"><i class="fa-regular fa-heart"></i> Remove from Favorites</a>' : 
    '<a href="#" class="button heart"><i class="fas fa-heart"></i> Add to Favorites</a>' }`
  },
  getActions(el, arr) {
    el.onclick = (e) => {
      let parentNode = e.target.parentNode
      let id = parentNode.closest('[data-id]').getAttribute('data-id')

    

      if(parentNode.classList.contains('heart')) {
        parentNode.classList.toggle('active')

        if(arr.includes(id)) {
          arr.splice(arr.indexOf(id), 1)
        } else {
          arr.push(id)
        }

        window.likes = arr
      }

      if(parentNode.classList.contains('music__image')) {
        this.displayDialogV2(id)
        this.dialogDiv.classList.add('active')
      }
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

        this.displayActions(id, arr.includes(id), target)
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
  // this.download(JSON.stringify(tmp_albums), 'json.txt', 'text/json');
  download (content, filename, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
  }
}

export default {..._album};