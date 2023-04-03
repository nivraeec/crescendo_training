const _helper = {
    typeEffect(el, intervalNum = 50) {
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
    }, 
    stringToHTML(str) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');

        // console.log(doc)
        // console.log(doc.body.innerHTML)
        return doc.body.innerHTML;
    },
    stringToHTMLv2(str) {
        return str.replace(/<[^>]+>/g, '')
    },
    dateToMoment(date) {
        return new Date(date).toDateString();
    }, 
    stringToEncode(username, password) {
        return btoa(username+':'+password)
    },
    textToCount(i) {
        return (i >= 9) ? (i < 99) ? `0${i+1}` : i + 1 : `00${i+1}`
    },
    // this.download(JSON.stringify(tmp_albums), 'json.txt', 'text/json');
    download (content, filename, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = filename;
        a.click();
    }
}

export default { ..._helper }
