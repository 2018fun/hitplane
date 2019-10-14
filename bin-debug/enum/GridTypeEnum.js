/**
 * Created by tishoy on 15/1/31.
 * 格子类型枚举
 */
var GridTypeEnum;
(function (GridTypeEnum) {
    GridTypeEnum.UNSET = -1;
    /**
      *  格子空
      */
    GridTypeEnum.MISS = 0;
    /**
      *  格子中
      */
    GridTypeEnum.BODY = 1;
    /**
      *  格子头
      */
    GridTypeEnum.HEAD = 2;
    /**
      *  宝箱    //打算设置在角落里
      */
    GridTypeEnum.GIFT = 3;
    /**
      *  金币    //打算设置在角落里
      */
    GridTypeEnum.GOLD = 4;
    /**
     * 传送点
     */
    GridTypeEnum.TELEPORT = 5;
})(GridTypeEnum || (GridTypeEnum = {}));
