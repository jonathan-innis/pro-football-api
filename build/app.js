"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = require("./controllers");
var app = express_1.default();
var port = 3000;
app.use('./welcome', controllers_1.WelcomeController);
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port);
});
//# sourceMappingURL=app.js.map