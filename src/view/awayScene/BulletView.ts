/**
 * 
 * 
 */
class BulletView extends egret.Sprite {
    private used = false;
    private _type = BulletTypeEnum.MISSILE;
    private view: egret.Bitmap;
    private _index: number = 0;
    private selectedFrame: egret.Bitmap;
    private head: BulletHead;
    private typeTextField: egret.TextField;
    private _status: number

    constructor(showName = true) {
        super();
        this.initView(showName);
    }

    private initView(showName) {
        this.head = new BulletHead();

        this.view = new egret.Bitmap();
        this.addChild(this.view);


        this.typeTextField = new egret.TextField();
        this.typeTextField.multiline = true;
        if (showName) {
            this.addChild(this.typeTextField);
        }
    }

    private updateView() {
        if (this._type === BulletTypeEnum.GUIDED_MISSILE) {
            this.typeTextField.text = i18n.getInstance().getLanguage("ui_bullet_" + this._type) + "\n(" + i18n.getInstance().getLanguage("ui_bullet_no_index") + ")";
        } else {
            this.typeTextField.text = i18n.getInstance().getLanguage("ui_bullet_" + this._type) + this._index.toString();
        }
        this.typeTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.typeTextField.anchorOffsetX = this.typeTextField.width / 2;
        this.typeTextField.y = this.height / 2 - this.typeTextField.height / 2;
        // this.typeTextField.anchorOffsetY = this.typeTextField.height;
    }

    public set index(index) {
        this._index = index;
        // if (this._index > 20) {
        //     this.visible = false;
        // }
        this.updateView();
    }

    public set type(type) {
        this._type = type;
        this.view.texture = RES.getRes("bullet" + type);
        this.view.anchorOffsetX = this.view.width / 2;
        this.view.anchorOffsetY = this.view.height / 2;
        this.view.scaleX = this.view.scaleY = 0.5;
        this.updateView();
    }

    public set status(value) {
        this._status = value;
        this.updateView();
    }

    public setUsed() {
        this.used = true;
    }

    public setBulletHeadUserName(name) {
        this.head.name = name;
    }
}