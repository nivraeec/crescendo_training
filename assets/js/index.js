import helper from "./components/typewriter/helper.js";
import gallery from "./components/gallery/gallery.js";
import forms from "./components/forms/forms.js";

function init() {
    gallery.init();
    helper.typeEffect();
    forms.load();
};

init();
