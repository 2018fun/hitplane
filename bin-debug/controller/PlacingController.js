var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 玩家练习
 * 随机地图
 * creat by tishoy
 * 2019.4.12
 */
var PlacingController = (function () {
    function PlacingController() {
        this.heads = null;
        if (PlacingController.instance) {
            throw new Error("AIController singlon error");
        }
        this.init();
    }
    PlacingController.getInstance = function () {
        if (this.instance === null) {
            this.instance = new PlacingController();
        }
        return this.instance;
    };
    PlacingController.prototype.init = function () {
    };
    PlacingController.prototype.shareMap = function () {
        if (this.heads === null) {
            return;
        }
        var id = MapUtil.headDataToHeadId(this.heads);
        platform.share("欢迎来打飞机", "", "", this.onShared, "mapId=" + id, "");
        SaveDataManager.getInstance().getUserData().shareMap(this.heads);
    };
    PlacingController.prototype.onShared = function () {
        GameController.getInstance().addGas(SaveDataManager.getInstance().getUserData().gas);
    };
    PlacingController.prototype.randomMap = function () {
        SceneManager.getInstance().placingScene.resetView();
        var mapdata = AIController.getInstance().generateRandomMap();
        this.heads = mapdata.getHeadList();
        var amount = 0;
        for (var i = 0; i < this.heads.length; i++) {
            amount++;
            SceneManager.getInstance().placingScene.addOnePlane(amount, this.heads[i].head, this.heads[i].direction);
        }
        SceneManager.getInstance().placingScene.planeAmount = amount;
    };
    PlacingController.prototype.selectedSharedMap = function (map) {
        SceneManager.getInstance().placingScene.resetView();
        var amount = 0;
        map.headData.forEach(function (head) {
            amount++;
            SceneManager.getInstance().placingScene.addOnePlane(amount, head.head, head.direction);
        });
        // SceneManager.getInstance().placingScene.gameView.updateWithData(map);
        SceneManager.getInstance().placingScene.planeAmount = 3;
        SceneManager.getInstance().placingScene.msgView.shareTimes = map.getShareTimes();
    };
    PlacingController.prototype.getHomeMapData = function (gridId) {
        return this.homeMapData.map[gridId].gridType;
    };
    PlacingController.prototype.setHomeMapData = function (gridId, type) {
        this.homeMapData.map[gridId].gridType = type;
    };
    PlacingController.instance = null;
    return PlacingController;
}());
__reflect(PlacingController.prototype, "PlacingController");
