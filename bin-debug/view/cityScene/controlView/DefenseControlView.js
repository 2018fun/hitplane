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
var DefenseControlView = (function (_super) {
    __extends(DefenseControlView, _super);
    function DefenseControlView() {
        var _this = _super.call(this) || this;
        _this.initDefense();
        return _this;
    }
    DefenseControlView.prototype.initDefense = function () {
        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 72;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.titleTextField.text = i18n.getInstance().getLanguage(CityController.getInstance().selectedData.name);
        this.addChild(this.titleTextField);
        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10 + this.backButton.width / 2;
        this.backButton.y = this.backButton.height / 2;
        this.backButton.visible = false;
        this.addChild(this.backButton);
        this.buyButton = new E8TextButton(this, RES.getRes("btn_red_png"), this.onBuyMissle);
        this.buyButton.scale(0.5, 0.5);
        this.buyButton.setButtonText(i18n.getInstance().getLanguage("ui_buy_missle"));
        this.buyButton.x = AdaptSceenUtil.curWidth() - 3 * this.levelUpButton.width - 30;
        this.buyButton.y = 200;
        this.addChild(this.buyButton);
        if (CityController.getInstance().selectedData.level < CityController.getInstance().selectedData.top) {
            this.repairButton.visible = true;
        }
        else {
            this.repairButton.visible = false;
        }
    };
    DefenseControlView.prototype.onBackButtonTouched = function () {
    };
    DefenseControlView.prototype.onBuyMissle = function () {
        CityController.getInstance().buyMissle();
    };
    return DefenseControlView;
}(BuildingControlView));
__reflect(DefenseControlView.prototype, "DefenseControlView");
