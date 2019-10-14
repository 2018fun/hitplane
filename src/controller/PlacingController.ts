/**
 * 玩家练习
 * 随机地图
 * creat by tishoy
 * 2019.4.12
 */
class PlacingController {
    private static instance: PlacingController = null;

    private homeMapData: MapData;

    constructor() {
        if (PlacingController.instance) {
            throw new Error("AIController singlon error")
        }
        this.init();
    }

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new PlacingController();
        }
        return this.instance;
    }

    private init() {

    }

    public shareMap() {
        if (this.heads === null) {
            return;
        }
        let id = MapUtil.headDataToHeadId(this.heads);
        platform.share("欢迎来打飞机", "", "", this.onShared, "mapId=" + id, "");

        SaveDataManager.getInstance().getUserData().shareMap(this.heads);
    }

    private onShared() {
        GameController.getInstance().addGas(SaveDataManager.getInstance().getUserData().gas);
    }

    private heads = null;

    public randomMap() {
        SceneManager.getInstance().placingScene.resetView();
        let mapdata = AIController.getInstance().generateRandomMap()
        this.heads = mapdata.getHeadList();
        let amount = 0;
        for (let i = 0; i < this.heads.length; i++) {
            amount++;
            SceneManager.getInstance().placingScene.addOnePlane(amount, this.heads[i].head, this.heads[i].direction);
        }
        SceneManager.getInstance().placingScene.planeAmount = amount;
    }

    public selectedSharedMap(map) {
        SceneManager.getInstance().placingScene.resetView();
        let amount = 0;
        map.headData.forEach(head => {
            amount++;
            SceneManager.getInstance().placingScene.addOnePlane(amount, head.head, head.direction);
        });

        // SceneManager.getInstance().placingScene.gameView.updateWithData(map);
        SceneManager.getInstance().placingScene.planeAmount = 3;

        SceneManager.getInstance().placingScene.msgView.shareTimes = map.getShareTimes();
    }

    public getHomeMapData(gridId) {
        return this.homeMapData.map[gridId].gridType;
    }

    public setHomeMapData(gridId, type) {
        this.homeMapData.map[gridId].gridType = type;
    }
}