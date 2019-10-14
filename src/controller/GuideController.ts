/**
 * 
 * 引导
 * creat by tishoy
 * 2019.4.12
 */
class GuideController {
    private static instance: GuideController = null;

    private guideData;
    private current_step = 0;
    private guideList = [];

    constructor() {
        if (GuideController.instance) {
            throw new Error("AIController singlon error")
        }
        this.init();
    }

    private init() {
        this.guideData = Number(SaveDataManager.getInstance().getUserData().guide);
        let temp = this.guideData;
        let step = 0;
        while (temp > 0) {
            if ((temp && 1) === 0) {
                break;
            }
            temp = temp >> 1
            this.guideList.push(true);
            step++;
        }
        this.current_step = step;
        console.log("current_step" + this.current_step);
    }

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new GuideController();
        }
        return this.instance;
    }

    public isNew() {
        console.log(this.guideData);
        return this.guideData === 0;
    }

    public isFinished() {
        console.log(this.guideList);
        return this.guideList.length >= 10;
    }

    public isPlaceGuideFinished() {
        return false;
    }

    public getGuideStep() {
        return this.current_step;
    }

    public getGuide() {
        return this.guideData;
    }

    public saveGuide(value) {
        this.guideData = value;
        SaveDataManager.getInstance().setGuide(this.guideData);
    }

    public dropPlaneGuide() {
        // SceneManager.getInstance().popLayer
    }

    public startAwayGuide() {
        this.current_step = 1;
        this.guideStep(this.current_step);
    }

    public hitGridGuide(gridId) {
        console.log("grid" + gridId);
        let awayScene = SceneManager.getInstance().awayScene;
        if (this.current_step === GuideEnum.HIT_GRID) {
            awayScene.showGridView(gridId, GridTypeEnum.BODY);
            BulletController.getInstance().useBullet()
            AIController.getInstance().addPlaneByBody(gridId);
            // } else if (this.current_step === GuideEnum.HIT_BODY) {
            //     GameController.getInstance().mapShowGird(gridId);
        } else if (this.current_step >= GuideEnum.HIT_BODY) {
            GameController.getInstance().hitGrid(gridId, BulletController.getInstance().useBullet())
            if (GameController.getInstance().getAwayMapData(gridId) === GridTypeEnum.HEAD) {
                this.guideStep(GuideEnum.HIT_BODY);
            }
        }
        
        this.onNextGuide();
    }

    private guideStep(step) {
        let awayScene = SceneManager.getInstance().awayScene;
        awayScene.updateMsg();
        switch (step) {
            case GuideEnum.NEW_PLAYER_GUIDE:
                SceneManager.getInstance().awayScene.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextGuide, this);
                console.log(GuideEnum.NEW_PLAYER_GUIDE);
                break;

            case GuideEnum.GAME_AIM:
                // SceneManager.getInstance().get
                console.log("如下地图上有三架1-5-1-3样式的飞机,你需要找到他们的位置所在并击中他们的头部,来取得胜利");
                break;

            case GuideEnum.HIT_GRID:
                console.log("点击屏幕试着发射一枚导弹吧");
                SceneManager.getInstance().awayScene.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextGuide, this);
                // SceneManager.getInstance().awayScene.getGameView().setGuideStepGridEnable(GuideEnum.HIT_GRID);
                break;

            case GuideEnum.HIT_BODY:
                // SceneManager.getInstance().awayScene.getGameView().setGuideStepGridEnable(GuideEnum.HIT_BODY);
                console.log("恭喜你！成功的击中了一家飞机的身体,黄色的标记水晶,表示攻击中飞机身体");
                console.log("那么这这架飞机可能是这个样子,看看能否击中飞机头部!");
                break;

            case GuideEnum.HIT_EMPTY_GOT_BULLET:
                BulletController.getInstance().rewardOneBullet(BulletTypeEnum.NINE_PALACE_MISSILE);
                console.log("好可惜,没有猜中飞机头部的位置,不过值得庆幸的是我们击中了一个隐藏的宝箱");
                console.log("我们获得了一个重磅炸弹，这种炸弹可以对一个范围目标进行攻击哦");
                break;

            case GuideEnum.GOT_BULLET:
                console.log("获得的炸弹将会在下一次攻击中使用哦,我们还可以点击储藏,将这个炸弹保留到下一回合");
                console.log("但是如果这局没有使用这个炸弹,他将被折算成金币赠与你哦～")
                break;

            case GuideEnum.BULLET:
                console.log("在一次进攻中,我们的轰炸机只能携带20颗炸弹呢,所以一定要在使用前~")
                console.log("所以一定要用这20枚炸弹击落敌方的三架飞机，我们才能获取这次进攻的战斗奖励～");
                break;

            case GuideEnum.HIT_HEAD:
                console.log("再次尝试点击屏幕,对敌方阵营进行摧毁吧");
                break;

            case GuideEnum.THREE_PLANE_GUIDE:
                console.log("恭喜你，成功的战胜了敌人");
                console.log("点击这里,获得本次进攻的奖励");
                break;
        }
    }



    private onNextGuide(e = null) {
        this.current_step++;
        if (this.guideList.length < this.current_step) {
            this.guideList.push(true);
            this.guideData += Math.pow(2, this.current_step);
        }
        console.log(this.guideList);
        console.log(this.current_step);
        SaveDataManager.getInstance().setGuide(this.guideData)
        SaveDataManager.getInstance().saveUserData();
        this.guideStep(this.current_step);
    }

    public guideFinished() {
        this.current_step = GuideEnum.AWAY_GUIDE_FINISHED;
        if (this.guideList.length < this.current_step) {
            this.guideList.push(true);
            this.guideData += Math.pow(2, this.current_step);
        }
        console.log(this.guideList);
        console.log(this.current_step);
        SaveDataManager.getInstance().setGuide(this.guideData)
        SaveDataManager.getInstance().saveUserData();
    }
}