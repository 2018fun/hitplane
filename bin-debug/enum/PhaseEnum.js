var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PhaseEnum = (function () {
    function PhaseEnum() {
    }
    /**
     * 战斗准备
     */
    PhaseEnum.PREPARE_PHASE = 0;
    /**
     * 我方攻击
     */
    PhaseEnum.ATTACK_PHASE = 1;
    /**
     * 显示结果
     */
    PhaseEnum.RESULT_PHASE = 2;
    /**
     * 炮弹清算
     */
    PhaseEnum.END_PHASE = 3;
    /**
     * 战斗清算
     */
    PhaseEnum.OVER_PHASE = 4;
    return PhaseEnum;
}());
__reflect(PhaseEnum.prototype, "PhaseEnum");
