/**
 * 
 */
class DefenseData extends BuildingBase {
    public missle: number;
    constructor(data) {
        super();
        this.id = BuildingEnum.DEFENSE;
        this.level = data.level;
        this.cost = data.cost;
        this.name = data.name;
        this.view = data.view;
        this.desc = data.desc;
        this.missle = data.missle;
    }
}