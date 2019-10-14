/**
 * 
 */
class RepairFactoryData extends BuildingBase {
    public repair_cost: number;
    constructor(data) {
        super();
        this.id = BuildingEnum.REPAIR_FACTORY;
        this.level = data.level;
        this.cost = data.cost;
        this.name = data.name;
        this.view = data.view;
        this.desc = data.desc;
        this.repair_cost = data.missle;
    }
}