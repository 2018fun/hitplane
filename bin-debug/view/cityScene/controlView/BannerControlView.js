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
 *
 */
var BannerControlView = (function (_super) {
    __extends(BannerControlView, _super);
    function BannerControlView() {
        var _this = _super.call(this) || this;
        _this.initBankView();
        return _this;
    }
    BannerControlView.prototype.initBankView = function () {
        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 72;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.titleTextField.text = i18n.getInstance().getLanguage(CityController.getInstance().selectedData.name);
        this.addChild(this.titleTextField);
        if (CityController.getInstance().selectedData.level < CityController.getInstance().selectedData.top) {
            this.repairButton.visible = true;
        }
        else {
            this.repairButton.visible = false;
        }
        return;
        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10 + this.backButton.width / 2;
        this.backButton.y = this.backButton.height / 2;
        this.backButton.visible = false;
        this.addChild(this.backButton);
        this.scrollView = new egret.ScrollView();
        this.rewardContainer = new egret.Sprite();
        this.rewardList = new Array();
        var rewardCard;
        for (var i = 0; i < 5; i++) {
            rewardCard = new RewardCardView();
            rewardCard.touchEnabled = true;
            // opponentView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToAwayScene, this);
            rewardCard.x = 200 * i;
            this.rewardContainer.addChild(rewardCard);
        }
        this.scrollView.x = 90;
        this.scrollView.width = AdaptSceenUtil.curWidth() - 90;
        this.scrollView.y = 80;
        this.scrollView.height = 200;
        this.scrollView.bounces = false;
        this.scrollView.touchEnabled = true;
        this.scrollView.setContent(this.rewardContainer);
        this.addChild(this.scrollView);
    };
    BannerControlView.prototype.onBackButtonTouched = function () {
    };
    return BannerControlView;
}(BuildingControlView));
__reflect(BannerControlView.prototype, "BannerControlView");
