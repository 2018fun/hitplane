/**
 * 
 */
/**
 * 
 */

class BulletDetailView extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private headData: HeadData[];

    private bg: egret.Bitmap;
    private bullet: egret.Bitmap;


    private mapData: MapData;

    private selected: boolean;

    private _type: number

    private nameText: egret.TextField;
    private unlockText: egret.TextField;
    private gasCostText: egret.TextField;

    private gasBmp: egret.Bitmap;

    async initView() {
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("map_bg_png");
        this.addChild(this.bg);

        this.bullet = new egret.Bitmap();
        // this.bullet.texture = RES.getRes("view_airport_png");
        // this.bullet.anchorOffsetX = this.bullet.width / 2;
        // this.bullet.anchorOffsetY = this.bullet.height / 2;
        // this.bullet.scaleX = this.bullet.scaleY = 1 / 4;
        this.bullet.x = this.bg.width / 2;
        this.bullet.y = this.bg.height / 2;
        this.addChild(this.bullet);


        this.nameText = new egret.TextField();
        this.nameText.textAlign = egret.HorizontalAlign.CENTER;
        this.nameText.x = this.width / 2 - this.nameText.width / 2;
        this.nameText.y = 0;
        this.addChild(this.nameText);

        this.unlockText = new egret.TextField;
        this.unlockText.x = this.width / 2 - this.unlockText.width / 2;
        this.unlockText.y = this.height - this.unlockText.height - 50;
        this.addChild(this.unlockText);

        // this.gasBmp = new egret.Bitmap();
        // this.gasBmp.texture = RES.getRes("gas_png");
        // this.addChild(this.gasBmp);

        this.gasCostText = new egret.TextField;
        this.addChild(this.gasCostText);

    }



    private updateData() {
        // let data = CityController.getInstance().makeOpponenetDataByLevel(this._type);
        // this.levelText.text = i18n.getInstance().getLanguage("ui_oppo_" + data.level);
        // this.gasCostText.text = Math.pow(data.level, 3) * 2 + "";
        // this.gasCostText.x = this.width - this.gasCostText.width - 20;
        // this.gasCostText.y = this.height - this.gasCostText.height;
        // this.gasBmp.x = this.width - this.gasCostText.width - this.gasBmp.width - 20;
        // this.gasBmp.y = this.height - this.gasBmp.height;

        this.bullet.texture = RES.getRes("bullet" + this._type);
        this.bullet.anchorOffsetX = this.bullet.width / 2;
        this.bullet.anchorOffsetY = this.bullet.height / 2;
        this.bullet.scaleX = this.bullet.scaleY = 0.5;

        this.nameText.text = i18n.getInstance().getLanguage("ui_bullet_" + this._type);
        if (BulletController.getInstance().getIsLocked(this._type)) {
            this.unlockText.text = i18n.getInstance().getLanguage("ui_unlock");
        } else {
            this.unlockText.text = i18n.getInstance().getLanguage("ui_lock");
        }
    }

    public set type(value) {
        this._type = value;
        this.updateData();
    }

    public get type() {
        return this._type;
    }
}   