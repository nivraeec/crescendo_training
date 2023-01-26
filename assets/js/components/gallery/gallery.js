import settings from "../../config.js";
import galleryData from "../../data/gallery.js";

const galleryApp = {
    init() {
        this.galleryTemplate();

        const galleryItems = settings.gallery.parent.querySelectorAll(".gallery__item");

        // Gallery items
        
        galleryItems.forEach((item, key) => {
            const social = item.querySelectorAll(".gallery__social img");
            const imgInterval = 300 * (key + 1);
    
            setTimeout(() => {
                item.style.opacity = 1;
            }, imgInterval);
    
            item.onmouseover = () => {
                this.showSocial(social);
            };
    
            item.onmouseleave = () => {
                this.showSocial(social, "remove");
            };
        });
        

        window.onload = () => {
            document.querySelectorAll(".gallery__imgEnlarge").forEach(enlarge => {
                const key = enlarge.dataset.key;
                enlarge.onclick = () => {
                    const data = galleryData[key];
                    this.galleryModal(data);
                };
            });
        }
    
        window.onscroll = () => {
            const scrollPos = window.scrollY;
            const nav = document.querySelector(".navigation");
            
            if (nav) {
                if (scrollPos > 50) nav.classList.add("navigation--scrolled");
                else nav.classList.remove("navigation--scrolled");
            }
        };
    },
    showSocial(el, event = "add", intervalNum = 300) {
        el.forEach((img, key) => {
            const interval = intervalNum * (key + 1);
            setTimeout(() => {
                img.classList[event]("gallery__socialImg--default")
            }, interval);
        });
    },
    galleryTemplate() {
        let temp = "";
        galleryData.forEach(({ img, title, detail }, key) => {
            temp += `<li class="gallery__item">
                <div class="gallery__imgEnlarge" data-key="${key}">
                    <img src="assets/img/enlarge.png" alt="Enlarge">
                </div>
                <div class="gallery__imgContainer">
                    <img src="${img}" class="gallery__img" alt="${title}">
                    <div class="gallery__imgDescription">
                        <div class="gallery__social">
                            <img src="assets/img/fb.png" class="gallery__socialImg">
                            <img src="assets/img/instagram.webp" class="gallery__socialImg">
                            <img src="assets/img/pinterest.png" class="gallery__socialImg">
                        </div>
                        <h2 class="gallery__imgTitle">${title}</h2>
                        <div class="gallery__detail">${detail}</div>
                    </div>
                </div>
            </li>`;
        });
        
         settings.gallery.galleryList.innerHTML = temp;
    },
    galleryModal({ img, title, detail }) {
        const overlay = document.createElement("DIV");
        overlay.classList.add("gallery__modalOverlay");
        const modal = document.createElement("DIV");
        modal.classList.add("gallery__modal");
        const modalImg = document.createElement("IMG");
        modalImg.classList.add("gallery__modalImg");
        modalImg.src = img;
        const modalDetail = document.createElement("DIV");
        modalDetail.classList.add("gallery__modalDetail");
    
        const details = `
            <div>
                <h2>${title}</h2>
                <div>${detail}</div>
            </div>
        `;
    
        modalDetail.innerHTML = details;
    
        modal.appendChild(modalImg);
        modal.appendChild(modalDetail);
        overlay.appendChild(modal);
        document.querySelector("body").appendChild(overlay);
        document.querySelector("body").style.overflow = "hidden";
    
        overlay.onclick = e => {
            overlay.remove();
            document.querySelector("body").style.overflow = "auto";
        };
    
        modal.onclick = e => {
            e.stopPropagation();
        }
    }
}


export default {
    ...galleryApp
}