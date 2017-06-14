'use strict'

const db = require('APP/db')
const fs = require('fs')
const PDFParser = require("pdf2json")

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const {mustBeLoggedIn, forbidden, isUserAdmin} = require('./auth.filters')

// const {emailAuth} = require('../auth.js')

const PDFDocument = require('pdfkit')

// const {emailAuth} = require('../auth.js')

function handleEmail(req, res, next) {

    const transporter = nodemailer.createTransport(smtpTransport({
        // if using gmail, you need to set "allow less secure apps" option in gmail security center
        // should find an alternative email service to use and conceal password
        // for now credentials are in another file that is being .gitignored
        service: 'Gmail',
        secure: true,
        auth: {
          user: '',
          pass: ''
        }
    }));

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
      if (err) reject(err);
      else resolve(str);
    });
  })
};

function promisifiedWriteFile (filename, str) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      filename,
      // if using pdf stuff
      // str.getRawTextContent(),
      str,
      (err) => {
        if (err) {
          reject(err)
        } else {
          resolve("Success")
        }
      }
    );
  });
}

module.exports = require('express').Router()
  .get('/',
    mustBeLoggedIn,
    (req, res, next) => {

      promisifiedReadFile(`${__dirname}/flockpad.txt`)
        .then(data => {
          res.send(data)
        })
        .catch()

    // pdf stuff
    ///////////////////////////////////////////////////
    // let pdfParser = new PDFParser(this, 1);
    
    // pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    // pdfParser.on("pdfParser_dataReady", pdfData => {

    //     // promises to write to .txt then read from it
    //     promisifiedWriteFile(`${__dirname}/flockpad.txt`, pdfParser)
    //       .then((data) => {
    //         console.log("Value write resolved to: ", data);
    //         promisifiedReadFile(`${__dirname}/flockpad.txt`)
    //           .then(data => {
    //             res.send(data)
    //             pdfParser = null;
    //           })
    //           .catch()
    //       })
    //       .catch()

    // });
 
    // pdfParser.loadPDF(`${__dirname}/flockpad.pdf`);
    /////////////////////////////////////////////////////

  })
  // .post('/email', handleEmail)
  .post('/',
    (req, res, next) => {

      promisifiedWriteFile(`${__dirname}/flockpad.txt`, req.body.input)
        .then((data) => {
          console.log("Value write resolved to: ", data);
          promisifiedReadFile(`${__dirname}/flockpad.txt`)
            .then(data => {
              res.send(data)
            })
            .catch()
        })
      .catch()

    // pdf stuff
    ///////////////////////////////
    // let doc = new PDFDocument
     
    // // Pipe its output somewhere, like to a file or HTTP response 
    // doc.pipe(fs.createWriteStream(`${__dirname}/flockpad.pdf`))
     
    // // Embed a font, set the font size, and render some text 
    // doc.font(`${__dirname}/fonts/PalatinoBold.ttf`)
    //    .fontSize(12)
    //    .text(req.body.input, 100, 100)
     
    // // Finalize PDF file 
    // doc.end()
    // res.send();
    //////////////////////////////////
  })