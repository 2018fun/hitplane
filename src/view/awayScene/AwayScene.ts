/**
 * 游戏场景
 * 
 * 出征场景
 * create by tishoy
 * 2019.4.20
 */

class AwayScene extends egret.Sprite implements Scene {
    constructor() {
        super();
        this.initView();
    }

    private gameView: GameView;

    private bulletControlView: BulletControlView;

    private savedBullet: BulletView;


    private startAnimate: egret.MovieClip;
    private overAnimate: egret.MovieClip;

    private resultPanel: ResultPanel;
    // private messageView: AwayGameMsgView;
    private backButton: E8Button;

    private targetBullet: BulletView;

    private guide_view: GuideView;
    private q_icon: egret.Bitmap;

    private progress: Progress;

    private initView() {

        // this.view_sheet = RES.getRes("away_view_json");

        let bg = new egret.Bitmap();
        bg.texture = RES.getRes("bg_png");
        bg.width = AdaptSceenUtil.curWidth();
        bg.height = AdaptSceenUtil.curHeight();
        DrawUtil.setImageColor(bg, ColorEnum.NATTIER_BLUE);
        // this.bg.x = 640;
        this.addChild(bg);

        this.progress = new Progress();
        this.progress.anchorOffsetX = this.progress.width / 2;
        this.progress.anchorOffsetY = this.progress.height / 2
        this.progress.x = AdaptSceenUtil.curWidth() / 2;
        this.progress.y = 200 + AdaptSceenUtil.y_fix() / 2;
        this.addChild(this.progress);


        // this.messageView = new AwayGameMsgView();
        // this.messageView.anchorOffsetX = this.messageView.width / 2;
        // this.messageView.x = AdaptSceenUtil.curWidth() / 2;
        // this.messageView.y = 100 + AdaptSceenUtil.y_fix() / 2;
        // this.addChild(this.messageView);


        this.gameView = new GameView(false);
        this.gameView.y = AdaptSceenUtil.curHeight() / 2 + 100;
        this.addChild(this.gameView);



        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10 + this.backButton.width / 2;
        this.backButton.y = 32 + AdaptSceenUtil.y_fix() / 2 + this.backButton.height / 2;
        this.addChild(this.backButton);

        this.q_icon = new egret.Bitmap();
        this.q_icon.texture = RES.getRes("question");
        this.q_icon.x = AdaptSceenUtil.curWidth() - this.q_icon.width;
        this.q_icon.y = this.progress.y;
        this.addChild(this.q_icon);
        this.q_icon.touchEnabled = true;
        this.q_icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowGuide, this);

        this.bulletControlView = new BulletControlView();
        this.bulletControlView.width = AdaptSceenUtil.curWidth();
        this.bulletControlView.y = AdaptSceenUtil.curHeight() - this.bulletControlView.height;
        this.bulletControlView.visible = false;
        SceneManager.getInstance().getUILayer().addChild(this.bulletControlView);


        this.guide_view = new GuideView();
        this.guide_view.anchorOffsetX = this.guide_view.width / 2;
        this.guide_view.x = AdaptSceenUtil.curWidth() / 2;
        this.guide_view.y = AdaptSceenUtil.y_fix();
        this.guide_view.setType(GuideEnum.GUIDE_TYPE_AWAY);
        if (!GuideController.getInstance().isFinished()) {
            SceneManager.getInstance().getPopLayer().addChild(this.guide_view);
            this.guide_view.setStep(1);
        }

        this.targetBullet = new BulletView(false);
        this.targetBullet.anchorOffsetX = this.targetBullet.width / 2;
        this.targetBullet.anchorOffsetY = this.targetBullet.height / 2;
        this.targetBullet.scaleX = this.targetBullet.scaleY = 0.5;
    }

    private onShowGuide(e) {
        this.guide_view.setType(GuideEnum.GUIDE_TYPE_AWAY);
        SceneManager.getInstance().getPopLayer().addChild(this.guide_view);
        this.guide_view.setStep(1);
    }

    public showTargetBullet(e: egret.TouchEvent) {
        this.addChild(this.targetBullet);
        this.targetBullet.type = BulletController.getInstance().getCurrentBullet();
        this.targetBullet.x = e.stageX;
        this.targetBullet.y = e.stageY;
    }

    public moveTargetBullet(e) {
        this.targetBullet.x = e.stageX;
        this.targetBullet.y = e.stageY;
    }

    public cancelTargetBullet(e) {
        if (this.contains(this.targetBullet)) {
            this.removeChild(this.targetBullet);
        }
    }



    private onBackButtonTouched() {
        // GameController.getInstance().gameFinished(false);
        platform.analytics("giveUp", { bullet: RecordController.getInstance().getHitRecorded().length });
        SceneManager.getInstance().toResultScene();
    }

    public inAnimate() {
        this.bulletControlView.visible = true;
        this.bulletControlView.updateView();
        // this.cityView.
        // egret.Tween.get(this).to({ x: 0 }, 800);
        this.visible = true;
    }

    public outAnimate() {
        this.bulletControlView.visible = false;
        // egret.Tween.get(this).to({ x: -640 }, 800);
        this.visible = false;
    }

    public nextGuide() {
        this.updateMsg();
    }

    public updateMsg() {
        // this.messageView.updateView();
        this.progress.updateView();
    }

    public updateBullets() {
        this.bulletControlView.addNewBullet();
        // this.messageView.updateView();
        this.progress.updateView();
    }

    public resetGameView(level = 0, isGuide = false) {
        this.gameView.resetView();
        this.bulletControlView.updateView();
        this.progress.resetView();
    }

    public showGridView(gridId, type, status = GridStatusEnum.SHOW) {
        (this.gameView.gridList[gridId] as AwayGridView).status = status;
        this.gameView.gridList[gridId].type = type;
    }

    public fireGrid(gridId) {
        (this.gameView.gridList[gridId] as AwayGridView).fire = true;
    }

    public showGameFinished() {

        SceneManager.getInstance().showTip("游戏结束");

        if (platform.hasVedioSDK) {

        } else {

        }

        console.log("显示结果");

        egret.setTimeout(() => {
            SceneManager.getInstance().toResultScene();
        }, this, 2000);

        return;
        this.resultPanel = new ResultPanel();
        this.resultPanel.x = this.x + AdaptSceenUtil.curWidth() / 2;
        this.resultPanel.y = this.y + AdaptSceenUtil.curHeight() / 2;
        this.addChild(this.resultPanel);
    }

    public get msgView() {
        return this.progress;
    }

    public getGameView() {
        return this.gameView;
    }

}