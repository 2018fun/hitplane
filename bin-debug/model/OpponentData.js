var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var OpponentData = (function () {
    function OpponentData(data) {
        this.playerName = data.playerName;
        this.level = data.level;
        this.rank = data.rank;
        this.city_score = data.city_score;
        this.distance = data.distance;
        this.gold = data.gold;
    }
    return OpponentData;
}());
__reflect(OpponentData.prototype, "OpponentData");
