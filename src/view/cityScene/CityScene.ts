/**
 * 
 */
class CityScene extends egret.Sprite implements Scene {
    constructor() {
        super();
        this.initView();
    }

    public cityView: CityView;

    public cityMsgView: CityMessageView;
    private cityControl: CityControlView;

    // private awayButton: egret.Bitmap;
    // private placeButton: egret.Bitmap;

    private balloon: egret.Bitmap;

    private initView() {
        this.addChild(new BackGround());

        this.cityMsgView = new CityMessageView();
        this.cityMsgView.anchorOffsetX = this.cityMsgView.width / 2;
        this.cityMsgView.x = AdaptSceenUtil.curWidth() / 2;
        this.cityMsgView.y = 100 + AdaptSceenUtil.y_fix() / 2;
        this.addChild(this.cityMsgView)



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



    }

    public inAnimate() {
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
    }

    public outAnimate() {
        this.cityControl.visible = false;
        // egret.Tween.get(this.cityView).to({ x: 640 - 120, y: 900, scaleX: 0.1, scaleY: 0.1 }, 800, egret.Ease.quadOut);
        // egret.Tween.get(this.cityView).to({}, 800);
        // egret.Tween.get(this).to({ x: 640 }, 800);
        // egret.Tween.get(this.bg).to({ x: 640 }, 800);
        this.visible = false;
        this.cityView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToCityScene, this);

    }

    private onToCityScene(e) {
        SceneManager.getInstance().toCityScene();
    }

    public selectPosition(buildingData, position) {

        // this.cityView.updateSelected(position);
        // this.cityMsgView.renderPosition(buildingData);
        // this.cityControl.renderControlView(buildingData);
    }

    public flyballoon() {
        let type = Math.floor(Math.random() * 3) + 1;
        this.balloon.texture = RES.getRes("balloon" + type + "_png")
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
            .call(() => {
                this.balloon.visible = false;
            })
        // this.balloon.width = 
        // this.balloon.height = 
    }

    public build(buildingData) {

        this.cityView.build(buildingData);
        this.cityMsgView.renderPosition(buildingData);
        this.cityControl.renderControlView(buildingData);
    }

    public demolish(buildingData) {
        this.cityView.demolish();
        this.cityMsgView.renderPosition(buildingData);
        this.cityControl.renderControlView(buildingData)
    }

    public levelupBuilding(buildingData) {
        this.cityView.levelUp();
        this.cityMsgView.renderPosition(buildingData);
        this.cityControl.renderControlView(buildingData);
    }

    public buildDetail(builidngId) {
        this.cityMsgView.renderBuilding(builidngId);
    }

    public onBalloonReward() {
        // egret.Tween.get(this.balloon).to({scaleX:})
        this.balloon.visible = false;
        

        RewardController.getInstance().balloonReward();
        platform.vedioPlay(AdvertiseController.getInstance().vedio, ()=> {

        }, (result) =>{
            if (result.finish) {
                RewardController.getInstance().balloonReward(true);
                // GameController.getInstance().attackOpponent(oppo.level);
            }
        });
    }
}