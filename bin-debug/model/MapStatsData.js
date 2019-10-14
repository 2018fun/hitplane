var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var MapStatsData = (function () {
    // public 
    // public design:;
    function MapStatsData(data) {
        this.id = data.id;
        this.heads = data.heads;
        this.attacted = data.attacted;
    }
    return MapStatsData;
}());
__reflect(MapStatsData.prototype, "MapStatsData");
