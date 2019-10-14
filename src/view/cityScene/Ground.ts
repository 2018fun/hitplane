/**
 * 
 */
class Ground extends egret.Sprite {
    constructor(position) {
        super();
        this._position = position;
        this.initView();
    }

    private _selected: boolean;
    private bgView: egret.Bitmap;
    private buildingId: number;
    private buildingLevel: number;
    private _position: number;
    // private buildingView: egret.MovieClip;
    private buildingView: egret.Bitmap;
    private levelStars: egret.Sprite;
    private stars = [];
    private protectedView: egret.Bitmap;
    private selectedView: egret.Bitmap;

    private mcFactory: egret.MovieClipDataFactory;
    private starPos = [
        [{ x: 0, y: -100, rotation: 0 }],
        [{ x: -15, y: -100, rotation: 0 }, { x: 15, y: -100, rotation: 0 }],
        [{ x: -30, y: -100, rotation: -10 }, { x: 0, y: -105, rotation: 0 }, { x: 30, y: -100, rotation: 10 }],
        [{ x: -30, y: -100, rotation: -15 }, { x: -10, y: -105, rotation: -5 }, { x: 10, y: -105, rotation: 5 }, { x: 30, y: -100, rotation: 15 }],
        [{ x: -40, y: -90, rotation: -40 }, { x: -20, y: -100, rotation: -10 }, { x: 0, y: -105, rotation: 0 }, { x: 20, y: -100, rotation: 10 }, { x: 40, y: -90, rotation: 40 }]
    ]

    private initView() {
        this.bgView = new egret.Bitmap();
        this.bgView.texture = RES.getRes("ground_png");
        this.bgView.anchorOffsetX = this.bgView.width / 2;
        this.bgView.anchorOffsetY = this.bgView.height / 2;
        this.bgView.scaleX = this.bgView.scaleY = 0.3;
        this.bgView.alpha = 1;
        this.addChild(this.bgView);

        // this.buildingView = new egret.MovieClip();
        // this.buildingView.touchEnabled = false;
        // this.buildingView.stop();

        this.buildingView = new egret.Bitmap();

        // this.buildingViewPng.x = this.bgView.x;
        // this.buildingViewPng.y = this.bgView.y + this.bgView.height - this.buildingViewPng.height;
        this.addChild(this.buildingView);

        this.selectedView = new egret.Bitmap();
        this.selectedView.texture = RES.getRes("selected_png");
        this.selectedView.anchorOffsetX = this.bgView.width / 2;
        this.selectedView.anchorOffsetY = this.bgView.height / 2;
        this.selectedView.scaleX = this.selectedView.scaleY = 0.3;
        this.addChild(this.selectedView);


        this.protectedView = new egret.Bitmap();
        this.protectedView.texture = RES.getRes("protect_png");
        this.protectedView.anchorOffsetX = this.protectedView.width / 2;
        this.protectedView.anchorOffsetY = this.protectedView.height / 2;
        this.protectedView.scaleX = this.protectedView.scaleY = 0.3;
        this.addChild(this.protectedView);

        this.levelStars = new egret.Sprite();
        this.addChild(this.levelStars);

        let star;
        for (let i = 0; i < 5; i++) {
            star = new egret.Bitmap();
            star.texture = RES.getRes("star_png");
            star.anchorOffsetX = star.width / 2;
            star.anchorOffsetY = star.height / 2;
            star.scaleX = star.scaleY = 0.2;
            this.stars.push(star)
        }


        this.updateView();

    }

    private updateView() {
        if (CityController.getInstance().isProtected(this.position)) {
            this.protectedView.visible = true;
        } else {
            this.protectedView.visible = false;
        }

        this.levelStars.removeChildren();
        for (let i = 0; i < this.level; i++) {
            this.stars[i].x = this.starPos[this.level - 1][i].x;
            this.stars[i].y = this.starPos[this.level - 1][i].y;
            this.stars[i].rotation = this.starPos[this.level - 1][i].rotation;
            this.levelStars.addChild(this.stars[i]);
        }
        // this.buildingView.gotoAndStop(this.buildingLevel * 9);
        // this.buildingView.gotoAndStop(1);
    }

    public get position() {
        return this._position;
    }

    public setBuilding(id, level) {
        if (id === -1) {
            this.updateView();
            return;
        }
        if (this.buildingId === id && this.buildingLevel === level) {
            this.updateView();
            return;
        }
        if (id !== this.buildingId) {
            let namePrefix = BuildingEnum.buildingString[id];
            // let build_data = RES.getRes(namePrefix + "_json");
            // let build_image = RES.getRes(namePrefix + "_png");
            // this.mcFactory = new egret.MovieClipDataFactory(build_data, build_image);
            // this.buildingView.movieClipData = this.mcFactory.generateMovieClipData(namePrefix);
            // this.addChild(this.buildingView);
            this.buildingView.texture = RES.getRes("view_" + namePrefix + "_png");
            this.buildingView.anchorOffsetX = this.buildingView.width / 2;
            this.buildingView.anchorOffsetY = this.buildingView.height / 2;
            this.buildingView.scaleX = this.buildingView.scaleY = 0.3;
        }
        this.buildingId = id;
        this.buildingLevel = level;
        this.updateView();
    }


    public levelUp() {
        this.buildingLevel++;
        this.updateView();
    }

    public demolish() {
        this.buildingId = -1;
        this.buildingLevel = 0;
        this.buildingView.texture = null;
        this.updateView();
        // this.buildingView.movieClipData = null;
        // this.buildingView.gotoAndStop(1);
        // if (this.contains(this.buildingView)) {
        //     this.removeChild(this.buildingView);
        // }
        // CityController.getInstance().selectPosition(this.position);
    }

    public destroy() {

    }

    public get id() {
        return this.buildingId;
    }

    public get level() {
        return this.buildingLevel;
    }

    public set selected(value) {
        this._selected = value;
        if (value) {
            DrawUtil.setImageColor(this.bgView, 0xdd33dd);
        } else {
            DrawUtil.setImageColor(this.bgView, 0xffffff);
        }
    }
}