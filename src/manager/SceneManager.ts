/**
 * 
 */
class SceneManager {
    private static instance: SceneManager = null;

    private currentScene = null;

    private gameLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private loadingLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private uiLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private effectLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private popLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private tipLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();


    constructor() {
        if (SceneManager.instance) {
            throw new Error("AIController singlon error")
        }
    }

    private egretStage: egret.Stage;

    public awayScene: AwayScene;
    public cityScene: CityScene;
    public placingScene: PlacingScene;
    public resultScene: ResultScene;
    // public testScene: TestScene;
    public loadingScene: LoadingScene;
    public mineScene: MineScene;

    private saveMsg: SaveDataManager;

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new SceneManager();
        }
        return this.instance;
    }

    public init(stage: egret.Stage): void {
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

    }

    private initLayer(layer) {
        layer.x = (AdaptSceenUtil.curWidth() - AdaptSceenUtil.displayWidth()) / 2;
        layer.y = (AdaptSceenUtil.curHeight() - AdaptSceenUtil.displayHeight()) / 2;
        this.egretStage.addChild(layer);
    }


    public initUIView() {
        this.headUI = new HeadUI();
        this.updateGas();
        this.updateGold();
        SceneManager.getInstance().getUILayer().addChild(this.headUI);
    }


    private headUI: HeadUI = null;

    updateGold() {
        this.headUI.setGold(Math.max(this.saveMsg.getUserData().gold, 0));
    }

    updateGas() {
        this.headUI.setGas(Math.max(this.saveMsg.getUserData().gas, 0));
    }



    showLoading() {
        // this.loadingScene.visible = true;
        // this.loadingLayer.addChild(this.loading);
        // this.loading.onShow();
    }

    prepareScene() {
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
    }

    toResultScene() {
        if (this.currentScene) {
            this.currentScene.outAnimate();
        }
        this.resultScene.inAnimate();
        this.gameLayer.addChild(SceneManager.getInstance().resultScene);
        if (this.gameLayer.contains(this.currentScene)) {
            this.gameLayer.removeChild(this.currentScene);
        }
        this.currentScene = this.resultScene;
    }

    toCityScene() {
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
    }

    toAwayScene() {
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
    }

    toPlacingScene() {
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
    }



    public getGameLayer(): egret.DisplayObjectContainer {
        return this.gameLayer;
    }

    public getEffectLayer(): egret.DisplayObjectContainer {
        return this.effectLayer
    }

    public getUILayer(): egret.DisplayObjectContainer {
        return this.uiLayer;
    }

    public getLoadingLayer(): egret.DisplayObjectContainer {
        return this.loadingLayer;
    }

    public getPopLayer(): egret.DisplayObjectContainer {
        return this.popLayer;
    }

    public getTipLayer(): egret.DisplayObjectContainer {
        return this.tipLayer;
    }


    public openBuildingPop(buildingId) {
        this.popLayer.addChild(new BuildingPop(buildingId))
    }

    public showTip(tip) {
        if (this.tipLayer.numChildren !== 0) {
            this.tipLayer.removeChildren();
        }

        let tipView = new FlippyTip(tip);
        // tipView.anchorOffsetX = tipView.width / 2;
        // tipView.anchorOffsetY = tipView.height / 2;
        tipView.x = AdaptSceenUtil.curWidth() / 2;
        tipView.y = AdaptSceenUtil.curHeight() / 2;
        egret.setTimeout(() => {
            if (this.tipLayer.contains(tipView)) {
                this.tipLayer.removeChild(tipView);
            }

        }, this, 1500);

        this.tipLayer.addChild(tipView);
    }
}