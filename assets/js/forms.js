import { checkEmptyInput } from "./helper.js";

const func = {
    inptText: document.querySelectorAll(".required"),
    init() {
        document.querySelector(".form__btn--submit").onclick = e => {
            e.preventDefault();
            if (checkEmptyInput(this.inptText)) {
                console.log("Pasok")
            } else console.log("Fill up all")
        }
    },
};

export default func;