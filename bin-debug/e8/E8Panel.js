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
 * E8Button类
 */
var E8Panel = (function (_super) {
    __extends(E8Panel, _super);
    function E8Panel(context, texture, backFun) {
        if (backFun === void 0) { backFun = null; }
        var _this = _super.call(this) || this;
        _this.param = { context: null, data: null }; //回调参数
        _this.isPlayCartoon = false;
        _this.param.context = context;
        _this.backFun = backFun;
        _this.btnImg = new egret.Bitmap();
        _this.btnImg.texture = texture;
        _this.btnImg.anchorOffsetX = _this.btnImg.width / 2;
        _this.btnImg.anchorOffsetY = _this.btnImg.height / 2;
        var rect = new egret.Rectangle(30, 51, 150, 105);
        _this.btnImg.scale9Grid = rect;
        _this.btnImg.scaleX = 4;
        _this.btnImg.scaleY = 5;
        _this.btnImg.touchEnabled = true;
        _this.addChild(_this.btnImg);
        return _this;
        // this.btnImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }
    E8Panel.prototype.changeTexture = function (texture) {
        this.btnImg.texture = texture;
    };
    E8Panel.prototype.onTouchTap = function (e) {
        this.cartoonType = 1;
        if (this.isPlayCartoon) {
            return;
        }
        this.btnImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.isPlayCartoon = true;
        var onComplete2 = function () {
            this.isPlayCartoon = false;
        };
        var onComplete1 = function () {
            if (this.cartoonType == 1) {
                egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 500, egret.Ease.elasticOut).call(onComplete2, this);
            }
            else if (this.cartoonType == 2) {
                egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 500, egret.Ease.backOut).call(onComplete2, this);
            }
            else if (this.cartoonType == 3) {
                egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, x: this.x - this.btnImg.width / 4, y: this.y - this.btnImg.height / 4 }, 100).call(onComplete2, this);
            }
        };
        egret.Tween.get(this).to({ scaleX: 0.5, scaleY: 0.5, x: this.x + this.btnImg.width / 4, y: this.y + this.btnImg.height / 4 }, 100, egret.Ease.sineIn).call(onComplete1, this);
        egret.setTimeout(function () {
            if (this.backFun != null) {
                this.btnImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
                this.backFun.apply(this.param.context, [this.param.data]);
            }
        }, this, 300);
    };
    return E8Panel;
}(egret.DisplayObjectContainer));
__reflect(E8Panel.prototype, "E8Panel");
