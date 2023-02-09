import helper from "./helper.js";
import galleryData from "./data/gallery.js";

const gallery = document.querySelector(".gallery");
const galleryList = document.querySelector(".gallery__list");
const pageSub = document.querySelector(".pageTitle__subtext");

function init() {
    galleryTemplate();

    let testing = 0;

    if (testing) console.log(true);
    else console.log(false);

    const galleryItem = gallery.querySelectorAll(".gallery__item");

    const scrollEvent = function() {
        const scrollPos = window.scrollY;
        const nav = document.querySelector(".navigation");
        
        if (nav) {
            if (scrollPos > 50) nav.classList.add("navigation--scrolled");
            else nav.classList.remove("navigation--scrolled");
        }
    };

    window.onscroll = scrollEvent;    

    // Gallery items
    galleryItem.forEach((item, key) => {
        const social = item.querySelectorAll(".gallery__social img");
        const imgInterval = 300 * (key++);

        setTimeout(() => {
            item.style.opacity = 1;
        }, imgInterval);

        item.onmouseover = () => {
            showSocial(social);
        };

        item.onmouseleave = () => {
            showSocial(social, "remove");
        };
    });

    helper.typeEffect(pageSub, 50);

    document.querySelectorAll(".gallery__imgEnlarge").forEach(enlarge => {
        const key = enlarge.dataset.key;
        enlarge.onclick = () => {
            const data = galleryData[key];
            galleryModal(data);
        };
    });

    // Topic today if...else... and loops
    // tryConditions();
    // loopings();
};

/**
 * @param el element needed
 * @param event event needed (add/remove)
 * @param intervalNum interval between effects
 */
function showSocial(el, event = "add", intervalNum = 300) {
    el.forEach((img, key) => {
        const interval = intervalNum * (key++);
        setTimeout(() => {
            img.classList[event]("gallery__socialImg--default")
        }, interval);
    });
};

function galleryTemplate() {
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
    
    galleryList.innerHTML = temp;
}

function galleryModal({ img, title, detail }) {
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

// function tryConditions() {
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     console.log(days[new Date().getDay()]);
// }

// function loopings() {
//     console.log("for loop");
//     // let f = 0;

//     for (let f = 0; f < 10; f++) {
//         if (f === 3 || f === 6) continue;
//         console.log(f);
//     }

//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     for (const d of days) {
//         console.log(d);
//     }

//     for (const i in days) {
//         console.log(i);
//     }

//     days.forEach(function(value, index) {
//         console.log(value, index);
//     });

//     console.log("_____________________________________________________________");
    
//     console.log("while loop");
//     let i = 0;
//     let e = 0;

//     do {
//         console.log(i);
//         i++;
//     } while (i < 1);

//     while (e < 1) {
//         console.log(e);
//         e++;
//     }
// }

export default {
    init
}