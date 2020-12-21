const express = require('express');
const router = express.Router();

let mailList = ['waywardtechbot@gmail.com'];

router.post('/add', (req, res) => {
  //adding new email to mailing list. No database so email list dependent on server.
  mailList.push(req.body.toString());
  console.log('in mail list', mailList);
});

module.exports = router;
