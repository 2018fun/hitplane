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
var StationControlView = (function (_super) {
    __extends(StationControlView, _super);
    function StationControlView() {
        var _this = _super.call(this) || this;
        _this.initStation();
        return _this;
    }
    StationControlView.prototype.initStation = function () {
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
        if (CityController.getInstance().selectedData.level < CityController.getInstance().selectedData.top) {
            this.repairButton.visible = true;
        }
        else {
            this.repairButton.visible = false;
        }
    };
    StationControlView.prototype.onBackButtonTouched = function () {
    };
    return StationControlView;
}(BuildingControlView));
__reflect(StationControlView.prototype, "StationControlView");
