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
 *
 */
var BulletControlView = (function (_super) {
    __extends(BulletControlView, _super);
    // private titleTextField: egret.TextField;
    function BulletControlView() {
        var _this = _super.call(this) || this;
        _this.bulletPool = [];
        _this.bulletX = [];
        _this.bulletY = [];
        _this.bulletSize = [];
        _this.bullet_x = [330, 180, 60];
        _this.bullet_y = [310, 350, 350];
        _this.controlViewBg = new egret.Bitmap();
        _this.controlViewBg.texture = RES.getRes("away_buttom");
        // this.controlViewBg.x = ;
        _this.controlViewBg.anchorOffsetX = _this.controlViewBg.width / 2;
        _this.controlViewBg.x = AdaptSceenUtil.curWidth() / 2;
        _this.addChild(_this.controlViewBg);
        // this.titleTextField = new egret.TextField();
        // this.titleTextField.x = 72;
        // this.titleTextField.y = 18;
        // this.titleTextField.bold = true;
        // this.titleTextField.size = 28;
        // // this.titleTextField.fontFamily = ""
        // this.titleTextField.textAlign = egret.HorizontalAlign.CENTER;
        // this.titleTextField.text = i18n.getInstance().getLanguage("ui_title_bullet");
        // this.addChild(this.titleTextField);
        _this.bulletQueue = new egret.Sprite();
        _this.bulletQueue.x = _this.controlViewBg.x - _this.controlViewBg.width / 2;
        _this.addChild(_this.bulletQueue);
        // this.switchButton = new E8TextButton(this, RES.getRes("btn_purple_png"), this.switchTouched);
        // this.switchButton.scale(0.5, 0.5);
        // this.switchButton.setButtonText(i18n.getInstance().getLanguage("ui_store"));
        _this.switchButton = new egret.Bitmap();
        _this.switchButton.texture = RES.getRes("switch");
        _this.switchButton.x = _this.controlViewBg.width - _this.switchButton.width - 150;
        _this.switchButton.y = 340;
        _this.addChild(_this.switchButton);
        _this.switchButton.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.switchTouched, _this);
        _this.switchButton.touchEnabled = true;
        // this.storedBullet = new BulletView();
        // this.storedBullet.x = 640 - 150;
        // this.addChild(this.storedBullet);
        _this.initPool();
        _this.updateView();
        return _this;
    }
    BulletControlView.prototype.switchTouched = function (e) {
        BulletController.getInstance().switchBullet();
        // this.switchButton.setButtonText(i18n.getInstance().getLanguage("ui_switch"));
        if (this.storedBullet === undefined) {
            this.updateView(true);
        }
        else {
            this.updateView(false);
        }
    };
    BulletControlView.prototype.initPool = function () {
        var bullet;
        for (var i = 0; i < 5; i++) {
            bullet = new BulletView(false);
            this.bulletPool.push(bullet);
        }
    };
    BulletControlView.prototype.addNewBullet = function () {
        this.updateView(true);
    };
    BulletControlView.prototype.updateView = function (animate) {
        if (animate === void 0) { animate = true; }
        this.bulletQueue.removeChildren();
        var bullets = BulletController.getInstance().bullets;
        console.log(bullets);
        for (var i = 0; i < bullets.length; i++) {
            if (RecordController.getInstance().bulletUsed + i + 1 > 20) {
                break;
            }
            var bullet = this.getNoUsedBulletFromPool();
            bullet.type = bullets[i];
            bullet.index = RecordController.getInstance().bulletUsed + i + 1;
            bullet.x = this.bullet_x[i];
            bullet.y = this.bullet_y[i];
            // if (animate) {
            //     bullet.x = this.controlViewBg.x - 270 * i;
            //     egret.Tween.get(bullet).to({ x: bullet.x + 150 }, 500);
            // } else {
            //     bullet.x = this.controlViewBg.x - 150 * i;
            // }
            this.bulletQueue.addChild(bullet);
        }
        if (BulletController.getInstance().stored !== null) {
            this.storedBullet = this.getNoUsedBulletFromPool();
            this.storedBullet.type = BulletController.getInstance().stored;
            this.storedBullet.x = this.controlViewBg.x + this.controlViewBg.width / 2 - 70;
            this.storedBullet.y = 340;
            this.bulletQueue.addChild(this.storedBullet);
        }
    };
    BulletControlView.prototype.initPrepare = function () {
        this.preparedBullet = this.getNoUsedBulletFromPool();
        this.addChild(this.preparedBullet);
    };
    BulletControlView.prototype.prepareNextBullet = function () {
    };
    BulletControlView.prototype.getNoUsedBulletFromPool = function () {
        for (var i = 0; i < this.bulletPool.length; i++) {
            if (this.bulletPool[i].parent === null) {
                return this.bulletPool[i];
            }
        }
        return null;
    };
    return BulletControlView;
}(egret.Sprite));
__reflect(BulletControlView.prototype, "BulletControlView");
