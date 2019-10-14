/**
 * 
 */

class StoreCardView extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private gameView: GameView;
    private data: MapStatsData;
    private heads: HeadData[];


    private initView() {
        this.gameView = new GameView(true);

        this.heads = this.data.heads;
        if (this.heads.length !== 3) {
            console.log("头信息错误")
        } else {
            for (let i = 0; i < this.heads.length; i++) {
                this.addOnePlane(this.heads[i].head, this.heads[i].direction);
            }
        }

    }

    public addOnePlane(headGridId, direction) {
    }
}
