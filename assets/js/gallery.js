import helper from "./helper.js";

const gallery = document.querySelector(".gallery");
const galleryItem = gallery.querySelectorAll(".gallery__item");
const pageSub = document.querySelector(".pageTitle__subtext");

function init() {
    window.onscroll = () => {
        const scrollPos = window.scrollY;
        const nav = document.querySelector(".navigation");

        if (scrollPos > 50) nav.classList.add("navigation--scrolled");
        else nav.classList.remove("navigation--scrolled");
    };

    // Gallery items
    galleryItem.forEach((item, key) => {
        const { alt } = item.querySelector(".gallery__img");
        const title = item.querySelector(".gallery__imgTitle");
        const social = item.querySelectorAll(".gallery__social img");
        const imgInterval = 300 * (key + 1);

        setTimeout(() => {
            item.style.opacity = 1;
        }, imgInterval);

        title.textContent = alt;

        item.onmouseover = () => {
            showSocial(social);
        };

        item.onmouseleave = () => {
            showSocial(social, "remove");
        };
    });

    helper.typeEffect(pageSub, 50);
};

/**
 * @param el element needed
 * @param event event needed (add/remove)
 * @param intervalNum interval between effects
 */
function showSocial(el, event = "add", intervalNum = 300) {
    el.forEach((img, key) => {
        const interval = intervalNum * (key + 1);
        setTimeout(() => {
            img.classList[event]("gallery__socialImg--default")
        }, interval);
    });
};

export default {
    init
}