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
 *
 */
var BackGround = (function (_super) {
    __extends(BackGround, _super);
    function BackGround() {
        var _this = _super.call(this) || this;
        _this.targetPos = [-150, -150, -150, -150, -150];
        _this.bgColor = 0;
        _this.touchTimes = 0;
        _this.initView();
        return _this;
    }
    BackGround.prototype.initView = function () {
        var _this = this;
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("bg_png");
        this.bg.width = AdaptSceenUtil.curWidth();
        this.bg.height = AdaptSceenUtil.curHeight();
        DrawUtil.setImageColor(this.bg, ColorEnum.colorOrder[Math.floor(Math.random() * ColorEnum.colorOrder.length)]);
        // this.bg.x = 640;
        this.addChild(this.bg);
        this.bg_mask = new egret.Bitmap();
        this.bg_mask.texture = RES.getRes("bg_mask_png");
        this.bg_mask.width = AdaptSceenUtil.curWidth();
        this.bg_mask.height = AdaptSceenUtil.curHeight();
        this.addChild(this.bg_mask);
        this.clouds = new egret.Sprite();
        this.addChild(this.clouds);
        egret.Ticker.getInstance().register(this.update, this);
        for (var i = 1; i <= 3; i++) {
            this["cloud" + i] = new egret.Bitmap();
            this["cloud" + i].texture = RES.getRes("cloud" + Math.floor(Math.random() * 3 + 1) + "_png");
            this["cloud" + i].y = AdaptSceenUtil.curHeight() * 1 / 5 + Math.random() * AdaptSceenUtil.curHeight() * 1 / 6;
            this["cloud" + i].x = Math.random() * AdaptSceenUtil.curWidth() + AdaptSceenUtil.curWidth() * i;
            this["cloud" + i].scaleX = this["cloud" + i].scaleY = 2 * this["cloud" + i].y / AdaptSceenUtil.curHeight();
            this.targetPos[i - 1] = -150 - Math.random() * AdaptSceenUtil.curWidth();
            this["cloud" + i].alpha = 0.6;
            this.clouds.addChild(this["cloud" + i]);
        }
        for (var i = 4; i <= 5; i++) {
            this["cloud" + i] = new egret.Bitmap();
            this["cloud" + i].texture = RES.getRes("cloud" + Math.floor(Math.random() * 3 + 1) + "_png");
            this["cloud" + i].y = AdaptSceenUtil.curHeight() * 1 / 3 + Math.random() * AdaptSceenUtil.curHeight() * 1 / 3;
            this["cloud" + i].x = Math.random() * AdaptSceenUtil.curWidth() + AdaptSceenUtil.curWidth() * (i - 3);
            this["cloud" + i].scaleX = this["cloud" + i].scaleY = 2 * this["cloud" + i].y / AdaptSceenUtil.curHeight();
            this.targetPos[i - 1] = -150 - Math.random() * AdaptSceenUtil.curWidth();
            this["cloud" + i].alpha = 0.6;
            SceneManager.getInstance().getEffectLayer().addChild(this["cloud" + i]);
        }
        egret.Tween.get(this.bg, { loop: true }).wait(2 * GameConst.MINUTE).call(function () {
            var fromColor = ColorEnum.colorOrder[_this.bgColor];
            _this.bgColor++;
            if (_this.bgColor === ColorEnum.colorOrder.length) {
                _this.bgColor = 0;
            }
            var toColor = ColorEnum.colorOrder[_this.bgColor];
            DrawUtil.colorTween(_this.bg, fromColor, toColor);
        });
        this.cloud5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cloud5Touched, this);
    };
    BackGround.prototype.cloud5Touched = function (e) {
        var _this = this;
        if (this.touchTimes === 0) {
            egret.setTimeout(function () {
                if (_this.touchTimes > 4) {
                    console.log("hello");
                }
            }, this, 2000);
        }
        this.touchTimes++;
    };
    BackGround.prototype.update = function (deltaTime) {
        if (this.cloud1.x < this.targetPos[0]) {
            this.cloud1.texture = RES.getRes("cloud" + Math.floor(Math.random() * 3 + 1) + "_png");
            this.cloud1.x = Math.random() * AdaptSceenUtil.curWidth() + AdaptSceenUtil.curWidth();
            this.cloud1.y = AdaptSceenUtil.curHeight() * 1 / 5 + Math.random() * AdaptSceenUtil.curHeight() * 1 / 4;
            this.cloud1.scaleX = this.cloud1.scaleY = 2 * this.cloud1.y / AdaptSceenUtil.curHeight() + 0.1;
            this.targetPos[0] = -150;
            if (this.cloud1.y < this.cloud2.y) {
                this.clouds.setChildIndex(this.cloud1, this.clouds.getChildIndex(this.cloud2));
            }
            if (this.cloud1.y < this.cloud3.y) {
                this.clouds.setChildIndex(this.cloud1, this.clouds.getChildIndex(this.cloud3));
            }
        }
        else {
            this.cloud1.x -= this.cloud1.y / AdaptSceenUtil.curHeight();
        }
        if (this.cloud2.x < this.targetPos[1]) {
            this.cloud2.texture = RES.getRes("cloud" + Math.floor(Math.random() * 3 + 1) + "_png");
            this.cloud2.x = Math.random() * AdaptSceenUtil.curWidth() * 2 + AdaptSceenUtil.curWidth();
            this.cloud2.y = AdaptSceenUtil.curHeight() * 1 / 5 + Math.random() * AdaptSceenUtil.curHeight() * 1 / 4;
            this.cloud2.scaleX = this.cloud2.scaleY = 2 * this.cloud2.y / AdaptSceenUtil.curHeight() + 0.1;
            this.targetPos[1] = -150;
            if (this.cloud2.y < this.cloud1.y) {
                this.clouds.setChildIndex(this.cloud2, this.clouds.getChildIndex(this.cloud1));
            }
            if (this.cloud2.y < this.cloud3.y) {
                this.clouds.setChildIndex(this.cloud2, this.clouds.getChildIndex(this.cloud3));
            }
        }
        else {
            this.cloud2.x -= this.cloud2.y / AdaptSceenUtil.curHeight();
        }
        if (this.cloud3.x < this.targetPos[2]) {
            this.cloud3.texture = RES.getRes("cloud" + Math.floor(Math.random() * 3 + 1) + "_png");
            this.cloud3.x = Math.random() * AdaptSceenUtil.curWidth() * 3 + AdaptSceenUtil.curWidth();
            this.cloud3.y = AdaptSceenUtil.curHeight() * 1 / 5 + Math.random() * AdaptSceenUtil.curHeight() * 1 / 6;
            this.cloud3.scaleX = this.cloud3.scaleY = 2 * this.cloud3.y / AdaptSceenUtil.curHeight();
            this.targetPos[2] = -150;
            if (this.cloud3.y < this.cloud2.y) {
                this.clouds.setChildIndex(this.cloud3, this.clouds.getChildIndex(this.cloud2));
            }
            if (this.cloud3.y < this.cloud1.y) {
                this.clouds.setChildIndex(this.cloud3, this.clouds.getChildIndex(this.cloud1));
            }
        }
        else {
            this.cloud3.x -= this.cloud3.y / AdaptSceenUtil.curHeight();
        }
        if (this.cloud4.x < this.targetPos[2]) {
            this.cloud4.texture = RES.getRes("cloud" + Math.floor(Math.random() * 3 + 1) + "_png");
            this.cloud4.x = Math.random() * AdaptSceenUtil.curWidth() * 3 + AdaptSceenUtil.curWidth();
            this.cloud4.y = AdaptSceenUtil.curHeight() * 1 / 3 + Math.random() * AdaptSceenUtil.curHeight() * 1 / 3;
            this.cloud4.scaleX = this.cloud4.scaleY = 2 * this.cloud4.y / AdaptSceenUtil.curHeight();
            this.targetPos[2] = -150;
            if (this.cloud4.y < this.cloud5.y) {
                SceneManager.getInstance().getEffectLayer().setChildIndex(this.cloud4, SceneManager.getInstance().getEffectLayer().getChildIndex(this.cloud5));
            }
        }
        else {
            this.cloud4.x -= this.cloud4.y / AdaptSceenUtil.curHeight();
        }
        if (this.cloud5.x < this.targetPos[2]) {
            this.cloud5.texture = RES.getRes("cloud" + Math.floor(Math.random() * 3 + 1) + "_png");
            this.cloud5.x = Math.random() * AdaptSceenUtil.curWidth() * 3 + AdaptSceenUtil.curWidth();
            this.cloud5.y = AdaptSceenUtil.curHeight() * 1 / 3 + Math.random() * AdaptSceenUtil.curHeight() * 1 / 3;
            this.cloud5.scaleX = this.cloud5.scaleY = 2 * this.cloud5.y / AdaptSceenUtil.curHeight();
            this.targetPos[2] = -150;
            if (this.cloud5.y < this.cloud4.y) {
                SceneManager.getInstance().getEffectLayer().setChildIndex(this.cloud5, SceneManager.getInstance().getEffectLayer().getChildIndex(this.cloud4));
            }
        }
        else {
            this.cloud5.x -= this.cloud5.y / AdaptSceenUtil.curHeight();
        }
    };
    return BackGround;
}(egret.Sprite));
__reflect(BackGround.prototype, "BackGround");
