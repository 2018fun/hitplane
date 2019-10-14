var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var UserData = (function () {
    function UserData() {
        this._gold = 0;
        this._gas = 0;
        this._guide = 0;
        this._unlock = 0;
        this._rank = 0;
        this._destroyTimes = [0, 0, 0, 0, 0, 0, 0];
        this._missles = 0;
        this._sharedMap = []; //{heads:, times:}
        /**
         *  [{
         *      id:1,
         *      airport:2,
         *      bank:3,
         *      gas_station:5,
         *      science:4,
         *      scenery:1
         * }
         * ]
         */
        this._buildings = [{ "id": 0, "level": 0, "top": 0, "insure": [] },
            { "id": 0, "level": 0, "top": 0, "insure": [] },
            { "id": 0, "level": 0, "top": 0, "insure": [] },
            { "id": 0, "level": 0, "top": 0, "insure": [] },
            { "id": 0, "level": 0, "top": 0, "insure": [] },
            { "id": 0, "level": 0, "top": 0, "insure": [] },
            { "id": 0, "level": 0, "top": 0, "insure": [] }];
        this.initData();
    }
    UserData.prototype.initData = function () {
        var saveDataString = SaveDataManager.getInstance().getFromLocal("userData");
        if (saveDataString === null || saveDataString === undefined || saveDataString === "") {
            this._gold = Const.getInstance().initGold;
            this._gas = Const.getInstance().initGas;
            this._lastDate = new Date().getTime();
            this._unlock = Const.getInstance().unlockData;
            this._missles = 0;
            this._guide = Const.getInstance().guideData;
            var buildings = Const.getInstance().initBuilings;
            this._buildings = [];
            this._sharedMap = [];
            for (var i = 0; i < buildings.length; i++) {
                var level = Const.getInstance().initLevel[i];
                this.buildings.push({ "id": buildings[i], "level": level, "top": level, "insure": [] });
            }
            for (var i = 0; i < Const.getInstance().maxBuilding - buildings.length; i++) {
                this._buildings.push({ "id": -1, "level": 0, "top": 0, "insure": [] });
            }
            SaveDataManager.getInstance().saveToLocal("userData", JSON.stringify({
                "gold": this._gold,
                "gas": this._gas,
                "unlock": this._unlock,
                "buildings": this._buildings,
                "guide": this._guide,
                "lastDate": new Date().getTime(),
                "destroyTimes": this._destroyTimes,
                "sharedMap": []
            }));
        }
        else {
            var saveData = JSON.parse(saveDataString);
            this._gold = saveData["gold"];
            this._gas = saveData["gas"];
            this._guide = saveData["guide"];
            this._unlock = saveData["unlock"];
            this._buildings = saveData["buildings"];
            this._lastDate = saveData["lastDate"];
            this._destroyTimes = saveData["destroyTimes"];
            this._sharedMap = saveData["sharedMap"];
        }
    };
    Object.defineProperty(UserData.prototype, "gold", {
        get: function () {
            return this._gold;
        },
        set: function (value) {
            this._gold = Math.max(value, 0);
            this.saveUserData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "gas", {
        get: function () {
            return this._gas;
        },
        set: function (value) {
            this._gas = Math.max(value, 0);
            this.saveUserData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "guide", {
        get: function () {
            return this._guide;
        },
        set: function (guide) {
            this._guide = guide;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "unlock", {
        get: function () {
            return this._unlock;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "missles", {
        get: function () {
            return this._missles;
        },
        set: function (missles) {
            this._missles = missles;
            this.saveUserData();
        },
        enumerable: true,
        configurable: true
    });
    // public get cities() {
    //     return this._cities;
    // }
    UserData.prototype.setBuilding = function (position, data) {
        this._buildings[position] = { id: data.id, level: data.level, top: data.top, insure: data.insure };
        this.saveUserData();
    };
    Object.defineProperty(UserData.prototype, "buildings", {
        get: function () {
            return this._buildings;
        },
        enumerable: true,
        configurable: true
    });
    UserData.prototype.saveUserData = function () {
        SaveDataManager.getInstance().saveToLocal("userData", JSON.stringify({
            "gold": this._gold,
            "gas": this._gas,
            "guide": this._guide,
            "unlock": this._unlock,
            "buildings": this._buildings,
            "lastDate": this._lastDate,
            "destroyTimes": this._destroyTimes,
            "sharedMap": this._sharedMap
        }));
    };
    UserData.prototype.getSaveData = function () {
        return {
            "gold": this._gold,
            "gas": this._gas,
            "guide": this._guide,
            "unlock": this._unlock,
            "lastDate": this.lastDate,
            "buildings": this._buildings,
            "destroyTimes": this._destroyTimes,
            "sharedMap": this._sharedMap
        };
    };
    Object.defineProperty(UserData.prototype, "lastDate", {
        get: function () {
            if (this._lastDate === undefined) {
                this.setLastDate();
            }
            return this._lastDate;
        },
        enumerable: true,
        configurable: true
    });
    UserData.prototype.setLastDate = function () {
        this._lastDate = new Date().getTime();
        this.saveUserData();
    };
    UserData.prototype.getSharedMap = function () {
        if (this._sharedMap === undefined) {
            this._sharedMap = [];
            this.saveUserData();
        }
        return this._sharedMap;
    };
    UserData.prototype.deleteShareMap = function (index) {
        this._sharedMap.splice(index, 1);
        this.saveUserData();
    };
    UserData.prototype.shareMap = function (headData) {
        var temp;
        var hasMap = false;
        for (var i = 0; i < this._sharedMap.length; i++) {
            temp = 0;
            for (var j = 0; j < headData.length; j++) {
                for (var k = 0; k < this._sharedMap[i].heads.length; k++) {
                    // [{ head: 34, direction: 1 },
                    //     { head: 49, direction: 1 },
                    //     { head: 21, direction: 1 }]
                    if (this._sharedMap[i].heads[k].head === headData[j].head && this._sharedMap[i].heads[k].direction === headData[j].direction) {
                        temp++;
                    }
                    if (temp === 3) {
                        hasMap = true;
                        this._sharedMap[i].times++;
                        this._sharedMap[i].date = new Date().getTime();
                        break;
                    }
                }
            }
        }
        if (!hasMap) {
            this.shareNewMap(headData);
        }
        this.saveUserData();
    };
    UserData.prototype.shareNewMap = function (headData) {
        this._sharedMap.push({
            heads: headData,
            times: 1,
            date: new Date().getTime()
        });
        this.saveUserData();
    };
    UserData.prototype.getDestroyTimes = function () {
        if (this._destroyTimes === undefined) {
            this._destroyTimes = [0, 0, 0, 0, 0, 0, 0];
            this.saveUserData();
        }
        return this._destroyTimes;
    };
    UserData.prototype.setDestroyTimes = function (value, newDay) {
        if (this._destroyTimes === undefined) {
            this._destroyTimes = [0, 0, 0, 0, 0, 0, 0];
        }
        if (newDay) {
            this._destroyTimes.shift();
            this._destroyTimes.push(value);
        }
        else {
            this._destroyTimes[this._destroyTimes.length - 1] += value;
        }
        this.saveUserData();
    };
    UserData.prototype.useMissle = function () {
        this._missles--;
        this.saveUserData();
    };
    return UserData;
}());
__reflect(UserData.prototype, "UserData");
