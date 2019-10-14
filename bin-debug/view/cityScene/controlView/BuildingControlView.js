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
var BuildingControlView = (function (_super) {
    __extends(BuildingControlView, _super);
    function BuildingControlView() {
        var _this = _super.call(this) || this;
        // 多个保护buf、多个保险buf block-buf
        _this.buf = [];
        _this.initView();
        return _this;
    }
    BuildingControlView.prototype.initView = function () {
        this.controlViewBg = new egret.Bitmap();
        this.controlViewBg.texture = RES.getRes("control_bg_png");
        this.controlViewBg.width = AdaptSceenUtil.curWidth();
        // this.controlViewBg.x = ;
        this.addChild(this.controlViewBg);
        this.levelUpButton = new E8TextButton(this, RES.getRes("btn_yellow_png"), this.levelUp);
        this.levelUpButton.scale(0.5, 0.5);
        this.levelUpButton.x = AdaptSceenUtil.curWidth() - this.levelUpButton.width - 10;
        this.levelUpButton.y = 200;
        this.levelUpButton.setButtonText(i18n.getInstance().getLanguage("ui_level_up"));
        this.addChild(this.levelUpButton);
        this.demolishButton = new E8TextButton(this, RES.getRes("btn_red_png"), this.demolish);
        this.demolishButton.scale(0.5, 0.5);
        this.demolishButton.x = AdaptSceenUtil.curWidth() - 2 * this.levelUpButton.width - 20;
        this.demolishButton.y = 200;
        this.demolishButton.setButtonText(i18n.getInstance().getLanguage("ui_demolish"));
        this.addChild(this.demolishButton);
        this.repairButton = new E8TextButton(this, RES.getRes("btn_green_png"), this.repair);
        this.repairButton.scale(0.5, 0.5);
        this.repairButton.x = AdaptSceenUtil.curWidth() - 3 * this.levelUpButton.width - 30;
        this.repairButton.y = 200;
        this.repairButton.visible = false;
        this.repairButton.setButtonText(i18n.getInstance().getLanguage("ui_repair"));
        this.addChild(this.repairButton);
    };
    Object.defineProperty(BuildingControlView.prototype, "level", {
        set: function (value) {
            this._level = value;
            if (this._level === 5) {
                this.levelUpButton.visible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    BuildingControlView.prototype.levelUp = function () {
        CityController.getInstance().levelUpBuilding();
        if (this._level === 5) {
            this.levelUpButton.visible = false;
        }
    };
    BuildingControlView.prototype.demolish = function () {
        CityController.getInstance().demolish();
    };
    BuildingControlView.prototype.repair = function () {
        CityController.getInstance().repairCity(this.position);
    };
    return BuildingControlView;
}(egret.Sprite));
__reflect(BuildingControlView.prototype, "BuildingControlView");
