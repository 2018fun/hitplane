/**
 *
 */
var GuideEnum;
(function (GuideEnum) {
    GuideEnum.GUIDE_TYPE_AWAY = 0;
    GuideEnum.GUIDE_TYPE_CITY = 1;
    GuideEnum.GUIDE_TYPE_PLACE = 2;
    GuideEnum.NEW_PLAYER_GUIDE = 1;
    GuideEnum.GAME_AIM = 2;
    GuideEnum.HIT_GRID = 3;
    GuideEnum.HIT_BODY = 4;
    GuideEnum.HIT_EMPTY_GOT_BULLET = 5;
    GuideEnum.GOT_BULLET = 6;
    GuideEnum.BULLET = 7;
    GuideEnum.HIT_HEAD = 8;
    GuideEnum.THREE_PLANE_GUIDE = 9;
    GuideEnum.AWAY_GUIDE_FINISHED = 10;
    // export const 
    GuideEnum.TOUCH_EVERY_WHERE = 1;
    GuideEnum.TOUCH_MAP = 2;
    GuideEnum.TOUCH_BUTTON = 3;
    GuideEnum.TOUCH_BACK = 4;
    GuideEnum.GUIDE_HELP = [GuideEnum.TOUCH_EVERY_WHERE,
        GuideEnum.TOUCH_EVERY_WHERE,
        GuideEnum.TOUCH_EVERY_WHERE,
        GuideEnum.TOUCH_MAP,
        GuideEnum.TOUCH_BUTTON,
        GuideEnum.TOUCH_EVERY_WHERE,
        GuideEnum.TOUCH_EVERY_WHERE,
        GuideEnum.TOUCH_EVERY_WHERE,
        GuideEnum.TOUCH_EVERY_WHERE,
        GuideEnum.TOUCH_EVERY_WHERE,
        GuideEnum.TOUCH_EVERY_WHERE,
        GuideEnum.TOUCH_EVERY_WHERE,
        GuideEnum.TOUCH_EVERY_WHERE,
        GuideEnum.TOUCH_EVERY_WHERE
    ];
})(GuideEnum || (GuideEnum = {}));
