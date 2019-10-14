/**
 * 
 */
/**
 * 
 */

class BuildingView extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private headData: HeadData[];

    private bg: egret.Bitmap;

    private selected: boolean;

    private _level: number
    private _name: string;

    public position = 0;

    private insureText: egret.TextField;
    private nameText: egret.TextField;
    private levelText: egret.TextField;

    private buildingView: egret.Bitmap;

    async initView() {
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("map_bg_png");
        this.addChild(this.bg);


        this.buildingView = new egret.Bitmap();
        // buildingView.y = 50;
        // buildingView.x = 200 * (i - 1);
        this.buildingView.x = this.width / 2;
        this.buildingView.y = this.height / 2;
        this.buildingView.touchEnabled = false;
        this.addChild(this.buildingView);

        this.nameText = new egret.TextField();
        this.nameText.textAlign = egret.HorizontalAlign.CENTER;
        this.nameText.x = this.width / 2;
        this.nameText.y = 30;
        this.addChild(this.nameText);


        this.levelText = new egret.TextField();
        this.levelText.x = this.bg.width - 20;
        this.addChild(this.levelText);

        this.insureText = new egret.TextField();
        this.insureText.x = this.bg.width - 50;
        this.addChild(this.insureText);
    }



    private updateData() {

    }

    public set view(texture) {
        this.buildingView.texture = RES.getRes(texture);
        this.buildingView.anchorOffsetX = this.buildingView.width / 2;
        this.buildingView.anchorOffsetY = this.buildingView.height / 2;
        this.buildingView.scaleX = this.buildingView.scaleY = 0.25;
    }

    public set name(value) {
        this._name = value;
        this.nameText.text = this._name;
        this.nameText.anchorOffsetX = this.nameText.width / 2;
        this.nameText.anchorOffsetY = this.nameText.height / 2;
        this.updateData();
    }

    public get name() {
        return this._name;
    }

    public set level(value) {
        this._level = value;
        this.levelText.text = this._level.toString();
        this.updateData();
    }

    public get level() {
        return this._level;
    }
}