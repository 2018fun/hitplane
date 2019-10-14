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
 * 金币显示
 */
var GoldFrame = (function (_super) {
    __extends(GoldFrame, _super);
    function GoldFrame(type) {
        var _this = _super.call(this) || this;
        _this._amount = 0;
        _this.targetNumber = 0;
        _this._type = type;
        _this.initView();
        return _this;
    }
    GoldFrame.prototype.initView = function () {
        this.scrolling = false;
        this.frameBg = new egret.Bitmap;
        this.frameBg.texture = RES.getRes("frame_png");
        this.frameBg.x = 0;
        this.frameBg.y = 0;
        this.addChild(this.frameBg);
        this.goldIcon = new egret.Bitmap();
        this.goldIcon.texture = RES.getRes(this._type + "_png");
        this.goldIcon.x = 0;
        this.goldIcon.y = 0;
        this.addChild(this.goldIcon);
        this.amountText = new egret.TextField();
        this.amountText.text = "0";
        this.amountText.x = this.goldIcon.width;
        this.amountText.textAlign = egret.HorizontalAlign.RIGHT;
        this.amountText.y = 10;
        this.amountText.width = 120;
        this.addChild(this.amountText);
    };
    Object.defineProperty(GoldFrame.prototype, "amount", {
        // public set type(value) {
        //     this._type = value;
        // }
        set: function (value) {
            if (this.scrolling === false) {
                this.targetNumber = value;
                // this._amount = value;
                // this.updateView();
                this.scrolling = true;
                this.addEventListener(egret.Event.ENTER_FRAME, this.scrollToAmount, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    GoldFrame.prototype.scrollToAmount = function (e) {
        if (this._amount < this.targetNumber && this.scrolling === true) {
            this._amount += 3333;
            this.updateView();
        }
        else {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.scrollToAmount, this);
            this._amount = this.targetNumber;
            this.scrolling = false;
            this.updateView();
        }
    };
    GoldFrame.prototype.updateView = function () {
        if (this._type === "gold") {
            this.amountText.text = NumUtil.numberToString(this._amount);
        }
        else if (this._type === "gas") {
            // let gas_station = 
            // this.amountText.text = "800/800"
            if (this._amount > CityController.getInstance().getGasStationMax()) {
                this.amountText.textColor = ColorEnum.RED;
            }
            else {
                this.amountText.textColor = ColorEnum.WHITE;
            }
            this.amountText.text = this._amount + "/" + CityController.getInstance().getGasStationMax();
        }
    };
    return GoldFrame;
}(egret.Sprite));
__reflect(GoldFrame.prototype, "GoldFrame");
