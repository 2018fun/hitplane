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
 * 科学院
 */
var Science = (function (_super) {
    __extends(Science, _super);
    function Science() {
        return _super.call(this) || this;
    }
    Science.prototype.update = function (texture) {
        this.texture = texture;
    };
    return Science;
}(egret.Bitmap));
__reflect(Science.prototype, "Science");
