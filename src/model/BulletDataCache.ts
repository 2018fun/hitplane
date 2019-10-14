/**
 * 
 */
class BulletDataCache {

    public static instance = null

    private bulletDatas = [];

    constructor() {

        this.intiData();
    }

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new BulletDataCache();
        }
        return this.instance;
    }

    private intiData() {
        this.parseData(RES.getRes("bullet_json"));
    }

    private parseData(bulletData) {
        let bullet: BulletData;
        let bulletListData = bulletData.bullet;
        for (var i = 0; i < bulletListData; i++) {
            bullet = new BulletData(bulletListData[i]);
            this.bulletDatas.push(bullet);
        }
    }

    public getBulletData(type) {
        return this.bulletDatas[type];
    }



}