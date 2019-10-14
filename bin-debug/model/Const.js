var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var Const = (function () {
    function Const() {
        this.GRID_WIDTH = 60;
        this.intiData();
    }
    Const.getInstance = function () {
        if (this.instance === null) {
            this.instance = new Const();
        }
        return this.instance;
    };
    Const.prototype.intiData = function () {
        this._data = RES.getRes("const_json");
    };
    Object.defineProperty(Const.prototype, "maxBuilding", {
        get: function () {
            return this._data["maxBuilding"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Const.prototype, "unlockData", {
        get: function () {
            return this._data["unlockData"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Const.prototype, "initBuilings", {
        get: function () {
            return this._data["initBuilings"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Const.prototype, "initLevel", {
        get: function () {
            return this._data["initLevel"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Const.prototype, "initGold", {
        get: function () {
            return this._data["initGold"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Const.prototype, "initGasMax", {
        get: function () {
            return this._data["initGasMax"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Const.prototype, "initGas", {
        get: function () {
            return this._data["initGas"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Const.prototype, "guideScene", {
        get: function () {
            return this._data["guideScene"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Const.prototype, "firstScene", {
        get: function () {
            return this._data["firstScene"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Const.prototype, "guideData", {
        get: function () {
            return this._data["guideData"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Const.prototype, "winBullets", {
        get: function () {
            return this._data["winBullets"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Const.prototype, "baseHitReward", {
        get: function () {
            return this._data["baseHitReward"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Const.prototype, "missleCost", {
        get: function () {
            return this._data["missleCost"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Const.prototype, "gridWidth", {
        // public get initBuilings() {
        //     return this._data["initBuilings"];
        // }
        // public get initBuilings() {
        //     return this._data["initBuilings"];
        // }
        get: function () {
            return this.GRID_WIDTH;
        },
        enumerable: true,
        configurable: true
    });
    Const.instance = null;
    return Const;
}());
__reflect(Const.prototype, "Const");
