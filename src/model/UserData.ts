/**
 * 
 */
class UserData {
    private _gold = 0;
    private _gas = 0;
    private _guide = 0;
    private _unlock = 0;
    private _lastDate: number;
    private _rank = 0;
    private _destroyTimes = [0, 0, 0, 0, 0, 0, 0];
    private _missles = 0;
    private _sharedMap = [];    //{heads:, times:}
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
    private _buildings = [{ "id": 0, "level": 0, "top": 0, "insure": [] },
    { "id": 0, "level": 0, "top": 0, "insure": [] },
    { "id": 0, "level": 0, "top": 0, "insure": [] },
    { "id": 0, "level": 0, "top": 0, "insure": [] },
    { "id": 0, "level": 0, "top": 0, "insure": [] },
    { "id": 0, "level": 0, "top": 0, "insure": [] },
    { "id": 0, "level": 0, "top": 0, "insure": [] }];




    constructor() {
        this.initData();
    }

    private initData() {
        let saveDataString = SaveDataManager.getInstance().getFromLocal("userData") as string;
        if (saveDataString === null || saveDataString === undefined || saveDataString === "") {
            this._gold = Const.getInstance().initGold;
            this._gas = Const.getInstance().initGas;
            this._lastDate = new Date().getTime();
            this._unlock = Const.getInstance().unlockData;
            this._missles = 0;
            this._guide = Const.getInstance().guideData;
            let buildings = Const.getInstance().initBuilings;
            this._buildings = [];
            this._sharedMap = [];
            for (let i = 0; i < buildings.length; i++) {
                let level = Const.getInstance().initLevel[i];
                this.buildings.push({ "id": buildings[i], "level": level, "top": level, "insure": [] })
            }
            for (let i = 0; i < Const.getInstance().maxBuilding - buildings.length; i++) {
                this._buildings.push({ "id": -1, "level": 0, "top": 0, "insure": [] })
            }
            SaveDataManager.getInstance().saveToLocal("userData",
                JSON.stringify({
                    "gold": this._gold,
                    "gas": this._gas,
                    "unlock": this._unlock,
                    "buildings": this._buildings,
                    "guide": this._guide,
                    "lastDate": new Date().getTime(),
                    "destroyTimes": this._destroyTimes,
                    "sharedMap": []
                }));
        } else {
            let saveData = JSON.parse(saveDataString);
            this._gold = saveData["gold"];
            this._gas = saveData["gas"];
            this._guide = saveData["guide"];
            this._unlock = saveData["unlock"];
            this._buildings = saveData["buildings"];
            this._lastDate = saveData["lastDate"];
            this._destroyTimes = saveData["destroyTimes"];
            this._sharedMap = saveData["sharedMap"];
        }
    }

    public set gold(value) {
        this._gold = Math.max(value, 0);
        this.saveUserData();
    }

    public get gold() {
        return this._gold;
    }

    public set gas(value) {
        this._gas = Math.max(value, 0);
        this.saveUserData();
    }

    public get gas() {
        return this._gas;
    }

    public get guide() {
        return this._guide;
    }

    public set guide(guide) {
        this._guide = guide;
    }

    public get unlock() {
        return this._unlock;
    }

    public set missles(missles) {
        this._missles = missles;
        this.saveUserData();
    }

    public get missles() {
        return this._missles;
    }

    // public get cities() {
    //     return this._cities;
    // }

    public setBuilding(position, data) {
        this._buildings[position] = { id: data.id, level: data.level, top: data.top, insure: data.insure };
        this.saveUserData();
    }

    public get buildings() {
        return this._buildings;
    }

    public saveUserData() {
        SaveDataManager.getInstance().saveToLocal("userData",
            JSON.stringify({
                "gold": this._gold,
                "gas": this._gas,
                "guide": this._guide,
                "unlock": this._unlock,
                "buildings": this._buildings,
                "lastDate": this._lastDate,
                "destroyTimes": this._destroyTimes,
                "sharedMap": this._sharedMap
            }));
    }


    public getSaveData() {
        return {
            "gold": this._gold,
            "gas": this._gas,
            "guide": this._guide,
            "unlock": this._unlock,
            "lastDate": this.lastDate,
            "buildings": this._buildings,
            "destroyTimes": this._destroyTimes,
            "sharedMap": this._sharedMap
        }
    }

    public get lastDate() {
        if (this._lastDate === undefined) {
            this.setLastDate();
        }
        return this._lastDate;
    }

    public setLastDate() {
        this._lastDate = new Date().getTime();
        this.saveUserData();
    }

    public getSharedMap() {
        if (this._sharedMap === undefined) {
            this._sharedMap = [];
            this.saveUserData();
        }
        return this._sharedMap;
    }

    public deleteShareMap(index) {
        this._sharedMap.splice(index, 1);
        this.saveUserData();
    }

    public shareMap(headData) {
        let temp;
        let hasMap = false;
        for (let i = 0; i < this._sharedMap.length; i++) {
            temp = 0;
            for (let j = 0; j < headData.length; j++) {
                for (let k = 0; k < this._sharedMap[i].heads.length; k++) {
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
    }

    public shareNewMap(headData) {
        this._sharedMap.push({
            heads: headData,
            times: 1,
            date: new Date().getTime()
        })
        this.saveUserData();
    }

    public getDestroyTimes() {
        if (this._destroyTimes === undefined) {
            this._destroyTimes = [0, 0, 0, 0, 0, 0, 0];
            this.saveUserData();
        }
        return this._destroyTimes;
    }

    public setDestroyTimes(value, newDay) {
        if (this._destroyTimes === undefined) {
            this._destroyTimes = [0, 0, 0, 0, 0, 0, 0];
        }
        if (newDay) {
            this._destroyTimes.shift();
            this._destroyTimes.push(value);
        } else {
            this._destroyTimes[this._destroyTimes.length - 1] += value;
        }
        this.saveUserData();
    }

    public useMissle() {
        this._missles--;
        this.saveUserData();
    }

}