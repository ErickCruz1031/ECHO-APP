var axios = require("axios");
const tokenEndpoint = "https://dev--hn8vcuo.us.auth0.com/oauth/token";

const oauth = (req, res, next) =>{

    var code = req.query.code;
    if (!code){
        res.status(401).send("Missing authorization code");
    }

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code")
    params.append("client_id", "bhIxAaazRf27idWQcQVBsastK19JJLfm");
    params.append("client_secret", "-B0RyFuna3Jy6XQVQKKKyY7wLx7_WeYsj7gkTO3OyNeShOhjHoVXyi49fnTF7HUl");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/home");

    axios.port(tokenEndpoint, params)
    .then(response =>{
        req.oauth = response.data;
        next();
    })
    .catch(err =>{
        console.log(err);
        res.status(403).json(`Reason: ${err.message}`);
    })
    next();

}


module.export = oauth