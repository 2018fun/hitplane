/**
 * 
 */
class BuildingBase {

    public id;
    public name;
    public level;
    public cost;
    public desc;
    public view;
    public score;
    public position;
    public top;
    public insure;
    public protect;    

    constructor() {
        this.id = BuildingEnum.UNSET;
        this.level = 0;
        this.top = 0;
        this.insure = [];
        this.protect = false;
    }


}