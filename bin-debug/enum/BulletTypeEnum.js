/**
 * 子弹类型
 * create by tishoy
 * 2019.4.14
 */
var BulletTypeEnum;
(function (BulletTypeEnum) {
    BulletTypeEnum.BULLET_GRID = {};
    BulletTypeEnum.BULLET_GRID_AREA = [];
    BulletTypeEnum.BULLET_GRID_ROW = [];
    BulletTypeEnum.BULLET_UNLOCK_LEVEL = [];
    var auto = 0;
    /**
     * 普通导弹
     * 0
     */
    BulletTypeEnum.MISSILE = auto++;
    BulletTypeEnum.BULLET_UNLOCK_LEVEL[BulletTypeEnum.MISSILE] = 0;
    BulletTypeEnum.BULLET_GRID[BulletTypeEnum.MISSILE] = [0];
    BulletTypeEnum.BULLET_GRID_AREA[BulletTypeEnum.MISSILE] = AreaTypeEnum.ONE_POINT;
    /**
     * 十字花炸弹
     * 1
     */
    BulletTypeEnum.CROSS_BOOM = auto++;
    BulletTypeEnum.BULLET_UNLOCK_LEVEL[BulletTypeEnum.CROSS_BOOM] = 2;
    BulletTypeEnum.BULLET_GRID_AREA[BulletTypeEnum.CROSS_BOOM] = AreaTypeEnum.POINTS;
    BulletTypeEnum.BULLET_GRID[BulletTypeEnum.CROSS_BOOM] = [-9, -1, 0, 1, 9];
    BulletTypeEnum.BULLET_GRID_ROW[BulletTypeEnum.CROSS_BOOM] = [-1, 0, 0, 0, 1];
    /**
     * 行外线
     * 2
     */
    BulletTypeEnum.INFRARED_ROW = auto++;
    BulletTypeEnum.BULLET_UNLOCK_LEVEL[BulletTypeEnum.INFRARED_ROW] = 5;
    BulletTypeEnum.BULLET_GRID_AREA[BulletTypeEnum.INFRARED_ROW] = AreaTypeEnum.ROW_OR_COL;
    /**
     * 列射线
     * 3
     */
    BulletTypeEnum.INFRARED_COL = auto++;
    BulletTypeEnum.BULLET_UNLOCK_LEVEL[BulletTypeEnum.INFRARED_COL] = 5;
    BulletTypeEnum.BULLET_GRID_AREA[BulletTypeEnum.INFRARED_COL] = AreaTypeEnum.ROW_OR_COL;
    /**
     * 制导导弹
     * 4
     */
    BulletTypeEnum.GUIDED_MISSILE = auto++;
    BulletTypeEnum.BULLET_UNLOCK_LEVEL[BulletTypeEnum.GUIDED_MISSILE] = 1;
    BulletTypeEnum.BULLET_GRID[BulletTypeEnum.GUIDED_MISSILE] = [0];
    BulletTypeEnum.BULLET_GRID_AREA[BulletTypeEnum.GUIDED_MISSILE] = AreaTypeEnum.ONE_POINT;
    /**
     * 燃烧弹
     * 5
     */
    BulletTypeEnum.INCENDIARY_BOMB = auto++;
    BulletTypeEnum.BULLET_UNLOCK_LEVEL[BulletTypeEnum.INCENDIARY_BOMB] = 5;
    BulletTypeEnum.BULLET_GRID[BulletTypeEnum.INCENDIARY_BOMB] = [0];
    BulletTypeEnum.BULLET_GRID_AREA[BulletTypeEnum.INCENDIARY_BOMB] = AreaTypeEnum.ONE_POINT;
    /**
     * 碎甲
     * 6
     */
    BulletTypeEnum.ARMOR_PIERCING_MISSILE = auto++;
    BulletTypeEnum.BULLET_UNLOCK_LEVEL[BulletTypeEnum.ARMOR_PIERCING_MISSILE] = -1;
    BulletTypeEnum.BULLET_GRID[BulletTypeEnum.ARMOR_PIERCING_MISSILE] = [0];
    BulletTypeEnum.BULLET_GRID_AREA[BulletTypeEnum.ARMOR_PIERCING_MISSILE] = AreaTypeEnum.ONE_POINT;
    /**
     * 9宫格炸弹
     * 7
     */
    BulletTypeEnum.NINE_PALACE_MISSILE = auto++;
    BulletTypeEnum.BULLET_UNLOCK_LEVEL[BulletTypeEnum.NINE_PALACE_MISSILE] = 3;
    BulletTypeEnum.BULLET_GRID_AREA[BulletTypeEnum.NINE_PALACE_MISSILE] = AreaTypeEnum.POINTS;
    BulletTypeEnum.BULLET_GRID[BulletTypeEnum.NINE_PALACE_MISSILE] = [-10, -9, -8, -1, 0, 1, 8, 9, 10];
    BulletTypeEnum.BULLET_GRID_ROW[BulletTypeEnum.NINE_PALACE_MISSILE] = [-1, -1, -1, 0, 0, 0, 1, 1, 1];
    /**
     * 探测弹
     */
    /**
     * 雷爆单
     */
    /**
     * 迷惑飞机
     */
    /**
     * 伞兵
     */
    /**
     * 类型总数
     */
    BulletTypeEnum.COUNT = auto;
    function getBulletEffect(bulletType, grid) {
        var effectGrids = [];
        var _a = MapUtil.getXYFromValue(grid), x = _a.x, y = _a.y;
        if (this.BULLET_GRID_AREA[bulletType] === AreaTypeEnum.ONE_POINT) {
            // if (bulletType === BulletTypeEnum.GUIDED_MISSILE) {
            //   // this.hitGrid(this.getUnHitPlaneGrid(), BulletController.getInstance().useBullet());
            //   this.getUnHitPlaneGrid()
            // }
            return [grid];
        }
        else if (this.BULLET_GRID_AREA[bulletType] === AreaTypeEnum.ROW_OR_COL) {
            if (bulletType === this.INFRARED_ROW) {
                effectGrids = AreaTypeEnum.getOneRow(AreaTypeEnum.ROWS[y]);
            }
            else {
                effectGrids = AreaTypeEnum.getOneCol(AreaTypeEnum.COLS[x]);
            }
        }
        else if (this.BULLET_GRID_AREA[bulletType] === AreaTypeEnum.POINTS) {
            var target_grid = this.BULLET_GRID[bulletType];
            var target_grid_row = this.BULLET_GRID_ROW[bulletType];
            for (var i = 0; i < target_grid_row.length; i++) {
                if (y + target_grid_row[i] === MapUtil.getXYFromValue(grid + target_grid[i]).y && MapUtil.gridValid(grid + target_grid[i])) {
                    effectGrids.push(grid + target_grid[i]);
                }
            }
        }
        return effectGrids;
    }
    BulletTypeEnum.getBulletEffect = getBulletEffect;
})(BulletTypeEnum || (BulletTypeEnum = {}));
