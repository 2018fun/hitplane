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
 * 飞行站
 */
var AirPort = (function (_super) {
    __extends(AirPort, _super);
    function AirPort(level) {
        if (level === void 0) { level = 1; }
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.update(RES.getRes("city" + 1 + "_sheet").getTexture("building" + 1 + "_" + level));
        return _this;
    }
    AirPort.prototype.update = function (texture) {
        this.texture = texture;
    };
    return AirPort;
}(egret.Bitmap));
__reflect(AirPort.prototype, "AirPort");
