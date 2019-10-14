var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 *
 */
var PerfectMapData = (function (_super) {
    __extends(PerfectMapData, _super);
    function PerfectMapData() {
        var _this = _super.call(this) || this;
        _this.numPlane = 3;
        return _this;
    }
    PerfectMapData.prototype.setPlaneByHeadData = function () {
        if (this.headList.length === 3) {
            for (var i = 0; i < this.headList.length; i++) {
                this.setPlaneGridByHead(this.headList[i].head, this.headList[i].direction);
            }
        }
        else {
            throw new Error("headDataError");
        }
    };
    return PerfectMapData;
}(MapData));
__reflect(PerfectMapData.prototype, "PerfectMapData");
