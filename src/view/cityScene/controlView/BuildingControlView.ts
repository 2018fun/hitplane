/**
 * 
 */
class BuildingControlView extends egret.Sprite {

    protected position: number;
    protected type: number;
    protected _level: number;

    protected levelUpButton: E8TextButton;
    protected demolishButton: E8TextButton;
    protected repairButton: E8TextButton;


    // 多个保护buf、多个保险buf block-buf
    protected buf = [];

    private controlViewBg: egret.Bitmap;
    protected titleTextField: egret.TextField;
    protected backButton: E8Button;

    constructor() {
        super();
        this.initView();
    }

    protected initView() {
        this.controlViewBg = new egret.Bitmap();
        this.controlViewBg.texture = RES.getRes("control_bg_png");
        this.controlViewBg.width = AdaptSceenUtil.curWidth();
        // this.controlViewBg.x = ;
        this.addChild(this.controlViewBg);

        this.levelUpButton = new E8TextButton(this, RES.getRes("btn_yellow_png"), this.levelUp);
        this.levelUpButton.scale(0.5, 0.5);
        this.levelUpButton.x = AdaptSceenUtil.curWidth() - this.levelUpButton.width - 10;
        this.levelUpButton.y = 200;
        this.levelUpButton.setButtonText(i18n.getInstance().getLanguage("ui_level_up"))
        this.addChild(this.levelUpButton);


        this.demolishButton = new E8TextButton(this, RES.getRes("btn_red_png"), this.demolish);
        this.demolishButton.scale(0.5, 0.5);
        this.demolishButton.x = AdaptSceenUtil.curWidth() - 2 * this.levelUpButton.width - 20;
        this.demolishButton.y = 200;
        this.demolishButton.setButtonText(i18n.getInstance().getLanguage("ui_demolish"))
        this.addChild(this.demolishButton);

        this.repairButton = new E8TextButton(this, RES.getRes("btn_green_png"), this.repair);
        this.repairButton.scale(0.5, 0.5);
        this.repairButton.x = AdaptSceenUtil.curWidth() - 3 * this.levelUpButton.width - 30;
        this.repairButton.y = 200;
        this.repairButton.visible = false;
        this.repairButton.setButtonText(i18n.getInstance().getLanguage("ui_repair"))
        this.addChild(this.repairButton);

    }

    private set level(value) {
        this._level = value;
        if (this._level === 5) {
            this.levelUpButton.visible = false;
        }

    }

    private levelUp() {
        CityController.getInstance().levelUpBuilding();
        if (this._level === 5) {
            this.levelUpButton.visible = false;
        }
    }

    private demolish() {
        CityController.getInstance().demolish();
    }

    private repair() {
        CityController.getInstance().repairCity(this.position);
    }
}