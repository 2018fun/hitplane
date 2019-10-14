var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var BulletDataCache = (function () {
    function BulletDataCache() {
        this.bulletDatas = [];
        this.intiData();
    }
    BulletDataCache.getInstance = function () {
        if (this.instance === null) {
            this.instance = new BulletDataCache();
        }
        return this.instance;
    };
    BulletDataCache.prototype.intiData = function () {
        this.parseData(RES.getRes("bullet_json"));
    };
    BulletDataCache.prototype.parseData = function (bulletData) {
        var bullet;
        var bulletListData = bulletData.bullet;
        for (var i = 0; i < bulletListData; i++) {
            bullet = new BulletData(bulletListData[i]);
            this.bulletDatas.push(bullet);
        }
    };
    BulletDataCache.prototype.getBulletData = function (type) {
        return this.bulletDatas[type];
    };
    BulletDataCache.instance = null;
    return BulletDataCache;
}());
__reflect(BulletDataCache.prototype, "BulletDataCache");
