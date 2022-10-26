const gallery = document.querySelector(".gallery");
const galleryItem = gallery.querySelectorAll(".gallery__item");
const pageSub = document.querySelector(".pageTitle__subtext");

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

typeEffect(pageSub, 50);

/**
 * @param el element needed
 * @param intervalNum interval between effects
 */
function typeEffect(el, intervalNum = 50) {
    const elTrim = el.textContent.trim().split("");
    
    el.textContent = "";
    let paragraph = [];
    
    elTrim.forEach((letter, index) => {
        const interval = intervalNum * index;
        
        setTimeout(() => {
            paragraph.push(letter);
            el.textContent = paragraph.join("");
        }, interval);
    });
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
