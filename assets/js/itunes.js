const cardsContainer = document.querySelector(".albumCardsContainer");
const bg = document.querySelector(".albumCardsContainerBg");
const popup = document.querySelector(".albumPopupContainer");
const popupOnly = document.querySelector(".albumPopup");
const popupClose = document.querySelector(".albumPopupContainer .close");

// const submitButton = document.querySelector(".inputLine__submit");


function init() {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json').then(function (response) {
        return response.json();
    }).then(function (data) {
        const entries = data.feed.entry;
        // console.log(entries);
        var htmlCard;
        for (var i=0; i < entries.length; i++) {
            var j = i + 1;
            htmlCard = document.createElement("div");
            htmlCard.classList.add('albumCard');
            htmlCard.innerHTML = '<a href="#"><span>#' + j + '</span><img src="' + entries[i]['im:image'][2].label + '" alt="' + entries[i]["im:name"].label + '"><p class="albumTitle">' + entries[i]["im:name"].label + '</p></a>';
            cardsContainer.appendChild(htmlCard);
            // insertAfter(cardsContainer, htmlCard);
        }
        bg.style.backgroundImage = "url('" + entries[0]['im:image'][2].label + "')";
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    });
    
    setTimeout(() => {
        const albumImg = document.querySelectorAll(".albumCard img");
        const album = document.querySelectorAll(".albumCard a");
        albumImg.forEach(function(item){
            item.addEventListener("mouseover", function(){
                bg.style.backgroundImage = "url('" + item.src + "')";
            });
        });
        albumImg.forEach(function(item){
            item.addEventListener("click", function(){
                popup.style.bottom = "0";
                popupOnly.querySelector("img").src = item.src;
                setTimeout(() => {
                    popup.style.backgroundColor = "#00000080";
                }, 400);
            });
        });
    }, 1000);

    popupClose.addEventListener("click", function(){
        setTimeout(() => {
            popup.style.bottom = "-100%";
        }, 250);
        popup.style.backgroundColor = "#00000000";
    });

    popup.addEventListener('click', e => {
        if (e.target !== popupOnly) {
            setTimeout(() => {
                popup.style.bottom = "-100%";
            }, 250);
            popup.style.backgroundColor = "#00000000";
        } else {
            return;
        }
    });
}

// <HTML APPEND FUNCTION
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
// HTML APPEND FUNCTION>

export default {
    init
}