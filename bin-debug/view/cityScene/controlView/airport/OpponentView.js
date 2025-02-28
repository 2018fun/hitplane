/**
 *
 */
/**
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var OpponentView = (function (_super) {
    __extends(OpponentView, _super);
    function OpponentView() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    OpponentView.prototype.initView = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.bg = new egret.Bitmap();
                this.bg.texture = RES.getRes("map_bg_png");
                this.addChild(this.bg);
                this.airport = new egret.Bitmap();
                this.airport.texture = RES.getRes("view_airport_png");
                this.airport.anchorOffsetX = this.airport.width / 2;
                this.airport.anchorOffsetY = this.airport.height / 2;
                this.airport.scaleX = this.airport.scaleY = 1 / 4;
                this.airport.x = this.bg.width / 2;
                this.airport.y = this.bg.height / 2;
                this.addChild(this.airport);
                this.nameText = new egret.TextField();
                this.nameText.textAlign = egret.HorizontalAlign.CENTER;
                this.nameText.x = this.width / 2;
                this.nameText.y = 0;
                this.addChild(this.nameText);
                this.levelText = new egret.TextField;
                this.levelText.x = 30;
                this.levelText.y = 30;
                this.addChild(this.levelText);
                this.gasBmp = new egret.Bitmap();
                this.gasBmp.texture = RES.getRes("gas_png");
                this.addChild(this.gasBmp);
                this.gasCostText = new egret.TextField;
                this.addChild(this.gasCostText);
                return [2 /*return*/];
            });
        });
    };
    OpponentView.prototype.updateData = function () {
        var data = CityController.getInstance().makeOpponenetDataByLevel(this._level);
        this.levelText.text = i18n.getInstance().getLanguage("ui_oppo_" + data.level);
        this.gasCostText.text = Math.pow(data.level, 3) * 2 + "";
        this.gasCostText.x = this.width - this.gasCostText.width - 20;
        this.gasCostText.y = this.height - this.gasCostText.height;
        this.gasBmp.x = this.width - this.gasCostText.width - this.gasBmp.width - 20;
        this.gasBmp.y = this.height - this.gasBmp.height;
    };
    Object.defineProperty(OpponentView.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (value) {
            this._level = value;
            this.updateData();
        },
        enumerable: true,
        configurable: true
    });
    return OpponentView;
}(egret.Sprite));
__reflect(OpponentView.prototype, "OpponentView");
