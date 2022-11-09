const fs = require('fs');
const users  = require('./users.json');


const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * For using req.body in post method
 */

app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded
console.log(users);

app.listen(PORT, () => {
    console.log("Server is working!");
});


app.get('/user/:username', (req, res, next) => {

    const user = req.params.username;
    const userInfo = users.filter((info) => {
        return info.username === user});
    res.send(userInfo);
});

app.post('/user', (req, res, next) => {
    const receivedUserInfo = req.body;
    if(receivedUserInfo) {
        users.push(receivedUserInfo);
        fs.writeFile('./users.json', JSON.stringify(users), function (err) {
            if (err) return console.log(err);
          });
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});


