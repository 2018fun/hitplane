/**
 * 
 */
class GasStationData extends BuildingBase {

    public mph: number;
    public max: number;

    constructor(data) {
        super();
        this.id = BuildingEnum.GAS_STATION;
        this.level = data.level;
        this.cost = data.cost;
        this.name = data.name;
        this.view = data.view;
        this.desc = data.desc;
        this.level = data.level;
        this.mph = data.mph;
        this.max = data.max;
    }

}