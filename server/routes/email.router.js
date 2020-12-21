const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

let mailList = ['waywardtechbot@gmail.com'];

router.get('/', (req, res) => {
  // res.send(thursdayCounter.toString());
  // if (thursdayCounter > 0) {
  //   console.log(thursdayCounter, 'fuck');
  // }
  // console.log('testing', thursdayCounter);
  // console.log(mailList);
  if (new Date().getDay() === 0) {
    res.send(new Date().getDay().toString());
  }
});

router.post('/counter', (req, res) => {
  //Counting Thursdays. On 1 Thursday, send email, on 0 Thursday don't send email
  // thursdayCounter = thursdayCounter += 1;
  // if (thursdayCounter > 1) {
  //   thursdayCounter = 0;
  // }
});

router.post('/add', (req, res) => {
  //adding new email to mailing list. No database so email list dependent on server.
  mailList.push(req.body);
  console.log('in server', req.body);
  console.log('in mail list', mailList);
});

//sending emails once every other Thursday.

router.post('/', (req, res) => {
  const transportConfig = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  };
  let transporter = nodemailer.createTransport(transportConfig);
  let zoomLink = process.env.ZOOM;
  //actual email that is sent
  const mailOptions = {
    from: process.env.EMAIL,
    to: mailList,
    subject: 'Wayward Meetup',
    html: `<div>
    <h1>Friendly Reminder!</h1>
    <p>Don't forget to join us for the Wayward Meetup! Click the link below for the zoom session.</p>
    <a href="${zoomLink}" target="_blank">Back To Dev Space</a>
    </div>`,
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      console.log('here is the res: ', res);
    }
  });
});

module.exports = router;
