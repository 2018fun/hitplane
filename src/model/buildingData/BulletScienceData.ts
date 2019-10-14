/**
 * 
 */
class BulletScienceData extends BuildingBase {

    public first: number;
    public first_num: number;
    public then: number;
    public bullets: number[];

    constructor(data) {
        super();
        this.id = BuildingEnum.BULLET_SCIENCE;
        this.level = data.level;
        this.cost = data.cost;
        this.name = data.name;
        this.view = data.view;
        this.desc = data.desc;
        this.level = data.level;
        this.first = data.first;
        this.then = data.then;
        this.first_num = data.first_num;
        this.bullets = data.bullets;
    }

    public get allBulletsType() {
        return this.bullets;
    }
}