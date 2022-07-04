const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const {
    response
} = require("express");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/2ec45ce968";

    const options = {
        method: "POST",
        auth: "max1:9717400f004446deb2da2e05e970fb62-us13"
    }

    const request = https.request(url, options, function () {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    })
    request.write(jsonData);
    request.end();



});

app.listen(3000, function () {
    console.log("Server running on port 3000");
});

// API Key 9717400f004446deb2da2e05e970fb62-us13

// audience id 2ec45ce968