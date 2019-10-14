/**
 * 
 * 
 */
class BankControlView extends BuildingControlView {
    constructor() {
        super();
        this.initBankView();
    }


    private rewardList;

    private rewardContainer;
    private scrollView;

    private initBankView() {

        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 72;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER; this.titleTextField.text = i18n.getInstance().getLanguage(CityController.getInstance().selectedData.name);
        this.addChild(this.titleTextField);

        if (CityController.getInstance().selectedData.level < CityController.getInstance().selectedData.top) {
            this.repairButton.visible = true
        } else {
            this.repairButton.visible = false;
        }
        // 银行的详情

        return;

        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10 + this.backButton.width / 2;
        this.backButton.y = this.backButton.height / 2;
        this.addChild(this.backButton);


        this.scrollView = new egret.ScrollView();
        this.rewardContainer = new egret.Sprite();

        this.rewardList = new Array<RewardCardView>();

        let rewardCard: RewardCardView;
        for (let i = 0; i < 5; i++) {
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
        this.addChild(this.scrollView)

    }

    private onBackButtonTouched() {

    }
}