const func = {
    init() {
        console.log("test");
        
        const fname = document.querySelector('[name="firstname"]');
        const form = document.querySelector('form');
        form.onsubmit = (e) => {
            e.preventDefault();
            const fnameIndex = fname.value.split(' ');
           if(fnameIndex[0] == '') {
            alert();
           }

           console.log(fnameIndex);
        }


    },
    test: "earvin"

};



export default { ...func };