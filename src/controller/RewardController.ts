/**
 * 攻击奖励反馈
 */
class RewardController {
    private static instance: RewardController = null;

    private rewardList = [];

    constructor() {
        if (RewardController.instance) {
            throw new Error("AIController singlon error")
        }
        this.init();
    }

    private missRewardTimes = 0;
    // private continuousReward;

    private init() {

    }

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new RewardController();
        }
        return this.instance;
    }

    public reset() {
        this.missRewardTimes = 0;
    }

    public roundReward() {
        return this.hitReward;
    }

    public continuousReward() {
        switch (RecordController.getInstance().continuousType) {
            case GridTypeEnum.MISS:
                break;

            case GridTypeEnum.BODY:
                let continuousTimes = RecordController.getInstance().continuousTimes
                if (continuousTimes >= RewardTitleEnum.HOLY_SHIT) {
                    SceneManager.getInstance().showTip("十连击");
                    platform.analytics("rewardTitle", { type: "HOLY_SHIT" });
                    GameController.getInstance().addGold(10 * CityController.getInstance().getBankGameReward() * Const.getInstance().baseHitReward);
                } else if (continuousTimes === RewardTitleEnum.GOD_LIKE) {
                    SceneManager.getInstance().showTip("九连击");
                    platform.analytics("rewardTitle", { type: "GOD_LIKE" });
                    GameController.getInstance().addGold(9 * CityController.getInstance().getBankGameReward() * Const.getInstance().baseHitReward);
                } else if (continuousTimes === RewardTitleEnum.MONSTER_KILL) {
                    SceneManager.getInstance().showTip("八连击");
                    platform.analytics("rewardTitle", { type: "MONSTER_KILL" });
                    GameController.getInstance().addGold(8 * CityController.getInstance().getBankGameReward() * Const.getInstance().baseHitReward);
                } else if (continuousTimes === RewardTitleEnum.WICKED_SICK) {
                    SceneManager.getInstance().showTip("七连击");
                    platform.analytics("rewardTitle", { type: "WICKED_SICK" });
                    GameController.getInstance().addGold(7 * CityController.getInstance().getBankGameReward() * Const.getInstance().baseHitReward);
                } else if (continuousTimes === RewardTitleEnum.UNSTOPPABLE) {
                    SceneManager.getInstance().showTip("六连击");
                    platform.analytics("rewardTitle", { type: "UNSTOPPABLE" });
                    GameController.getInstance().addGold(6 * CityController.getInstance().getBankGameReward() * Const.getInstance().baseHitReward);
                } else if (continuousTimes === RewardTitleEnum.MEGA_KILL) {
                    SceneManager.getInstance().showTip("五连击");
                    platform.analytics("rewardTitle", { type: "MEGA_KILL" });
                    GameController.getInstance().addGold(5 * CityController.getInstance().getBankGameReward() * Const.getInstance().baseHitReward);
                } else if (continuousTimes === RewardTitleEnum.DOMANATING) {
                    SceneManager.getInstance().showTip("四连击");
                    platform.analytics("rewardTitle", { type: "DOMANATING" });
                    GameController.getInstance().addGold(4 * CityController.getInstance().getBankGameReward() * Const.getInstance().baseHitReward);
                } else if (continuousTimes === RewardTitleEnum.KILLING_SPREE) {
                    SceneManager.getInstance().showTip("三连击");
                    platform.analytics("rewardTitle", { type: "KILLING_SPREE" });
                    GameController.getInstance().addGold(3 * CityController.getInstance().getBankGameReward() * Const.getInstance().baseHitReward);
                }
        }
    }

    public hitReward(hitResult: number[]) {

        let hitNumber = hitResult.filter((element) => {
            return element !== GridTypeEnum.MISS;
        }).length;
        if (hitNumber === 0) {
            this.missReward();
            return;
        }
        let headNumber = hitResult.filter((element) => {
            return element === GridTypeEnum.HEAD;
        }).length;



        if (headNumber > 0) {
            this.headReward(headNumber)
        }
        if (hitNumber >= 5) {
            this.ranmpage(hitNumber);
        }
        switch (hitNumber) {
            case RewardTitleEnum.DOUBLE_KILL:
                this.doubleHit();
                platform.analytics("rewardTitle", { type: "DOUBLE_KILL" });
                break;

            case RewardTitleEnum.TRIPLE_KILL:
                this.tripleHit();
                platform.analytics("rewardTitle", { type: "TRIPLE_KILL" });
                break;

            case RewardTitleEnum.ULTRAKILL:
                this.ultraHit();
                platform.analytics("rewardTitle", { type: "ULTRAKILL" });
                break;
        }
    }

    public headReward(headNumber) {
        switch (headNumber) {
            case RewardTitleEnum.DOUBLE_KILL:
                this.doubleKill();
                platform.analytics("rewardTitle", { type: "DOUBLE_KILL" });
                break;
            case RewardTitleEnum.TRIPLE_KILL:
                this.tripleKill();
                platform.analytics("rewardTitle", { type: "TRIPLE_KILL" });
                break;
            default:
                this.planeKill();
                break;
        }
    }

    public isMissReward(): boolean {
        let missTime = RecordController.getInstance().missTimes;
        return Math.random() < (0.2 * missTime - 0.5 * this.missRewardTimes);
    }

    public missReward(): number {
        if (!this.isMissReward()) {
            return;
        }
        // SceneManager.getInstance().showTip("获得宝箱");

        switch (Math.floor(Math.random() * 2)) {
            case 1:
                let reward = Math.pow(2, 1) * CityController.getInstance().getBankGameReward() * Const.getInstance().baseHitReward;
                platform.analytics("missReward", { bullet: -1, gold: reward });
                SceneManager.getInstance().showTip("获得宝箱,金币奖励" + reward);
                GameController.getInstance().addGold(reward);
            case 2:
                let bullet = Math.floor(Math.random() * BulletTypeEnum.COUNT);
                platform.analytics("missReward", { bullet: bullet, gold: 0 });
                SceneManager.getInstance().showTip("获得宝箱,炮弹奖励" + i18n.getInstance().getLanguage("bullet"));
                BulletController.getInstance().rewardOneBullet(bullet)
                break;
            case 3:
                break;
        }

        return;
        /**
         * 奖励1 金币  奖励2  导弹 奖励3 建筑  奖励4 谜题
         */
        CityController.getInstance().getBankChestReward() * 5000;
        switch (Math.floor(Math.random() * RewardTypeEnum.REWARD_TYPE_LIST.length)) {
            case RewardTypeEnum.REWARD_TYPE_GOLD:
                return CityController.getInstance().getBankChestReward() * 5000;
            case RewardTypeEnum.REWARD_TYPE_BUILDING:
                // return CityController.getInstance().getBankTopLevel();
                return;

        }

    }

    public planeKill() {
        SceneManager.getInstance().showTip("击中飞机头");
        GameController.getInstance().addGold(Math.pow(2, 1) * CityController.getInstance().getBankGameReward() * Const.getInstance().baseHitReward);
    }

    public doubleKill() {
        SceneManager.getInstance().showTip("双杀");
        GameController.getInstance().addGold(Math.pow(2, 2) * CityController.getInstance().getBankGameReward() * Const.getInstance().baseHitReward);
    }

    public tripleKill() {
        SceneManager.getInstance().showTip("三杀");
        GameController.getInstance().addGold(Math.pow(2, 3) * CityController.getInstance().getBankGameReward() * Const.getInstance().baseHitReward);
    }

    public doubleHit() {
        SceneManager.getInstance().showTip("同时击中");
        GameController.getInstance().addGold(2 * CityController.getInstance().getBankGameReward() * Const.getInstance().baseHitReward);
    }

    public tripleHit() {
        SceneManager.getInstance().showTip("同时击中");
        GameController.getInstance().addGold(3 * CityController.getInstance().getBankGameReward() * Const.getInstance().baseHitReward);

    }

    public ultraHit() {
        SceneManager.getInstance().showTip("同时击中");
        GameController.getInstance().addGold(4 * CityController.getInstance().getBankGameReward() * Const.getInstance().baseHitReward);

    }

    public ranmpage(hitNumber) {
        SceneManager.getInstance().showTip("同时击中");
        GameController.getInstance().addGold(hitNumber * CityController.getInstance().getBankGameReward() * Const.getInstance().baseHitReward);

    }

    public balloonReward(double = false) {
        if (double) {
            SceneManager.getInstance().showTip("领取气球奖励,先给你60000");
            platform.analytics("balloonReward", {})
            GameController.getInstance().addGold(60000);
        } else {
            SceneManager.getInstance().showTip("领取气球奖励,先给你30000");
            platform.analytics("balloonReward", {})
            GameController.getInstance().addGold(30000);
        }
        
    }

}