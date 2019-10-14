var AdaptSceenUtil;
(function (AdaptSceenUtil) {
    function factor() {
        return egret.MainContext.instance.stage.stageWidth / 640;
    }
    AdaptSceenUtil.factor = factor;
    function wDivideH() {
        return egret.MainContext.instance.stage.stageHeight / egret.MainContext.instance.stage.stageWidth;
    }
    AdaptSceenUtil.wDivideH = wDivideH;
    function designWDivideH() {
        return 640 / 1136;
    }
    AdaptSceenUtil.designWDivideH = designWDivideH;
    function x_fix() {
        return (egret.MainContext.instance.stage.stageWidth - 640) / 2;
    }
    AdaptSceenUtil.x_fix = x_fix;
    function y_fix() {
        return (egret.MainContext.instance.stage.stageHeight - 1136) / 2;
    }
    AdaptSceenUtil.y_fix = y_fix;
    function gameStage() {
        return egret.MainContext.instance.stage;
    }
    AdaptSceenUtil.gameStage = gameStage;
    //当前游戏宽度
    function curWidth() {
        return egret.MainContext.instance.stage.stageWidth;
    }
    AdaptSceenUtil.curWidth = curWidth;
    //当前游戏宽度
    function curHeight() {
        return egret.MainContext.instance.stage.stageHeight;
    }
    AdaptSceenUtil.curHeight = curHeight;
    function displayWidth() {
        return 640;
    }
    AdaptSceenUtil.displayWidth = displayWidth;
    function displayHeight() {
        return 1136;
    }
    AdaptSceenUtil.displayHeight = displayHeight;
    function scaleMode() {
        return egret.MainContext.instance.stage.scaleMode;
    }
    AdaptSceenUtil.scaleMode = scaleMode;
    function loopPlay(mc, from, to) {
        if (from === void 0) { from = 1; }
        if (to === void 0) { to = 0; }
        if (to === 0) {
            to = mc.totalFrames;
        }
        if (mc.currentFrame < from || mc.currentFrame >= to) {
            mc.gotoAndStop(from);
        }
        else {
            mc.nextFrame();
        }
    }
    AdaptSceenUtil.loopPlay = loopPlay;
    function singletonPush(ary, data) {
        if (ary.indexOf(data) === -1) {
            ary.push(data);
        }
    }
    AdaptSceenUtil.singletonPush = singletonPush;
    function E8ScaleMode() {
        /**
          * 长宽适配方案
          */
        if (AdaptSceenUtil.curWidth() >= AdaptSceenUtil.displayWidth() && AdaptSceenUtil.curHeight() >= AdaptSceenUtil.displayHeight()) {
            egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
        }
        else {
            if (AdaptSceenUtil.curWidth() / AdaptSceenUtil.curHeight() < AdaptSceenUtil.displayWidth() / AdaptSceenUtil.displayHeight()) {
                egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            }
            else {
                egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            }
        }
    }
    AdaptSceenUtil.E8ScaleMode = E8ScaleMode;
})(AdaptSceenUtil || (AdaptSceenUtil = {}));
