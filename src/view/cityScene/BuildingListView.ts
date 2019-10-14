/**
 * 
 */
class BuildingListView extends egret.Sprite {

    private airport: AirPort;
    private bank: Bank;
    private gasStation: GasStation;
    private scenery: Scenery;
    private science: Science;
    private sheet: egret.SpriteSheet;

    private cityId;
    private buildingList = [this.airport, this.bank, this.gasStation, this.scenery, this.science];
    private buildings = [1, 1, 1, 1, 1];

    private scrollView: egret.ScrollView;

    /**
     * 
     */
    constructor() {
        super();

        this.scrollView = new egret.ScrollView;
        this.scrollView.x = 0;
        this.scrollView.y = 0;
        this.addChild(this.scrollView);

        this.airport = new AirPort();
        this.airport.x = -960;
        this.bank = new Bank();
        this.gasStation = new GasStation();
        this.scenery = new Scenery();
        this.science = new Science();
        // this.setCityView(1);
        // this.airport.x = this.airport.y = this.bank.x = this.bank.y = this.gasStation.x = this.gasStation.y = 0;
        // this.scenery.y = this.scenery.y = this.science.x = this.science.y = 0;
        this.airport.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAirPortTouched, this);
        this.bank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBankTouched, this);
        this.gasStation.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGasStationTouched, this);
        this.scenery.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSceneryTouched, this);
        this.science.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onScienceTouched, this);
        let content = new egret.Sprite();
        content.addChild(this.airport);
        content.addChild(this.bank);
        content.addChild(this.gasStation);
        content.addChild(this.scenery);
        content.addChild(this.science);
        this.scrollView.setContent(content);
        // this.scrollView.addChild(this.bank);
        // this.scrollView.addChild(this.gasStation);
        // this.scrollView.addChild(this.scenery);
        // this.scrollView.addChild(this.science);
    }

    private update() {
       
    }


    public levelUPBuilding(id) {
    }

    private onAirPortTouched(e) {
        SceneManager.getInstance().openBuildingPop(1);
    }

    private onBankTouched(e) {

    }

    private onGasStationTouched(e) {

    }

    private onSceneryTouched(e) {

    }

    private onScienceTouched(e) {

    }
}