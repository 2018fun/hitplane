/**
 * 
 */
class AdvertiseCompanyData extends BuildingBase {

    public earn;
    public appear;

    constructor(data) {
        super();
        this.id = BuildingEnum.ADVERTISE_COMPANY;
        this.level = data.level;
        this.cost = data.cost;
        this.name = data.name;
        this.view = data.view;
        this.desc = data.desc;
        this.appear = data.appear;
        this.earn = data.earn;
    }
}