/**
 * 
 */
class AwayGridView extends GridView {

    private _status;

    // private coverSprite: egret.Sprite;
    // private cloud_cover: egret.Bitmap;
    // private middle_cover: egret.Bitmap;
    // private shadow_cover: egret.Bitmap;

    private bullet: BulletView;

    private _enable: number = 0;
    private _signType: number;
    private _effect: boolean;
    private _fire: boolean;
    private effectView: egret.Bitmap;
    private fireView: egret.Bitmap;

    constructor(id) {
        super(id);
        super.initView();

        // this.coverSprite = new egret.Sprite();
        // this.addChild(this.coverSprite);


        // this.shadow_cover = new egret.Bitmap();
        // // this.shadow_cover.texture = RES.getRes("shadow_cover");
        // this.shadow_cover.x = -8;
        // this.shadow_cover.y = -8;
        // this.addChildAt(this.shadow_cover, this.getChildIndex(this.gridView));


        // this.middle_cover = new egret.Bitmap();
        // // this.middle_cover.texture = RES.getRes("middle_cover");
        // this.middle_cover.x = -8;
        // this.middle_cover.y = -8;
        // // this.coverSprite.addChild(this.middle_cover);


        // this.cloud_cover = new egret.Bitmap();
        // this.cloud_cover.texture = RES.getRes("cloud_cover");
        // this.cloud_cover.x = -8;
        // this.cloud_cover.y = -8;
        // // this.coverSprite.addChild(this.cloud_cover);


        this.effectView = new egret.Bitmap();
        this.effectView.anchorOffsetX = this.effectView.width / 2;
        this.effectView.anchorOffsetY = this.effectView.height / 2;
        // this.effectView.x = this.width / 2;
        // this.effectView.y = this.height / 2;
        this.addChild(this.effectView);

        this.fireView = new egret.Bitmap();
        this.fireView.anchorOffsetX = this.fireView.width / 2;
        this.fireView.anchorOffsetY = this.fireView.height / 2;
        this.addChild(this.fireView);
        // this.bullet = new BulletView();
        // this.bullet.anchorOffsetX = this.bullet.width / 2;
        // this.bullet.anchorOffsetY = this.bullet.height / 2;
        // this.bullet.scaleX = this.bullet.scaleY = 0.5;
        // this.bullet.x = this.width / 2;
        // this.bullet.y = this.height / 2;
    }

    public updateView() {

        if (this._touched) {

        }
        if (this._status === GridStatusEnum.COVER) {
            // this.coverSprite.visible = true;
            // this.shadow_cover.visible = true;
            this.gridView.texture = RES.getRes("cover");
            this.gridView.alpha = 1;
        } else if (this._status === GridStatusEnum.KNOWN) {
            if (this.type === GridTypeEnum.HEAD) {

            } else if (this.type === GridTypeEnum.BODY) {

            } else if (this.type === GridTypeEnum.MISS) {

            }
        } else if (this._status === GridStatusEnum.SHOW) {
            if (GameController.getInstance().isHitGaming() || GameController.getInstance().isGuiding()) {
                if (this.type === GridTypeEnum.HEAD) {
                    this.gridView.texture = RES.getRes("head");
                    this.gridView.alpha = 1;
                } else if (this.type === GridTypeEnum.BODY) {
                    this.gridView.texture = RES.getRes("body");
                    this.gridView.alpha = 1;
                } else if (this.type === GridTypeEnum.MISS) {
                    this.gridView.texture = RES.getRes("miss");
                    this.gridView.alpha = 1;
                } else if (this.type === GridTypeEnum.UNSET) {
                    this.gridView.texture = RES.getRes("cover");
                    this.gridView.alpha = 1;
                }
                // this.coverSprite.visible = false;
                // this.shadow_cover.visible = false;
            }


        } else if (this._status === GridStatusEnum.UNSHOW) {

        }

    }


    public resetView() {
        this._status = GridStatusEnum.COVER;
        this._type = GridTypeEnum.MISS;
        this.gridView.texture = RES.getRes("cover");
        this.fire = false;
        this.updateView();
    }

    public set status(value) {
        this._status = value;
        this.updateView();
    }

    public get status(): number {
        return this._status;
    }

    public set signType(value) {
        this._signType = value;
    }

    public get signType() {
        return this._signType;
    }

    public set enable(status) {
        this._enable = status;
        // if (status === 0) {
        //     this.alpha = 1;
        //     DrawUtil.setImageColor(this, 0xffffff);
        // } else if (status === 1) {
        //     this.alpha = 0.2;
        //     DrawUtil.setImageColor(this, 0x444444);
        // } else if (status === 2) {
        //     this.alpha = 0.2;
        //     DrawUtil.setImageColor(this, 0xff4444);
        // }

    }


    public get enable() {
        return this._enable;
    }


    public set selected(value) {
        this._selected = value;
        if (this._selected) {
            // this.bullet.type = BulletController.getInstance().getCurrentBullet();
            // this.gridView
            console.log("show");
            // this.addChild(this.bullet);
        } else {
            // if (this.contains(this.bullet)) {
            //     this.removeChild(this.bullet);
            // }
        }
    }

    public set effect(value) {
        this._effect = value;
        if (this._effect) {
            egret.Tween.get(this.effectView, { loop: true }).call(() => {
                this.effectView.texture = RES.getRes("active");
            }).wait(600).call(() => {
                this.effectView.texture = RES.getRes("active2");
            }).wait(600);
        } else {
            this.effectView.texture = null;
            egret.Tween.removeTweens(this.effectView);
        }
    }

    public get effect() {
        return this._effect;
    }

    public set fire(value) {
        this._fire = value;
        if (this._fire) {
            this.fireView.texture = RES.getRes("fire_" + NumUtil.range(1, 9, true));
        } else {
            this.fireView.texture = null;
        }
    }
}