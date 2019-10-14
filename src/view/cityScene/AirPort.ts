/**
 * 飞行站
 */
class AirPort extends egret.Bitmap {
    constructor(level = 1) {
        super();
        this.touchEnabled = true;
        this.update(RES.getRes("city" + 1 + "_sheet").getTexture("building" + 1 + "_" + level));
    }

    public update(texture) {
        this.texture = texture;
    }
}