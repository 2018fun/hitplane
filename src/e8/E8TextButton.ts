/**
 * E8Button类
 */
class E8TextButton extends E8Button {


    constructor(context: any, texture: egret.Texture, backFun: Function = null) {
        super(context, texture, backFun);
    }

    public scale(scaleX, scaleY) {
        // let rect = new egret.Rectangle(30, 51, 150, 105);
        // this.btnImg.scale9Grid = rect;
        this.btnImg.width = this.btnImg.width * scaleX;
        this.btnImg.height = this.btnImg.height * scaleY;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }

    public setButtonText(textContent, fixX = 0, texture: string = ""): void {
        if (texture !== "") {
            let bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes(texture);
            // bitmap.x = 
            this.addChild(bitmap);
        }
        let effect = DrawUtil.textFilter(textContent);
        // effect.anchorOffsetX = effect.width / 2;
        // effect.anchorOffsetY = effect.height / 2;
        effect.x = this.width / 2 + fixX;
        effect.y = this.height / 2;
        this.addChild(effect);

    }

    public setButtonEnable(texture, backFun) {
        this.changeTexture(texture);
        this.backFun = backFun;
    }
}
