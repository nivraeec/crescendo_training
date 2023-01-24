import gallery from "./gallery-convert.js";
import forms from "./forms.js";

function init() {
    gallery.init();
    forms.init();
    console.log(forms.test);
};

init();
