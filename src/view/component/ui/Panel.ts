/**
 * 
 */
class Panel extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private panelBg: egret.Bitmap;
    protected closeButton: E8Button;

    protected initView() {
        this.panelBg = new egret.Bitmap();
        this.panelBg.texture = RES.getRes("panel_png");
        this.panelBg.anchorOffsetX = this.panelBg.width / 2;
        this.panelBg.anchorOffsetY = this.panelBg.height / 2;
        this.addChild(this.panelBg);

        this.closeButton = new E8Button(this, RES.getRes("close_btn_png"), this.closePanel);
        this.closeButton.x = this.panelBg.x + this.panelBg.width / 2 - this.closeButton.width;
        this.closeButton.y = this.panelBg.y - this.panelBg.height / 2;
        this.closeButton.touchEnabled = true;
        this.addChild(this.closeButton);

        this.touchChildren = true;
    }

    protected setContent() {

    }

    protected updateView() {

    }

    private closePanel(param) {
        this.parent.removeChild(this);
    }
} 