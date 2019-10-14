/**
 * 游戏场景
 *
 * 出征场景
 * create by tishoy
 * 2019.4.20
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var AwayScene = (function (_super) {
    __extends(AwayScene, _super);
    function AwayScene() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    AwayScene.prototype.initView = function () {
        // this.view_sheet = RES.getRes("away_view_json");
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("bg_png");
        bg.width = AdaptSceenUtil.curWidth();
        bg.height = AdaptSceenUtil.curHeight();
        DrawUtil.setImageColor(bg, ColorEnum.NATTIER_BLUE);
        // this.bg.x = 640;
        this.addChild(bg);
        this.progress = new Progress();
        this.progress.anchorOffsetX = this.progress.width / 2;
        this.progress.anchorOffsetY = this.progress.height / 2;
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
    };
    AwayScene.prototype.onShowGuide = function (e) {
        this.guide_view.setType(GuideEnum.GUIDE_TYPE_AWAY);
        SceneManager.getInstance().getPopLayer().addChild(this.guide_view);
        this.guide_view.setStep(1);
    };
    AwayScene.prototype.showTargetBullet = function (e) {
        this.addChild(this.targetBullet);
        this.targetBullet.type = BulletController.getInstance().getCurrentBullet();
        this.targetBullet.x = e.stageX;
        this.targetBullet.y = e.stageY;
    };
    AwayScene.prototype.moveTargetBullet = function (e) {
        this.targetBullet.x = e.stageX;
        this.targetBullet.y = e.stageY;
    };
    AwayScene.prototype.cancelTargetBullet = function (e) {
        if (this.contains(this.targetBullet)) {
            this.removeChild(this.targetBullet);
        }
    };
    AwayScene.prototype.onBackButtonTouched = function () {
        // GameController.getInstance().gameFinished(false);
        platform.analytics("giveUp", { bullet: RecordController.getInstance().getHitRecorded().length });
        SceneManager.getInstance().toResultScene();
    };
    AwayScene.prototype.inAnimate = function () {
        this.bulletControlView.visible = true;
        this.bulletControlView.updateView();
        // this.cityView.
        // egret.Tween.get(this).to({ x: 0 }, 800);
        this.visible = true;
    };
    AwayScene.prototype.outAnimate = function () {
        this.bulletControlView.visible = false;
        // egret.Tween.get(this).to({ x: -640 }, 800);
        this.visible = false;
    };
    AwayScene.prototype.nextGuide = function () {
        this.updateMsg();
    };
    AwayScene.prototype.updateMsg = function () {
        // this.messageView.updateView();
        this.progress.updateView();
    };
    AwayScene.prototype.updateBullets = function () {
        this.bulletControlView.addNewBullet();
        // this.messageView.updateView();
        this.progress.updateView();
    };
    AwayScene.prototype.resetGameView = function (level, isGuide) {
        if (level === void 0) { level = 0; }
        if (isGuide === void 0) { isGuide = false; }
        this.gameView.resetView();
        this.bulletControlView.updateView();
        this.progress.resetView();
    };
    AwayScene.prototype.showGridView = function (gridId, type, status) {
        if (status === void 0) { status = GridStatusEnum.SHOW; }
        this.gameView.gridList[gridId].status = status;
        this.gameView.gridList[gridId].type = type;
    };
    AwayScene.prototype.fireGrid = function (gridId) {
        this.gameView.gridList[gridId].fire = true;
    };
    AwayScene.prototype.showGameFinished = function () {
        SceneManager.getInstance().showTip("游戏结束");
        if (platform.hasVedioSDK) {
        }
        else {
        }
        console.log("显示结果");
        egret.setTimeout(function () {
            SceneManager.getInstance().toResultScene();
        }, this, 2000);
        return;
        this.resultPanel = new ResultPanel();
        this.resultPanel.x = this.x + AdaptSceenUtil.curWidth() / 2;
        this.resultPanel.y = this.y + AdaptSceenUtil.curHeight() / 2;
        this.addChild(this.resultPanel);
    };
    Object.defineProperty(AwayScene.prototype, "msgView", {
        get: function () {
            return this.progress;
        },
        enumerable: true,
        configurable: true
    });
    AwayScene.prototype.getGameView = function () {
        return this.gameView;
    };
    return AwayScene;
}(egret.Sprite));
__reflect(AwayScene.prototype, "AwayScene", ["Scene"]);
