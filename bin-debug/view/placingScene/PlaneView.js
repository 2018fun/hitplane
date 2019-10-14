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
var PlaneView = (function (_super) {
    __extends(PlaneView, _super);
    function PlaneView() {
        var _this = _super.call(this) || this;
        _this.gridViewList = [];
        _this.initView();
        return _this;
    }
    PlaneView.prototype.initView = function () {
        // this.planeView.texture = RES.getRes("");
        this.grid_sheet = RES.getRes("plane_sheet");
        this.drag_index = 0;
        var gridView;
        for (var i = 0; i < 10; i++) {
            gridView = new egret.Bitmap();
            this.gridViewList.push(gridView);
            this.addChild(gridView);
        }
    };
    PlaneView.prototype.clearView = function () {
    };
    PlaneView.prototype.setView = function (gridId) {
        var gameView = SceneManager.getInstance().placingScene.gameView;
        var gridView = gameView.gridList[gridId];
        this.drag_index = gridView.getPlaneIndex();
        var direction = gridView.direction;
        var bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
        var movingBodyType;
        var headGridId;
        if (gridView.type === GridTypeEnum.HEAD) {
            headGridId = gridId;
        }
        else {
            movingBodyType = gridView.bodyType;
            headGridId = gridId - bodyGrids[movingBodyType];
        }
        this.addGrid(direction, "_H", gridId, headGridId);
        for (var bodyType = 0; bodyType < bodyGrids.length; bodyType++) {
            this.addGrid(direction, "_" + bodyType, gridId, gameView.gridList[headGridId + bodyGrids[bodyType]].id);
        }
    };
    PlaneView.prototype.addGrid = function (direction, texture_fix, fromId, targetId) {
        var gridView = this.gridViewList.shift();
        gridView.texture = this.grid_sheet.getTexture(DirectionTypeEnum.DIRECTION_LETTER[direction] + texture_fix);
        gridView.x = -30 + 60 * MapUtil.getXOffset(fromId, targetId);
        gridView.y = -30 + 60 * MapUtil.getYOffset(fromId, targetId);
        this.gridViewList.push(gridView);
    };
    PlaneView.prototype.getIndex = function () {
        return this.drag_index;
    };
    return PlaneView;
}(egret.Sprite));
__reflect(PlaneView.prototype, "PlaneView");
