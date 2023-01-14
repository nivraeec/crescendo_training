const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const router = express.Router();

const PORT = 3000

var urlencodedParser = bodyParser.urlencoded({ extended: false })  

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/register',function(req,res){
  res.sendFile(path.join(__dirname+'/public/register.html'));
});

// post
router.post('/register',urlencodedParser, function(req, res, next){
  const {firstname, lastname, username} = req.body
  // // res.json({firstname, lastname, username})
  // res.json({ message: "Successfully created user!" });
  // // console.log('RES', res.body)
  // // console.log('REQ',req.body)
  // console.log('firstname', firstname)

  // console.log('huh', req.is('application/x-www-form-urlencoded') )

  if(!req.is('application/json') && req.body){
    res.json({ message: "Successfully created user!" });    
  } else {
    res.json({ message: "Failed to create user!" });
  }
  next()
})


//add the router
app.use('/', router);
app.use(express.static(path.join(__dirname, '/public')))
app.use('/register', urlencodedParser, (req, res, next)=>{
  if(!req.is('application/json')){
    // res.send(400)
  } else {
    console.log('WHAAAAAAAAAAATTTTT')
  }
  next()
})

app.listen(process.env.port || PORT);

console.log('Running at Port', PORT);