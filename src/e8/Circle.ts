/**
 * 圆数据结构
 */
class Circle {
    public data = [];
    private _length: number;


    constructor(length, data) {
        this.data = data;
        this._length = length;
    }

    public getNext(position) {
        let index = position - 1;
        return this.data[(this.fixToPositive(index + 1)) % this._length];
    }

    public getPrevious(position) {
        let index = position - 1;
        return this.data[(this.fixToPositive(index - 1)) % this._length];
    }

    public getArrayData() {
        return this.data;
    }

    public getData(position) {
        let index = position - 1;
        return this.data[this.fixToPositive(index) % this._length]
    }

    public setData(position, data) {
        let index = position - 1;
        this.data[this.fixToPositive(index) % this._length] = data;
        return true;
    }

    public get length() {
        return this._length;
    }

    public fixToPositive(index) {
        if (this._length === 0) {
            console.log("circle length error");
        }
        return index >= 0 ? index % this._length : this.fixToPositive(index + this._length);
    }
}