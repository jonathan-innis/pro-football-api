"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var typegoose_1 = require("typegoose");
var Player_1 = require("./Player");
var constants_1 = require("../../constants");
mongoose.connect(constants_1.MONGO_URL);
var QuarterBack = /** @class */ (function (_super) {
    __extends(QuarterBack, _super);
    function QuarterBack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typegoose_1.prop()
    ], QuarterBack.prototype, "record", void 0);
    __decorate([
        typegoose_1.prop({ index: true })
    ], QuarterBack.prototype, "completionPct", void 0);
    __decorate([
        typegoose_1.prop()
    ], QuarterBack.prototype, "yards", void 0);
    __decorate([
        typegoose_1.prop()
    ], QuarterBack.prototype, "yardsPerAttempt", void 0);
    __decorate([
        typegoose_1.prop()
    ], QuarterBack.prototype, "touchdowns", void 0);
    __decorate([
        typegoose_1.prop()
    ], QuarterBack.prototype, "interceptions", void 0);
    __decorate([
        typegoose_1.prop({ index: true })
    ], QuarterBack.prototype, "fantasyPoints", void 0);
    return QuarterBack;
}(Player_1.Player));
exports.QuarterBackModel = new QuarterBack().getModelForClass(QuarterBack);
//# sourceMappingURL=QuarterBack.js.map