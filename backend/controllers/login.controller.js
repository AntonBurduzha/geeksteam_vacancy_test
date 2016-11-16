var express = require('express');
var router = express.Router();

router.post('/', loginUser);

function loginUser(req, res) {
  let userdata = {
    'login': req.body.Username,
    'password': req.body.Password
  };
  setTimeout(() => {
    if (userdata.login == 'qwer' && userdata.password === '123') {
      res.json({
        "Auth":"Logged",
        "Language":"EN"
      });
    }
    else {
      res.json({
        "Auth":"Denied"
      });
    }
  }, 2000);
}

module.exports = router;