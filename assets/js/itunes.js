const cardsContainer = document.querySelector(".albumCardsContainer");
const bg = document.querySelector(".albumCardsContainerBg");
const popup = document.querySelector(".albumPopupContainer");
const popupOnly = document.querySelector(".albumPopup");
const popupClose = document.querySelector(".albumPopupContainer .close");

// const submitButton = document.querySelector(".inputLine__submit");


function init() {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json').then(function (response) {
        return response.json();
    }).then(function ({ feed }) {
        const { entry } = feed;
        console.log(entry);
        let htmlCard;
        entry.forEach(function(item, key){
            let rank = key + 1;
            htmlCard = document.createElement("div");
            htmlCard.classList.add('albumCard');
            htmlCard.innerHTML =    `<a href="#">
                                        <span>#${rank}</span>
                                        <img src="${item['im:image'][2].label}" alt="${item["im:name"].label}">
                                        <p class="albumTitle">${item["im:name"].label}</p>
                                    </a>`;
            cardsContainer.appendChild(htmlCard);
        });
        bg.style.backgroundImage = `url('${entry[0]['im:image'][2].label}')`;
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    });
    
    setTimeout(() => {
        const albumImg = document.querySelectorAll(".albumCard img");
        const album = document.querySelectorAll(".albumCard a");
        albumImg.forEach(function(item){
            item.addEventListener("mouseover", function(){
                bg.style.backgroundImage = `url("${this.src}")`;
            });
            item.addEventListener("click", function(){
                popup.style.bottom = "0";
                popupOnly.querySelector("img").src = this.src;
                setTimeout(() => {
                    popup.style.backgroundColor = "#00000080";
                }, 400);
            });
        });
    }, 1e3);
    
    const hidePopup = "-100%";
    const transparent = "#00000000";
    popupClose.addEventListener("click", function(){
        setTimeout(() => {
            popup.style.bottom = hidePopup;
        }, 250);
        popup.style.backgroundColor = transparent;
    });

    popup.addEventListener('click', function() {
        setTimeout(() => {
            this.style.bottom = hidePopup;
        }, 250);
        this.style.backgroundColor = transparent;
    });

    popupOnly.onclick = e => {
        e.stopPropagation();
    }
}

// <HTML APPEND FUNCTION
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
// HTML APPEND FUNCTION>

export default {
    init
}