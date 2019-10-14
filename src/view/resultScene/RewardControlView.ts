/**
 * 额外奖励控制视图
 */

class RewardControlView extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private controlViewBg: egret.Bitmap;
    private rewardContainer: egret.Sprite;
    private rewardList: Array<RewardCardView>;

    private titleTextField: egret.TextField;
    private scrollView: egret.ScrollView;

    private initView() {

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
        // this.addChild(this.scrollView)
    }

    private updateView() {

    }

}