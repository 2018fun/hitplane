var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 *
 */
var AwayGridView = (function (_super) {
    __extends(AwayGridView, _super);
    function AwayGridView(id) {
        var _this = _super.call(this, id) || this;
        _this._enable = 0;
        _super.prototype.initView.call(_this);
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
        _this.effectView = new egret.Bitmap();
        _this.effectView.anchorOffsetX = _this.effectView.width / 2;
        _this.effectView.anchorOffsetY = _this.effectView.height / 2;
        // this.effectView.x = this.width / 2;
        // this.effectView.y = this.height / 2;
        _this.addChild(_this.effectView);
        _this.fireView = new egret.Bitmap();
        _this.fireView.anchorOffsetX = _this.fireView.width / 2;
        _this.fireView.anchorOffsetY = _this.fireView.height / 2;
        _this.addChild(_this.fireView);
        return _this;
        // this.bullet = new BulletView();
        // this.bullet.anchorOffsetX = this.bullet.width / 2;
        // this.bullet.anchorOffsetY = this.bullet.height / 2;
        // this.bullet.scaleX = this.bullet.scaleY = 0.5;
        // this.bullet.x = this.width / 2;
        // this.bullet.y = this.height / 2;
    }
    AwayGridView.prototype.updateView = function () {
        if (this._touched) {
        }
        if (this._status === GridStatusEnum.COVER) {
            // this.coverSprite.visible = true;
            // this.shadow_cover.visible = true;
            this.gridView.texture = RES.getRes("cover");
            this.gridView.alpha = 1;
        }
        else if (this._status === GridStatusEnum.KNOWN) {
            if (this.type === GridTypeEnum.HEAD) {
            }
            else if (this.type === GridTypeEnum.BODY) {
            }
            else if (this.type === GridTypeEnum.MISS) {
            }
        }
        else if (this._status === GridStatusEnum.SHOW) {
            if (GameController.getInstance().isHitGaming() || GameController.getInstance().isGuiding()) {
                if (this.type === GridTypeEnum.HEAD) {
                    this.gridView.texture = RES.getRes("head");
                    this.gridView.alpha = 1;
                }
                else if (this.type === GridTypeEnum.BODY) {
                    this.gridView.texture = RES.getRes("body");
                    this.gridView.alpha = 1;
                }
                else if (this.type === GridTypeEnum.MISS) {
                    this.gridView.texture = RES.getRes("miss");
                    this.gridView.alpha = 1;
                }
                else if (this.type === GridTypeEnum.UNSET) {
                    this.gridView.texture = RES.getRes("cover");
                    this.gridView.alpha = 1;
                }
                // this.coverSprite.visible = false;
                // this.shadow_cover.visible = false;
            }
        }
        else if (this._status === GridStatusEnum.UNSHOW) {
        }
    };
    AwayGridView.prototype.resetView = function () {
        this._status = GridStatusEnum.COVER;
        this._type = GridTypeEnum.MISS;
        this.gridView.texture = RES.getRes("cover");
        this.fire = false;
        this.updateView();
    };
    Object.defineProperty(AwayGridView.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            this._status = value;
            this.updateView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AwayGridView.prototype, "signType", {
        get: function () {
            return this._signType;
        },
        set: function (value) {
            this._signType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AwayGridView.prototype, "enable", {
        get: function () {
            return this._enable;
        },
        set: function (status) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AwayGridView.prototype, "selected", {
        set: function (value) {
            this._selected = value;
            if (this._selected) {
                // this.bullet.type = BulletController.getInstance().getCurrentBullet();
                // this.gridView
                console.log("show");
                // this.addChild(this.bullet);
            }
            else {
                // if (this.contains(this.bullet)) {
                //     this.removeChild(this.bullet);
                // }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AwayGridView.prototype, "effect", {
        get: function () {
            return this._effect;
        },
        set: function (value) {
            var _this = this;
            this._effect = value;
            if (this._effect) {
                egret.Tween.get(this.effectView, { loop: true }).call(function () {
                    _this.effectView.texture = RES.getRes("active");
                }).wait(600).call(function () {
                    _this.effectView.texture = RES.getRes("active2");
                }).wait(600);
            }
            else {
                this.effectView.texture = null;
                egret.Tween.removeTweens(this.effectView);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AwayGridView.prototype, "fire", {
        set: function (value) {
            this._fire = value;
            if (this._fire) {
                this.fireView.texture = RES.getRes("fire_" + NumUtil.range(1, 9, true));
            }
            else {
                this.fireView.texture = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    return AwayGridView;
}(GridView));
__reflect(AwayGridView.prototype, "AwayGridView");
