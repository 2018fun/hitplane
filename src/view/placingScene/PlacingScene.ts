/**
 * 
 */
class PlacingScene extends egret.Sprite implements Scene {
    constructor() {
        super();
        this.initView();
    }

    private bg: egret.Bitmap;

    private amount = 0;

    public gameView: GameView;
    private controlView: PlacingControlView;

    private draggingGridId = -1;
    private currentDraggingGridId = -1;
    private current_selected = 0;
    private dragging = false;
    private drag_plane: PlaneView;
    private planeList = [];
    private selectedHead = -1;

    // private shareButton = new E8Button();
    private backButton: E8Button;
    public msgView: PlacingMsgView;

    private guide_view: GuideView;
    private q_icon: egret.Bitmap;

    private initView() {
        // this.addChild(new BackGround());
        let bg = new egret.Bitmap();
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
        this.addChild(this.msgView)


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




    }


    private onShowGuide(e) {
        SceneManager.getInstance().getPopLayer().addChild(this.guide_view);
        this.guide_view.setStep(21);
    }


    private onBackButtonTouched() {
        SceneManager.getInstance().toCityScene();
    }

    public resetView() {
        this.amount = 0;
        this.gameView.resetView();
    }

    public inAnimate() {
        // this.cityView.
        // egret.Tween.get(this).to({ x: 0 }, 800);
        this.controlView.visible = true;
        this.visible = true;
    }

    public outAnimate() {
        this.controlView.visible = false;
        this.visible = false;
        // egret.Tween.get(this).to({ x: -640 }, 800);
    }

    public addOnePlane(index, headGridId, direction) {
        (this.gameView.gridList[headGridId] as PlacingGridView).setPlane(index, GridTypeEnum.HEAD, BodyGridEnum.UNSET, direction);
        let bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
        for (let bodyType = 0; bodyType < bodyGrids.length; bodyType++) {
            (this.gameView.gridList[headGridId + bodyGrids[bodyType]] as PlacingGridView).setPlane(index, GridTypeEnum.BODY, bodyType, direction);
        }
        this.planeList.push({ head: headGridId, direction: direction });
    }

    public removeOnePlane(headGridId) {
        let headGridView = (this.gameView.gridList[headGridId] as PlacingGridView);
        let direction = headGridView.direction;
        headGridView.setPlane(0, GridTypeEnum.MISS, BodyGridEnum.UNSET, DirectionTypeEnum.UNSET);
        let bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
        for (let bodyType = 0; bodyType < bodyGrids.length; bodyType++) {
            (this.gameView.gridList[headGridId + bodyGrids[bodyType]] as PlacingGridView).setPlane(0, GridTypeEnum.MISS, BodyGridEnum.UNSET, DirectionTypeEnum.UNSET);
        }
        this.removeHeadFromList(headGridId)
    }

    private removeHeadFromList(headPos) {
        for (var i = 0; i < this.planeList.length; i++) {
            if (this.planeList[i].head === headPos) {
                this.planeList.splice(i, 1);
                break;
            }
        }
    }



    public selectOneGrid(gridId) {
        let gridView = this.gameView.gridList[gridId] as PlacingGridView;
        if (gridView.type === GridTypeEnum.MISS) {
            if (this.current_selected !== 0) {
                this.cancelSelected();
            }
        } else if (gridView.type === GridTypeEnum.BODY) {
            if (this.current_selected === gridView.getPlaneIndex()) {

                this.cancelSelected();
            } else {
                if (this.current_selected !== 0) {
                    this.cancelSelected();
                }
                this.selectOnePlane(gridId);
            }
        } else if (gridView.type === GridTypeEnum.HEAD) {
            if (this.current_selected === gridView.getPlaneIndex()) {

                this.cancelSelected();
            } else {
                if (this.current_selected !== 0) {
                    this.cancelSelected();
                }
                this.selectOnePlane(gridId);
            }
        }
    }

    private cancelSelected() {
        if (this.current_selected === 0) {
            return;
        }
        let plane_data = this.planeList[this.current_selected - 1];
        let headGridId = plane_data.head;
        let direction = plane_data.direction;
        let bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
        (this.gameView.gridList[headGridId] as PlacingGridView).selected = false;
        for (let bodyType = 0; bodyType < bodyGrids.length; bodyType++) {
            (this.gameView.gridList[headGridId + bodyGrids[bodyType]] as PlacingGridView).selected = false;
        }
        this.dragging = false;
        this.currentDraggingGridId = -1;
        this.current_selected = 0;
    }

    public selectOnePlane(gridId) {
        this.dragging = true;
        this.draggingGridId = gridId;
        //新点击的飞机
        let gridView = this.gameView.gridList[gridId] as PlacingGridView;
        let selectBodyType;
        let headGridId;
        let direction = gridView.direction;
        let bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
        if (gridView.type === GridTypeEnum.BODY) {
            selectBodyType = gridView.bodyType;
            headGridId = gridId - bodyGrids[selectBodyType];
        } else {
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


        (this.gameView.gridList[headGridId] as PlacingGridView).selected = true;
        for (let bodyType = 0; bodyType < bodyGrids.length; bodyType++) {
            (this.gameView.gridList[headGridId + bodyGrids[bodyType]] as PlacingGridView).selected = true;
        }
        this.current_selected = gridView.getPlaneIndex();
        this.selectedHead = headGridId;
    }

    public releaseOnePlane(gridId, e: egret.TouchEvent) {
        if (!this.dragging || this.currentDraggingGridId === gridId) {
            return;
        }

        SoundManager.getInstance().playSound(SoundEnum.DROP_MP3);

        let gridView = this.gameView.gridList[this.draggingGridId] as PlacingGridView;
        let selectBodyType;
        let headGridId;
        let direction = gridView.direction;
        let bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
        if (gridView.type === GridTypeEnum.BODY) {
            selectBodyType = gridView.bodyType;
            headGridId = gridId - bodyGrids[selectBodyType];
        } else {
            headGridId = gridId;
        }
        // this.addOnePlane(headGridId, direction);
        if (this.checkValid(headGridId, direction)) {
            this.removeOnePlane(this.selectedHead);
            this.addOnePlane(this.current_selected, headGridId, direction);
            this.cancelSelected();
            this.gameView.updateView();
            this.drag_plane.clearView();
        } else {
            this.cancelSelected();
        }
        this.drag_plane.visible = false;

        for (var i = 0; i < this.gameView.gridList.length; i++) {
            let grid = (this.gameView.gridList[i] as PlacingGridView);
            grid.setNoPlaneLanding();
        }

        // removeOnePlane
    }

    private checkValid(headGridId, direction) {
        let result = false;

        let dropingHeadGridView = (this.gameView.gridList[headGridId] as PlacingGridView);
        if (!MapUtil.checkHeadAndDirection(headGridId, direction)) {
            return false;
        }
        if (dropingHeadGridView.getPlaneIndex() !== 0 && dropingHeadGridView.getPlaneIndex() !== this.current_selected) {
            return result;
        }

        let bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
        if (bodyGrids.length === 0) {
            return false;
        }
        for (let bodyType = 0; bodyType < bodyGrids.length; bodyType++) {
            let bodyGridView = (this.gameView.gridList[headGridId + bodyGrids[bodyType]] as PlacingGridView);
            if (bodyGridView.getPlaneIndex() !== 0 && bodyGridView.getPlaneIndex() !== this.current_selected) {
                return result;
            }
        }
        result = true;
        return result;
        // for () {

        // }
        // return false;
    }


    public movingOnePlane(gridId, e: egret.TouchEvent) {
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
            let gridView = this.gameView.gridList[this.draggingGridId] as PlacingGridView;
            let selectBodyType;
            let headGridId;
            let direction = gridView.direction;
            let bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
            let rowFromHead = DirectionTypeEnum.getRowFromHeadByDirection(direction);
            if (gridView.type === GridTypeEnum.BODY) {
                selectBodyType = gridView.bodyType;
                headGridId = gridId - bodyGrids[selectBodyType];
            } else {
                headGridId = gridId;
            }
            let planeList = [];
            planeList.push(headGridId);

            bodyGrids.forEach(element => {
                planeList.push(element + headGridId);
            });
            for (var i = 0; i < this.gameView.gridList.length; i++) {
                let id = this.gameView.gridList[i].id;
                let grid = (this.gameView.gridList[id] as PlacingGridView);
                if (planeList.indexOf(id) !== -1) {

                    if (grid.type !== GridTypeEnum.MISS) {
                        if (rowFromHead[planeList.indexOf(id)] + rowFromHead[planeList.indexOf(gridId)] === MapUtil.getYOffset(headGridId, id) + MapUtil.getYOffset(headGridId, gridId)) {
                            if (grid.getPlaneIndex() !== this.current_selected) {
                                grid.setPlaneEnable(false);
                            } else {
                                grid.setPlaneEnable(true);
                            }
                        }
                        else {
                            grid.setNoPlaneLanding();
                        }

                    } else {
                        grid.setNoPlaneLanding();
                    }

                } else {
                    grid.setNoPlaneLanding();
                }
            }

        }


    }

    /**
     * 旋转飞机
     */
    public rotationPlane(gridId) {
        let gridView = this.gameView.gridList[gridId] as PlacingGridView;
        if (gridView.type === GridTypeEnum.MISS) {
            return;
        }
        this.current_selected = gridView.getPlaneIndex();
        let selectBodyType;
        let headGridId;
        let direction = gridView.direction;
        let bodyGrids = DirectionTypeEnum.getGridByDirection(direction);
        if (gridView.type === GridTypeEnum.BODY) {
            selectBodyType = gridView.bodyType;
            headGridId = gridId - bodyGrids[selectBodyType];
        } else {
            headGridId = gridId;
        }
        let result = MapUtil.rotationPlane(headGridId, direction);
        let rotationed = false;
        while (result.direction !== direction) {
            if (this.checkValid(result.head, result.direction)) {
                let rotationIndex = gridView.getPlaneIndex();
                this.removeOnePlane(headGridId);
                this.addOnePlane(rotationIndex, result.head, result.direction);
                rotationed = true;
                break;
            } else {
                result = MapUtil.rotationPlane(result.head, result.direction);
            }
        }
        if (!rotationed) {
            SceneManager.getInstance().showTip(i18n.getInstance().getLanguage("tip_this_place_cant_rotation"));
        }
        this.cancelSelected();
    }

    private releaseOut(e) {
        this.releaseOnePlane(this.draggingGridId, e);
    }

    /**
     * 获得飞机
     * @param grid 格子
     */
    public getPlane(grid): Array<number> {
        return [];
    }

    public getDraggingRealHead() {
        return this.selectedHead;
    }

    public set planeAmount(value) {
        this.amount = value;
    }

}