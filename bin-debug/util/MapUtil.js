/**
 *
 */
var MapUtil;
(function (MapUtil) {
    function getDirection(grid1Id, grid2Id) {
        if (grid1Id === grid2Id) {
            return DirectionTypeEnum.UNSET;
        }
        var grid1XY = getXYFromValue(grid1Id);
        var grid2XY = getXYFromValue(grid2Id);
        if (Math.abs(grid1XY.x - grid2XY.x) - Math.abs(grid1XY.y - grid2XY.y) > 0) {
            if (grid1XY.x - grid2XY.x > 0) {
                return DirectionTypeEnum.RIGHT;
            }
            else if (grid1XY.x - grid2XY.x < 0) {
                return DirectionTypeEnum.LEFT;
            }
            else {
                return DirectionTypeEnum.ERROR;
            }
        }
        else if (Math.abs(grid1XY.x - grid2XY.x) - Math.abs(grid1XY.y - grid2XY.y) < 0) {
            if (grid1XY.y - grid2XY.y > 0) {
                return DirectionTypeEnum.DOWN;
            }
            else if (grid1XY.y - grid2XY.y < 0) {
                return DirectionTypeEnum.UP;
            }
            else {
                return DirectionTypeEnum.ERROR;
            }
        }
        else {
            return DirectionTypeEnum.UNCERTAIN;
        }
    }
    MapUtil.getDirection = getDirection;
    function getXOffset(value1, value2) {
        return value2 % 9 - value1 % 9;
    }
    MapUtil.getXOffset = getXOffset;
    function getYOffset(value1, value2) {
        return Math.floor(value2 / 9) - Math.floor(value1 / 9);
    }
    MapUtil.getYOffset = getYOffset;
    function sameRow(value1, value2) {
        return Math.floor(value1 / 9) === Math.floor(value2 / 9);
    }
    MapUtil.sameRow = sameRow;
    function sameCol(value1, value2) {
        return value1 % 9 === value2 % 9;
    }
    MapUtil.sameCol = sameCol;
    function getXYFromValue(headValue) {
        var obj = {
            x: headValue % 9,
            y: Math.floor(headValue / 9)
        };
        return obj;
    }
    MapUtil.getXYFromValue = getXYFromValue;
    function getValueFromXY(x, y) {
        return y * 9 + x;
    }
    MapUtil.getValueFromXY = getValueFromXY;
    /**
     *
     * @param direction
     */
    function checkHeadAndDirection(gridValue, direction) {
        if (gridValue < 0 || gridValue > 80) {
            return false;
        }
        var gridXY = getXYFromValue(gridValue);
        var x = gridXY.x;
        var y = gridXY.y;
        switch (direction) {
            case DirectionTypeEnum.UP:
                if (x - 2 < 0 || x + 2 > 8 || y + 3 > 8) {
                    return false;
                }
                return true;
            case DirectionTypeEnum.RIGHT:
                if (y - 2 < 0 || y + 2 > 8 || x - 3 < 0) {
                    return false;
                }
                return true;
            case DirectionTypeEnum.DOWN:
                if (x - 2 < 0 || x + 2 > 8 || y - 3 < 0) {
                    return false;
                }
                return true;
            case DirectionTypeEnum.LEFT:
                if (y - 2 < 0 || y + 2 > 8 || x + 3 > 8) {
                    return false;
                }
                return true;
            default:
                console.log("direction error");
                return false;
        }
    }
    MapUtil.checkHeadAndDirection = checkHeadAndDirection;
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
                return [-9, -18, -7, -8, -10, -11, -28, -26, -27];
            case DirectionTypeEnum.LEFT:
                return [1, 2, -17, -8, 10, 19, -6, 12, 3];
            default:
                console.log("direction error");
                return [];
        }
    }
    MapUtil.getGridByDirection = getGridByDirection;
    /**
     * 旋转
     */
    function rotationPlane(head, direction) {
        console.log("rotation,head:" + head + ",direction:" + direction);
        switch (direction) {
            case DirectionTypeEnum.UP:
                if (checkHeadAndDirection(head + 10, DirectionTypeEnum.RIGHT)) {
                    return { head: head + 10, direction: DirectionTypeEnum.RIGHT };
                }
                else {
                    return rotationPlane(head + 10, DirectionTypeEnum.RIGHT);
                }
            case DirectionTypeEnum.RIGHT:
                if (checkHeadAndDirection(head + 8, DirectionTypeEnum.DOWN)) {
                    return { head: head + 8, direction: DirectionTypeEnum.DOWN };
                }
                else {
                    return rotationPlane(head + 8, DirectionTypeEnum.DOWN);
                }
            case DirectionTypeEnum.DOWN:
                if (checkHeadAndDirection(head - 10, DirectionTypeEnum.LEFT)) {
                    return { head: head - 10, direction: DirectionTypeEnum.LEFT };
                }
                else {
                    return rotationPlane(head - 10, DirectionTypeEnum.LEFT);
                }
            case DirectionTypeEnum.LEFT:
                if (checkHeadAndDirection(head - 8, DirectionTypeEnum.UP)) {
                    return { head: head - 8, direction: DirectionTypeEnum.UP };
                }
                else {
                    return rotationPlane(head - 8, DirectionTypeEnum.UP);
                }
            default:
                console.log("direction error");
                return { head: head, direction: direction };
        }
    }
    MapUtil.rotationPlane = rotationPlane;
    function gridValid(value) {
        if (value < 0 || value >= 81) {
            return false;
        }
        return true;
    }
    MapUtil.gridValid = gridValid;
    function headDataToHeadId(headList) {
        var headId = 0;
        for (var i = 0; i < headList.length; i++) {
            headId = headId << 9;
            headId += (headList[i].head << 2);
            headId += headList[i].direction;
            console.log(headId);
        }
        return headId;
    }
    MapUtil.headDataToHeadId = headDataToHeadId;
    function headIdToHeadData(headId) {
        var headList = [];
        for (var i = 0; i < 3; i++) {
            console.log(headId);
            var direction = headId & 3;
            console.log(direction);
            headId = headId >> 2;
            var head = headId & 127;
            console.log(head);
            headId = headId >> 7;
            headList.push({ head: head, direction: direction });
        }
        return headList;
    }
    MapUtil.headIdToHeadData = headIdToHeadData;
    function getNearByGrid(grid) {
        var _a = getXYFromValue(grid), x = _a.x, y = _a.y;
        var up, down, left, right, result = [];
        if (x - 1 >= 0) {
            left = getValueFromXY(x - 1, y);
            result.push(left);
        }
        if (x + 1 < 9) {
            right = getValueFromXY(x + 1, y);
            result.push(right);
        }
        if (y - 1 >= 0) {
            up = getValueFromXY(x, y - 1);
            result.push(up);
        }
        if (y + 1 < 9) {
            down = getValueFromXY(x, y + 1);
            result.push(down);
        }
        return result;
    }
    MapUtil.getNearByGrid = getNearByGrid;
})(MapUtil || (MapUtil = {}));
