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
var BuildingView = (function (_super) {
    __extends(BuildingView, _super);
    function BuildingView() {
        var _this = _super.call(this) || this;
        _this.position = 0;
        _this.initView();
        return _this;
    }
    BuildingView.prototype.initView = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.bg = new egret.Bitmap();
                this.bg.texture = RES.getRes("map_bg_png");
                this.addChild(this.bg);
                this.buildingView = new egret.Bitmap();
                // buildingView.y = 50;
                // buildingView.x = 200 * (i - 1);
                this.buildingView.x = this.width / 2;
                this.buildingView.y = this.height / 2;
                this.buildingView.touchEnabled = false;
                this.addChild(this.buildingView);
                this.nameText = new egret.TextField();
                this.nameText.textAlign = egret.HorizontalAlign.CENTER;
                this.nameText.x = this.width / 2;
                this.nameText.y = 30;
                this.addChild(this.nameText);
                this.levelText = new egret.TextField();
                this.levelText.x = this.bg.width - 20;
                this.addChild(this.levelText);
                this.insureText = new egret.TextField();
                this.insureText.x = this.bg.width - 50;
                this.addChild(this.insureText);
                return [2 /*return*/];
            });
        });
    };
    BuildingView.prototype.updateData = function () {
    };
    Object.defineProperty(BuildingView.prototype, "view", {
        set: function (texture) {
            this.buildingView.texture = RES.getRes(texture);
            this.buildingView.anchorOffsetX = this.buildingView.width / 2;
            this.buildingView.anchorOffsetY = this.buildingView.height / 2;
            this.buildingView.scaleX = this.buildingView.scaleY = 0.25;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildingView.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
            this.nameText.text = this._name;
            this.nameText.anchorOffsetX = this.nameText.width / 2;
            this.nameText.anchorOffsetY = this.nameText.height / 2;
            this.updateData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuildingView.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (value) {
            this._level = value;
            this.levelText.text = this._level.toString();
            this.updateData();
        },
        enumerable: true,
        configurable: true
    });
    return BuildingView;
}(egret.Sprite));
__reflect(BuildingView.prototype, "BuildingView");
