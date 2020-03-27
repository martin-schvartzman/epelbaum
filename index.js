let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let bodyParserJSON = bodyParser.json();
let bodyParserURLEncoded = bodyParser.urlencoded({extended:true})
let cookieParser = require('cookie-parser');
let config = require('./config');

let app = express();

mongoose.connect('mongodb://localhost/epelbaum',{useNewUrlParser:true,useUnifiedTopology:true})

app.set('view engine','ejs');
app.set('views',__dirname + '/views');

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(cookieParser());
app.use('/',express.static(__dirname + '/public'));

app.use( require('./routes/auth') );

//REFACTOR send to middlewares
app.use( async (req,res,next) => {
    const token = req.cookies['auth-token'];
    if(token === undefined){ 
        res.redirect('/auth/login'); 
        return next();
    }
    if( ! await isTokenValid(token) ){
        res.redirect('/auth/login');
        return next();
    }
    return next();
} )

app.use( require('./routes/home') );
app.use( require('./routes/user') );

app.listen(3000,()=>{
    console.log('server running');
})

//REFACTOR send to utils
const jwt = require('jsonwebtoken');
async function isTokenValid(token){
    return jwt.verify(token,config.secretKey)
}