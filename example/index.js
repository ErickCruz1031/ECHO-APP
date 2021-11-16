var express = require("express");
var axios = require("axios");
var oAuth = require('./oauth.js')
var port = process.env.PORT || 3001;
var app = express();


const userAPIEndpoint = "http://localhost:8080/userInfo";

app.use(oAuth);
app.get("/user", async (req, res) =>{
    try { 
        const {access_token } = req.oauth;

        const response = await axios({method: "get", url: userAPIEndpoint, headers: {"Authorization" : `Beader ${access_token}`}});
        res.json(response.data);
    } catch (error){
        console.log(error);
        if (error.response.status === 4001){
            res.status(401).json("Unauthorized to access data");
        } else if (error.response.status === 4003){
            res.status(403).json("Permission Denied");
        } else{
            res.status(500).json("Whoops, something went wrong");
        }
    }
})

app.listen(port, () => console.log("Listening..."));

