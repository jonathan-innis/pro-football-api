"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getName($) {
    var data = $('#meta > div > h1');
    return $(data[0]).text();
}
exports.getName = getName;
function getPositions($) {
    var data = $('#meta > div > p:nth-child(3)');
    var rawPos = $(data[0]).text().replace(/(\n\t|\n)/gm, "");
    var pos = rawPos.split('Position: ')[1];
    return pos.split('-').filter(function (element) { return element !== ''; });
}
exports.getPositions = getPositions;
function getHeight($) {
    var data = $('#meta > div > p:nth-child(4) span:nth-child(1)');
    var rawHeight = $(data[0]).text();
    var feet = parseInt(rawHeight.split('-')[0]);
    var inches = parseInt(rawHeight.split('-')[1]);
    return (feet * 12) + inches;
}
exports.getHeight = getHeight;
function getWeight($) {
    var data = $('#meta > div > p:nth-child(4) span:nth-child(2)');
    return parseInt($(data[0]).text().split('lb')[0]);
}
exports.getWeight = getWeight;
function getBirthDate($) {
    var data = $('#necro-birth');
    var rawDate = $(data[0]).attr('data-birth');
    return new Date(rawDate);
}
exports.getBirthDate = getBirthDate;
function getBirthPlace($) {
    var data = $('#meta > div > p:nth-child(5) > span:nth-child(3)');
    var rawPlace = $(data[0]).text().replace(/(\n\t|\n)/gm, ""); //replaces extra tabs and newlines
    var place = rawPlace.split('in')[1].slice(1); //removes the word in and gets rid of extra spaces
    return place;
}
exports.getBirthPlace = getBirthPlace;
function getCollege($) {
    var data = $('#meta > div > p:nth-child(6)');
    var rawCollege = $(data[0]).text().replace(/(\n\t|\n)/gm, "");
    console.log(rawCollege);
    var college = rawCollege.split('College: ')[1].slice(3);
    return college;
}
exports.getCollege = getCollege;
//# sourceMappingURL=playerHelperFunctions.js.map