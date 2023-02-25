import helper from "./helper.js";

const _music = {
    listsDiv: document.querySelector('.music__lists'),
    songsDiv: document.querySelector('.songs__faves'),
    albums: [],
    faves: {},
    init() {
        if(this.listsDiv === null) return;
        
        this.getData()
        this.getOptions()
        this.showFaves()       
    },
    getData() {
        fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
        .then((response) => response.json())
        .then((data) => {
            // console.log(data.feed.entry)
           
            let _entry  = data.feed.entry
            for(const entry of _entry) {
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
                musicListDiv.setAttribute('data-id', entry['id']['attributes']['im:id'])
                musicListDiv.setAttribute('data-title', entry['im:name']['label'])
                musicListDiv.setAttribute('data-artist', entry['im:artist']['label'])
                musicListDiv.setAttribute('data-image',  entry['im:image'][2]['label'])
                musicListDiv.setAttribute('data-price',  entry['im:price']['label'])

                musicListDiv.setAttribute('data-category',  entry['category']['attributes']['label'])
                musicListDiv.setAttribute('data-categoryLink',  entry['category']['attributes']['scheme'])
                musicListDiv.setAttribute('data-albumLink',  entry['link']['attributes']['href'])
                musicListDiv.setAttribute('data-artistLink',  ('attributes' in entry['im:artist']) ? entry['im:artist']['attributes']['href'] : '')

                musicListDiv.setAttribute('data-totalSongs',  entry['im:itemCount']['label'])
                musicListDiv.setAttribute('data-release',  entry['im:releaseDate']['attributes']['label'])

                musicListDiv.classList.add('col-md-2')
                musicListDiv.classList.add('col-sm-3')
                
                musicImageDiv.classList.add('music__image')                
                
                musicImage.setAttribute('src', entry['im:image'][2]['label'])
                musicImage.setAttribute('alt', entry['im:name']['label'])
                
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
                
                musicDescLabel.innerHTML = entry['im:name']['label']
                
                musicDescP.innerHTML = entry['im:artist']['label']
                
                musicDescDiv.appendChild(musicDescLabel)
                musicDescDiv.appendChild(musicDescP)
                
                musicListDiv.appendChild(musicImageDiv)
                musicListDiv.appendChild(musicDescDiv)
                
                this.listsDiv.appendChild(musicListDiv)
                

                // asdf
                let id = entry['id']['attributes']['im:id']
                this.albums[id] = entry
            }

            // window.albums = this.albums

            // console.log(window.albums[1654611802])
        })
        .catch((error) => console.error(error))
    },
    getOptions(){
        let _faves = this.faves

        window.onclick = function(e) {
            
            let _options = e.target.parentNode
            let _dialog = document.querySelector('.dialog')
            
            if(e.target.classList.contains('disabled')) {
                e.preventDefault()
            }

            if(_options.classList.contains('close')) {
                _dialog.classList.remove('active')
                
                let _artist = _dialog.querySelector('.dialog .artist')
                _artist.classList.remove('disabled')
            }
            
            if(e.target.parentNode.classList.contains('music__image')) {
                let _data = _options.closest('.music__list')
                let {id, artist, image, title, price, albumlink, category, categorylink, artistlink, totalsongs, release, } = _data.dataset

                _dialog.classList.add('active')

                let _image = _dialog.querySelector('.dialog img')
                let _title = _dialog.querySelector('.dialog .title')
                let _artist = _dialog.querySelector('.dialog .artist')
                let _album = _dialog.querySelector('.dialog .album')
                let _category = _dialog.querySelector('.dialog .category')
                let _price = _dialog.querySelector('.dialog .price')
                let _total = _dialog.querySelector('.dialog .total')
                let _release = _dialog.querySelector('.dialog .release')
                let _fav = _dialog.querySelector('.dialog .add-to-fav')

                _image.setAttribute('src', image)
                _image.setAttribute('alt', `${title} - ${artist}`)

                _title.innerHTML = title
                _artist.innerHTML = artist

                
                _artist.setAttribute('href', artistlink)
                if(!artistlink) _artist.classList.add('disabled')

                _album.setAttribute('href', albumlink)                

                _category.innerHTML = category
                _category.setAttribute('href', categorylink)

                _price.innerHTML = price

                _total.innerHTML = totalsongs
                _release.innerHTML = release

                _fav.setAttribute('id', id)
                if(id in window.faves) {
                    _fav.classList.add('remove-fav')
                    _fav.classList.remove('add-to-fav')
                    _fav.innerHTML = '<i class="fa-regular fa-heart"></i>'
                    _fav.innerHTML += 'Remove from Favorites'
                } else {
                    _fav.classList.remove('remove-fav')
                    _fav.classList.add('add-to-fav')
                    _fav.innerHTML = '<i class="fas fa-heart"></i>'
                    _fav.innerHTML += 'Add to Favorites'
                }
                
            }

            if(e.target.parentNode.classList.contains('music__option')) {
                let _options = e.target.parentNode
                let _toggle = _options.classList.toggle('active')

                if(_options.classList.contains('play')) {
                    
                } else if(_options.classList.contains('heart')) {
                    let _data = _options.closest('.music__list')
                    let {id, artist, image, title} = _data.dataset
                    let obj = {}
                    _faves[id] = { artist, image, title }

                    if(!_toggle) {
                        delete _faves[id]
                    }
                }
                this.faves = _faves
                window.paboritos = this.faves
            }
            
            if(e.target.classList.contains('button')) {
                let btn = e.target                
                if(btn.classList.contains('add-to-fav')) {

                } else {
                    let id = btn.getAttribute('id')
                    delete _faves[id]
                    console.log('removed from faves')
                }
            }
        }
        
        // console.log('_faves', _faves)
    },
    showFaves() {
        let favs = document.querySelector('.songs__faves')
        let opts = document.querySelector('.music__wrapper')

        function pestey() {
            let _faves = this.faves;
            if(_faves === undefined) return;            

            favs.innerHTML = ''

            for (const key in _faves) {
                if (Object.hasOwnProperty.call(_faves, key)) {
                    const el = _faves[key];

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

                    image.setAttribute('src', el.image)
                    image.setAttribute('alt', `${el.title} - ${el.artist}`)

                    descDiv.classList.add('desc')

                    h5.classList.add('title')
                    h5.innerHTML = el.title

                    label.innerHTML = el.artist
                    
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

                    favs.appendChild(songDiv)
                }
            }
        }

        const doRefresh = setInterval(pestey, 800)

    }, 
};

// console.log(_music.faves)

export default {..._music};

// API
// -> set to let Data
// -> action [addtofav]
