var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tishoy on 15/1/31.
 * 地图数据
 */
var MapData = (function () {
    function MapData() {
        this.columns = 9; //number    横向是数字 1-9 即九列
        this.rows = 9; //letter    竖向是字母 A-I 即九行
        this.numPlane = 0;
        this._map = [];
        this.hasBadPlane = false;
        this.headList = [];
        this.initialize();
    }
    MapData.prototype.initialize = function () {
        this.numPlane = 0;
        this._map.length = this.columns * this.rows;
        for (var i = 0; i < this._map.length; i++) {
            this._map[i] = new GridData(i);
            this._map[i].gridType = GridTypeEnum.MISS;
        }
    };
    MapData.prototype.clear = function () {
        this.numPlane = 0;
        for (var i = 0; i < this._map.length; i++) {
            this._map[i].gridType = GridTypeEnum.MISS;
        }
        this.headList = [];
    };
    MapData.prototype.getMapGridById = function (id) {
        return this._map[id];
    };
    MapData.prototype.getMapGridByXY = function (column, row) {
        return this._map[(row * this.columns) + column];
    };
    MapData.prototype.setMapGridTypeByPos = function (column, row, type) {
        this._map[(row * this.columns) + column].gridType = type;
    };
    MapData.prototype.setMapGridTypeByValue = function (value, type) {
        this._map[value].gridType = type;
    };
    MapData.prototype.setHeadDirection = function (value, direction) {
        this._map[value].direction = direction;
    };
    MapData.prototype.setBodyTypeByValue = function (value, bodyType) {
        this._map[value].bodyType = bodyType;
    };
    MapData.prototype.setDirection = function (value, direction) {
        this._map[value].direction = direction;
    };
    MapData.prototype.setGridIndex = function (value, planeIndex) {
        this._map[value].index = planeIndex;
    };
    /**
     * 检查防止飞机的格子，若其中有的格子已经放置过飞机，则返回false。
     * return true:表示这些所有格子都可以防止飞机。
     */
    MapData.prototype.checkValid = function (headColumn, headRow, direction) {
        if (this.getMapGridByXY(headColumn, headRow).gridType == GridTypeEnum.MISS) {
            var headPos = headRow * this.columns + headColumn;
            var plane = DirectionTypeEnum.getGridByDirection(direction);
            for (var i = 0; i < plane.length; i++) {
                if (this._map[headPos + plane[i]].gridType == GridTypeEnum.MISS) {
                    continue;
                }
                else {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;
        }
    };
    /**
     *  检查一种特殊情况，导致无法放置三架飞机。
     *  return true:表示可能不会出现放不下三架飞机的情况。
     */
    MapData.prototype.checkForThreePlane = function (headColumn, headRow, direction) {
        //第二架飞机添加时，进入判断
        var headPos = this.columns * headRow + headColumn;
        var badList = BadPlaceEnum.BAD_GRID_LIST;
        var badDirectionList = BadPlaceEnum.BAD_GRID_DIRECTION_LIST;
        var badLength = badList.length;
        //查询第二架飞机是否在badPlane行列中，有24种情况
        for (var badGrid = 0; badGrid < badLength; badGrid++) {
            //若第二架飞机是badPlane，进入判断
            if (badList[badGrid] == headPos && badDirectionList[badGrid] == direction) {
                var testList = BadPlaceEnum.BAD_GRID_TEST_LIST[badGrid];
                var testLength = testList.length;
                //此时再去查看第一架飞机的情况
                for (var testGrid = 0; testGrid < testLength; testGrid++) {
                    var headed = badList[testList[testGrid]];
                    var directed = badDirectionList[testList[testGrid]];
                    if (this._map[headed].gridType == GridTypeEnum.HEAD &&
                        this._map[badList[headed] + DirectionTypeEnum.DIRECTION_LIST[directed]].gridType == GridTypeEnum.BODY) {
                        egret.log("twice bad");
                        return false;
                    }
                    else {
                        egret.log("first time bad");
                        return true;
                    }
                }
            }
            else {
                egret.log("second time bad");
                return true;
            }
        }
    };
    //    /**
    //     *  检查一种特殊情况，导致无法放置三架飞机。
    //     *  return true:表示可以不会出现放不下三架飞机的情况。
    //     */
    //    checkForThreePlane(headColumn: number, headRow: number, direction: number): boolean {
    //        //第二架飞机添加时，进入判断
    //        if (this.numPlane == 1) {
    //            var headPos: number = this.columns * headRow + headColumn;
    //            var badList: number[] = BadPlaceEnum.badGridList;
    //            var badDirectionList: number[] = BadPlaceEnum.BAD_GRID_DIRECTION_LIST;
    //            var badLength:number = badList.length;
    //            //查询第二架飞机是否在badPlane行列中，有24种情况
    //            for (var badGrid = 0; badGrid < badLength; badGrid++) {
    //                //若第二架飞机是badPlane，进入判断
    //                if (badList[badGrid] == headPos && badDirectionList[badGrid] == direction) {
    //                    var testList: number[] = BadPlaceEnum.BAD_GRID_TEST_LIST[badGrid];
    //                    var testLength: number = testList.length;
    //                    //此时再去查看第一架飞机的情况
    //                    for (var testGrid = 0; testGrid < testLength; testGrid++) {
    //                        var headed: number = badList[testList[testGrid]];
    //                        var directed: number = badDirectionList[testList[testGrid]];
    //                        if (this._map[headed] == GridTypeEnum.head && 
    //                            this._map[badList[headed] + DirectionTypeEnum.directionList[directed]] == GridTypeEnum.body) {
    //                            egret.log("twice bad");
    //                            return false;
    //                        } else {
    //                            egret.log("first time bad");
    //                            return true;
    //                        }
    //                    }
    //                } else {
    //                    egret.log("second time bad");
    //                    return true;
    //                }
    //            }
    //        } else {
    //            return true;
    //        }
    //    }
    MapData.prototype.setPlaneGridByHead = function (headValue, direction) {
        return this.setPlaneGrid(headValue % 9, Math.floor(headValue / 9), direction);
    };
    MapData.prototype.setPlaneGrid = function (headColumn, headRow, direction) {
        //先检查该飞机能否加入。
        if (!this.checkValid(headColumn, headRow, direction)) {
            return false;
        }
        //        if (this.numPlane == 0) {
        //            //再检查飞机是否是badPlane
        //            this.hasBadPlane = !this.checkForThreePlane(headColumn, headRow, direction);
        //        }
        //        if (this.numPlane == 1 && this.hasBadPlane) {
        //            //再检查飞机是否是badPlane
        //            if (!this.checkForThreePlane(headColumn, headRow, direction)) {
        //                return false;
        //            }
        //        }
        if (this.numPlane == 1) {
            //再检查飞机是否是badPlane
            if (!this.checkForThreePlane(headColumn, headRow, direction)) {
                return false;
            }
        }
        var headPos = this.columns * headRow + headColumn;
        this.setMapGridTypeByValue(headPos, GridTypeEnum.HEAD);
        this.setHeadDirection(headPos, direction);
        this.setGridIndex(headPos, this.numPlane);
        var plane = DirectionTypeEnum.getGridByDirection(direction);
        for (var i = 0; i < plane.length; i++) {
            this.setMapGridTypeByValue(headPos + plane[i], GridTypeEnum.BODY);
            this.setBodyTypeByValue(headPos + plane[i], i);
            this.setDirection(headPos + plane[i], direction);
            this.setGridIndex(headPos + plane[i], this.numPlane);
        }
        this.headList.push({ "head": headPos, "direction": direction });
        return true;
    };
    MapData.prototype.removePlane = function (headPos) {
        var direction = this._map[headPos].direction;
        this.setMapGridTypeByValue(headPos, GridTypeEnum.MISS);
        this.setHeadDirection(headPos, DirectionTypeEnum.UNSET);
        var plane = DirectionTypeEnum.getGridByDirection(direction);
        for (var i = 0; i < plane.length; i++) {
            this.setMapGridTypeByValue(headPos + plane[i], GridTypeEnum.MISS);
            this.setBodyTypeByValue(headPos + plane[i], BodyGridEnum.UNSET);
        }
        this.removeHeadFromList(headPos);
    };
    MapData.prototype.removeHeadFromList = function (headPos) {
        for (var i = 0; i < this.headList.length; i++) {
            if (this.headList[i].head = headPos) {
                this.headList.splice(i, 1);
            }
        }
    };
    MapData.prototype.getHeadList = function () {
        return this.headList;
    };
    MapData.prototype.getPlaneGrid = function () {
        return this._map.filter(function (grid) {
            return grid.gridType !== GridTypeEnum.MISS;
        });
    };
    Object.defineProperty(MapData.prototype, "map", {
        get: function () {
            return this._map;
        },
        enumerable: true,
        configurable: true
    });
    MapData.prototype.getPlaneGridByIndex = function (planeIndex) {
        return this._map.filter(function (grid) {
            return grid.index === planeIndex;
        });
    };
    return MapData;
}());
__reflect(MapData.prototype, "MapData");
