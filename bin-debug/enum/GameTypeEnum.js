/**
 * 游戏类型
 */
var GameTypeEnum;
(function (GameTypeEnum) {
    // 未开启地图
    GameTypeEnum.GAME_TYPE_IDLE = 0;
    // 放置飞机
    GameTypeEnum.GAME_TYPE_MAPING = 1;
    GameTypeEnum.GAME_TYPE_HITTING = 2;
    GameTypeEnum.GAME_TYPE_DOUBLE_HITTING = 3;
    GameTypeEnum.GAME_TYPE_GUIDE = 4;
})(GameTypeEnum || (GameTypeEnum = {}));
