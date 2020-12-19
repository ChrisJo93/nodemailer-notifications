const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', (req, res) => {
  const transportConfig = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  };
  let transporter = nodemailer.createTransport(transportConfig);
  let registerLink = 'http://localhost:3000';
  const mailOptions = {
    from: process.env.EMAIL,
    to: `Johnny.C.Alexander@gmail.com`,
    subject: 'Testing Mailer Bot',
    html: `<div>
    <h1>Welcome to the Rodeo</h1>
    <p>Nicely Done On Setting This Up! Now, we need to configure it to where it sends an email on a certain time and day every other week.</p>
    <a href="${registerLink}" target="_blank">Back To Dev Space</a>
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
