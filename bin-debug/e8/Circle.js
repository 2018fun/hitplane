var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 圆数据结构
 */
var Circle = (function () {
    function Circle(length, data) {
        this.data = [];
        this.data = data;
        this._length = length;
    }
    Circle.prototype.getNext = function (position) {
        var index = position - 1;
        return this.data[(this.fixToPositive(index + 1)) % this._length];
    };
    Circle.prototype.getPrevious = function (position) {
        var index = position - 1;
        return this.data[(this.fixToPositive(index - 1)) % this._length];
    };
    Circle.prototype.getArrayData = function () {
        return this.data;
    };
    Circle.prototype.getData = function (position) {
        var index = position - 1;
        return this.data[this.fixToPositive(index) % this._length];
    };
    Circle.prototype.setData = function (position, data) {
        var index = position - 1;
        this.data[this.fixToPositive(index) % this._length] = data;
        return true;
    };
    Object.defineProperty(Circle.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    Circle.prototype.fixToPositive = function (index) {
        if (this._length === 0) {
            console.log("circle length error");
        }
        return index >= 0 ? index % this._length : this.fixToPositive(index + this._length);
    };
    return Circle;
}());
__reflect(Circle.prototype, "Circle");
