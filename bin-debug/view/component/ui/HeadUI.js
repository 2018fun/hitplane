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
/**
 * 头部UI
 */
var HeadUI = (function (_super) {
    __extends(HeadUI, _super);
    function HeadUI() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    HeadUI.prototype.initView = function () {
        this.goldHead = new GoldFrame("gold");
        this.goldHead.x = 80;
        this.goldHead.y = 32 + AdaptSceenUtil.y_fix() / 2;
        this.addChild(this.goldHead);
        this.gasHead = new GoldFrame("gas");
        this.gasHead.x = 80 + 192;
        this.gasHead.y = 32 + AdaptSceenUtil.y_fix() / 2;
        this.gasHead.touchEnabled = true;
        this.gasHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.addChild(this.gasHead);
    };
    HeadUI.prototype.onTouch = function () {
        console.log("观看视频");
        // TODO 视频奖励
        SaveDataManager.getInstance().getUserData().gas += 50;
    };
    Object.defineProperty(HeadUI.prototype, "GoldHead", {
        get: function () {
            return this.goldHead;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeadUI.prototype, "GasHead", {
        get: function () {
            return this.gasHead;
        },
        enumerable: true,
        configurable: true
    });
    HeadUI.prototype.setGold = function (value) {
        this.goldHead.amount = value;
    };
    HeadUI.prototype.setGas = function (value) {
        this.gasHead.amount = Math.floor(value);
    };
    return HeadUI;
}(egret.Sprite));
__reflect(HeadUI.prototype, "HeadUI");
