/**
 * 
 */
class BankData extends BuildingBase {

    public game_reward;
    public chest_reward;
    public vedio_reward;

    constructor(data) {
        super();
        this.id = BuildingEnum.BANK;
        this.level = data.level;
        this.cost = data.cost;
        this.name = data.name;
        this.view = data.view;
        this.desc = data.desc;
        this.game_reward = data.game_reward;
        this.chest_reward = data.chest_reward;
        this.vedio_reward = data.vedio_reward;
    }
}