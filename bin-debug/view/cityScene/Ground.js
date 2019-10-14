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
var Ground = (function (_super) {
    __extends(Ground, _super);
    function Ground(position) {
        var _this = _super.call(this) || this;
        _this.stars = [];
        _this.starPos = [
            [{ x: 0, y: -100, rotation: 0 }],
            [{ x: -15, y: -100, rotation: 0 }, { x: 15, y: -100, rotation: 0 }],
            [{ x: -30, y: -100, rotation: -10 }, { x: 0, y: -105, rotation: 0 }, { x: 30, y: -100, rotation: 10 }],
            [{ x: -30, y: -100, rotation: -15 }, { x: -10, y: -105, rotation: -5 }, { x: 10, y: -105, rotation: 5 }, { x: 30, y: -100, rotation: 15 }],
            [{ x: -40, y: -90, rotation: -40 }, { x: -20, y: -100, rotation: -10 }, { x: 0, y: -105, rotation: 0 }, { x: 20, y: -100, rotation: 10 }, { x: 40, y: -90, rotation: 40 }]
        ];
        _this._position = position;
        _this.initView();
        return _this;
    }
    Ground.prototype.initView = function () {
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
        var star;
        for (var i = 0; i < 5; i++) {
            star = new egret.Bitmap();
            star.texture = RES.getRes("star_png");
            star.anchorOffsetX = star.width / 2;
            star.anchorOffsetY = star.height / 2;
            star.scaleX = star.scaleY = 0.2;
            this.stars.push(star);
        }
        this.updateView();
    };
    Ground.prototype.updateView = function () {
        if (CityController.getInstance().isProtected(this.position)) {
            this.protectedView.visible = true;
        }
        else {
            this.protectedView.visible = false;
        }
        this.levelStars.removeChildren();
        for (var i = 0; i < this.level; i++) {
            this.stars[i].x = this.starPos[this.level - 1][i].x;
            this.stars[i].y = this.starPos[this.level - 1][i].y;
            this.stars[i].rotation = this.starPos[this.level - 1][i].rotation;
            this.levelStars.addChild(this.stars[i]);
        }
        // this.buildingView.gotoAndStop(this.buildingLevel * 9);
        // this.buildingView.gotoAndStop(1);
    };
    Object.defineProperty(Ground.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    Ground.prototype.setBuilding = function (id, level) {
        if (id === -1) {
            this.updateView();
            return;
        }
        if (this.buildingId === id && this.buildingLevel === level) {
            this.updateView();
            return;
        }
        if (id !== this.buildingId) {
            var namePrefix = BuildingEnum.buildingString[id];
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
    };
    Ground.prototype.levelUp = function () {
        this.buildingLevel++;
        this.updateView();
    };
    Ground.prototype.demolish = function () {
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
    };
    Ground.prototype.destroy = function () {
    };
    Object.defineProperty(Ground.prototype, "id", {
        get: function () {
            return this.buildingId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ground.prototype, "level", {
        get: function () {
            return this.buildingLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ground.prototype, "selected", {
        set: function (value) {
            this._selected = value;
            if (value) {
                DrawUtil.setImageColor(this.bgView, 0xdd33dd);
            }
            else {
                DrawUtil.setImageColor(this.bgView, 0xffffff);
            }
        },
        enumerable: true,
        configurable: true
    });
    return Ground;
}(egret.Sprite));
__reflect(Ground.prototype, "Ground");
