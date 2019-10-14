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
var PlacingMsgView = (function (_super) {
    __extends(PlacingMsgView, _super);
    function PlacingMsgView() {
        var _this = _super.call(this) || this;
        _this._shareTimes = 0;
        _this.msgKey = ["playerName", "排名", "城镇积分", "可掠夺金币", "被进攻次数", "S率", "摧毁炮数"];
        _this.msgValue = [];
        _this.initView();
        return _this;
    }
    PlacingMsgView.prototype.initView = function () {
        this.viewBg = new egret.Bitmap();
        this.viewBg.texture = RES.getRes("msg_png");
        this.addChild(this.viewBg);
        this.msgContainer = new egret.Sprite();
        this.addChild(this.msgContainer);
        // let text: egret.TextField;
        // let textWidth: number;
        // for (let i = 0; i < this.msgKey.length; i++) {
        //     text = new egret.TextField();
        //     text.text = this.getPlayerData(this.msgKey[i]);
        //     text.x = 20 + Math.floor(i % 2) * AdaptSceenUtil.curWidth() / 2;
        //     text.y = 10 + Math.floor(i / 2) * text.height;
        //     textWidth = text.width;
        //     this.msgContainer.addChild(text);
        //     text = new egret.TextField();
        //     text.text = this.getPlayerData(this.msgValue[i]);
        //     text.x = textWidth + 20 + Math.floor(i % 2) * AdaptSceenUtil.curWidth() / 2;
        //     text.y = 10 + Math.floor(i / 2) * text.height;
        //     this.msgContainer.addChild(text);
        // }
        this.updateView();
    };
    PlacingMsgView.prototype.updateView = function () {
        this.msgContainer.removeChildren();
        var text = new egret.TextField();
        text.text = "分享次数:" + this._shareTimes;
        this.msgContainer.addChild(text);
    };
    Object.defineProperty(PlacingMsgView.prototype, "shareTimes", {
        set: function (value) {
            this._shareTimes = value;
            this.updateView();
        },
        enumerable: true,
        configurable: true
    });
    PlacingMsgView.prototype.getPlayerData = function (key) {
        if (key.indexOf("msg") !== -1) {
            return this.opponentData[key];
        }
        return key;
    };
    return PlacingMsgView;
}(egret.Sprite));
__reflect(PlacingMsgView.prototype, "PlacingMsgView");
