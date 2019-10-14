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
 * E8Button类
 */
var E8TextButton = (function (_super) {
    __extends(E8TextButton, _super);
    function E8TextButton(context, texture, backFun) {
        if (backFun === void 0) { backFun = null; }
        return _super.call(this, context, texture, backFun) || this;
    }
    E8TextButton.prototype.scale = function (scaleX, scaleY) {
        // let rect = new egret.Rectangle(30, 51, 150, 105);
        // this.btnImg.scale9Grid = rect;
        this.btnImg.width = this.btnImg.width * scaleX;
        this.btnImg.height = this.btnImg.height * scaleY;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    E8TextButton.prototype.setButtonText = function (textContent, fixX, texture) {
        if (fixX === void 0) { fixX = 0; }
        if (texture === void 0) { texture = ""; }
        if (texture !== "") {
            var bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes(texture);
            // bitmap.x = 
            this.addChild(bitmap);
        }
        var effect = DrawUtil.textFilter(textContent);
        // effect.anchorOffsetX = effect.width / 2;
        // effect.anchorOffsetY = effect.height / 2;
        effect.x = this.width / 2 + fixX;
        effect.y = this.height / 2;
        this.addChild(effect);
    };
    E8TextButton.prototype.setButtonEnable = function (texture, backFun) {
        this.changeTexture(texture);
        this.backFun = backFun;
    };
    return E8TextButton;
}(E8Button));
__reflect(E8TextButton.prototype, "E8TextButton");
