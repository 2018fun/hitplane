var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 *
 */
var AwayGameMsgView = (function (_super) {
    __extends(AwayGameMsgView, _super);
    function AwayGameMsgView() {
        var _this = _super.call(this) || this;
        _this.MAP_INFO = "map_info";
        _this.HIT_INFO = "hit_info";
        _this.REWARD_INFO = "reward_info";
        _this.BANNER_INFO = "banner_info";
        _this.GUIDE_INFO = "guide_info";
        _this.msgKey = ["playerName", "排名", "城镇积分", "可掠夺金币", "被进攻次数", "S率", "摧毁炮数"];
        _this.msgValue = [];
        _this.initView();
        return _this;
    }
    AwayGameMsgView.prototype.initView = function () {
        this.viewBg = new egret.Bitmap();
        this.viewBg.texture = RES.getRes("msg_png");
        // this.viewBg.width = AdaptSceenUtil.curWidth();
        this.addChild(this.viewBg);
        this.msgContainer = new egret.Sprite();
        this.addChild(this.msgContainer);
        this.bullet_text = new egret.TextField();
        this.bullet_text.x = 20;
        this.bullet_text.y = 10;
        this.msgContainer.addChild(this.bullet_text);
        this.reward_text = new egret.TextField();
        // this.reward_text.text = RewardController.getInstance().roundReward();
        this.reward_text.x = 20;
        this.reward_text.y = 10 + this.bullet_text.y + this.bullet_text.height;
        this.msgContainer.addChild(this.reward_text);
        this.guide_text = new egret.TextField();
        this.guide_text.width = this.viewBg.width - 40;
        this.guide_text.multiline = true;
        this.guide_text.x = 20;
        this.guide_text.y = 10;
        this.msgContainer.addChild(this.guide_text);
        this.guide_help_text = new egret.TextField();
        this.guide_help_text.width = this.viewBg.width - 40;
        this.guide_help_text.multiline = true;
        this.guide_help_text.x = 20;
        this.msgContainer.addChild(this.guide_help_text);
        // let text: egret.TextField;
        // let textWidth: number;
        // for (let i = 0; i < this.msgKey.length; i++) {
        //     text = new egret.TextField();
        //     text.text = this.getPlayerData(this.msgKey[i]);
        //     text.x = 20 + Math.floor(i % 2) * AdaptSceenUtil.curWidth() / 2;
        //     text.y = 10 + Math.floor(i / 2) * text.height;
        //     textWidth = text.width;
        //     this.msgContainer.addChild(text);
        //     text = new egret.TextField();
        //     // text.text = this.getPlayerData(this.msgValue[i]);
        //     text.x = textWidth + 20 + Math.floor(i % 2) * AdaptSceenUtil.curWidth() / 2;
        //     text.y = 10 + Math.floor(i / 2) * text.height;
        //     this.msgContainer.addChild(text);
        // }
    };
    AwayGameMsgView.prototype.updateView = function (level) {
        if (level === void 0) { level = 0; }
        this.msgContainer.removeChildren();
        console.log("msgStatus" + this.status);
        if (this.status === this.GUIDE_INFO) {
            console.log(GuideController.getInstance().getGuideStep());
            this.guide_text.text = i18n.getInstance().getLanguage("guide_" + GuideController.getInstance().getGuideStep());
            this.addChild(this.guide_text);
            this.guide_help_text.text = i18n.getInstance().getLanguage("guide_help_" + GuideEnum.GUIDE_HELP[GuideController.getInstance().getGuideStep()]);
            this.guide_help_text.y = this.guide_text.height + 10;
            this.guide_help_text.textColor = ColorEnum.RED;
            this.addChild(this.guide_help_text);
        }
        else if (this.status === this.HIT_INFO) {
            this.bullet_text.text = "使用炮数:" + RecordController.getInstance().round + "/" + Const.getInstance().winBullets;
        }
        else if (this.status === this.MAP_INFO) {
            if (level === 0) {
            }
            else {
                var text = void 0;
                var textWidth = void 0;
                this.msgKey[0] = "随机玩家";
                this.msgValue = [level.toString() + "级", Math.floor(Math.random() * Math.pow(10, 8 - level)), Math.floor(level * 100 * Math.random()), Math.floor(level * 100 * Math.random()) * 10, Math.floor(level * 100 * Math.random()), (40 + (Math.random() * 20)).toFixed(2) + "%", Math.floor((Math.random()) * 11) + 8];
                for (var i = 0; i < this.msgKey.length; i++) {
                    text = new egret.TextField();
                    text.text = this.msgKey[i] + ":";
                    text.x = 20 + Math.floor(i % 2) * this.viewBg.width / 2;
                    text.y = 10 + Math.floor(i / 2) * text.height;
                    textWidth = text.width;
                    this.msgContainer.addChild(text);
                    text = new egret.TextField();
                    text.text = this.msgValue[i];
                    text.x = textWidth + 20 + Math.floor(i % 2) * this.viewBg.width / 2;
                    text.y = 10 + Math.floor(i / 2) * text.height;
                    this.msgContainer.addChild(text);
                }
            }
        }
        else if (this.status === this.REWARD_INFO) {
            this.reward_text.text = "获得奖励:";
        }
    };
    AwayGameMsgView.prototype.resetMsgViewStatus = function (level, isGuide) {
        if (isGuide) {
            this.status = this.GUIDE_INFO;
        }
        else {
            this.status = this.MAP_INFO;
        }
        this.updateView(level);
    };
    AwayGameMsgView.prototype.showHitInfo = function () {
        this.status = this.HIT_INFO;
        this.updateView();
    };
    AwayGameMsgView.prototype.showRewardInfo = function () {
        this.status = this.REWARD_INFO;
        this.updateView();
    };
    AwayGameMsgView.prototype.showBannerInfo = function () {
        this.status = this.BANNER_INFO;
        this.updateView();
    };
    AwayGameMsgView.prototype.showGuideInfo = function () {
        this.status = this.GUIDE_INFO;
        this.updateView();
    };
    AwayGameMsgView.prototype.getPlayerData = function (key) {
        if (key.indexOf("msg") !== -1) {
            return this.opponentData[key];
        }
        return key;
    };
    return AwayGameMsgView;
}(egret.Sprite));
__reflect(AwayGameMsgView.prototype, "AwayGameMsgView");
