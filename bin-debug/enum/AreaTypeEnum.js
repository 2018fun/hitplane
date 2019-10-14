/**
 *
 */
var AreaTypeEnum;
(function (AreaTypeEnum) {
    AreaTypeEnum.ONE_POINT = 0;
    AreaTypeEnum.POINTS = 1;
    AreaTypeEnum.ROW_OR_COL = 2;
    AreaTypeEnum.POINT_EXPAND = 3;
    var ROW_A = 0;
    var ROW_B = 9;
    var ROW_C = 18;
    var ROW_D = 27;
    var ROW_E = 36;
    var ROW_F = 45;
    var ROW_G = 54;
    var ROW_H = 63;
    var ROW_I = 72;
    AreaTypeEnum.ROWS = [ROW_A, ROW_B, ROW_C, ROW_D, ROW_E, ROW_F, ROW_G, ROW_H, ROW_I];
    var COL_1 = 0;
    var COL_2 = 1;
    var COL_3 = 2;
    var COL_4 = 3;
    var COL_5 = 4;
    var COL_6 = 5;
    var COL_7 = 6;
    var COL_8 = 7;
    var COL_9 = 8;
    AreaTypeEnum.COLS = [COL_1, COL_2, COL_3, COL_4, COL_5, COL_6, COL_7, COL_8, COL_9];
    function getOneRow(row) {
        var grids = [];
        for (var i = 0; i < 9; i++) {
            grids.push(row + i);
        }
        return grids;
    }
    AreaTypeEnum.getOneRow = getOneRow;
    function getOneCol(col) {
        var grids = [];
        for (var i = 0; i < 9; i++) {
            grids.push(col + 9 * i);
        }
        return grids;
    }
    AreaTypeEnum.getOneCol = getOneCol;
})(AreaTypeEnum || (AreaTypeEnum = {}));
