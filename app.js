const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/client/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/register',function(req,res){
  res.sendFile(path.join(__dirname+'/client/register.html'));
});

// post
router.post('/register', function(req, res){
  // const {firstname, lastname, username} = req.body
  // res.json({firstname, lastname, username})
  res.json({ message: "Successfully created user!" });
})


//add the router
app.use('/', router);
app.use(express.static(path.join(__dirname, '/client')))
app.use(bodyParser.urlencoded({extended:false}))
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');