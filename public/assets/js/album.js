const _album = {
  albumDiv: document.querySelector('.albums'),
  likesDiv: document.querySelector('.likes'),
  dialogDiv: document.querySelector('.dialog'),
  albums: [],
  likes: [],
  init() {
    if(this.albumDiv === null) return;
    this.getData()
    this.getLikes()
    
  },
  getData() {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
    .then((response) => response.json())
    .then((data) => {
      let { feed } = data      
      let { entry, author } = feed
      let { name, uri } = author

      window.itunesName = name
      window.itunesLink = uri

      entry.forEach((el) => {
        let id = el['id']['attributes']['im:id']
        this.albums[id] = el

        this.displayData(el)
      });
      return window.albums = this.albums
    })
    .catch((error) => console.error(error))
  }, 
  getLikes() {
    let likes = this.likes

    let refresh = () => {
      this.likesDiv.innerHTML = ''
      likes.forEach(el => {
        this.displayLikes(el)
      })
    }

    setInterval(refresh, 1000)    
  },
  displayData(album) {
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
  displayLikes(album) {
    if(!album) return

    let el = this.albums[album]
    
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
  },
  displayDialog(album) {
    let el = this.albums[album]

    let id = el['id']['attributes']['im:id']
    let image = el['im:image'][2]['label']
    let alt = el['title']['label']
    let title = el['im:name']['label']
    let artist = el['im:artist']['label']
    let artistLink = el['im:artist']['attributes']['href']
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

    _visit.setAttribute('href', window.itunesLink.label)
    
    _dialog.setAttribute('data-id', id)

    _image.setAttribute('src', image)
    _image.setAttribute('alt', alt)

    _title.innerHTML = title

    _artist.setAttribute('href', artistLink)
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

    // dialog
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
    }
  },
  displayActions(id, isTrue, target) {
    let huh = document.querySelector(`[data-id="${id}"] .heart`)
    
    if(isTrue) {
      target.innerHTML = '<i class="fa-regular fa-heart"></i> Remove from Favorites'
      huh.classList.add('active')
    } else {
      target.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites'
      huh.classList.remove('active')
    }
  },
  getActions(el, arr) {
    el.onclick = (e) => {
      let parentNode = e.target.parentNode
      let id = parentNode.closest('[data-id]').getAttribute('data-id')

      // console.log(e.target)

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
        this.displayDialog(id)
        this.dialogDiv.classList.add('active')        
      }
    }
  },
  
}

export default {..._album};