/**
 * 
 */
/**
 * 
 */

class OpponentView extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private headData: HeadData[];

    private bg: egret.Bitmap;
    private airport: egret.Bitmap;


    private mapData: MapData;

    private selected: boolean;

    private _level: number

    private nameText: egret.TextField;
    private levelText: egret.TextField;
    private gasCostText: egret.TextField;

    private gasBmp: egret.Bitmap;

    async initView() {
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("map_bg_png");
        this.addChild(this.bg);

        this.airport = new egret.Bitmap();
        this.airport.texture = RES.getRes("view_airport_png");
        this.airport.anchorOffsetX = this.airport.width / 2;
        this.airport.anchorOffsetY = this.airport.height / 2;
        this.airport.scaleX = this.airport.scaleY = 1 / 4;
        this.airport.x = this.bg.width / 2;
        this.airport.y = this.bg.height / 2;
        this.addChild(this.airport);


        this.nameText = new egret.TextField();
        this.nameText.textAlign = egret.HorizontalAlign.CENTER;
        this.nameText.x = this.width / 2;
        this.nameText.y = 0;
        this.addChild(this.nameText);

        this.levelText = new egret.TextField;
        this.levelText.x = 30;
        this.levelText.y = 30;
        this.addChild(this.levelText);

        this.gasBmp = new egret.Bitmap();
        this.gasBmp.texture = RES.getRes("gas_png");
        this.addChild(this.gasBmp);

        this.gasCostText = new egret.TextField;
        this.addChild(this.gasCostText);

    }



    private updateData() {
        let data = CityController.getInstance().makeOpponenetDataByLevel(this._level);
        this.levelText.text = i18n.getInstance().getLanguage("ui_oppo_" + data.level);
        this.gasCostText.text = Math.pow(data.level, 3) * 2 + "";
        this.gasCostText.x = this.width - this.gasCostText.width - 20;
        this.gasCostText.y = this.height - this.gasCostText.height;
        this.gasBmp.x = this.width - this.gasCostText.width - this.gasBmp.width - 20;
        this.gasBmp.y = this.height - this.gasBmp.height;
    }

    public set level(value) {
        this._level = value;
        this.updateData();
    }

    public get level() {
        return this._level;
    }
}   