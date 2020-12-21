const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

require('dotenv').config();

//**---------Middleware---------**//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const nodemailer = require('nodemailer');
app.use(express.static('build'));

//**----------Express Routes---------**//
const emailRouter = require('./routes/email.router.js');
app.use('/send', emailRouter);

function thinkingTooHard() {
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
    to: 'waywardtechbot@gmail.com',
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
}

//**----------Start Server---------**//
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
