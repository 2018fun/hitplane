/**
 * 金币显示
 */
class GoldFrame extends egret.Sprite {
    /**
     * 资源类型
     */
    private _type;

    private _amount = 0;

    private goldIcon: egret.Bitmap;
    private frameBg: egret.Bitmap;
    private amountText: egret.TextField;
    private targetNumber: number = 0;

    private scrolling: boolean;

    constructor(type) {
        super();
        this._type = type;
        this.initView();
    }

    private initView() {
        this.scrolling = false;

        this.frameBg = new egret.Bitmap;
        this.frameBg.texture = RES.getRes("frame_png");
        this.frameBg.x = 0;
        this.frameBg.y = 0;
        this.addChild(this.frameBg);

        this.goldIcon = new egret.Bitmap();
        this.goldIcon.texture = RES.getRes(this._type + "_png");
        this.goldIcon.x = 0;
        this.goldIcon.y = 0;
        this.addChild(this.goldIcon);

        this.amountText = new egret.TextField();
        this.amountText.text = "0";
        this.amountText.x = this.goldIcon.width;
        this.amountText.textAlign = egret.HorizontalAlign.RIGHT;
        this.amountText.y = 10;
        this.amountText.width = 120;
        this.addChild(this.amountText);
    }

    // public set type(value) {
    //     this._type = value;
    // }

    public set amount(value) {
        if (this.scrolling === false) {
            this.targetNumber = value;
            // this._amount = value;
            // this.updateView();
            this.scrolling = true;
            this.addEventListener(egret.Event.ENTER_FRAME, this.scrollToAmount, this);
        }
    }

    private scrollToAmount(e) {
        if (this._amount < this.targetNumber && this.scrolling === true) {
            this._amount += 3333;
            this.updateView();
        } else {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.scrollToAmount, this);
            this._amount = this.targetNumber;
            this.scrolling = false;
            this.updateView();
        }
    }

    private updateView() {
        if (this._type === "gold") {
            this.amountText.text = NumUtil.numberToString(this._amount);
        } else if (this._type === "gas") {
            // let gas_station = 
            // this.amountText.text = "800/800"
            if (this._amount > CityController.getInstance().getGasStationMax()) {
                this.amountText.textColor = ColorEnum.RED;
            } else {
                this.amountText.textColor = ColorEnum.WHITE;
            }
            this.amountText.text = this._amount + "/" + CityController.getInstance().getGasStationMax();
        }

    }
}
