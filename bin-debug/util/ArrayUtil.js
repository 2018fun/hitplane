/**
 *
 */
var ArrayUtil;
(function (ArrayUtil) {
    function add(list, item) {
        if (list.indexOf(item) === -1) {
            list.push(item);
        }
    }
    ArrayUtil.add = add;
    function remove(list, item) {
        var index = list.indexOf(item);
        if (index !== -1) {
            list.splice(index, 1);
        }
    }
    ArrayUtil.remove = remove;
    function random(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
    ArrayUtil.random = random;
})(ArrayUtil || (ArrayUtil = {}));
