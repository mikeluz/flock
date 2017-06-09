'use strict'

const db = require('APP/db')
const fs = require('fs')
const PDFParser = require("pdf2json")

const nodemailer = require('nodemailer');

const {mustBeLoggedIn, forbidden, isUserAdmin} = require('./auth.filters')

const PDFDocument = require('pdfkit')

function handleEmail(req, res, next) {

    const transporter = nodemailer.createTransport({
        // if using gmail, you need to set "allow less secure apps" option in gmail security center
        // should find an alternative email service to use and conceal password
        service: 'Gmail',
        secure: true,
        auth: {
            user: 'mikeluz84@gmail.com',
            pass: 'mikeluzpoetry'
        }
    });

    const message = {
        from: 'admin@flocklit.nyc',
        to: req.body.email,
        subject: 'New FlockJot',
        text: 'Thanks for using Flock!',
        attachments: [{ path: __dirname + '/flockpad.pdf' }]
    };

    // placeholder response -- comment out and uncomment below code to send email
    res.send("OK")

    // uncomment this to send emails //
    ///////////////////////////////////
    // transporter.sendMail(message, function(error, info) {
    //     if (error) {
    //         console.log(error);
    //         res.json({yo:'error'});
    //     } else {
    //         console.log('Message sent: ' + info.response);
    //         res.json({yo: info.response});
    //     }
    // })
    
}

function readFile (filename, callback) {
  fs.readFile(filename, function (err, buffer) {
    if (err) callback(err);
    else callback(null, buffer.toString());
  });
};

function promisifiedReadFile (filename) {
  return new Promise(function (resolve, reject) {
    readFile(filename, function (err, str) {
      console.log("str in promise", str)
      if (err) reject(err);
      else resolve(str);
    });
  })
};

module.exports = require('express').Router()
  .get('/',
    mustBeLoggedIn,
    (req, res, next) => {

    let pdfParser = new PDFParser(this, 1);
    
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => {
        fs.writeFile(__dirname + '/flockpad.txt', pdfParser.getRawTextContent())
    
        promisifiedReadFile.call(null, __dirname + '/flockpad.txt')
        .then(data => {
          console.log('data', data)
          res.send(data)
          pdfParser = null;
        })
    });
 
    pdfParser.loadPDF(__dirname + '/flockpad.pdf');

  })
  .post('/email', handleEmail)
  .post('/',
    (req, res, next) => {
    console.log("input", req.body.input);
    let doc = new PDFDocument
     
    // Pipe its output somewhere, like to a file or HTTP response 
    doc.pipe(fs.createWriteStream(__dirname + '/flockpad.pdf'))
     
    // Embed a font, set the font size, and render some text 
    doc.font(__dirname + '/fonts/PalatinoBold.ttf')
       .fontSize(25)
       .text(req.body.input, 100, 100)
     
    // Finalize PDF file 
    doc.end()
    res.send();
  })