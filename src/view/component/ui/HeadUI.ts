/**
 * 头部UI
 */
class HeadUI extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private playerHead: egret.Bitmap;

    private backButton: E8Button;

    private goldHead: GoldFrame;
    private gasHead: GoldFrame;

    private initView() {
        this.goldHead = new GoldFrame("gold");
        this.goldHead.x = 80;
        this.goldHead.y = 32 + AdaptSceenUtil.y_fix() / 2;
        this.addChild(this.goldHead);

        this.gasHead = new GoldFrame("gas");
        this.gasHead.x = 80 + 192;
        this.gasHead.y = 32 + AdaptSceenUtil.y_fix() / 2;
        this.gasHead.touchEnabled = true;
        this.gasHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.addChild(this.gasHead);

    }

    public onTouch() {
        console.log("观看视频");
        // TODO 视频奖励
        SaveDataManager.getInstance().getUserData().gas += 50;
    }

    public get GoldHead() {
        return this.goldHead;
    }
    public get GasHead() {
        return this.gasHead;
    }

    public setGold(value) {
        this.goldHead.amount = value;
    }

    public setGas(value) {
        this.gasHead.amount = Math.floor(value);
    }
}