var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 广告组件
 * 随机地图
 * creat by tishoy
 * 2019.10.3
 */
var AdvertiseController = (function () {
    function AdvertiseController() {
        if (AdvertiseController.instance) {
            throw new Error("AdvertiseController singlon error");
        }
        this.init();
    }
    AdvertiseController.prototype.init = function () {
    };
    AdvertiseController.getInstance = function () {
        if (this.instance === null) {
            this.instance = new AdvertiseController();
        }
        return this.instance;
    };
    AdvertiseController.instance = null;
    return AdvertiseController;
}());
__reflect(AdvertiseController.prototype, "AdvertiseController");
