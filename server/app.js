const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
// const { engine } = require("express-handlebars");
require("dotenv").config()
const nodemailer = require('nodemailer');
const app = express();

// app.engine("handlebars", engine({ defaultLayout: false }));
// app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())
// Do this when something is bought 
// app.get('/', function(req, res){
//     res.render('products');
// })

app.post('/send', cors(), async(req, res) =>{
    let {text} = req.body;
    const output = `
    <p>Dear user,</p>
    <p>You have successfully purchased your NFT with ID #0xD1279736a8A436Aff124B10D3597A4eCF08B9A1d. Its warranty ends on 31th August, 2023.</p>
    <p>We hope to see you again.</p>
    <h3>OurServiceNFT</h3>
    `;

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: 
        {
          user: process.env.REACT_APP_EMAIL, // email of service
          pass: process.env.REACT_APP_PASS
          , // generated after 2-step authentication
        },
        // to run on localhost
        tls:
        {
            rejectUnauthorized: false
        }
      });
    
      // send mail with defined transport object
      await transporter.sendMail
      ({
        from: process.env.REACT_APP_EMAIL, // sender address
        to: text, // receiver address
        subject: "You have successfully purchased NFT", // Subject line
        // text: "", // plain text body
        html: output, // html body
      });
      // To show msg on successful purchase
    //   res.render('contact', {msg: 'Email has been sent successfully.'})
    console.log("Successfully")
})

// change port as per wish
app.listen(9002, () => console.log('listening on port 9002'))