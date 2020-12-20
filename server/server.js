const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

require('dotenv').config();

//**---------Middleware---------**//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

//**----------Express Routes---------**//
const emailRouter = require('./routes/email.router.js');
let thursdayCounter = 0;
app.use('/send', emailRouter);

//**----------Start Server---------**//
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
