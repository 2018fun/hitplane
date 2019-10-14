var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var SignTypeEnum = (function () {
    function SignTypeEnum() {
    }
    /**
     * 未做标记
     */
    SignTypeEnum.UNSIGN = -1;
    /**
     *  格子空
     */
    SignTypeEnum.MISS = 0;
    /**
      *  格子中
      */
    SignTypeEnum.BODY = 1;
    /**
      *  格子头
      */
    SignTypeEnum.HEAD = 2;
    return SignTypeEnum;
}());
__reflect(SignTypeEnum.prototype, "SignTypeEnum");
