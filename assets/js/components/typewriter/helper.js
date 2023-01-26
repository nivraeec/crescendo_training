import settings from "../../config.js";

/**
 * @param el element needed
 * @param intervalNum interval between effects
 */

const typeWriter = {
    typeEffect(el, intervalNum = 50) {
        
        el = settings.typeWriter.subTitle;

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
    }
}

export default {
    ...typeWriter
}