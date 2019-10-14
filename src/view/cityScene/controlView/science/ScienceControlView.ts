/**
 * 
 */
class ScienceControlView extends BuildingControlView {
    constructor() {
        super();
        this.initScieneView();
    }

    INIT_STATUS = 0;
    BULLETS_STATUS = 1;
    INFO_STATUS = 2;

    private bulletList;

    private detailButton: E8TextButton;

    private rewardContainer;
    private scrollView;

    private status;

    private initScieneView() {
        this.status = this.INIT_STATUS;

        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 72;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER; this.titleTextField.text = i18n.getInstance().getLanguage(CityController.getInstance().selectedData.name);
        this.addChild(this.titleTextField);


        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10 + this.backButton.width / 2;
        this.backButton.y = this.backButton.height / 2;
        this.backButton.visible = false;
        this.addChild(this.backButton);


        this.detailButton = new E8TextButton(this, RES.getRes("btn_red_png"), this.showBulletList);
        this.detailButton.scale(0.5, 0.5);
        this.detailButton.setButtonText(i18n.getInstance().getLanguage("ui_bullet_detail"));
        this.detailButton.x = AdaptSceenUtil.curWidth() - 3 * this.levelUpButton.width - 30;
        this.detailButton.y = 200;
        this.addChild(this.detailButton);

        this.scrollView = new egret.ScrollView();
        this.rewardContainer = new egret.Sprite();

        this.bulletList = new Array<RewardCardView>();

        let bulletCard: BulletDetailView;
        for (let i = 0; i < BulletTypeEnum.COUNT; i++) {
            bulletCard = new BulletDetailView();
            bulletCard.touchEnabled = true;
            bulletCard.type = i;
            bulletCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowBulletDetail, this);
            bulletCard.x = 200 * i;
            this.rewardContainer.addChild(bulletCard);

        }
        this.scrollView.x = 90;
        this.scrollView.width = AdaptSceenUtil.curWidth() - 90;
        this.scrollView.y = 80;
        this.scrollView.height = 200;
        this.scrollView.bounces = false;
        this.scrollView.touchEnabled = true;
        this.scrollView.setContent(this.rewardContainer);
        this.addChild(this.scrollView);

        this.updateView();
    }

    private updateView() {
        if (this.status === this.BULLETS_STATUS) {
            this.scrollView.visible = true;
            this.detailButton.visible = false;
            this.backButton.visible = true;
            this.levelUpButton.visible = false;
            this.demolishButton.visible = false;
            this.repairButton.visible = false;
        } else if (this.status === this.INIT_STATUS) {
            this.scrollView.visible = false;
            this.detailButton.visible = true;
            this.backButton.visible = false;
            this.levelUpButton.visible = true;
            this.demolishButton.visible = true;

            if (CityController.getInstance().selectedData.level < CityController.getInstance().selectedData.top) {
                this.repairButton.visible = true
            } else {
                this.repairButton.visible = false;
            }
            // if (CityController.getInstance().selectedData.level < CityController.getInstance().selectedData.top) {
            //     this.repairButton.visible = true
            // }
        } else if (this.status === this.INFO_STATUS) {

        }
    }

    private onShowBulletDetail(e) {
        let bulelt:BulletDetailView = e.target as BulletDetailView;
        
        SceneManager.getInstance().cityScene.cityMsgView.renderBullet(bulelt.type);
    }

    private showBulletList() {
        this.status = this.BULLETS_STATUS;
        this.updateView();
    }

    private onBackButtonTouched(e) {
        let bullet = e.target;
        SceneManager.getInstance().cityScene.cityMsgView.renderBullet()

    }

}