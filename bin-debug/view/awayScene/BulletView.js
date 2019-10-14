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
 *
 */
var BulletView = (function (_super) {
    __extends(BulletView, _super);
    function BulletView(showName) {
        if (showName === void 0) { showName = true; }
        var _this = _super.call(this) || this;
        _this.used = false;
        _this._type = BulletTypeEnum.MISSILE;
        _this._index = 0;
        _this.initView(showName);
        return _this;
    }
    BulletView.prototype.initView = function (showName) {
        this.head = new BulletHead();
        this.view = new egret.Bitmap();
        this.addChild(this.view);
        this.typeTextField = new egret.TextField();
        this.typeTextField.multiline = true;
        if (showName) {
            this.addChild(this.typeTextField);
        }
    };
    BulletView.prototype.updateView = function () {
        if (this._type === BulletTypeEnum.GUIDED_MISSILE) {
            this.typeTextField.text = i18n.getInstance().getLanguage("ui_bullet_" + this._type) + "\n(" + i18n.getInstance().getLanguage("ui_bullet_no_index") + ")";
        }
        else {
            this.typeTextField.text = i18n.getInstance().getLanguage("ui_bullet_" + this._type) + this._index.toString();
        }
        this.typeTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.typeTextField.anchorOffsetX = this.typeTextField.width / 2;
        this.typeTextField.y = this.height / 2 - this.typeTextField.height / 2;
        // this.typeTextField.anchorOffsetY = this.typeTextField.height;
    };
    Object.defineProperty(BulletView.prototype, "index", {
        set: function (index) {
            this._index = index;
            // if (this._index > 20) {
            //     this.visible = false;
            // }
            this.updateView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BulletView.prototype, "type", {
        set: function (type) {
            this._type = type;
            this.view.texture = RES.getRes("bullet" + type);
            this.view.anchorOffsetX = this.view.width / 2;
            this.view.anchorOffsetY = this.view.height / 2;
            this.view.scaleX = this.view.scaleY = 0.5;
            this.updateView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BulletView.prototype, "status", {
        set: function (value) {
            this._status = value;
            this.updateView();
        },
        enumerable: true,
        configurable: true
    });
    BulletView.prototype.setUsed = function () {
        this.used = true;
    };
    BulletView.prototype.setBulletHeadUserName = function (name) {
        this.head.name = name;
    };
    return BulletView;
}(egret.Sprite));
__reflect(BulletView.prototype, "BulletView");
