/**
 * 
 */
class ResultPanel extends Panel {
    constructor() {
        super();
        super.initView();
        this.setContent();
    }

    private title: egret.Bitmap;

    private share_btn: E8Button;
    private city_btn: E8Button;

    protected setContent() {
        this.title = new egret.Bitmap();
        this.title.texture = RES.getRes("result_success_png");
        this.title.anchorOffsetX = this.title.width / 2;
        this.addChild(this.title);

        this.share_btn = new E8Button(this, RES.getRes("build_button_png"), this.shareResult);
        this.share_btn.x = 0;
        this.share_btn.y = 0;
        this.addChild(this.share_btn);

        this.city_btn = new E8Button(this, RES.getRes("build_button_png"), this.toCityScene)
        this.city_btn.x = 200;
        this.city_btn.y = 0;
        this.addChild(this.city_btn);

    }


    protected updateView() {

    }

    private toCityScene() {
        SceneManager.getInstance().toCityScene();
    }

    private shareResult() {

    }


}