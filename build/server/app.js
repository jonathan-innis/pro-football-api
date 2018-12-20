"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var constants_1 = require("../constants");
var controllers_1 = require("./controllers");
var app = express();
var port = 3000;
app.use('./welcome', controllers_1.WelcomeController);
mongoose.connect(constants_1.MONGO_URL, { useNewUrlParser: true }).then(function () {
    app.listen(port, function () {
        console.log("Listening at http://localhost:" + port);
    });
});
//# sourceMappingURL=app.js.map