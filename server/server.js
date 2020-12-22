const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

require('dotenv').config();

let mailList = [];

//**---------Middleware---------**//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const nodemailer = require('nodemailer');
app.use(express.static('build'));

//**----------Express Routes---------**//
app.post('/add', (req, res) => {
  //adding new email to mailing list. No database so email list dependent on server.
  mailList.push(req.body.toString());
  console.log('in mail list', mailList);
});

//**----------Mailer Function---------**//
function sendEmail() {
  const transportConfig = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  };
  let transporter = nodemailer.createTransport(transportConfig);
  let zoomLink = process.env.ZOOM;
  //actual email being sent
  const mailOptions = {
    from: process.env.EMAIL,
    to: `${mailList}`,
    subject: 'Wayward Meetup',
    html: `<div>
      <h1>Friendly Reminder!</h1>
      <p>Don't forget to join us for the Wayward Meetup! Click the link below for the zoom session.</p>
      <a href="${zoomLink}" target="_blank">Mother Hen's Room</a>
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
if (Date.parse(new Date()) >= Date.parse(new Date(2021, 0, 14))) {
  //-----------------------CHANGE THIS TO CORRECT START DATE
  //Checking current date to first wayward meeting of 2021
  console.log(Date.parse(new Date(2020, 1, 2)));
  setInterval(sendEmail, 5000);
}

//**----------Start Server---------**//
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
