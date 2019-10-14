/**
 * 建筑物面板
 */
class BuildingPop extends egret.Sprite {
    constructor(id) {
        super();
        this.buildingId = id;
        this.initView();
    }

    private buildingId;

    private panelBg;
    private buildingView;
    private buildingName;
    private buildingDesc;
    private levelUpCost;

    private initView() {

    }

    private updateView() {

    }

    // private 

    public setBuildingId(id) {
        this.buildingId = id;
    }
}