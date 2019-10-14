/**
 * Created by tishoy on 15/1/31.
 * 身体枚举，需要与DirectionTypeEnum搭配使用
 */
var BodyGridEnum;
(function (BodyGridEnum) {
    BodyGridEnum.UNSET = -1;
    BodyGridEnum.BONE = 1;
    BodyGridEnum.WING = 6;
    BodyGridEnum.TAIL = 7;
    BodyGridEnum.BOTTOM = 8;
    function getType(indexOfBodyGrid) {
        if (indexOfBodyGrid <= BodyGridEnum.BONE) {
            return BodyGridEnum.BONE;
        }
        else if (indexOfBodyGrid <= BodyGridEnum.WING) {
            return BodyGridEnum.WING;
        }
        else if (indexOfBodyGrid <= BodyGridEnum.TAIL) {
            return BodyGridEnum.TAIL;
        }
        else if (indexOfBodyGrid == BodyGridEnum.BOTTOM) {
            return BodyGridEnum.BOTTOM;
        }
    }
    BodyGridEnum.getType = getType;
})(BodyGridEnum || (BodyGridEnum = {}));
