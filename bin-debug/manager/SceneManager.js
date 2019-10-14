var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var SceneManager = (function () {
    function SceneManager() {
        this.currentScene = null;
        this.gameLayer = new egret.DisplayObjectContainer();
        this.loadingLayer = new egret.DisplayObjectContainer();
        this.uiLayer = new egret.DisplayObjectContainer();
        this.effectLayer = new egret.DisplayObjectContainer();
        this.popLayer = new egret.DisplayObjectContainer();
        this.tipLayer = new egret.DisplayObjectContainer();
        this.headUI = null;
        if (SceneManager.instance) {
            throw new Error("AIController singlon error");
        }
    }
    SceneManager.getInstance = function () {
        if (this.instance === null) {
            this.instance = new SceneManager();
        }
        return this.instance;
    };
    SceneManager.prototype.init = function (stage) {
        this.egretStage = stage;
        this.saveMsg = SaveDataManager.getInstance();
        // this.loadingScene = new LoadingScene();
        // this.initLayer(this.gameLayer);
        // this.initLayer(this.uiLayer);
        this.egretStage.addChild(this.gameLayer);
        this.egretStage.addChild(this.uiLayer);
        this.egretStage.addChild(this.effectLayer);
        this.egretStage.addChild(this.popLayer);
        this.egretStage.addChild(this.tipLayer);
        this.egretStage.addChild(this.loadingLayer);
    };
    SceneManager.prototype.initLayer = function (layer) {
        layer.x = (AdaptSceenUtil.curWidth() - AdaptSceenUtil.displayWidth()) / 2;
        layer.y = (AdaptSceenUtil.curHeight() - AdaptSceenUtil.displayHeight()) / 2;
        this.egretStage.addChild(layer);
    };
    SceneManager.prototype.initUIView = function () {
        this.headUI = new HeadUI();
        this.updateGas();
        this.updateGold();
        SceneManager.getInstance().getUILayer().addChild(this.headUI);
    };
    SceneManager.prototype.updateGold = function () {
        this.headUI.setGold(Math.max(this.saveMsg.getUserData().gold, 0));
    };
    SceneManager.prototype.updateGas = function () {
        this.headUI.setGas(Math.max(this.saveMsg.getUserData().gas, 0));
    };
    SceneManager.prototype.showLoading = function () {
        // this.loadingScene.visible = true;
        // this.loadingLayer.addChild(this.loading);
        // this.loading.onShow();
    };
    SceneManager.prototype.prepareScene = function () {
        this.cityScene = new CityScene();
        this.awayScene = new AwayScene();
        this.placingScene = new PlacingScene();
        this.resultScene = new ResultScene();
        this.cityScene.x = 0;
        this.awayScene.x = 0;
        this.placingScene.x = 0;
        this.resultScene.x = 0;
        // this.gameLayer.addChild(SceneManager.getInstance().awayScene);
        // this.gameLayer.addChild(SceneManager.getInstance().cityScene);
        // this.gameLayer.addChild(this.placingScene);
        // this.gameLayer.addChild(this.resultScene);
        // this.currentScene = SceneManager.getInstance().cityScene;
    };
    SceneManager.prototype.toResultScene = function () {
        if (this.currentScene) {
            this.currentScene.outAnimate();
        }
        this.resultScene.inAnimate();
        this.gameLayer.addChild(SceneManager.getInstance().resultScene);
        if (this.gameLayer.contains(this.currentScene)) {
            this.gameLayer.removeChild(this.currentScene);
        }
        this.currentScene = this.resultScene;
    };
    SceneManager.prototype.toCityScene = function () {
        if (this.currentScene === this.cityScene) {
            return;
        }
        if (this.currentScene) {
            this.currentScene.outAnimate();
        }
        this.cityScene.inAnimate();
        this.gameLayer.addChild(SceneManager.getInstance().cityScene);
        if (this.gameLayer.contains(this.currentScene)) {
            this.gameLayer.removeChild(this.currentScene);
        }
        this.currentScene = this.cityScene;
    };
    SceneManager.prototype.toAwayScene = function () {
        if (this.currentScene === this.awayScene) {
            return;
        }
        if (this.currentScene) {
            this.currentScene.outAnimate();
        }
        this.awayScene.inAnimate();
        this.gameLayer.addChild(SceneManager.getInstance().awayScene);
        if (this.gameLayer.contains(this.currentScene)) {
            this.gameLayer.removeChild(this.currentScene);
        }
        this.currentScene = this.awayScene;
    };
    SceneManager.prototype.toPlacingScene = function () {
        if (this.currentScene === this.placingScene) {
            return;
        }
        if (this.currentScene) {
            this.currentScene.outAnimate();
        }
        this.placingScene.inAnimate();
        this.gameLayer.addChild(SceneManager.getInstance().placingScene);
        if (this.gameLayer.contains(this.currentScene)) {
            this.gameLayer.removeChild(this.currentScene);
        }
        this.currentScene = this.placingScene;
    };
    SceneManager.prototype.getGameLayer = function () {
        return this.gameLayer;
    };
    SceneManager.prototype.getEffectLayer = function () {
        return this.effectLayer;
    };
    SceneManager.prototype.getUILayer = function () {
        return this.uiLayer;
    };
    SceneManager.prototype.getLoadingLayer = function () {
        return this.loadingLayer;
    };
    SceneManager.prototype.getPopLayer = function () {
        return this.popLayer;
    };
    SceneManager.prototype.getTipLayer = function () {
        return this.tipLayer;
    };
    SceneManager.prototype.openBuildingPop = function (buildingId) {
        this.popLayer.addChild(new BuildingPop(buildingId));
    };
    SceneManager.prototype.showTip = function (tip) {
        var _this = this;
        if (this.tipLayer.numChildren !== 0) {
            this.tipLayer.removeChildren();
        }
        var tipView = new FlippyTip(tip);
        // tipView.anchorOffsetX = tipView.width / 2;
        // tipView.anchorOffsetY = tipView.height / 2;
        tipView.x = AdaptSceenUtil.curWidth() / 2;
        tipView.y = AdaptSceenUtil.curHeight() / 2;
        egret.setTimeout(function () {
            if (_this.tipLayer.contains(tipView)) {
                _this.tipLayer.removeChild(tipView);
            }
        }, this, 1500);
        this.tipLayer.addChild(tipView);
    };
    SceneManager.instance = null;
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
