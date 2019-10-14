/**
 * 
 */
class AirportData extends BuildingBase {

    public opponent;
    public opponent_level;


    constructor(data) {
        super();
        this.id = BuildingEnum.AIRPORT;
        this.level = data.level;
        this.cost = data.cost;
        this.name = data.name;
        this.view = data.view;
        this.desc = data.desc;
        this.opponent = data.opponent;
        this.opponent_level = data.opponent_level;
    }
}