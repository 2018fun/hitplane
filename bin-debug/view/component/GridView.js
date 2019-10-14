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
var GridView = (function (_super) {
    __extends(GridView, _super);
    function GridView(id) {
        var _this = _super.call(this) || this;
        _this._id = id;
        _this.initView();
        return _this;
    }
    GridView.prototype.initView = function () {
        this.grid_sheet = RES.getRes("plane_sheet");
        this.gridView = new egret.Bitmap();
        this.gridView.width = 60;
        this.gridView.height = 60;
        this.addChild(this.gridView);
        // this.gridView = new egret.Bitmap();
        // this.gridView.width = 60;
        // this.gridView.height = 60;
        // this.gridView.visible = false;
        // this.addChild(this.gridView);
        // // this.placingView = new egret.Bitmap();
        // this.coverView = new egret.Bitmap();
        // this.coverView.texture = RES.getRes("cover_png");
        // this.coverView.width = 60;
        // this.coverView.height = 60;
        // if (this._status === GridStatusEnum.COVER) {
        //     this.coverView.visible = true;
        // } else {
        //     this.coverView.visible = false;
        // }
        // this.addChild(this.coverView);
        // this.selectedView = new egret.Bitmap();
        // this.selectedView.texture = RES.getRes("selected_png");
        // this.selectedView.width = 60;
        // this.selectedView.height = 60;
        // this.selectedView.visible = false;
        // this.addChild(this.selectedView);
    };
    GridView.prototype.updateView = function () {
        // if (this.) {
        // }
    };
    GridView.prototype.resetView = function () {
    };
    Object.defineProperty(GridView.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            if (this._type !== value) {
                this._type = value;
            }
            else {
            }
            if (this._type !== 0) {
            }
            else {
            }
            this.updateView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
            this.updateView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "touched", {
        get: function () {
            return this._touched;
        },
        set: function (value) {
            this._touched = value;
            this.updateView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridView.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    return GridView;
}(egret.Sprite));
__reflect(GridView.prototype, "GridView");
