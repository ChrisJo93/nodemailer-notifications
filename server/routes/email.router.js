const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

let mailList = ['waywardtechbot@gmail.com'];
let thursdayCounter = '0';

router.get('/', (req, res) => {
  res.send(parseInt(thursdayCounter));
  console.log('testing', thursdayCounter);
});

router.post('/counter', (req, res) => {
  thursdayCounter = thursdayCounter += 1;
});

router.post('/add', (req, res) => {
  mailList.push(req.body);
  console.log('in server', req.body);
  console.log('in mail list', mailList);
});

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
