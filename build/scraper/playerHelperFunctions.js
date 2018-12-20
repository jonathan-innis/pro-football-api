"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getName($) {
    try {
        var data = $('#meta > div > h1');
        return $(data[0]).text();
    }
    catch (error) {
        console.log(error);
        return '';
    }
}
exports.getName = getName;
function getPositions($) {
    try {
        var data = $('#meta > div > p:nth-child(3)');
        var rawPos = $(data[0]).text().replace(/(\n\t|\n)/gm, "");
        var pos = rawPos.split('Position: ')[1];
        return pos.split('-').filter(function (element) { return element !== ''; });
    }
    catch (error) {
        console.log(error);
        return [];
    }
}
exports.getPositions = getPositions;
function getHeight($) {
    try {
        var data = $('#meta > div > p:nth-child(4) span:nth-child(1)');
        var rawHeight = $(data[0]).text();
        var feet = parseInt(rawHeight.split('-')[0]);
        var inches = parseInt(rawHeight.split('-')[1]);
        return (feet * 12) + inches;
    }
    catch (error) {
        console.log(error);
        return 0;
    }
}
exports.getHeight = getHeight;
function getWeight($) {
    try {
        var data = $('#meta > div > p:nth-child(4) span:nth-child(2)');
        return parseInt($(data[0]).text().split('lb')[0]);
    }
    catch (error) {
        console.log(error);
        return 0;
    }
}
exports.getWeight = getWeight;
function getBirthDate($) {
    try {
        var data = $('#necro-birth');
        var rawDate = $(data[0]).attr('data-birth');
        return new Date(rawDate);
    }
    catch (error) {
        console.log(error);
        return new Date();
    }
}
exports.getBirthDate = getBirthDate;
function getBirthPlace($) {
    try {
        var data = $('#meta > div > p:nth-child(5) > span:nth-child(3)');
        var rawPlace = $(data[0]).text().replace(/(\n\t|\n)/gm, ""); //replaces extra tabs and newlines
        var place = rawPlace.split('in')[1].slice(1); //removes the word in and gets rid of extra spaces
        return place;
    }
    catch (error) {
        console.log(error);
        return '';
    }
}
exports.getBirthPlace = getBirthPlace;
function getCollege($) {
    try {
        var data = $('#meta > div > p:nth-child(6)');
        var rawCollege = $(data[0]).text().replace(/(\n\t|\n)/gm, "");
        console.log(rawCollege);
        var college = rawCollege.split('College: ')[1].slice(3);
        return college;
    }
    catch (error) {
        console.log(error);
        return '';
    }
}
exports.getCollege = getCollege;
//# sourceMappingURL=playerHelperFunctions.js.map