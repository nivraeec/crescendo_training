const gallery = document.querySelector(".gallery");
const galleryItem = gallery.querySelectorAll(".gallery__item");

const arr = [1, 2, 3, 4];
console.log(galleryItem[0]);

console.log(galleryItem);
galleryItem.forEach(function(item){
    console.log(item);
})