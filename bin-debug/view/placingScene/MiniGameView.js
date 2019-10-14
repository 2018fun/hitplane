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
var MiniGameView = (function (_super) {
    __extends(MiniGameView, _super);
    function MiniGameView(data) {
        var _this = _super.call(this) || this;
        _this.headData = data.heads;
        _this.times = data.times;
        _this.date = data.date;
        _this.initView();
        return _this;
    }
    MiniGameView.prototype.initView = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.bg = new egret.Bitmap();
                        this.bg.texture = RES.getRes("map_bg_png");
                        this.addChild(this.bg);
                        this.mapData = new MapData();
                        return [4 /*yield*/, this.initData()];
                    case 1:
                        _a.sent();
                        this.gameView = new GameView(true, this.mapData.map, false);
                        // this.gameView.sethe
                        this.gameView.anchorOffsetX = this.gameView.width / 2;
                        this.gameView.anchorOffsetY = this.gameView.height / 2;
                        this.gameView.scaleX = 160 / 630;
                        this.gameView.scaleY = 160 / 630;
                        this.gameView.x = this.bg.width / 2;
                        this.gameView.y = this.bg.height / 2 - 5;
                        this.addChild(this.gameView);
                        // this.gameView.cacheAsBitmap = true;
                        this.gameView.touchEnabled = false;
                        this.gameView.touchChildren = false;
                        this.gameView.cacheAsBitmap = true;
                        this.hitTimesText = new egret.TextField();
                        this.hitTimesText.text = this.times.toString();
                        this.hitTimesText.x = this.width - this.hitTimesText.width - 20;
                        this.hitTimesText.y = this.height - this.hitTimesText.height - 20;
                        this.addChild(this.hitTimesText);
                        return [2 /*return*/];
                }
            });
        });
    };
    MiniGameView.prototype.initData = function () {
        for (var i = 0; i < this.headData.length; i++) {
            this.mapData.setPlaneGridByHead(this.headData[i].head, this.headData[i].direction);
        }
    };
    MiniGameView.prototype.updateData = function () {
    };
    MiniGameView.prototype.getShareTimes = function () {
        return this.times;
    };
    return MiniGameView;
}(egret.Sprite));
__reflect(MiniGameView.prototype, "MiniGameView");
