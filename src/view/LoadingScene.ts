/**
 * create by tishoy
 * 2019.4.11   
 * 载入场景
 *  
 */
class LoadingScene extends egret.Sprite implements RES.PromiseTaskReporter {

    private mySheet: egret.SpriteSheet;
    private pgBg: egret.Bitmap;
    private pgBar: egret.Bitmap;
    private textField: egret.TextField;
    private bg: egret.Sprite = new egret.Sprite();
    private w: number = 0;
    private h: number = 0;
    constructor() {
        super();

        this.mySheet = RES.getRes("load");
        this.createView();
    }

    private createView(): void {
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;

        this.bg.graphics.beginFill(0x313131, 1);
        this.bg.graphics.drawRect(0, 0, this.w, this.h);
        this.bg.graphics.endFill();
        this.bg.width = this.w;
        this.bg.height = this.h;
        this.addChild(this.bg);
        this.touchEnabled = true;

        this.pgBg = new egret.Bitmap;
        this.pgBg.texture = this.mySheet.getTexture("pgBg");
        this.pgBg.x = this.w / 2;
        this.pgBg.y = this.h / 2;
        this.pgBg.anchorOffsetX = this.pgBg.width / 2;
        this.pgBg.anchorOffsetY = this.pgBg.height / 2;
        this.addChild(this.pgBg);

        this.pgBar = new egret.Bitmap;
        this.pgBar.texture = this.mySheet.getTexture("pgBar");
        this.pgBar.x = this.w / 2 - 34;
        this.pgBar.y = this.h / 2;
        this.pgBar.anchorOffsetX = this.pgBar.width / 2;
        this.pgBar.anchorOffsetY = this.pgBar.height / 2;
        this.addChild(this.pgBar);

        this.textField = new egret.TextField();
        this.textField.size = 20;
        this.textField.textColor = 0xFFFFFF;
        this.textField.bold = true;
        this.textField.stroke = 1;
        this.textField.strokeColor = 0x000000;
        this.addChild(this.textField);
        this.textField.width = 100;
        this.textField.x = this.w / 2 - this.textField.width / 2;
        this.textField.y = this.h / 2 - this.textField.height / 2 - 10;
        this.textField.textAlign = "center";
        this.textField.text = "0%";
    }

    public onProgress(current, total): void {
        var rate: number = Math.round((current / total) * 100);
        this.textField.text = rate + "%";
        this.pgBar.width = 282 * (current / total);
    }
}