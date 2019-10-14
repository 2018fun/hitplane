var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by tishoy on 15/1/31.
 * 每个格子数据
 */
var GridData = (function () {
    function GridData(gridValue, gridType, direction, bodyType) {
        if (gridType === void 0) { gridType = GridTypeEnum.MISS; }
        if (direction === void 0) { direction = DirectionTypeEnum.UNSET; }
        if (bodyType === void 0) { bodyType = BodyGridEnum.UNSET; }
        this._gridValue = gridValue;
        this._gridType = gridType;
        this._direction = direction;
        this._bodyType = bodyType;
        this.index = -1;
    }
    Object.defineProperty(GridData.prototype, "row", {
        get: function () {
            return Math.floor(this._gridValue / 9);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridData.prototype, "column", {
        get: function () {
            return this._gridValue % 9;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridData.prototype, "gridValue", {
        get: function () {
            return this._gridValue;
        },
        set: function (value) {
            this._gridValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridData.prototype, "gridType", {
        get: function () {
            return this._gridType;
        },
        set: function (value) {
            this._gridType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridData.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (value) {
            this._direction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridData.prototype, "bodyType", {
        get: function () {
            return this._bodyType;
        },
        set: function (value) {
            this._bodyType = value;
        },
        enumerable: true,
        configurable: true
    });
    return GridData;
}());
__reflect(GridData.prototype, "GridData");
