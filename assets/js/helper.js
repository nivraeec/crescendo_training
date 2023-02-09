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

export const checkEmptyInput = (inpt) => {
    let bool = [];

    if (inpt.length) {
        inpt.forEach(inptForm =>  bool.push(inptForm.value !== ""));
        
        return !bool.includes(false);
    } else return bool = inpt.value !== "";
}

export default {
    typeEffect
}