/**
 * 
 */
class CityControlView extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    // private 
    private controlContainer: egret.Sprite;

    private initView() {


        this.controlContainer = new egret.Sprite();
        this.addChild(this.controlContainer);

    }

    public renderControlView(building) {



        switch (building.id) {
            case BuildingEnum.UNSET:
                this.renderGroundControl();
                break;

            case BuildingEnum.AIRPORT:
                this.renderAirportControl();
                break;

            case BuildingEnum.BANK:
                this.renderBankControl();
                break;

            case BuildingEnum.BULLET_SCIENCE:
                this.renderScience();
                break;

            case BuildingEnum.GAS_STATION:
                this.renderStation();
                break;

            case BuildingEnum.DEFENSE:
                this.renderDefense();
                break;

            case BuildingEnum.INSURE_COMPANY:
                this.renderInsure();
                break;
            case BuildingEnum.REPAIR_FACTORY:
                this.renderRepair();
                break;

            case BuildingEnum.ADVERTISE_COMPANY:
                this.renderBanner();
                break;

            default:

                break;
        }
    }

    public reset() {
        this.controlContainer.removeChildren();
    }

    private updateView() {

    }

    private renderGroundControl() {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new GroundControlView());
    }

    private renderAirportControl() {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new AirportControlView());
    }

    private renderBankControl() {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new BankControlView());
    }

    private renderScience() {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new ScienceControlView());
    }

    private renderStation() {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new StationControlView());
    }

    private renderBanner() {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new BannerControlView());
    }

    private renderRepair() {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new FactoryControlView());
    }

    private renderInsure() {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new CompanyControlView());
    }

    private renderDefense() {
        this.controlContainer.removeChildren();
        this.controlContainer.addChild(new DefenseControlView());
    }
}