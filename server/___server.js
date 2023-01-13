const express = require('express');
const app = express();
const fs = require("fs")
const engines = require('consolidate');
const mustache = require("mustache");

const PORT_ADDRESS = 3000

// app.set('views', __dirname + "/../public_html");
// app.set('views', __dirname + "/../client");
app.engine('html', engines.mustache);
app.set('view engine', 'html');

function checkfile(file) {
    // return fs.existsSync("/../client/" + file)
    return fs.existsSync("/../public_html/" + file)
    
}

app.get('/:filename', (req, res) => {
    try {
        let filestring = req.params.filename.toString()
        console.log('filestring', filestring)
        if (checkfile(filestring+'.html')) {
            console.log('asdasd')
            res.render(filestring)
        } else {
            console.log('404')
            res.render("404.html")
        }
    } catch {
        res.render("500.html")
    }
});

app.get('/', (req, res) => {
    res.render("index.html")
});

app.get('/login', (req, res) => {
  res.render("login.html")
});

app.listen(PORT_ADDRESS, () => {
    console.log('server started');
});