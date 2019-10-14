/**
 * 游戏界面
 * 9*9的飞机图
 */
class GameView extends egret.Sprite {
    private showAll: boolean;
    private showTags: boolean;
    public gridList: Array<GridView> = [];
    private letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    private numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    private rowTags: egret.Sprite[] = [];
    private colTags: egret.Sprite[] = [];

    private selectedGrid = -1;

    constructor(showAll: boolean = false, data = null, showTags = true) {
        super();
        this.showAll = showAll;
        this.showTags = showTags;
        if (data !== null) {
            this.initWithData(data);
        } else {
            this.initView();
        }
    }

    private initWithData(data) {
        let grid: GridView;
        for (let i = 0; i < 81; i++) {
            let column = i % 9;
            let row = Math.floor(i / 9);
            let color;
            let alpha;
            if (i % 2 == 1) {
                color = 0x03a9f4;
                alpha = 1;
            } else {
                color = 0xffffff;
                alpha = 0;
            }

            /**
             * 换成图片
             */
            let gridShape = new egret.Shape();
            gridShape.graphics.beginFill(color, alpha);
            gridShape.graphics.drawRect(0, 0, 60, 60);
            gridShape.graphics.endFill();
            gridShape.x = column * 60;
            gridShape.y = row * 60;
            this.addChild(gridShape);
            if (this.showAll) {
                grid = new PlacingGridView(i);
                if (data !== null) {
                    (grid as PlacingGridView).setPlane(data[i].index, data[i].gridType, data[i].bodyType, data[i].direction);
                }
            } else {
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

    }

    public updateWithData(data) {
        for (let i = 0; i < 81; i++) {
            (this.gridList[i] as PlacingGridView).setPlane(data[i].index, data[i].gridType, data[i].bodyType, data[i].direction);
            this.gridList[i].updateView();
        }
    }

    private initView() {
        let grid: GridView;
        for (let i = 0; i < 81; i++) {
            let column = i % 9;
            let row = Math.floor(i / 9);
            let color;
            let alpha;
            if (i % 2 == 1) {
                color = 0x03a9f4;
                alpha = 1;
            } else {
                color = 0xffffff;
                alpha = 0;
            }

            /**
             * 换成图片
             */
            let gridShape = new egret.Shape();
            gridShape.graphics.beginFill(color, alpha);
            gridShape.graphics.drawRect(0, 0, 60, 60);
            gridShape.graphics.endFill();
            gridShape.x = column * 60;
            gridShape.y = row * 60;
            this.addChildAt(gridShape, 0);
            if (this.showAll) {
                grid = new PlacingGridView(i);
            } else {
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

        let fix = 0;
        if (this.showTags) {
            this.addTags();
            if (this.width - 270 > AdaptSceenUtil.curWidth() / 2) {
                fix = AdaptSceenUtil.curWidth() / 2 - this.width / 2;
            }
        }
        this.x = AdaptSceenUtil.curWidth() / 2 + fix;
        this.y = AdaptSceenUtil.curHeight() / 2;
    }


    protected addTags() {
        let text: egret.Sprite;

        for (let i = 0; i < 9; i++) {
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
    }

    protected addGridEventListener(grid) {
        grid.touchEnabled = true;
        grid.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouched, this);
        grid.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        grid.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        grid.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        grid.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
        grid.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchRelease, this);
    }

    public resetView() {
        for (let i = 0; i < 81; i++) {
            this.gridList[i].resetView();
        }
    }

    public updateView() {
        for (let i = 0; i < 81; i++) {
            this.gridList[i].updateView();
        }
    }

    private updateTags() {
        for (let i = 0; i < 9; i++) {
            DrawUtil.setImageColor(this.colTags[i], 0xffffff);
            DrawUtil.setImageColor(this.rowTags[i], 0xffffff);
        }
    }

    private onTouched(e) {
        let grid = e.target;
        PlayerHandleController.getInstance().playerTouchedGameView(grid.id);
    }

    private onTouchBegin(e) {
        this.updateTags();
        let grid = e.target;
        let x = MapUtil.getXYFromValue(grid.id).x;
        let y = MapUtil.getXYFromValue(grid.id).y;
        DrawUtil.setImageColor(this.colTags[x], 0xff0000);
        DrawUtil.setImageColor(this.rowTags[y], 0xff0000);
        PlayerHandleController.getInstance().playerBeginMoveInGameView(grid.id, e);
    }

    private onTouchMove(e) {
        let grid = e.target;
        this.updateTags();
        let x = MapUtil.getXYFromValue(grid.id).x;
        let y = MapUtil.getXYFromValue(grid.id).y;
        DrawUtil.setImageColor(this.colTags[x], 0xff0000);
        DrawUtil.setImageColor(this.rowTags[y], 0xff0000);
        PlayerHandleController.getInstance().playerMovingInGameView(grid.id, e);
    }

    private onTouchEnd(e) {
        let grid = e.target;
        this.updateTags();
        PlayerHandleController.getInstance().playerReleaseOnGameView(grid.id, e);
    }


    private onTouchRelease(e) {
        let grid = e.target;
        this.updateTags();
        PlayerHandleController.getInstance().playerReleaseOut(grid.id, e);
    }

    private onTouchCancel(e) {
    }

    public showFireEffect() {
        // for () {

        // }
    }

    public setSelected(grid) {
        if (this.selectedGrid !== -1) {
            (this.gridList[this.selectedGrid] as AwayGridView).selected = false;
        }
        if (grid === -1) {
            this.selectedGrid = grid;
        } else {
            (this.gridList[grid] as AwayGridView).selected = true;
            this.selectedGrid = grid;
        }

    }

    public launchGuidedMissile(from, to) {
        let fromPoint = egret.Point.create(this.gridList[from].x + Const.getInstance().gridWidth / 2, this.gridList[from].y + Const.getInstance().gridWidth / 2)
        let toPoint = egret.Point.create(this.gridList[to].x + Const.getInstance().gridWidth / 2, this.gridList[to].y + Const.getInstance().gridWidth / 2)
        let bullet = new BulletView(false);
        bullet.x = fromPoint.x;
        bullet.y = fromPoint.y;
        bullet.type = BulletTypeEnum.GUIDED_MISSILE;
        this.addChild(bullet);

        let distance = egret.Point.distance(fromPoint, toPoint);
        let direction = toPoint.subtract(fromPoint);
        direction.normalize(1);
        bullet.rotation = Math.atan((-direction.x) / direction.y) * 360 / (2 * Math.PI);
        egret.Tween.get(bullet).to({ x: toPoint.x, y: toPoint.y }, 5 * distance).call(() => {
            this.removeChild(bullet);
            GameController.getInstance().afterAnimate(to);
        });
    }


    public showTouchEffect(gridId) {
        let grids = BulletTypeEnum.getBulletEffect(BulletController.getInstance().getCurrentBullet(), gridId);
        for (let i = 0; i < grids.length; i++) {
            (this.gridList[grids[i]] as AwayGridView).effect = true;
        }
        this.selectedGrid = gridId;
    }

    public resetTouchEffect() {
        if (this.selectedGrid === -1) {
            return;
        }
        let grids = BulletTypeEnum.getBulletEffect(BulletController.getInstance().getCurrentBullet(), this.selectedGrid);
        for (let i = 0; i < grids.length; i++) {
            (this.gridList[grids[i]] as AwayGridView).effect = false;
        }

        this.selectedGrid === -1
    }
}