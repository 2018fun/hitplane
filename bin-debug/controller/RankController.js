var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var RankController = (function () {
    function RankController() {
        if (RankController.instance) {
            throw new Error("AIController singlon error");
        }
        this.init();
    }
    RankController.prototype.init = function () {
        // this.rank = 
    };
    RankController.getInstance = function () {
        if (this.instance === null) {
            this.instance = new RankController();
        }
        return this.instance;
    };
    RankController.prototype.randomRankData = function () {
    };
    RankController.instance = null;
    return RankController;
}());
__reflect(RankController.prototype, "RankController");
