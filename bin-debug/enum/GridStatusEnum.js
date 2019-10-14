/**
 * 格子状态
 */
var GridStatusEnum;
(function (GridStatusEnum) {
    /**
      *  覆盖
      */
    GridStatusEnum.COVER = 0;
    /**
      *  隐形 被探知，未被击中
      */
    GridStatusEnum.KNOWN = 1;
    /**
     * 展示
     */
    GridStatusEnum.SHOW = 2;
    /**
     * 始终不显示
     */
    GridStatusEnum.UNSHOW = 3;
})(GridStatusEnum || (GridStatusEnum = {}));
