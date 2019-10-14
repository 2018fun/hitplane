/**
 * 
 */
class RewardCardView extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private bg: egret.Bitmap;

    private initView() {
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("map_bg_png");
        this.addChild(this.bg);

    }
}