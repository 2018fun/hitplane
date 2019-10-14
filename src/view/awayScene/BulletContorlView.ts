/**
 * 
 */
class BulletControlView extends egret.Sprite {

    private bulletPool: Array<BulletView> = [];

    private preparedBullet: BulletView;
    private storedBullet: BulletView;

    private bulletX = [];
    private bulletY = [];
    private bulletSize = [];

    private bulletQueue: egret.Sprite;

    private switchButton: egret.Bitmap;


    private controlViewBg: egret.Bitmap;
    // private titleTextField: egret.TextField;


    constructor() {
        super();

        this.controlViewBg = new egret.Bitmap();
        this.controlViewBg.texture = RES.getRes("away_buttom");
        // this.controlViewBg.x = ;
        this.controlViewBg.anchorOffsetX = this.controlViewBg.width / 2;
        this.controlViewBg.x = AdaptSceenUtil.curWidth() / 2;
        this.addChild(this.controlViewBg);

        // this.titleTextField = new egret.TextField();
        // this.titleTextField.x = 72;
        // this.titleTextField.y = 18;
        // this.titleTextField.bold = true;
        // this.titleTextField.size = 28;
        // // this.titleTextField.fontFamily = ""
        // this.titleTextField.textAlign = egret.HorizontalAlign.CENTER;
        // this.titleTextField.text = i18n.getInstance().getLanguage("ui_title_bullet");
        // this.addChild(this.titleTextField);

        this.bulletQueue = new egret.Sprite();
        this.bulletQueue.x = this.controlViewBg.x - this.controlViewBg.width / 2;
        this.addChild(this.bulletQueue);

        // this.switchButton = new E8TextButton(this, RES.getRes("btn_purple_png"), this.switchTouched);
        // this.switchButton.scale(0.5, 0.5);
        // this.switchButton.setButtonText(i18n.getInstance().getLanguage("ui_store"));
        this.switchButton = new egret.Bitmap();
        this.switchButton.texture = RES.getRes("switch");
        this.switchButton.x = this.controlViewBg.width - this.switchButton.width - 150;
        this.switchButton.y = 340;
        this.addChild(this.switchButton);
        this.switchButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchTouched, this);
        this.switchButton.touchEnabled = true;

        // this.storedBullet = new BulletView();
        // this.storedBullet.x = 640 - 150;
        // this.addChild(this.storedBullet);

        this.initPool();
        this.updateView();

    }

    private switchTouched(e) {
        BulletController.getInstance().switchBullet();
        // this.switchButton.setButtonText(i18n.getInstance().getLanguage("ui_switch"));
        if (this.storedBullet === undefined) {
            this.updateView(true);
        } else {
            this.updateView(false);
        }

    }

    private initPool() {
        let bullet: BulletView;
        for (let i = 0; i < 5; i++) {
            bullet = new BulletView(false);
            this.bulletPool.push(bullet);
        }
    }

    public addNewBullet() {
        this.updateView(true);
    }

    private bullet_x = [330, 180, 60];
    private bullet_y = [310, 350, 350];

    public updateView(animate = true) {
        this.bulletQueue.removeChildren();
        let bullets = BulletController.getInstance().bullets;
        console.log(bullets);

        for (let i = 0; i < bullets.length; i++) {
            if (RecordController.getInstance().bulletUsed + i + 1 > 20) {
                break;
            }
            let bullet = this.getNoUsedBulletFromPool();
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

    }


    private initPrepare() {
        this.preparedBullet = this.getNoUsedBulletFromPool();
        this.addChild(this.preparedBullet);
    }

    public prepareNextBullet() {

    }

    private getNoUsedBulletFromPool() {
        for (let i = 0; i < this.bulletPool.length; i++) {
            if (this.bulletPool[i].parent === null) {
                return this.bulletPool[i];
            }
        }
        return null;
    }

}