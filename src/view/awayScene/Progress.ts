/**
 * 
 */
class Progress extends egret.Sprite {

    private _least: number;

    private progress_board: egret.Bitmap;
    private progress_bg: egret.Bitmap;
    private progress_fill: egret.Bitmap;
    private progress_mask: egret.Shape;

    private avg_view: egret.Bitmap;

    private number_view: egret.Bitmap;

    private level: egret.TextField;
    private gold: egret.TextField;
    private player_name: egret.TextField;
    private rank: egret.TextField;
    private Srate: egret.TextField;

    private gold_icon: egret.Bitmap;

    constructor() {
        super();
        this.initView();
    }

    private initView() {
        this.progress_board = new egret.Bitmap();
        this.progress_board.texture = RES.getRes("progress_board");
        // this.progress_board.anchorOffsetX = this.progress_board.width / 2;
        // this.progress_board.anchorOffsetY = this.progress_board.height / 2;
        this.progress_board.x = 0;
        this.progress_board.y = 0;

        this.progress_bg = new egret.Bitmap();
        this.progress_bg.texture = RES.getRes("progress_bg");
        this.progress_bg.anchorOffsetX = this.progress_bg.width / 2;
        // this.progress_bg.anchorOffsetY = this.progress_bg.height / 2;
        this.progress_bg.x = this.progress_board.width / 2;
        this.progress_bg.y = this.progress_board.height / 2 + 5;
        this.addChild(this.progress_bg);

        this.progress_fill = new egret.Bitmap();
        this.progress_fill.texture = RES.getRes("progress");
        this.progress_fill.anchorOffsetX = this.progress_fill.width / 2;
        this.progress_fill.anchorOffsetY = this.progress_fill.height / 2;
        this.progress_fill.x = this.progress_board.width / 2;
        this.progress_fill.y = this.progress_board.height / 2;
        this.addChild(this.progress_fill);


        this.addChild(this.progress_board);


        this.progress_mask = new egret.Shape();
        this.progress_mask.graphics.beginFill(0x4300FF, 1);
        this.progress_mask.graphics.drawRect(0, 0, 450, 50);
        this.progress_mask.graphics.endFill();
        this.progress_mask.y = this.progress_board.height / 2;
        this.addChild(this.progress_mask);


        this.number_view = new egret.Bitmap();
        this.number_view.texture = RES.getRes("num_" + 20);
        this.number_view.x = this.progress_board.width - 80;
        this.number_view.y = this.progress_board.height - 140;
        this.addChild(this.number_view);

        this.progress_fill.mask = this.progress_mask;

        this.avg_view = new egret.Bitmap();
        this.avg_view.texture = RES.getRes("avg")
        this.avg_view.anchorOffsetX = this.avg_view.width / 2;
        // this.avg_view.anchorOffsetY = this.avg_view.height / 2;
        this.avg_view.x = 80 + (20 - (8 + Math.floor(Math.random() * 3))) / 20 * 450
        this.avg_view.y = this.progress_board.height / 2;
        this.addChild(this.avg_view);

        this.level = new egret.TextField();
        this.level.x = this.progress_board.width / 2 - 200;
        this.level.y = 170;
        this.level.size = 14;
        this.addChild(this.level);

        this.gold = new egret.TextField();
        this.gold.x = this.progress_board.width / 2 - 120;
        this.gold.y = 170;
        this.gold.size = 14;
        this.addChild(this.gold);

        this.player_name = new egret.TextField();
        this.player_name.x = this.progress_board.width / 2 - 240;
        this.player_name.y = 260;
        this.player_name.size = 14;
        this.addChild(this.player_name);

        this.rank = new egret.TextField();
        this.rank.x = this.progress_board.width / 2 - 140;
        this.rank.y = 260;
        this.rank.size = 14;
        this.addChild(this.rank);

        this.Srate = new egret.TextField();
        this.Srate.size = 14;
        this.Srate.x = this.progress_board.width / 2 + 50;
        this.Srate.y = 260;
        this.addChild(this.Srate);

        this.gold_icon = new egret.Bitmap();
        this.gold_icon.texture = RES.getRes("gold_png");
        this.gold_icon.x = this.progress_board.width / 2 - 80;
        this.gold_icon.y = 150;
        this.addChild(this.gold_icon);
    }

    public updateView() {
        this.progress = 20 - RecordController.getInstance().bulletUsed;
    }

    public set progress(value) {
        this._least = value;

        this.number_view.texture = RES.getRes("num_" + value);
        this.number_view.anchorOffsetX = this.number_view.width / 2;
        this.number_view.anchorOffsetY = this.number_view.height / 2;

        this.progress_mask.x = 80 + (20 - value) / 20 * 450;
        console.log(value);
        this.progress_mask.scaleX = value / 20;

    }

    public resetView(level = 1) {
        this.progress = 20;
        this.randomText(level);

    }

    private msgKey = ["playerName", "排名:", "城镇积分:", "可掠夺金币:", "被进攻次数:", "平均S率:", "摧毁炮数:"];
    private msgValue = [];

    private randomText(level = 1) {
        this.msgValue = [
            level.toString() + "级",                                // 等级
            Math.floor(Math.random() * Math.pow(10, 8 - level)),    // 排名
            Math.floor(level * 100 * Math.random()),                // 城市积分
            Math.floor(level * 100 * Math.random()) * 10,           // 可掠夺金币
            Math.floor(level * 100 * Math.random()),                // 被进攻次数
            (40 + (Math.random() * 20)).toFixed(2) + "%",           // 平均S率
            Math.floor((Math.random()) * 11) + 8                    // 摧毁炮数
        ]
        this.level.text = this.msgValue[0];
        this.gold.text = this.msgValue[3];
        this.player_name.text = this.msgKey[2] + this.msgValue[2];
        this.rank.text = this.msgKey[1] + this.msgValue[1];
        this.Srate.text = this.msgKey[5] + this.msgValue[5];
    }

}