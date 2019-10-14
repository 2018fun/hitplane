/**
 * 成绩界面
 */
class ResultScene extends egret.Sprite {

    private title: egret.Bitmap;
    private score: egret.Bitmap;
    private bullet_animate: egret.MovieClip;
    private report: egret.Sprite;
    private return_button: E8Button;
    private review_button: E8TextButton;
    private review_close_button:E8TextButton;
    private share_button: E8Button;
    private reward_control: RewardControlView;

    private next_button: E8TextButton;

    private _game_result: number;
    private _score: number;

    private shareButton: E8TextButton;
    private backButton: E8TextButton;
    private placingButton:E8TextButton;

    private gameView: GameView;

    private reporting = false;
    private report_bullet = 0;

    private review_panel: E8Panel;

    constructor() {
        super();

        let bg = new egret.Bitmap();
        bg.texture = RES.getRes("bg_png");
        bg.width = AdaptSceenUtil.curWidth();
        bg.height = AdaptSceenUtil.curHeight();
        DrawUtil.setImageColor(bg, ColorEnum.NATTIER_BLUE);
        // this.bg.x = 640;
        this.addChild(bg);

        this.title = new egret.Bitmap();
        this.title.y = 100;
        this.addChild(this.title);

        this.score = new egret.Bitmap();
        this.score.y = this.title.y + this.title.height + 50;
        this.addChild(this.score);

        this.bullet_animate = new egret.MovieClip();

        


        this.reward_control = new RewardControlView();
        this.reward_control.width = AdaptSceenUtil.curWidth();
        this.reward_control.x = 0;
        this.reward_control.y = AdaptSceenUtil.curHeight() - this.reward_control.height;
        this.reward_control.visible = false;
        this.addChild(this.reward_control);



        this.review_panel = new E8Panel(this, RES.getRes("panel_png"), null);
        this.review_panel.width = AdaptSceenUtil.curWidth() * 0.5;
        this.review_panel.height = AdaptSceenUtil.curHeight() * 0.5;
        this.review_panel.x = AdaptSceenUtil.curWidth() / 2;
        this.review_panel.y = AdaptSceenUtil.curHeight() / 2;
        this.review_panel.visible = false;
        this.addChild(this.review_panel);

        this.gameView = new GameView(false);
        this.gameView.visible = false;
        this.addChild(this.gameView);


        this.review_button = new E8TextButton(this, RES.getRes("btn_green_png"), this.reviewButtonTouched);
        this.review_button.scale(0.5, 0.5);
        this.review_button.setButtonText("显示回顾");
        this.review_button.touchEnabled = true;
        this.review_button.x = AdaptSceenUtil.curWidth() * 2 / 5;
        this.review_button.y = this.reward_control.y + 200;
        this.addChild(this.review_button);

        this.review_close_button = new E8TextButton(this, RES.getRes("btn_green_png"), this.hideReview);
        this.review_close_button.scale(0.5, 0.5);
        this.review_close_button.setButtonText("关闭回顾");
        this.review_close_button.touchEnabled = true;
        this.review_close_button.x = AdaptSceenUtil.curWidth() * 2 / 5;
        this.review_close_button.y = this.reward_control.y + 200;

        this.review_close_button.visible = false;
        this.addChild(this.review_close_button);


        this.shareButton = new E8TextButton(this, RES.getRes("btn_red_png"), this.shareButtonTouched);
        this.shareButton.scale(0.5, 0.5);
        this.shareButton.setButtonText("分享此地图");
        this.shareButton.touchEnabled = true;
        this.shareButton.x = AdaptSceenUtil.curWidth() / 5;
        this.shareButton.y = this.reward_control.y + 200;
        this.addChild(this.shareButton);

        this.next_button = new E8TextButton(this, RES.getRes("btn_blue_png"), this.nextButtonTouched);
        this.next_button.scale(0.5, 0.5);
        this.next_button.setButtonText(i18n.getInstance().getLanguage("ui_next_bullet"));
        this.next_button.touchEnabled = true;
        this.next_button.x = AdaptSceenUtil.curWidth() * 3 / 5;
        this.next_button.y = this.reward_control.y + 200;
        this.next_button.visible = false;
        this.addChild(this.next_button);


        this.backButton = new E8TextButton(this, RES.getRes("btn_yellow_png"), this.onBackButtonTouched);
        this.backButton.scale(0.5, 0.5);
        this.backButton.setButtonText("返航");
        this.backButton.touchEnabled = true;
        this.backButton.x = AdaptSceenUtil.curWidth() * 4 / 5;
        this.backButton.y = this.reward_control.y + 200;
        // this.backButton.x = -10 + this.backButton.width / 2;
        // this.backButton.y = 32 + AdaptSceenUtil.y_fix() / 2 + this.backButton.height / 2;
        this.addChild(this.backButton);

        this.placingButton = new E8TextButton(this, RES.getRes("btn_green_png"), this.onToPlacingScene);
        this.placingButton.scale(0.5, 0.5);
        this.placingButton.setButtonText("我来设计一张");
        this.placingButton.touchEnabled = true;
        this.placingButton.x = AdaptSceenUtil.curWidth() * 3 / 5;
        this.placingButton.y = this.reward_control.y + 200;
        // this.backButton.x = -10 + this.backButton.width / 2;
        // this.backButton.y = 32 + AdaptSceenUtil.y_fix() / 2 + this.backButton.height / 2;
        this.addChild(this.placingButton);

    }

    private reviewButtonTouched() {
        this.reporting = true;
        this.gameView.visible = true;
        this.review_button.visible = false;
        this.review_close_button.visible = true
        this.next_button.visible = true;
        this.review_panel.visible = false;
        this.placingButton.visible = false;
    }

    private hideReview() {
        this.reporting = false;
        this.gameView.visible = false;
        this.review_button.visible = true;
        this.review_close_button.visible = false;
        this.next_button.visible = false;
        this.review_panel.visible = false;
        this.placingButton.visible = true;
    }

    private nextButtonTouched() {
        if (RecordController.getInstance().getEachGridOpenRecord(this.report_bullet).length === 0) {
            return;
        }
        for (let i = 0; i < RecordController.getInstance().getEachGridOpenRecord(this.report_bullet).length; i++) {
            let gridId = RecordController.getInstance().getEachGridOpenRecord(this.report_bullet)[i];
            let gridData = RecordController.getInstance().recordedMap[gridId];
            this.showGridView(
                gridId, gridData.gridType
            )
        }
        this.report_bullet++;
    }

    private showGridView(gridId, type, status = GridStatusEnum.SHOW) {
        (this.gameView.gridList[gridId] as AwayGridView).status = status;
        this.gameView.gridList[gridId].type = type;
    }


    private shareButtonTouched() {
        // platform.share();
        let id = MapUtil.headDataToHeadId(RecordController.getInstance().heads);
        platform.share("欢迎来打飞机", "", "", this.onShared, "mapId=" + id, "");
    }

    private onShared() {
        GameController.getInstance().addGas(SaveDataManager.getInstance().getUserData().gas);
    }


    private onBackButtonTouched() {
        SceneManager.getInstance().toCityScene();
    }

    private onToPlacingScene() {
        GameController.getInstance().startPlacingGame();
        SceneManager.getInstance().toPlacingScene();
    }

    public showResult(result = ResultTypeEnum.WIN, score = ScoreTypeEnum.NO_SCORE) {
        if (result === ResultTypeEnum.WIN) {
            this.title.texture = RES.getRes("win_png");
        } else if (result === ResultTypeEnum.FAIL) {
            this.title.texture = RES.getRes("fail_png");
        } else if (result === ResultTypeEnum.GIVE_UP) {
            this.title.texture = RES.getRes("give_up_png");
        }
        this.title.x = AdaptSceenUtil.curWidth() / 2 - this.title.width / 2;
        switch (score) {
            case ScoreTypeEnum.SSS:
                this.score.texture = RES.getRes("sss_png");
                break;
            case ScoreTypeEnum.S:
                this.score.texture = RES.getRes("s_png");
                break;
            case ScoreTypeEnum.A:
                this.score.texture = RES.getRes("a_png");
                break;
            case ScoreTypeEnum.B:
                this.score.texture = RES.getRes("b_png");
                break;
            case ScoreTypeEnum.C:
                this.score.texture = RES.getRes("c_png");
                break;
        }
        this.score.x = AdaptSceenUtil.curWidth() / 2 - this.score.width / 2;
    }

    public inAnimate() {
        this.reward_control.visible = true;
        this.hideReview();
        this.visible = true;
    }

    public outAnimate() {
        this.reward_control.visible = false;
        this.gameView.resetView();
        this.visible = false;
    }
}