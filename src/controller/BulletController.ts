/**
 * 子弹控制
 * created ty tishoy
 */
class BulletController {
    private static instance: BulletController = null;

    private bulletList: Array<number> = [];

    private storedBullet: number = null;

    constructor() {
        if (BulletController.instance) {
            throw new Error("AIController singlon error")
        }
    }

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new BulletController();
        }
        return this.instance;
    }

    public resetBullets() {
        this.bulletList = [];
        this.storedBullet = null;
        for (let i = 0; i < 3; i++) {
            this.bulletList.push(this.randomOneBullet());
        }
    }

    // public useStoredBullet() {
    //     return this.storedBullet;
    // }

    public getCurrentBullet() {
        return this.bulletList[0];
    }

    public useBullet() {
        platform.analytics("useBullet", { bullet: this.bulletList[0] });
        return this.bulletList.shift();
    }

    public rewardOneBullet(bulletType) {
        this.bulletList.unshift(bulletType);
    }

    public rewardBullet(bulletType) {
        this.bulletList.unshift(bulletType);
        GameController.getInstance().startAttackPhase();
    }

    public prepareNextBullet() {
        this.randomNextBullet();
        SceneManager.getInstance().awayScene.updateBullets();
        GameController.getInstance().startAttackPhase();
    }

    public randomOneBullet(): number {
        // 根据用户的弹药工厂随机
        let scienceData = CityController.getInstance().getAllBuildingsByType(BuildingEnum.BULLET_SCIENCE);
        let topScience = CityController.getInstance().getTopLevel(BuildingEnum.BULLET_SCIENCE);
        let bullet = BulletTypeEnum.MISSILE;
        // let 

        // TODO
        if (topScience === 0) {
            return bullet;
        } else {
            let data;
            let rate;
            for (let i = 0; i < scienceData.length; i++) {
                data = scienceData[i] as BulletScienceData;
                rate = data.then;

                if (RecordController.getInstance().getHitRecorded().length < data.first_num) {
                    rate = data.first;
                }
                if (Math.random() < rate) {
                    bullet = data.bullets[Math.floor(Math.random() * data.bullets.length)]
                    break;
                }
            }
        }
        return bullet;
    }

    public randomNextBullet() {
        this.bulletList.push(this.randomOneBullet());
    }

    public switchBullet() {
        if (this.storedBullet === null) {
            this.storeCurrentBullet();
        } else {
            let temp = this.bulletList.shift();
            this.bulletList.unshift(this.storedBullet);
            this.storedBullet = temp;
        }
    }

    public storeCurrentBullet() {
        this.storedBullet = this.bulletList.shift();
        this.randomNextBullet();
    }

    public get stored() {
        return this.storedBullet;
    }

    public get bullets() {
        // if (this.bulletList.length === 0) {
        //     this.resetBullets();
        // }
        console.log(this.bulletList);
        return this.bulletList;
    }

    public getIsLocked(type) {
        if (type === BulletTypeEnum.MISSILE) {
            return true;
        }


        let bullets = BuildingDataCache.getInstance().getBulletScienceByLevel(CityController.getInstance().getTopLevel(BuildingEnum.BULLET_SCIENCE)).bullets;
        if (bullets.indexOf(type) !== -1) {
            return true;
        }
        return false;
    }

}
