/**
 * 
 */


class PlacingControlView extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    INIT_STATUS = 0;
    HISTORY_STATUS = 1;

    private status: number;

    private mapList: Array<MiniGameView>;

    private controlViewBg: egret.Bitmap;
    private scrollView: egret.ScrollView;
    private mapController: egret.Sprite;
    private titleTextField: egret.TextField;
    private backButton: E8Button;
    private newMapButton: E8Button;

    private historyButton: E8TextButton;
    private shareButton: E8TextButton;
    private randomButton: E8TextButton;

    private initView() {
        this.controlViewBg = new egret.Bitmap();
        this.controlViewBg.texture = RES.getRes("control_bg_png");
        this.controlViewBg.width = AdaptSceenUtil.curWidth();

        // this.controlViewBg.x = ;
        // this.controlViewBg.width = AdaptSceenUtil.curWidth();
        this.addChild(this.controlViewBg);
        // this.controlViewBg.height = 180;

        this.historyButton = new E8TextButton(this, RES.getRes("btn_yellow_png"), this.onHistoryButtonTouched);
        this.historyButton.touchEnabled = true;
        this.historyButton.scale(0.8, 0.5);
        this.historyButton.x = AdaptSceenUtil.curWidth() - 3 * this.historyButton.width - 30;
        this.historyButton.y = 200;
        this.historyButton.setButtonText("分享历史");
        this.addChild(this.historyButton);

        this.shareButton = new E8TextButton(this, RES.getRes("btn_green_png"), this.shareButtonTouched);
        this.shareButton.touchEnabled = true;
        this.shareButton.scale(0.8, 0.5)
        this.shareButton.x = AdaptSceenUtil.curWidth() - 2 * this.historyButton.width - 20;
        this.shareButton.y = 200;
        this.shareButton.setButtonText("分享此地图");
        this.addChild(this.shareButton);

        this.randomButton = new E8TextButton(this, RES.getRes("btn_purple_png"), this.onRandomButtonTouched);
        this.randomButton.touchEnabled = true;
        this.randomButton.scale(0.5, 0.5);
        this.randomButton.x = AdaptSceenUtil.curWidth() - this.randomButton.width - 10;
        this.randomButton.y = 200;
        this.randomButton.setButtonText("随机");
        this.addChild(this.randomButton);



        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 72;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.titleTextField.text = "我的飞机图";
        this.addChild(this.titleTextField);

        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10 + this.backButton.width / 2;
        this.backButton.y = this.backButton.height / 2;
        this.backButton.visible = false;
        this.addChild(this.backButton);


        this.scrollView = new egret.ScrollView();
        this.mapController = new egret.Sprite();

        this.mapList = new Array<MiniGameView>();

       
        this.scrollView.x = 90;
        this.scrollView.width = AdaptSceenUtil.curWidth() - 90;
        this.scrollView.y = 80;
        this.scrollView.height = 200;
        this.scrollView.bounces = false;
        this.scrollView.touchEnabled = true;
        this.scrollView.setContent(this.mapController);
        this.addChild(this.scrollView)

        this.newMapButton = new E8Button(this, RES.getRes("new_map"), this.onRandomButtonTouched);
        this.newMapButton.x = this.newMapButton.width / 2;
        this.newMapButton.y = this.controlViewBg.height - this.newMapButton.height / 2;
        this.addChild(this.newMapButton);

        this.updateView();
    }

    private mapTouched(e: egret.TouchEvent) {
        let map = e.target as MiniGameView;
        // map
        PlacingController.getInstance().selectedSharedMap(map);
    }

    private updateView() {
        if (this.status === this.HISTORY_STATUS) {
            this.shareButton.visible = false;
            this.randomButton.visible = false;
            this.historyButton.visible = false;
            this.scrollView.visible = true;
            this.newMapButton.visible = true;
            this.backButton.visible = true;
        } else {
            this.mapController.removeChildren();
            let map: MiniGameView;
            let history_map = SaveDataManager.getInstance().getUserData().getSharedMap();
            for (let i = 0; i < history_map.length; i++) {
                map = new MiniGameView(history_map[i]);
                map.x = 200 * i;
                // map.y = this.controlViewBg.height - map.height;
                this.mapController.addChild(map);
                this.mapList.push(map);
                map.touchEnabled = true;
                map.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mapTouched, this);
            }


            this.shareButton.visible = true;
            this.randomButton.visible = true;
            this.historyButton.visible = true;
            this.scrollView.visible = false;
            this.newMapButton.visible = false;
            this.backButton.visible = false;
        }
    }

    private shareButtonTouched() {
        PlacingController.getInstance().shareMap();
    }


    async onRandomButtonTouched(e) {
        SceneManager.getInstance().placingScene.resetView();
        PlacingController.getInstance().randomMap();
    }

    private onHistoryButtonTouched() {
        this.status = this.HISTORY_STATUS;
        this.updateView();
    }

    private onBackButtonTouched() {
        if (this.status === this.HISTORY_STATUS) {
            this.status = this.INIT_STATUS;
            this.updateView();
        }
    }


}