var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 子弹控制
 * created ty tishoy
 */
var BulletController = (function () {
    function BulletController() {
        this.bulletList = [];
        this.storedBullet = null;
        if (BulletController.instance) {
            throw new Error("AIController singlon error");
        }
    }
    BulletController.getInstance = function () {
        if (this.instance === null) {
            this.instance = new BulletController();
        }
        return this.instance;
    };
    BulletController.prototype.resetBullets = function () {
        this.bulletList = [];
        this.storedBullet = null;
        for (var i = 0; i < 3; i++) {
            this.bulletList.push(this.randomOneBullet());
        }
    };
    // public useStoredBullet() {
    //     return this.storedBullet;
    // }
    BulletController.prototype.getCurrentBullet = function () {
        return this.bulletList[0];
    };
    BulletController.prototype.useBullet = function () {
        platform.analytics("useBullet", { bullet: this.bulletList[0] });
        return this.bulletList.shift();
    };
    BulletController.prototype.rewardOneBullet = function (bulletType) {
        this.bulletList.unshift(bulletType);
    };
    BulletController.prototype.rewardBullet = function (bulletType) {
        this.bulletList.unshift(bulletType);
        GameController.getInstance().startAttackPhase();
    };
    BulletController.prototype.prepareNextBullet = function () {
        this.randomNextBullet();
        SceneManager.getInstance().awayScene.updateBullets();
        GameController.getInstance().startAttackPhase();
    };
    BulletController.prototype.randomOneBullet = function () {
        // 根据用户的弹药工厂随机
        var scienceData = CityController.getInstance().getAllBuildingsByType(BuildingEnum.BULLET_SCIENCE);
        var topScience = CityController.getInstance().getTopLevel(BuildingEnum.BULLET_SCIENCE);
        var bullet = BulletTypeEnum.MISSILE;
        // let 
        // TODO
        if (topScience === 0) {
            return bullet;
        }
        else {
            var data = void 0;
            var rate = void 0;
            for (var i = 0; i < scienceData.length; i++) {
                data = scienceData[i];
                rate = data.then;
                if (RecordController.getInstance().getHitRecorded().length < data.first_num) {
                    rate = data.first;
                }
                if (Math.random() < rate) {
                    bullet = data.bullets[Math.floor(Math.random() * data.bullets.length)];
                    break;
                }
            }
        }
        return bullet;
    };
    BulletController.prototype.randomNextBullet = function () {
        this.bulletList.push(this.randomOneBullet());
    };
    BulletController.prototype.switchBullet = function () {
        if (this.storedBullet === null) {
            this.storeCurrentBullet();
        }
        else {
            var temp = this.bulletList.shift();
            this.bulletList.unshift(this.storedBullet);
            this.storedBullet = temp;
        }
    };
    BulletController.prototype.storeCurrentBullet = function () {
        this.storedBullet = this.bulletList.shift();
        this.randomNextBullet();
    };
    Object.defineProperty(BulletController.prototype, "stored", {
        get: function () {
            return this.storedBullet;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BulletController.prototype, "bullets", {
        get: function () {
            // if (this.bulletList.length === 0) {
            //     this.resetBullets();
            // }
            console.log(this.bulletList);
            return this.bulletList;
        },
        enumerable: true,
        configurable: true
    });
    BulletController.prototype.getIsLocked = function (type) {
        if (type === BulletTypeEnum.MISSILE) {
            return true;
        }
        var bullets = BuildingDataCache.getInstance().getBulletScienceByLevel(CityController.getInstance().getTopLevel(BuildingEnum.BULLET_SCIENCE)).bullets;
        if (bullets.indexOf(type) !== -1) {
            return true;
        }
        return false;
    };
    BulletController.instance = null;
    return BulletController;
}());
__reflect(BulletController.prototype, "BulletController");
