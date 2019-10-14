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
/**
 * 成绩界面
 */
var ResultScene = (function (_super) {
    __extends(ResultScene, _super);
    function ResultScene() {
        var _this = _super.call(this) || this;
        _this.reporting = false;
        _this.report_bullet = 0;
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("bg_png");
        bg.width = AdaptSceenUtil.curWidth();
        bg.height = AdaptSceenUtil.curHeight();
        DrawUtil.setImageColor(bg, ColorEnum.NATTIER_BLUE);
        // this.bg.x = 640;
        _this.addChild(bg);
        _this.title = new egret.Bitmap();
        _this.title.y = 100;
        _this.addChild(_this.title);
        _this.score = new egret.Bitmap();
        _this.score.y = _this.title.y + _this.title.height + 50;
        _this.addChild(_this.score);
        _this.bullet_animate = new egret.MovieClip();
        _this.reward_control = new RewardControlView();
        _this.reward_control.width = AdaptSceenUtil.curWidth();
        _this.reward_control.x = 0;
        _this.reward_control.y = AdaptSceenUtil.curHeight() - _this.reward_control.height;
        _this.reward_control.visible = false;
        _this.addChild(_this.reward_control);
        _this.review_panel = new E8Panel(_this, RES.getRes("panel_png"), null);
        _this.review_panel.width = AdaptSceenUtil.curWidth() * 0.5;
        _this.review_panel.height = AdaptSceenUtil.curHeight() * 0.5;
        _this.review_panel.x = AdaptSceenUtil.curWidth() / 2;
        _this.review_panel.y = AdaptSceenUtil.curHeight() / 2;
        _this.review_panel.visible = false;
        _this.addChild(_this.review_panel);
        _this.gameView = new GameView(false);
        _this.gameView.visible = false;
        _this.addChild(_this.gameView);
        _this.review_button = new E8TextButton(_this, RES.getRes("btn_green_png"), _this.reviewButtonTouched);
        _this.review_button.scale(0.5, 0.5);
        _this.review_button.setButtonText("显示回顾");
        _this.review_button.touchEnabled = true;
        _this.review_button.x = AdaptSceenUtil.curWidth() * 2 / 5;
        _this.review_button.y = _this.reward_control.y + 200;
        _this.addChild(_this.review_button);
        _this.review_close_button = new E8TextButton(_this, RES.getRes("btn_green_png"), _this.hideReview);
        _this.review_close_button.scale(0.5, 0.5);
        _this.review_close_button.setButtonText("关闭回顾");
        _this.review_close_button.touchEnabled = true;
        _this.review_close_button.x = AdaptSceenUtil.curWidth() * 2 / 5;
        _this.review_close_button.y = _this.reward_control.y + 200;
        _this.review_close_button.visible = false;
        _this.addChild(_this.review_close_button);
        _this.shareButton = new E8TextButton(_this, RES.getRes("btn_red_png"), _this.shareButtonTouched);
        _this.shareButton.scale(0.5, 0.5);
        _this.shareButton.setButtonText("分享此地图");
        _this.shareButton.touchEnabled = true;
        _this.shareButton.x = AdaptSceenUtil.curWidth() / 5;
        _this.shareButton.y = _this.reward_control.y + 200;
        _this.addChild(_this.shareButton);
        _this.next_button = new E8TextButton(_this, RES.getRes("btn_blue_png"), _this.nextButtonTouched);
        _this.next_button.scale(0.5, 0.5);
        _this.next_button.setButtonText(i18n.getInstance().getLanguage("ui_next_bullet"));
        _this.next_button.touchEnabled = true;
        _this.next_button.x = AdaptSceenUtil.curWidth() * 3 / 5;
        _this.next_button.y = _this.reward_control.y + 200;
        _this.next_button.visible = false;
        _this.addChild(_this.next_button);
        _this.backButton = new E8TextButton(_this, RES.getRes("btn_yellow_png"), _this.onBackButtonTouched);
        _this.backButton.scale(0.5, 0.5);
        _this.backButton.setButtonText("返航");
        _this.backButton.touchEnabled = true;
        _this.backButton.x = AdaptSceenUtil.curWidth() * 4 / 5;
        _this.backButton.y = _this.reward_control.y + 200;
        // this.backButton.x = -10 + this.backButton.width / 2;
        // this.backButton.y = 32 + AdaptSceenUtil.y_fix() / 2 + this.backButton.height / 2;
        _this.addChild(_this.backButton);
        _this.placingButton = new E8TextButton(_this, RES.getRes("btn_green_png"), _this.onToPlacingScene);
        _this.placingButton.scale(0.5, 0.5);
        _this.placingButton.setButtonText("我来设计一张");
        _this.placingButton.touchEnabled = true;
        _this.placingButton.x = AdaptSceenUtil.curWidth() * 3 / 5;
        _this.placingButton.y = _this.reward_control.y + 200;
        // this.backButton.x = -10 + this.backButton.width / 2;
        // this.backButton.y = 32 + AdaptSceenUtil.y_fix() / 2 + this.backButton.height / 2;
        _this.addChild(_this.placingButton);
        return _this;
    }
    ResultScene.prototype.reviewButtonTouched = function () {
        this.reporting = true;
        this.gameView.visible = true;
        this.review_button.visible = false;
        this.review_close_button.visible = true;
        this.next_button.visible = true;
        this.review_panel.visible = false;
        this.placingButton.visible = false;
    };
    ResultScene.prototype.hideReview = function () {
        this.reporting = false;
        this.gameView.visible = false;
        this.review_button.visible = true;
        this.review_close_button.visible = false;
        this.next_button.visible = false;
        this.review_panel.visible = false;
        this.placingButton.visible = true;
    };
    ResultScene.prototype.nextButtonTouched = function () {
        if (RecordController.getInstance().getEachGridOpenRecord(this.report_bullet).length === 0) {
            return;
        }
        for (var i = 0; i < RecordController.getInstance().getEachGridOpenRecord(this.report_bullet).length; i++) {
            var gridId = RecordController.getInstance().getEachGridOpenRecord(this.report_bullet)[i];
            var gridData = RecordController.getInstance().recordedMap[gridId];
            this.showGridView(gridId, gridData.gridType);
        }
        this.report_bullet++;
    };
    ResultScene.prototype.showGridView = function (gridId, type, status) {
        if (status === void 0) { status = GridStatusEnum.SHOW; }
        this.gameView.gridList[gridId].status = status;
        this.gameView.gridList[gridId].type = type;
    };
    ResultScene.prototype.shareButtonTouched = function () {
        // platform.share();
        var id = MapUtil.headDataToHeadId(RecordController.getInstance().heads);
        platform.share("欢迎来打飞机", "", "", this.onShared, "mapId=" + id, "");
    };
    ResultScene.prototype.onShared = function () {
        GameController.getInstance().addGas(SaveDataManager.getInstance().getUserData().gas);
    };
    ResultScene.prototype.onBackButtonTouched = function () {
        SceneManager.getInstance().toCityScene();
    };
    ResultScene.prototype.onToPlacingScene = function () {
        GameController.getInstance().startPlacingGame();
        SceneManager.getInstance().toPlacingScene();
    };
    ResultScene.prototype.showResult = function (result, score) {
        if (result === void 0) { result = ResultTypeEnum.WIN; }
        if (score === void 0) { score = ScoreTypeEnum.NO_SCORE; }
        if (result === ResultTypeEnum.WIN) {
            this.title.texture = RES.getRes("win_png");
        }
        else if (result === ResultTypeEnum.FAIL) {
            this.title.texture = RES.getRes("fail_png");
        }
        else if (result === ResultTypeEnum.GIVE_UP) {
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
    };
    ResultScene.prototype.inAnimate = function () {
        this.reward_control.visible = true;
        this.hideReview();
        this.visible = true;
    };
    ResultScene.prototype.outAnimate = function () {
        this.reward_control.visible = false;
        this.gameView.resetView();
        this.visible = false;
    };
    return ResultScene;
}(egret.Sprite));
__reflect(ResultScene.prototype, "ResultScene");
