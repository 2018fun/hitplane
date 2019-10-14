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
var CityScene = (function (_super) {
    __extends(CityScene, _super);
    function CityScene() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    CityScene.prototype.initView = function () {
        this.addChild(new BackGround());
        this.cityMsgView = new CityMessageView();
        this.cityMsgView.anchorOffsetX = this.cityMsgView.width / 2;
        this.cityMsgView.x = AdaptSceenUtil.curWidth() / 2;
        this.cityMsgView.y = 100 + AdaptSceenUtil.y_fix() / 2;
        this.addChild(this.cityMsgView);
        this.cityView = new CityView();
        this.cityView.touchChildren = true;
        // this.cityView.x = 640;
        this.cityView.touchEnabled = true;
        this.addChild(this.cityView);
        // SceneManager.getInstance().getGameLayer().addChild(this.cityView);
        this.cityControl = new CityControlView();
        this.cityControl.width = AdaptSceenUtil.curWidth();
        this.cityControl.x = 0;
        this.cityControl.y = AdaptSceenUtil.curHeight() - 280;
        this.cityControl.touchEnabled = true;
        this.cityControl.visible = false;
        SceneManager.getInstance().getUILayer().addChild(this.cityControl);
        this.balloon = new egret.Bitmap();
        this.balloon.touchEnabled = true;
        this.balloon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBalloonReward, this);
        this.addChild(this.balloon);
    };
    CityScene.prototype.inAnimate = function () {
        this.cityControl.visible = true;
        // this.cityView.
        this.cityView.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onToCityScene, this);
        CityController.getInstance().resetSelected();
        this.cityControl.reset();
        // this.cityControl.visible = false;
        // egret.Tween.get(this.cityView).to({ x: 0, y: 0, scaleX: 1, scaleY: 1 }, 800, egret.Ease.quintIn)
        // egret.Tween.get(this.cityView).to({ scaleX: 1, scaleY: 1 }, 800);
        // egret.Tween.get(this).to({ x: 0 }, 800);
        // egret.Tween.get(this.bg).to({ x: 0 }, 800);
        this.visible = true;
    };
    CityScene.prototype.outAnimate = function () {
        this.cityControl.visible = false;
        // egret.Tween.get(this.cityView).to({ x: 640 - 120, y: 900, scaleX: 0.1, scaleY: 0.1 }, 800, egret.Ease.quadOut);
        // egret.Tween.get(this.cityView).to({}, 800);
        // egret.Tween.get(this).to({ x: 640 }, 800);
        // egret.Tween.get(this.bg).to({ x: 640 }, 800);
        this.visible = false;
        this.cityView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToCityScene, this);
    };
    CityScene.prototype.onToCityScene = function (e) {
        SceneManager.getInstance().toCityScene();
    };
    CityScene.prototype.selectPosition = function (buildingData, position) {
        this.cityView.updateSelected(position);
        this.cityMsgView.renderPosition(buildingData);
        this.cityControl.renderControlView(buildingData);
    };
    CityScene.prototype.flyballoon = function () {
        var _this = this;
        var type = Math.floor(Math.random() * 3) + 1;
        this.balloon.texture = RES.getRes("balloon" + type + "_png");
        this.balloon.x = AdaptSceenUtil.curWidth();
        this.balloon.y = AdaptSceenUtil.curHeight() / 2 + 100 - Math.random() * 200;
        this.balloon.scaleX = this.balloon.scaleY = (this.y + 200) / 100;
        this.balloon.visible = true;
        egret.Tween.get(this.balloon).to({ x: 120 }, 10000).to({ y: this.balloon.y + Math.random() * 10 }, 1000)
            .to({ y: this.balloon.y + Math.random() * 10 }, 1000)
            .to({ y: this.balloon.y + Math.random() * 10 }, 1000)
            .to({ y: this.balloon.y + Math.random() * 10 }, 1000)
            .to({ y: this.balloon.y + Math.random() * 10 }, 1000)
            .to({ y: this.balloon.y + Math.random() * 10 }, 1000)
            .to({ y: this.balloon.y + Math.random() * 10 }, 1000)
            .to({ y: this.balloon.y + Math.random() * 10 }, 1000)
            .to({ y: this.balloon.y + Math.random() * 10 }, 1000)
            .to({ y: this.balloon.y + Math.random() * 10 }, 1000)
            .call(function () {
            _this.balloon.visible = false;
        });
        // this.balloon.width = 
        // this.balloon.height = 
    };
    CityScene.prototype.build = function (buildingData) {
        this.cityView.build(buildingData);
        this.cityMsgView.renderPosition(buildingData);
        this.cityControl.renderControlView(buildingData);
    };
    CityScene.prototype.demolish = function (buildingData) {
        this.cityView.demolish();
        this.cityMsgView.renderPosition(buildingData);
        this.cityControl.renderControlView(buildingData);
    };
    CityScene.prototype.levelupBuilding = function (buildingData) {
        this.cityView.levelUp();
        this.cityMsgView.renderPosition(buildingData);
        this.cityControl.renderControlView(buildingData);
    };
    CityScene.prototype.buildDetail = function (builidngId) {
        this.cityMsgView.renderBuilding(builidngId);
    };
    CityScene.prototype.onBalloonReward = function () {
        // egret.Tween.get(this.balloon).to({scaleX:})
        this.balloon.visible = false;
        RewardController.getInstance().balloonReward();
    };
    return CityScene;
}(egret.Sprite));
__reflect(CityScene.prototype, "CityScene", ["Scene"]);
