/**
 * 
 */
class GuideView extends egret.Sprite {

    private guide_container: egret.Sprite;
    private bg: egret.Bitmap;
    private guide_step: egret.Bitmap;
    private bullet: BulletView;
    private board: egret.Bitmap;
    private _step: number = 1;

    private guide_type: number;

    constructor() {
        super();
        this.initView();
    }

    private initView() {

        this.guide_container = new egret.Sprite();


        this.bg = new egret.Bitmap();
        // this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextStep, this);
        this.bg.texture = RES.getRes("guide_bg_png");
        this.bg.width = AdaptSceenUtil.curWidth();
        this.bg.height = AdaptSceenUtil.curHeight();
        this.bg.x = 0;

        this.board = new egret.Bitmap();
        // this.board.anchorOffsetX= this.board.width/2;
        // this.board.x = AdaptSceenUtil.curWidth()/2;
        this.board.texture = RES.getRes("guide_board_png");

        // this.bg.anchorOffsetX = this.bg.width / 2;
        // this.bg.anchorOffsetY = this.bg.height / 2;
        // this.bg.x = AdaptSceenUtil.curWidth() / 2;
        // this.bg.y = AdaptSceenUtil.curHeight() / 2;
        this.addChild(this.bg);
        this.guide_container.addChild(this.board);

        this.bullet = new BulletView(false);
        this.bullet.type = BulletTypeEnum.MISSILE;
        this.bullet.x = this.board.width + 50;
        this.bullet.y = this.board.height - this.bullet.height;
        this.guide_container.addChild(this.bullet);

        this.guide_step = new egret.Bitmap();
        this.guide_step.y = 0;
        this.guide_container.addChild(this.guide_step);

        this.guide_container.anchorOffsetX = this.guide_container.width / 2;
        this.guide_container.x = AdaptSceenUtil.curWidth() / 2;
        this.addChild(this.guide_container);

        // this._step = 1;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextStep, this);
    }

    public setType(type) {
        this.guide_type = type;
    }

    public setStep(step) {
        console.log(step);
        if ((step === 1 && this.guide_type === GuideEnum.GUIDE_TYPE_AWAY)
            || (step === 21 && this.guide_type === GuideEnum.GUIDE_TYPE_PLACE)) {
            this._step = step;
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextStep, this);
        }
        this.guide_step.texture = RES.getRes("guide_" + step + "_png")
    }

    private onNextStep(e) {
        this._step++;
        if ((this._step > 7 && this.guide_type === GuideEnum.GUIDE_TYPE_AWAY)
            || (this._step > 22 && this.guide_type === GuideEnum.GUIDE_TYPE_PLACE)) {
            if (this.parent !== null && this.parent.contains(this)) {
                this.parent.removeChild(this);
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextStep, this);
                this.touchEnabled = false;
                GuideController.getInstance().guideFinished();
            }

        }
        this.setStep(this._step);
    }
}