/**
 * 
 */
class BulletData {

    public id;
    public type;
    public desc;
    public view;
    public animate;
    public phase = [];

    constructor(data) {
        this.id = data.id;
        this.type = data.type;
        this.desc = data.desc;
        this.view = data.view;
        this.animate = data.animate;
        this.phase = data.phase;
    }


}