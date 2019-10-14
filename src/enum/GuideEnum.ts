/**
 * 
 */
module GuideEnum {
    export const GUIDE_TYPE_AWAY = 0;
    export const GUIDE_TYPE_CITY = 1;
    export const GUIDE_TYPE_PLACE = 2;

    export const NEW_PLAYER_GUIDE = 1;
    export const GAME_AIM = 2;
    export const HIT_GRID = 3;
    export const HIT_BODY = 4;
    export const HIT_EMPTY_GOT_BULLET = 5;
    export const GOT_BULLET = 6;
    export const BULLET = 7;
    export const HIT_HEAD = 8;
    export const THREE_PLANE_GUIDE = 9;
    export const AWAY_GUIDE_FINISHED = 10;
    // export const 

    export const TOUCH_EVERY_WHERE = 1;
    export const TOUCH_MAP = 2;
    export const TOUCH_BUTTON = 3;
    export const TOUCH_BACK = 4;
    export const GUIDE_HELP = [TOUCH_EVERY_WHERE,
        TOUCH_EVERY_WHERE,
        TOUCH_EVERY_WHERE,
        TOUCH_MAP,
        TOUCH_BUTTON,
        TOUCH_EVERY_WHERE,
        TOUCH_EVERY_WHERE,
        TOUCH_EVERY_WHERE,
        TOUCH_EVERY_WHERE,
        TOUCH_EVERY_WHERE,
        TOUCH_EVERY_WHERE,
        TOUCH_EVERY_WHERE,
        TOUCH_EVERY_WHERE,
        TOUCH_EVERY_WHERE
    ];

}