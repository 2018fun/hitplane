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
 * 游戏界面
 * 9*9的飞机图
 */
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView(showAll, data, showTags) {
        if (showAll === void 0) { showAll = false; }
        if (data === void 0) { data = null; }
        if (showTags === void 0) { showTags = true; }
        var _this = _super.call(this) || this;
        _this.gridList = [];
        _this.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
        _this.numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        _this.rowTags = [];
        _this.colTags = [];
        _this.selectedGrid = -1;
        _this.showAll = showAll;
        _this.showTags = showTags;
        if (data !== null) {
            _this.initWithData(data);
        }
        else {
            _this.initView();
        }
        return _this;
    }
    GameView.prototype.initWithData = function (data) {
        var grid;
        for (var i = 0; i < 81; i++) {
            var column = i % 9;
            var row = Math.floor(i / 9);
            var color = void 0;
            var alpha = void 0;
            if (i % 2 == 1) {
                color = 0x03a9f4;
                alpha = 1;
            }
            else {
                color = 0xffffff;
                alpha = 0;
            }
            /**
             * 换成图片
             */
            var gridShape = new egret.Shape();
            gridShape.graphics.beginFill(color, alpha);
            gridShape.graphics.drawRect(0, 0, 60, 60);
            gridShape.graphics.endFill();
            gridShape.x = column * 60;
            gridShape.y = row * 60;
            this.addChild(gridShape);
            if (this.showAll) {
                grid = new PlacingGridView(i);
                if (data !== null) {
                    grid.setPlane(data[i].index, data[i].gridType, data[i].bodyType, data[i].direction);
                }
            }
            else {
                grid = new AwayGridView(i);
            }
            grid.x = column * 60;
            grid.y = row * 60;
            this.addGridEventListener(grid);
            this.addChild(grid);
            this.gridList.push(grid);
        }
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = AdaptSceenUtil.curWidth() / 2;
        this.y = AdaptSceenUtil.curHeight() / 2;
        if (this.showTags) {
            this.addTags();
        }
    };
    GameView.prototype.updateWithData = function (data) {
        for (var i = 0; i < 81; i++) {
            this.gridList[i].setPlane(data[i].index, data[i].gridType, data[i].bodyType, data[i].direction);
            this.gridList[i].updateView();
        }
    };
    GameView.prototype.initView = function () {
        var grid;
        for (var i = 0; i < 81; i++) {
            var column = i % 9;
            var row = Math.floor(i / 9);
            var color = void 0;
            var alpha = void 0;
            if (i % 2 == 1) {
                color = 0x03a9f4;
                alpha = 1;
            }
            else {
                color = 0xffffff;
                alpha = 0;
            }
            /**
             * 换成图片
             */
            var gridShape = new egret.Shape();
            gridShape.graphics.beginFill(color, alpha);
            gridShape.graphics.drawRect(0, 0, 60, 60);
            gridShape.graphics.endFill();
            gridShape.x = column * 60;
            gridShape.y = row * 60;
            this.addChildAt(gridShape, 0);
            if (this.showAll) {
                grid = new PlacingGridView(i);
            }
            else {
                grid = new AwayGridView(i);
            }
            // grid.type = AIController.getInstance().getGridTypeById(i);
            grid.x = column * 60;
            grid.y = row * 60;
            this.addGridEventListener(grid);
            this.addChildAt(grid, this.numChildren - 1);
            this.gridList.push(grid);
        }
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        var fix = 0;
        if (this.showTags) {
            this.addTags();
            if (this.width - 270 > AdaptSceenUtil.curWidth() / 2) {
                fix = AdaptSceenUtil.curWidth() / 2 - this.width / 2;
            }
        }
        this.x = AdaptSceenUtil.curWidth() / 2 + fix;
        this.y = AdaptSceenUtil.curHeight() / 2;
    };
    GameView.prototype.addTags = function () {
        var text;
        for (var i = 0; i < 9; i++) {
            text = DrawUtil.textFilter(this.numbers[i], 36, false);
            text.x = (i) * 60 + 30;
            text.y = (-1) * 60 + 30;
            this.colTags.push(text);
            this.addChild(text);
            text = DrawUtil.textFilter(this.letters[i], 36, false);
            text.x = (-1) * 60 + 30;
            text.y = (i) * 60 + 30;
            this.rowTags.push(text);
            this.addChild(text);
        }
    };
    GameView.prototype.addGridEventListener = function (grid) {
        grid.touchEnabled = true;
        grid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouched, this);
        grid.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        grid.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        grid.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        grid.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
        grid.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchRelease, this);
    };
    GameView.prototype.resetView = function () {
        for (var i = 0; i < 81; i++) {
            this.gridList[i].resetView();
        }
    };
    GameView.prototype.updateView = function () {
        for (var i = 0; i < 81; i++) {
            this.gridList[i].updateView();
        }
    };
    GameView.prototype.updateTags = function () {
        for (var i = 0; i < 9; i++) {
            DrawUtil.setImageColor(this.colTags[i], 0xffffff);
            DrawUtil.setImageColor(this.rowTags[i], 0xffffff);
        }
    };
    GameView.prototype.onTouched = function (e) {
        var grid = e.target;
        PlayerHandleController.getInstance().playerTouchedGameView(grid.id);
    };
    GameView.prototype.onTouchBegin = function (e) {
        this.updateTags();
        var grid = e.target;
        var x = MapUtil.getXYFromValue(grid.id).x;
        var y = MapUtil.getXYFromValue(grid.id).y;
        DrawUtil.setImageColor(this.colTags[x], 0xff0000);
        DrawUtil.setImageColor(this.rowTags[y], 0xff0000);
        PlayerHandleController.getInstance().playerBeginMoveInGameView(grid.id, e);
    };
    GameView.prototype.onTouchMove = function (e) {
        var grid = e.target;
        this.updateTags();
        var x = MapUtil.getXYFromValue(grid.id).x;
        var y = MapUtil.getXYFromValue(grid.id).y;
        DrawUtil.setImageColor(this.colTags[x], 0xff0000);
        DrawUtil.setImageColor(this.rowTags[y], 0xff0000);
        PlayerHandleController.getInstance().playerMovingInGameView(grid.id, e);
    };
    GameView.prototype.onTouchEnd = function (e) {
        var grid = e.target;
        this.updateTags();
        PlayerHandleController.getInstance().playerReleaseOnGameView(grid.id, e);
    };
    GameView.prototype.onTouchRelease = function (e) {
        var grid = e.target;
        this.updateTags();
        PlayerHandleController.getInstance().playerReleaseOut(grid.id, e);
    };
    GameView.prototype.onTouchCancel = function (e) {
    };
    GameView.prototype.showFireEffect = function () {
        // for () {
        // }
    };
    GameView.prototype.setSelected = function (grid) {
        if (this.selectedGrid !== -1) {
            this.gridList[this.selectedGrid].selected = false;
        }
        if (grid === -1) {
            this.selectedGrid = grid;
        }
        else {
            this.gridList[grid].selected = true;
            this.selectedGrid = grid;
        }
    };
    GameView.prototype.launchGuidedMissile = function (from, to) {
        var _this = this;
        var fromPoint = egret.Point.create(this.gridList[from].x + Const.getInstance().gridWidth / 2, this.gridList[from].y + Const.getInstance().gridWidth / 2);
        var toPoint = egret.Point.create(this.gridList[to].x + Const.getInstance().gridWidth / 2, this.gridList[to].y + Const.getInstance().gridWidth / 2);
        var bullet = new BulletView(false);
        bullet.x = fromPoint.x;
        bullet.y = fromPoint.y;
        bullet.type = BulletTypeEnum.GUIDED_MISSILE;
        this.addChild(bullet);
        var distance = egret.Point.distance(fromPoint, toPoint);
        var direction = toPoint.subtract(fromPoint);
        direction.normalize(1);
        bullet.rotation = Math.atan((-direction.x) / direction.y) * 360 / (2 * Math.PI);
        egret.Tween.get(bullet).to({ x: toPoint.x, y: toPoint.y }, 5 * distance).call(function () {
            _this.removeChild(bullet);
            GameController.getInstance().afterAnimate(to);
        });
    };
    GameView.prototype.showTouchEffect = function (gridId) {
        var grids = BulletTypeEnum.getBulletEffect(BulletController.getInstance().getCurrentBullet(), gridId);
        for (var i = 0; i < grids.length; i++) {
            this.gridList[grids[i]].effect = true;
        }
        this.selectedGrid = gridId;
    };
    GameView.prototype.resetTouchEffect = function () {
        if (this.selectedGrid === -1) {
            return;
        }
        var grids = BulletTypeEnum.getBulletEffect(BulletController.getInstance().getCurrentBullet(), this.selectedGrid);
        for (var i = 0; i < grids.length; i++) {
            this.gridList[grids[i]].effect = false;
        }
        this.selectedGrid === -1;
    };
    return GameView;
}(egret.Sprite));
__reflect(GameView.prototype, "GameView");
