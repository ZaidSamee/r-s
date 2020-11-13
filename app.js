
const express = require('express');
const path = require('path');
const glob = require('glob');
const mongoose = require('mongoose');
const logger = require('morgan');

var app = express();

//Database connectivity
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
};

var connectWithRetry = function () {
    return mongoose.connect("mongodb://localhost/tasks", dbOptions, function (err) {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
        }
    });
};
connectWithRetry();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



const routersAll = [];
let routers = glob.sync('./modules/*/*.routes.js');
routers.forEach(function (router) {
    routersAll.push(require(path.resolve(router))(app));
});

routers = glob.sync('./modules/*/*/*.routes.js');
routers.forEach(function (router) {
    routersAll.push(require(path.resolve(router))(app));
});
const Task1 = () => {
    let s = 7, t = 10;
    let a = 4, b = 12;
    let m = [2, 3, -4], n = [3, -2, -4];
    let redDistance = [], blueDistance = [];
    let red = 0, blue = 0;
    for (var i = 0; i < m.length; i++) {
        redDistance[i] = a + m[i];
        if (redDistance[i] >= s && redDistance[i] <= t) {
            red += 1;
        }
    }
    for (var i = 0; i < n.length; i++) {
        blueDistance[i] = b + n[i];
        if (blueDistance[i] >= s && blueDistance[i] <= t) {
            blue += 1;
        }
    }
    console.log("Red : ",red, "\nBlue : ", blue);
}
Task1();
module.exports = app;
