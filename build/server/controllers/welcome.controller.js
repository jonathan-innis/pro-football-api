"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send('Hello, world!');
});
router.get('/:name', function (req, res) {
    var name = req.params.name;
    res.send("Hello, " + name);
});
exports.WelcomeController = router;
//# sourceMappingURL=welcome.controller.js.map