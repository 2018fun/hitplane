/**
 * 额外奖励控制视图
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
var RewardControlView = (function (_super) {
    __extends(RewardControlView, _super);
    function RewardControlView() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    RewardControlView.prototype.initView = function () {
        this.controlViewBg = new egret.Bitmap();
        this.controlViewBg.texture = RES.getRes("control_bg_png");
        this.addChild(this.controlViewBg);
        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 72;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.titleTextField.text = "本局结算";
        this.addChild(this.titleTextField);
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
        // this.addChild(this.scrollView)
    };
    RewardControlView.prototype.updateView = function () {
    };
    return RewardControlView;
}(egret.Sprite));
__reflect(RewardControlView.prototype, "RewardControlView");
