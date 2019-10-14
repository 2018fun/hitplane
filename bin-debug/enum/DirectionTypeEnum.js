/**
 * Created by tishoy on 15/1/31.
 * 方向枚举
 * 通过方向获取身体位置
 */
var DirectionTypeEnum;
(function (DirectionTypeEnum) {
    DirectionTypeEnum.DIRECTION_LIST = [27, -3, -27, 3];
    /**
     * 错误
     */
    DirectionTypeEnum.ERROR = -2;
    /**
     * 未设置
     */
    DirectionTypeEnum.UNSET = -1;
    /**
      *  上
      */
    DirectionTypeEnum.UP = 0;
    /**
      *  右
      */
    DirectionTypeEnum.RIGHT = 1;
    /**
      *  下
      */
    DirectionTypeEnum.DOWN = 2;
    /**
      *  左
      */
    DirectionTypeEnum.LEFT = 3;
    /**
     * 添加飞机斜向 未确定
     */
    DirectionTypeEnum.UNCERTAIN = 4;
    DirectionTypeEnum.DIRECTION_LETTER = ["U", "R", "D", "L"];
    /**
      * 增加称号功能后，此处飞机身体数组顺序不可改变
      */
    function getGridByDirection(direction) {
        switch (direction) {
            case DirectionTypeEnum.UP:
                return [9, 18, 7, 8, 10, 11, 26, 28, 27];
            case DirectionTypeEnum.RIGHT:
                return [-1, -2, -19, -10, 8, 17, -12, 6, -3];
            case DirectionTypeEnum.DOWN:
                return [-9, -18, -7, -8, -10, -11, -26, -28, -27];
            case DirectionTypeEnum.LEFT:
                return [1, 2, 19, 10, -8, -17, 12, -6, 3];
            default:
                console.log("direction error");
                return [];
        }
    }
    DirectionTypeEnum.getGridByDirection = getGridByDirection;
    /**
     * 包括头
     * @param direction 方向
     */
    function getRowFromHeadByDirection(direction) {
        switch (direction) {
            case DirectionTypeEnum.UP:
                return [0, 1, 2, 1, 1, 1, 1, 3, 3, 3];
            case DirectionTypeEnum.RIGHT:
                return [0, 0, 0, -2, -1, 1, 2, -1, 1, 0];
            case DirectionTypeEnum.DOWN:
                return [0, -1, -2, -1, -1, -1, -1, -3, -3, -3];
            case DirectionTypeEnum.LEFT:
                return [0, 0, 0, 2, 1, -1, -2, 1, -1, 0];
            default:
                console.log("direction error");
                return [];
        }
    }
    DirectionTypeEnum.getRowFromHeadByDirection = getRowFromHeadByDirection;
})(DirectionTypeEnum || (DirectionTypeEnum = {}));
