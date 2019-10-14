/**
 * 面板基lei
 */
class PanelBase extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.initView();
    }

    protected initView() {
        let bg = new egret.Bitmap();
        bg.texture = RES.getRes("panel_png");
        this.addChild(bg);
    }

    protected updateView() {

    }

}
