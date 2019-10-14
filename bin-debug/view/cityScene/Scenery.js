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
 * 风景
 */
var Scenery = (function (_super) {
    __extends(Scenery, _super);
    function Scenery() {
        return _super.call(this) || this;
    }
    Scenery.prototype.update = function (texture) {
        this.texture = texture;
    };
    return Scenery;
}(egret.Bitmap));
__reflect(Scenery.prototype, "Scenery");
