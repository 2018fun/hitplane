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
var ResultPanel = (function (_super) {
    __extends(ResultPanel, _super);
    function ResultPanel() {
        var _this = _super.call(this) || this;
        _super.prototype.initView.call(_this);
        _this.setContent();
        return _this;
    }
    ResultPanel.prototype.setContent = function () {
        this.title = new egret.Bitmap();
        this.title.texture = RES.getRes("result_success_png");
        this.title.anchorOffsetX = this.title.width / 2;
        this.addChild(this.title);
        this.share_btn = new E8Button(this, RES.getRes("build_button_png"), this.shareResult);
        this.share_btn.x = 0;
        this.share_btn.y = 0;
        this.addChild(this.share_btn);
        this.city_btn = new E8Button(this, RES.getRes("build_button_png"), this.toCityScene);
        this.city_btn.x = 200;
        this.city_btn.y = 0;
        this.addChild(this.city_btn);
    };
    ResultPanel.prototype.updateView = function () {
    };
    ResultPanel.prototype.toCityScene = function () {
        SceneManager.getInstance().toCityScene();
    };
    ResultPanel.prototype.shareResult = function () {
    };
    return ResultPanel;
}(Panel));
__reflect(ResultPanel.prototype, "ResultPanel");
