/**
 * 
 */
class GroundControlView extends egret.Sprite {
    constructor() {
        super();
        this.intiView();
    }

    private titleTextField: egret.TextField;
    private backButton: E8Button;

    private buildingViewList: BuildingView[] = [null];
    private controlViewBg: egret.Bitmap;
    private scrollView: egret.ScrollView;
    private buildingContainer: egret.Sprite;

    private tipText: egret.TextField;

    private intiView() {
        this.controlViewBg = new egret.Bitmap();
        this.controlViewBg.texture = RES.getRes("control_bg_png");
        // this.controlViewBg.x = ;
        this.controlViewBg.width = AdaptSceenUtil.curWidth();
        this.addChild(this.controlViewBg);


        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 72;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.titleTextField.text = "新建筑";
        this.addChild(this.titleTextField);

        // this.tipText = new egret.TextField();
        // this.tipText.x = 36;
        // this.tipText.y = 18 + this.titleTextField.height;
        // this.tipText.text = "一星建筑拆除没有折损，会返回原价，您可以任意尝试多种建筑组合。"
        // this.addChild(this.tipText);



        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10;
        this.backButton.y = 0;
        this.backButton.visible = false;
        this.addChild(this.backButton);


        this.scrollView = new egret.ScrollView();
        this.buildingContainer = new egret.Sprite();

        let building: BuildingBase;
        let buildingMiniView: BuildingView;
        for (let i = 1; i < BuildingEnum.count; i++) {
            building = BuildingDataCache.getInstance().getBuildingByIdAndLevel(i, 1);
            buildingMiniView = new BuildingView();
            buildingMiniView.touchEnabled = true;
            buildingMiniView.name = i18n.getInstance().getLanguage(building.name);
            buildingMiniView.view = building.view;
            buildingMiniView.x = 200 * (this.buildingViewList.length - 1);
            this.buildingViewList.push(buildingMiniView);
            buildingMiniView.touchChildren = false;
            // buildingView = new egret.Bitmap();
            // buildingView.texture = RES.getRes(building.view);
            // buildingView.scaleX = buildingView.scaleY = 0.25;
            // buildingView.y = 50;
            // buildingView.x = 200 * (i - 1);
            // buildingView.touchEnabled = true;
            // this.buildingViewList.push(buildingView);
            buildingMiniView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuild, this);
            buildingMiniView.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.buildingContainer.addChild(buildingMiniView);
        }
        this.scrollView.width = AdaptSceenUtil.curWidth();
        this.scrollView.y = 80;
        this.scrollView.height = 200;
        this.scrollView.bounces = false;
        this.scrollView.touchEnabled = true;
        this.scrollView.setContent(this.buildingContainer);
        this.addChild(this.scrollView)
    }

    private onBuild(e: egret.TouchEvent) {
        let buildingView = e.target;
        let id = this.buildingViewList.indexOf(buildingView);
        CityController.getInstance().buildBuilding(id)
    }

    private touchedTime = 0;
    private touching = false;
    private onTouchBegin(e: egret.TouchEvent) {
        this.touchedTime = new Date().getTime();
        this.touching = true;
        egret.setTimeout(() => {
            if (this.touching) {
                console.log(this.buildingViewList);
                SceneManager.getInstance().cityScene.buildDetail(this.buildingViewList.indexOf(e.target))
            }
        }, this, 1000);
        e.target.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }

    private onTouchEnd(e: egret.TouchEvent) {
        this.touching = false;
        e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }

    private onBackButtonTouched() {

    }
}