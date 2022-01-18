var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var guard = require('express-jwt-permissions')();
const cors = require('cors');

var port = process.env.PORT || 8080;

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev--hn8vcuo.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://userAuth.com',
    issuer: 'https://dev--hn8vcuo.us.auth0.com/',
    algorithms: ['RS256']
});

app.use(cors());
app.use(jwtCheck);

app.get('/userInfo', guard.check(['read:user']), function (req, res) {
    res.send('Got Info');
});

app.listen(port);