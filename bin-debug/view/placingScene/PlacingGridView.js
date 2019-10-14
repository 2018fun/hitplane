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
var PlacingGridView = (function (_super) {
    __extends(PlacingGridView, _super);
    function PlacingGridView(id) {
        var _this = _super.call(this, id) || this;
        _this._bodyType = BodyGridEnum.UNSET;
        _this._direction = DirectionTypeEnum.UNSET;
        _this._planeIndex = 0;
        _this.helpView = new egret.Bitmap();
        _this.helpView.width = 60;
        _this.helpView.height = 60;
        _this.helpView.texture = RES.getRes("help_png");
        _this.addChild(_this.helpView);
        return _this;
    }
    Object.defineProperty(PlacingGridView.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        enumerable: true,
        configurable: true
    });
    PlacingGridView.prototype.getPlaneIndex = function () {
        return this._planeIndex;
    };
    Object.defineProperty(PlacingGridView.prototype, "bodyType", {
        get: function () {
            return this._bodyType;
        },
        enumerable: true,
        configurable: true
    });
    PlacingGridView.prototype.updateView = function () {
        if (this._type === GridTypeEnum.HEAD) {
            this.gridView.texture = this.grid_sheet.getTexture(DirectionTypeEnum.DIRECTION_LETTER[this._direction] + "_H");
        }
        else if (this._type === GridTypeEnum.BODY) {
            this.gridView.texture = this.grid_sheet.getTexture(DirectionTypeEnum.DIRECTION_LETTER[this._direction] + "_" + this._bodyType);
        }
        else {
            this.gridView.texture = null;
        }
    };
    PlacingGridView.prototype.resetView = function () {
        this._planeIndex = 0;
        this._type = GridTypeEnum.MISS;
        this._bodyType = BodyGridEnum.UNSET;
        this._direction = DirectionTypeEnum.UNSET;
        this.gridView.texture = null;
        this.updateView();
    };
    PlacingGridView.prototype.setPlane = function (index, type, bodyType, direction) {
        this._planeIndex = index;
        this._direction = direction;
        this._bodyType = bodyType;
        this._type = type;
        this.updateView();
    };
    Object.defineProperty(PlacingGridView.prototype, "selected", {
        set: function (value) {
            if (value) {
                DrawUtil.setImageColor(this.gridView, 0x888888);
            }
            else {
                DrawUtil.setImageColor(this.gridView, 0xffffff);
            }
        },
        enumerable: true,
        configurable: true
    });
    PlacingGridView.prototype.setPlaneEnable = function (enable) {
        if (enable === void 0) { enable = true; }
        if (enable) {
            DrawUtil.setImageColor(this.gridView, 0x00ff00);
        }
        else {
            DrawUtil.setImageColor(this.gridView, 0xff0000);
        }
    };
    PlacingGridView.prototype.setNoPlaneLanding = function () {
        DrawUtil.setImageColor(this.gridView, 0xffffff);
    };
    return PlacingGridView;
}(GridView));
__reflect(PlacingGridView.prototype, "PlacingGridView");
