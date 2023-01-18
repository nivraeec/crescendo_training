import helper from "./helper.js";

const gallery = document.querySelector(".gallery");
const galleryItem = gallery.querySelectorAll(".gallery__item");
const pageSub = document.querySelector(".pageTitle__subtext");

const _gallery = {    
    showSocial(el, event = "add", intervalNum = 300) {
        el.forEach((img, key) => {
            const interval = intervalNum * (key + 1);
            setTimeout(() => {
                img.classList[event]("gallery__socialImg--default")
            }, interval);
        });
    },
    enlargeImg(index) {
        const enlargeDiv = document.createElement('div')
        
        const closeBtn = document.createElement('span')
        const navBtn = document.createElement('div')
        const prvBtn = document.createElement('div')
        const nxtBtn = document.createElement('div')
        
        enlargeDiv.classList.add('gallery__enlarge')
        navBtn.classList.add('gallery__nav')
        prvBtn.classList.add('gallery__prev')
        nxtBtn.classList.add('gallery__next')
    
        closeBtn.innerText = '⮿'
        prvBtn.innerHTML = 'Prev'    
        nxtBtn.innerHTML = 'Next'
    
        navBtn.appendChild(prvBtn)
        navBtn.appendChild(nxtBtn)
    
        enlargeDiv.appendChild(closeBtn)
        document.body.appendChild(enlargeDiv)
    
        document.body.style.overflow = 'hidden'
    
        closeBtn.addEventListener('click', function(){
            enlargeDiv.remove()
            document.body.style.overflow = ''
        })
    
    
    
        const galleryItem = gallery.querySelectorAll(".gallery__item");
        galleryItem.forEach((item, key) => {
            const { src, alt } = item.querySelector(".gallery__img"); 
            const img = item.querySelector(".gallery__img").cloneNode()
            if(index==key) {
                img.classList.add('show')
            } else {
                img.classList.add('hide')
            }
    
            if(key==0) img.classList.add('first')
            else if(key==galleryItem.length-1) img.classList.add('last')
            enlargeDiv.appendChild(img)
        })
    
    
        
        enlargeDiv.appendChild(navBtn)
    
        document.addEventListener('click', function(event){
            const firstSlide = document.querySelector('.gallery__enlarge .first')
            const currentSlide = document.querySelector('.gallery__enlarge .show')
            const lastSlide = document.querySelector('.gallery__enlarge .last')
    
            if(event.target.classList.contains('gallery__next')) {                       
                const nextSlide = currentSlide.nextSibling
                if( lastSlide.classList.contains('show') ){
                    classFunc([firstSlide, lastSlide], ['show', 'hide'])
                    classFunc([firstSlide, lastSlide], ['hide', 'show'], 'remove')
                } else {
                    classFunc([nextSlide, currentSlide], ['show', 'hide'])
                    classFunc([nextSlide, currentSlide], ['hide', 'show'], 'remove')
                }
    
            } else if (event.target.classList.contains('gallery__prev')) {
               
                const prevSlide = currentSlide.previousSibling           
    
                if( firstSlide.classList.contains('show') ){
                    classFunc([lastSlide, firstSlide], ['show', 'hide'])
                    classFunc([lastSlide, firstSlide], ['hide', 'show'], 'remove')
                } else {
                    classFunc([prevSlide, currentSlide], ['show', 'hide'])
                    classFunc([prevSlide, currentSlide], ['hide', 'show'], 'remove')
                }
            }
        })
    },
    classFunc(elArr = [], _classArr = [], _event = 'add' ) {
        if (!_classArr) return false;
    
        elArr.forEach((el, key) => {
            el.classList[_event](_classArr[key]);
        });
    },
    init() {
        window.onscroll = () => {
            const scrollPos = window.scrollY;
            const nav = document.querySelector(".navigation");
    
            if (scrollPos > 50) nav.classList.add("navigation--scrolled");
            else nav.classList.remove("navigation--scrolled");
        };
    
        // Gallery items
        galleryItem.forEach((item, key) => {
            const { src, alt } = item.querySelector(".gallery__img");
            const title = item.querySelector(".gallery__imgTitle");
            const social = item.querySelectorAll(".gallery__social img");
            const enlarge = item.querySelector('.gallery__imgEnlarge')
            const imgInterval = 300 * (key + 1);
    
            setTimeout(() => {
                item.style.opacity = 1;
            }, imgInterval);
    
            title.textContent = alt;
    
            item.onmouseover = () => {
                this.showSocial(social);
            };
    
            item.onmouseleave = () => {
                this.showSocial(social, "remove");
            };
    
            enlarge.onclick = () => {
                this.enlargeImg(key)
            }
        });
    
        helper.typeEffect(pageSub, 50);
    },
}

export default {..._gallery}