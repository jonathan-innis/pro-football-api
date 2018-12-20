"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var rp = require("request-promise");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var constants_1 = require("../constants");
var playerHelperFunctions_1 = require("./playerHelperFunctions");
mongoose.connect(constants_1.MONGO_URL, { useNewUrlParser: true }).then(function () {
    scrape().then(function () {
        console.log("Finished scraping");
        process.exit();
    });
});
function scrape() {
    return __awaiter(this, void 0, void 0, function () {
        var URL, i, playerLinks, _i, playerLinks_1, link;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 26)) return [3 /*break*/, 7];
                    URL = "https://www.pro-football-reference.com/players/" + (i + 10).toString(36).toUpperCase() + "/";
                    return [4 /*yield*/, getPlayerLinks(URL)];
                case 2:
                    playerLinks = _a.sent();
                    _i = 0, playerLinks_1 = playerLinks;
                    _a.label = 3;
                case 3:
                    if (!(_i < playerLinks_1.length)) return [3 /*break*/, 6];
                    link = playerLinks_1[_i];
                    return [4 /*yield*/, getPlayerInfo("https://www.pro-football-reference.com" + link)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function getPlayerLinks(URL) {
    return __awaiter(this, void 0, void 0, function () {
        var playerLinks, html, $;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    playerLinks = [];
                    return [4 /*yield*/, rp(URL)];
                case 1:
                    html = _a.sent();
                    $ = cheerio.load(html);
                    $('#div_players > p > a').each(function (i, element) {
                        playerLinks.push($(element).attr('href'));
                    });
                    return [2 /*return*/, playerLinks];
            }
        });
    });
}
function getPlayerInfo(URL) {
    return __awaiter(this, void 0, void 0, function () {
        var html, $, name, positions, height, weight, birthDate, birthPlace, college;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rp(URL)];
                case 1:
                    html = _a.sent();
                    $ = cheerio.load(html);
                    name = playerHelperFunctions_1.getName($);
                    positions = playerHelperFunctions_1.getPositions($);
                    height = playerHelperFunctions_1.getHeight($);
                    weight = playerHelperFunctions_1.getWeight($);
                    birthDate = playerHelperFunctions_1.getBirthDate($);
                    birthPlace = playerHelperFunctions_1.getBirthPlace($);
                    college = playerHelperFunctions_1.getCollege($);
                    console.log(name, positions, height, weight, birthDate, birthPlace, college);
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=scraper.js.map