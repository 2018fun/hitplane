/**
 * 
 */
class InsureCompanyData extends BuildingBase {
    public duration: number;
    public building: number;
    public paid: number;
    constructor(data) {
        super();
        this.id = BuildingEnum.INSURE_COMPANY;
        this.level = data.level;
        this.cost = data.cost;
        this.name = data.name;
        this.view = data.view;
        this.desc = data.desc;
        this.duration = data.duration;
        this.building = data.building;
        this.paid = data.paid;
    }
}