/**
 * 
 */
class OpponentData {
    public playerName;
    public city_score;
    public level;
    public rank;
    public distance;
    public gold;

    constructor(data) {
        this.playerName = data.playerName;
        this.level = data.level;
        this.rank = data.rank;
        this.city_score = data.city_score;
        this.distance = data.distance;
        this.gold = data.gold;
    }
}