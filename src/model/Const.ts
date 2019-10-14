/**
 * 
 */
class Const {

    private GRID_WIDTH = 60;
    private static instance = null;
    private _data;

    constructor() {
        this.intiData();
    }

    public static getInstance(): Const {
        if (this.instance === null) {
            this.instance = new Const();
        }
        return this.instance;
    }

    private intiData() {
        this._data = RES.getRes("const_json");
    }

    public get maxBuilding() {
        return this._data["maxBuilding"];
    }

    public get unlockData() {
        return this._data["unlockData"];
    }

    public get initBuilings() {
        return this._data["initBuilings"];
    }


    public get initLevel() {
        return this._data["initLevel"];
    }


    public get initGold() {
        return this._data["initGold"];
    }


    public get initGasMax() {
        return this._data["initGasMax"];
    }


    public get initGas() {
        return this._data["initGas"];
    }


    public get guideScene() {
        return this._data["guideScene"];
    }


    public get firstScene() {
        return this._data["firstScene"];
    }


    public get guideData() {
        return this._data["guideData"];
    }

    public get winBullets() {
        return this._data["winBullets"];
    }

    public get baseHitReward() {
        return this._data["baseHitReward"];
    }

    public get missleCost() {
        return this._data["missleCost"];
    }
    // public get initBuilings() {
    //     return this._data["initBuilings"];
    // }


    // public get initBuilings() {
    //     return this._data["initBuilings"];
    // }

    public get gridWidth() {
        return this.GRID_WIDTH;
    }

}