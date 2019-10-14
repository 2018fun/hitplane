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
var CityView = (function (_super) {
    __extends(CityView, _super);
    function CityView() {
        var _this = _super.call(this) || this;
        _this.addSequence = [6, 1, 5, 0, 2, 4, 3];
        _this.groundX = [0, 100, 200, 100, -100, -200, -100];
        _this.groundY = [0, -160, 0, 160, 160, 0, -160];
        _this.groundList = new Array();
        _this.initView();
        return _this;
    }
    CityView.prototype.initView = function () {
        this.currentSelect = null;
        this.bg = new egret.Bitmap();
        this.bg.texture = RES.getRes("city_bg_png");
        this.bg.scaleX = this.bg.scaleY = 0.5;
        this.bg.anchorOffsetX = this.bg.width / 2;
        this.bg.anchorOffsetY = this.bg.height / 2;
        // this.bg.anchorOffsetY 
        this.bg.x = AdaptSceenUtil.curWidth() / 2;
        this.bg.y = AdaptSceenUtil.curHeight() / 2;
        // this.addChild(this.bg);
        var ground;
        this.groundList.length = 7;
        // let centerX = 0;
        // let centerY = 0;
        this.centerX = AdaptSceenUtil.curWidth() / 2;
        this.centerY = AdaptSceenUtil.curHeight() / 2;
        var pillar;
        var cityData = CityController.getInstance().getBuildings();
        for (var i = 0; i < this.addSequence.length; i++) {
            ground = new Ground(this.addSequence[i]);
            ground.x = this.centerX + this.groundX[this.addSequence[i]];
            ground.y = this.centerY + this.groundY[this.addSequence[i]];
            ground.touchEnabled = true;
            pillar = new egret.Bitmap();
            pillar.texture = RES.getRes("pillar_png");
            pillar.anchorOffsetX = pillar.width / 2;
            pillar.scaleX = 0.3;
            pillar.scaleY = 0.3;
            pillar.x = ground.x;
            pillar.y = ground.y - ground.height / 2;
            this.addChild(pillar);
            this.addChild(ground);
            this.groundList[this.addSequence[i]] = ground;
            if (cityData[this.addSequence[i]] === null) {
                continue;
            }
            ground.setBuilding(cityData[this.addSequence[i]].id, cityData[this.addSequence[i]].level);
        }
        this.anchorOffsetX = this.centerX;
        this.anchorOffsetY = this.centerY;
        this.x = AdaptSceenUtil.curWidth() / 2;
        this.y = AdaptSceenUtil.curHeight() / 2;
        this.addBuildingTouchEventListener();
    };
    CityView.prototype.addBuildingTouchEventListener = function () {
        for (var i = 0; i < this.groundList.length; i++) {
            this.groundList[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.groundTouched, this);
            this.groundList[i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.groundTouchBegin, this);
        }
    };
    CityView.prototype.removeBuildingTouchEventListener = function () {
        for (var i = 0; i < this.groundList.length; i++) {
            this.groundList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.groundTouched, this);
            this.groundList[i].removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.groundTouchBegin, this);
        }
    };
    CityView.prototype.updateView = function (position) {
        if (position === void 0) { position = null; }
        if (position === null) {
            var cityData = CityController.getInstance().getBuildings();
            for (var i = 0; i < Const.getInstance().maxBuilding; i++) {
                this.groundList[i].setBuilding(cityData[i].id, cityData[i].level);
            }
        }
        else {
            var cityData = CityController.getInstance().getBuildings();
            this.groundList[position].setBuilding(cityData[position].id, cityData[position].level);
        }
    };
    CityView.prototype.groundTouchBegin = function (e) {
        this.removeBuildingTouchEventListener();
        this.longTouchTime = new Date().getTime();
        var ground = e.target;
        // if (this.currentSelect === ground.position) {
        //     return;
        // }
        // CityController.getInstance().selectPosition(ground.position);
        this.currentLongTouch = ground;
        // e.target.scaleX = e.target.scaleY = 0.8;
        e.target.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        e.target.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    CityView.prototype.touchMove = function (e) {
    };
    CityView.prototype.touchEnd = function (e) {
        e.target.scaleX = e.target.scaleY = 0.8;
        egret.Tween.get(e.target).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.bounceOut);
        this.addBuildingTouchEventListener();
        var time = new Date().getTime();
        if (time - this.longTouchTime < 1500) {
            return;
        }
        // this.closeUp(this.currentLongTouch.position);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    CityView.prototype.groundTouched = function (e) {
        var ground = e.target;
        // if (this.currentSelect === ground.position) {
        //     return;
        // }
        CityController.getInstance().selectPosition(ground.position);
    };
    CityView.prototype.closeUp = function (position) {
        egret.Tween.get(this, { loop: false }).to({ x: this.centerX - 2 * this.groundX[position], y: this.centerY - 2 * this.groundY[position], scaleX: 2, scaleY: 2 }, 1500);
    };
    CityView.prototype.updateSelected = function (position) {
        if (this.currentSelect !== null) {
            this.groundList[this.currentSelect].selected = false;
        }
        this.currentSelect = position;
        this.groundList[position].selected = true;
    };
    CityView.prototype.build = function (building) {
        this.groundList[this.currentSelect].setBuilding(building.id, 1);
    };
    CityView.prototype.demolish = function () {
        this.groundList[this.currentSelect].demolish();
    };
    CityView.prototype.levelUp = function () {
        this.groundList[this.currentSelect].levelUp();
    };
    return CityView;
}(egret.Sprite));
__reflect(CityView.prototype, "CityView");
