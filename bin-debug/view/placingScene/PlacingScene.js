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
var PlacingScene = (function (_super) {
    __extends(PlacingScene, _super);
    function PlacingScene() {
        var _this = _super.call(this) || this;
        _this.amount = 0;
        _this.draggingGridId = -1;
        _this.currentDraggingGridId = -1;
        _this.current_selected = 0;
        _this.dragging = false;
        _this.planeList = [];
        _this.selectedHead = -1;
        _this.initView();
        return _this;
    }
    PlacingScene.prototype.initView = function () {
        // this.addChild(new BackGround());
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("bg_png");
        bg.width = AdaptSceenUtil.curWidth();
        bg.height = AdaptSceenUtil.curHeight();
        DrawUtil.setImageColor(bg, ColorEnum.NATTIER_BLUE);
        // this.bg.x = 640;
        this.addChild(bg);
        this.msgView = new PlacingMsgView();
        this.msgView.anchorOffsetX = this.msgView.width / 2;
        this.msgView.x = AdaptSceenUtil.curWidth() / 2;
        this.msgView.y = 100 + AdaptSceenUtil.y_fix() / 2;
        this.addChild(this.msgView);
        this.q_icon = new egret.Bitmap();
        this.q_icon.texture = RES.getRes("question");
        this.q_icon.x = AdaptSceenUtil.curWidth() - this.q_icon.width;
        this.q_icon.y = this.msgView.y + this.msgView.height - this.q_icon.height;
        this.addChild(this.q_icon);
        this.q_icon.touchEnabled = true;
        this.q_icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowGuide, this);
        this.guide_view = new GuideView();
        this.guide_view.anchorOffsetX = this.guide_view.width / 2;
        this.guide_view.x = AdaptSceenUtil.curWidth() / 2;
        this.guide_view.y = AdaptSceenUtil.y_fix();
        this.guide_view.setType(GuideEnum.GUIDE_TYPE_PLACE);
        if (!GuideController.getInstance().isFinished()) {
            // SceneManager.getInstance().getPopLayer().addChild(this.guide_view);
            // this.guide_view.setStep(21);
        }
        this.gameView = new GameView(true);
        this.addChild(this.gameView);
        this.drag_plane = new PlaneView();
        this.drag_plane.visible = false;
        this.addChild(this.drag_plane);
        this.controlView = new PlacingControlView();
        this.controlView.x = 0;
        this.controlView.visible = false;
        this.controlView.y = AdaptSceenUtil.curHeight() - this.controlView.height;
        SceneManager.getInstance().getUILayer().addChild(this.controlView);
        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10 + this.backButton.width / 2;
        this.backButton.y = 32 + AdaptSceenUtil.y_fix() / 2 + this.backButton.height / 2;
        this.addChild(this.backButton);
        this.gameView.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.releaseOut, this);
    };
    PlacingScene.prototype.onShowGuide = function (e) {
        SceneManager.getInstance().getPopLayer().addChild(this.guide_view);
        this.guide_view.setStep(21);
    };
    PlacingScene.prototype.onBackButtonTouched = function () {
        SceneManager.getInstance().toCityScene();
    };
    PlacingScene.prototype.resetView = function () {
        this.amount = 0;
        this.gameView.resetView();
    };
    PlacingScene.prototype.inAnimate = function () {
        // this.cityView.
        // egret.Tween.get(this).to({ x: 0 }, 800);
        this.controlView.visible = true;
        this.visible = true;
    };
    PlacingScene.prototype.outAnimate = function () {
        this.controlView.visible = false;
        this.visible = false;
        // egret.Tween.get(this).to({ x: -640 }, 800);
    };
    PlacingScene.prototype.addOnePlane = function (index, headGridId, direction) {
        this.gameView.gridList[headGridId].setPlane(index, GridTypeEnum.HEAD, BodyGridEnum.UNSET, direction);
        var bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
        for (var bodyType = 0; bodyType < bodyGrids.length; bodyType++) {
            this.gameView.gridList[headGridId + bodyGrids[bodyType]].setPlane(index, GridTypeEnum.BODY, bodyType, direction);
        }
        this.planeList.push({ head: headGridId, direction: direction });
    };
    PlacingScene.prototype.removeOnePlane = function (headGridId) {
        var headGridView = this.gameView.gridList[headGridId];
        var direction = headGridView.direction;
        headGridView.setPlane(0, GridTypeEnum.MISS, BodyGridEnum.UNSET, DirectionTypeEnum.UNSET);
        var bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
        for (var bodyType = 0; bodyType < bodyGrids.length; bodyType++) {
            this.gameView.gridList[headGridId + bodyGrids[bodyType]].setPlane(0, GridTypeEnum.MISS, BodyGridEnum.UNSET, DirectionTypeEnum.UNSET);
        }
        this.removeHeadFromList(headGridId);
    };
    PlacingScene.prototype.removeHeadFromList = function (headPos) {
        for (var i = 0; i < this.planeList.length; i++) {
            if (this.planeList[i].head === headPos) {
                this.planeList.splice(i, 1);
                break;
            }
        }
    };
    PlacingScene.prototype.selectOneGrid = function (gridId) {
        var gridView = this.gameView.gridList[gridId];
        if (gridView.type === GridTypeEnum.MISS) {
            if (this.current_selected !== 0) {
                this.cancelSelected();
            }
        }
        else if (gridView.type === GridTypeEnum.BODY) {
            if (this.current_selected === gridView.getPlaneIndex()) {
                this.cancelSelected();
            }
            else {
                if (this.current_selected !== 0) {
                    this.cancelSelected();
                }
                this.selectOnePlane(gridId);
            }
        }
        else if (gridView.type === GridTypeEnum.HEAD) {
            if (this.current_selected === gridView.getPlaneIndex()) {
                this.cancelSelected();
            }
            else {
                if (this.current_selected !== 0) {
                    this.cancelSelected();
                }
                this.selectOnePlane(gridId);
            }
        }
    };
    PlacingScene.prototype.cancelSelected = function () {
        if (this.current_selected === 0) {
            return;
        }
        var plane_data = this.planeList[this.current_selected - 1];
        var headGridId = plane_data.head;
        var direction = plane_data.direction;
        var bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
        this.gameView.gridList[headGridId].selected = false;
        for (var bodyType = 0; bodyType < bodyGrids.length; bodyType++) {
            this.gameView.gridList[headGridId + bodyGrids[bodyType]].selected = false;
        }
        this.dragging = false;
        this.currentDraggingGridId = -1;
        this.current_selected = 0;
    };
    PlacingScene.prototype.selectOnePlane = function (gridId) {
        this.dragging = true;
        this.draggingGridId = gridId;
        //新点击的飞机
        var gridView = this.gameView.gridList[gridId];
        var selectBodyType;
        var headGridId;
        var direction = gridView.direction;
        var bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
        if (gridView.type === GridTypeEnum.BODY) {
            selectBodyType = gridView.bodyType;
            headGridId = gridId - bodyGrids[selectBodyType];
        }
        else {
            headGridId = gridId;
        }
        // if (this.current_selected === 0) {
        //     selectBodyType = gridView.bodyType;
        //     direction = gridView.direction;
        //     bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
        //     headGridId = gridId - bodyGrids[selectBodyType];
        //     (this.gameView.gridList[headGridId] as PlacingGridView).selected = false;
        //     for (let bodyType = 0; bodyType < bodyGrids.length; bodyType++) {
        //         (this.gameView.gridList[headGridId + bodyGrids[bodyType]] as PlacingGridView).selected = false;
        //     }
        //     this.current_selected = 0;
        // } else if (this.current_selected === gridView.getPlaneIndex()) {
        // }
        // if (this.current_selected === gridView.getPlaneIndex()) {
        //     // 点击的飞机就是当前的飞机；则取消选中
        //     return;
        // } else {
        //     this.current_selected = gridView.getPlaneIndex();
        // }
        // if (this.current_selected !== 0) {
        //     let plane_data = this.planeList[this.current_selected];
        //     headGridId = plane_data.head;
        //     direction = plane_data.direction;
        //     bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
        //     (this.gameView.gridList[headGridId] as PlacingGridView).selected = true;
        //     for (let bodyType = 0; bodyType < bodyGrids.length; bodyType++) {
        //         (this.gameView.gridList[headGridId + bodyGrids[bodyType]] as PlacingGridView).selected = true;
        //     }
        // }
        this.gameView.gridList[headGridId].selected = true;
        for (var bodyType = 0; bodyType < bodyGrids.length; bodyType++) {
            this.gameView.gridList[headGridId + bodyGrids[bodyType]].selected = true;
        }
        this.current_selected = gridView.getPlaneIndex();
        this.selectedHead = headGridId;
    };
    PlacingScene.prototype.releaseOnePlane = function (gridId, e) {
        if (!this.dragging || this.currentDraggingGridId === gridId) {
            return;
        }
        SoundManager.getInstance().playSound(SoundEnum.DROP_MP3);
        var gridView = this.gameView.gridList[this.draggingGridId];
        var selectBodyType;
        var headGridId;
        var direction = gridView.direction;
        var bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
        if (gridView.type === GridTypeEnum.BODY) {
            selectBodyType = gridView.bodyType;
            headGridId = gridId - bodyGrids[selectBodyType];
        }
        else {
            headGridId = gridId;
        }
        // this.addOnePlane(headGridId, direction);
        if (this.checkValid(headGridId, direction)) {
            this.removeOnePlane(this.selectedHead);
            this.addOnePlane(this.current_selected, headGridId, direction);
            this.cancelSelected();
            this.gameView.updateView();
            this.drag_plane.clearView();
        }
        else {
            this.cancelSelected();
        }
        this.drag_plane.visible = false;
        for (var i = 0; i < this.gameView.gridList.length; i++) {
            var grid = this.gameView.gridList[i];
            grid.setNoPlaneLanding();
        }
        // removeOnePlane
    };
    PlacingScene.prototype.checkValid = function (headGridId, direction) {
        var result = false;
        var dropingHeadGridView = this.gameView.gridList[headGridId];
        if (!MapUtil.checkHeadAndDirection(headGridId, direction)) {
            return false;
        }
        if (dropingHeadGridView.getPlaneIndex() !== 0 && dropingHeadGridView.getPlaneIndex() !== this.current_selected) {
            return result;
        }
        var bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
        if (bodyGrids.length === 0) {
            return false;
        }
        for (var bodyType = 0; bodyType < bodyGrids.length; bodyType++) {
            var bodyGridView = this.gameView.gridList[headGridId + bodyGrids[bodyType]];
            if (bodyGridView.getPlaneIndex() !== 0 && bodyGridView.getPlaneIndex() !== this.current_selected) {
                return result;
            }
        }
        result = true;
        return result;
        // for () {
        // }
        // return false;
    };
    PlacingScene.prototype.movingOnePlane = function (gridId, e) {
        if (!this.dragging || this.currentDraggingGridId === gridId) {
            return;
        }
        if (!this.drag_plane.visible) {
            this.drag_plane.visible = true;
            this.drag_plane.setView(gridId);
            if (!this.contains(this.drag_plane)) {
                this.addChild(this.drag_plane);
            }
        }
        // this.drag_plane.x = this.drag_plane.y = 0;
        this.drag_plane.x = e.stageX;
        this.drag_plane.y = e.stageY;
        if (this.draggingGridId !== gridId) {
            //原始飞机的数据
            var gridView = this.gameView.gridList[this.draggingGridId];
            var selectBodyType = void 0;
            var headGridId_1;
            var direction = gridView.direction;
            var bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
            var rowFromHead = DirectionTypeEnum.getRowFromHeadByDirection(direction);
            if (gridView.type === GridTypeEnum.BODY) {
                selectBodyType = gridView.bodyType;
                headGridId_1 = gridId - bodyGrids[selectBodyType];
            }
            else {
                headGridId_1 = gridId;
            }
            var planeList_1 = [];
            planeList_1.push(headGridId_1);
            bodyGrids.forEach(function (element) {
                planeList_1.push(element + headGridId_1);
            });
            for (var i = 0; i < this.gameView.gridList.length; i++) {
                var id = this.gameView.gridList[i].id;
                var grid = this.gameView.gridList[id];
                if (planeList_1.indexOf(id) !== -1) {
                    if (grid.type !== GridTypeEnum.MISS) {
                        if (rowFromHead[planeList_1.indexOf(id)] + rowFromHead[planeList_1.indexOf(gridId)] === MapUtil.getYOffset(headGridId_1, id) + MapUtil.getYOffset(headGridId_1, gridId)) {
                            if (grid.getPlaneIndex() !== this.current_selected) {
                                grid.setPlaneEnable(false);
                            }
                            else {
                                grid.setPlaneEnable(true);
                            }
                        }
                        else {
                            grid.setNoPlaneLanding();
                        }
                    }
                    else {
                        grid.setNoPlaneLanding();
                    }
                }
                else {
                    grid.setNoPlaneLanding();
                }
            }
        }
    };
    /**
     * 旋转飞机
     */
    PlacingScene.prototype.rotationPlane = function (gridId) {
        var gridView = this.gameView.gridList[gridId];
        if (gridView.type === GridTypeEnum.MISS) {
            return;
        }
        this.current_selected = gridView.getPlaneIndex();
        var selectBodyType;
        var headGridId;
        var direction = gridView.direction;
        var bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
        if (gridView.type === GridTypeEnum.BODY) {
            selectBodyType = gridView.bodyType;
            headGridId = gridId - bodyGrids[selectBodyType];
        }
        else {
            headGridId = gridId;
        }
        var result = MapUtil.rotationPlane(headGridId, direction);
        var rotationed = false;
        while (result.direction !== direction) {
            if (this.checkValid(result.head, result.direction)) {
                var rotationIndex = gridView.getPlaneIndex();
                this.removeOnePlane(headGridId);
                this.addOnePlane(rotationIndex, result.head, result.direction);
                rotationed = true;
                break;
            }
            else {
                result = MapUtil.rotationPlane(result.head, result.direction);
            }
        }
        if (!rotationed) {
            SceneManager.getInstance().showTip(i18n.getInstance().getLanguage("tip_this_place_cant_rotation"));
        }
        this.cancelSelected();
    };
    PlacingScene.prototype.releaseOut = function (e) {
        this.releaseOnePlane(this.draggingGridId, e);
    };
    /**
     * 获得飞机
     * @param grid 格子
     */
    PlacingScene.prototype.getPlane = function (grid) {
        return [];
    };
    PlacingScene.prototype.getDraggingRealHead = function () {
        return this.selectedHead;
    };
    Object.defineProperty(PlacingScene.prototype, "planeAmount", {
        set: function (value) {
            this.amount = value;
        },
        enumerable: true,
        configurable: true
    });
    return PlacingScene;
}(egret.Sprite));
__reflect(PlacingScene.prototype, "PlacingScene", ["Scene"]);
