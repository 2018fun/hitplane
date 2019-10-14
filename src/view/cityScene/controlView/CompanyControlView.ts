/**
 * 
 */
class CompanyControlView extends BuildingControlView {
    constructor() {
        super();
        this.initInsure();
    }


    INIT_STATUS = 0;
    INSURE_STATUS = 1;
    INFO_STATUS = 2;
    UNINSURE_STATUS = 3;

    private scrollView: egret.ScrollView;

    private buildingContainer: egret.Sprite;
    private buildingList: Array<BuildingView>;

    private saftyRatioText: egret.TextField;

    private status;

    private insureTimesText;

    private buyButton: E8TextButton;
    private cancelButton: E8TextButton;

    private initInsure() {
        this.status = this.INIT_STATUS;

        this.demolishButton.visible = false;

        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 72;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER; this.titleTextField.text = i18n.getInstance().getLanguage(CityController.getInstance().selectedData.name);
        this.addChild(this.titleTextField);


        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10 + this.backButton.width / 2;
        this.backButton.y = this.backButton.height / 2;
        this.backButton.visible = false;
        this.addChild(this.backButton);

        this.saftyRatioText = new egret.TextField();
        this.saftyRatioText.text = "城市安全评估:" + CityController.getInstance().getCitySaftyRatio().toString();
        this.saftyRatioText.x = 0;
        this.saftyRatioText.y = 50;

        this.addChild(this.saftyRatioText);

        this.insureTimesText = new egret.TextField();
        this.insureTimesText.text = "还可投保建筑数" + (CityController.getInstance().selectedData as InsureCompanyData).building;
        this.insureTimesText.x = 350;
        this.insureTimesText.y = 50;
        this.addChild(this.insureTimesText);


        this.buyButton = new E8TextButton(this, RES.getRes("btn_red_png"), this.onShowBuldingList);
        this.buyButton.scale(0.5, 0.5);
        this.buyButton.setButtonText(i18n.getInstance().getLanguage("ui_buy_insure"));
        this.buyButton.x = AdaptSceenUtil.curWidth() - 3 * this.levelUpButton.width - 30;
        this.buyButton.y = 200;
        this.addChild(this.buyButton);


        this.cancelButton = new E8TextButton(this, RES.getRes("btn_red_png"), this.onShowInsuredBuilding);
        this.cancelButton.scale(0.5, 0.5);
        this.cancelButton.setButtonText(i18n.getInstance().getLanguage("ui_uninsure"));
        this.cancelButton.x = AdaptSceenUtil.curWidth() - 4 * this.buyButton.width - 40;
        this.cancelButton.y = 200;
        this.addChild(this.cancelButton);

        this.scrollView = new egret.ScrollView();
        this.buildingContainer = new egret.Sprite();


        this.scrollView.x = 0;
        this.scrollView.width = AdaptSceenUtil.curWidth();
        this.scrollView.y = 80;
        this.scrollView.height = 200;
        this.scrollView.bounces = false;
        this.scrollView.touchEnabled = true;
        this.addChild(this.scrollView)

        this.updateView();

    }

    private updateView() {
        if (this.status === this.INSURE_STATUS) {
            this.scrollView.visible = true;
            this.backButton.visible = true;
            this.levelUpButton.visible = false;
            this.demolishButton.visible = false;
            this.buyButton.visible = false;
            this.cancelButton.visible = false;
            this.repairButton.visible = false;
        } else if (this.status === this.INIT_STATUS) {
            this.scrollView.visible = false;
            this.backButton.visible = false;
            this.levelUpButton.visible = true;
            this.demolishButton.visible = true;
            this.buyButton.visible = true;
            this.cancelButton.visible = true;
            if (CityController.getInstance().selectedData.level < CityController.getInstance().selectedData.top) {
                this.repairButton.visible = true
            } else {
                this.repairButton.visible = false;
            }
        } else if (this.status === this.INFO_STATUS) {

        }
    }

    private onBackButtonTouched() {
        this.status = this.INIT_STATUS;
        this.updateView();
    }

    private onShowBuldingList(e) {
        this.status = this.INSURE_STATUS;
        this.buildingList = [];

        let buildingMiniView: BuildingView;
        let building;
        for (let i = 0; i < CityController.getInstance().getBuildings().length; i++) {
            if (CityController.getInstance().getBuildings()[i].level === 0) {
                continue;
            }
            building = CityController.getInstance().getBuildings()[i]
            buildingMiniView = new BuildingView();
            buildingMiniView.touchEnabled = true;
            buildingMiniView.position = i;
            buildingMiniView.name = i18n.getInstance().getLanguage(building.name);
            buildingMiniView.level = building.level;
            buildingMiniView.view = building.view;
            buildingMiniView.x = 200 * this.buildingList.length;
            this.buildingList.push(buildingMiniView);
            buildingMiniView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBuildingInsure, this);
            this.buildingContainer.addChild(buildingMiniView);
        }

        this.scrollView.setContent(this.buildingContainer);
        this.updateView();
    }

    private onBuyBuildingInsure(e) {
        let building = e.target as BuildingView;
        console.log(building);
        CityController.getInstance().buyInsure(building.position);
    }

    private onShowInsuredBuilding(e) {
        this.status = this.INSURE_STATUS;
        this.buildingList = [];
        let buildingMiniView: BuildingView;
        let buildings = CityController.getInstance().getBuildings();
        for (let i = 0; i < buildings.length; i++) {
            if (buildings[i].level === 0 || buildings[i].insure.length === 0) {
                continue;
            }
            buildingMiniView = new BuildingView();
            buildingMiniView.touchEnabled = true;
            buildingMiniView.touchChildren = false;
            buildingMiniView.name = i18n.getInstance().getLanguage(buildings[i].name);
            buildingMiniView.position = i;
            buildingMiniView.level = buildings[i].level;
            buildingMiniView.x = 200 * this.buildingList.length;
            buildingMiniView.view = buildings[i].view;
            this.buildingList.push(buildingMiniView);
            buildingMiniView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuildingUninsure, this);
            this.buildingContainer.addChild(buildingMiniView);
        }
        this.scrollView.setContent(this.buildingContainer);
        this.updateView();
    }

    private onBuildingUninsure(e) {


        let building = e.target as BuildingView;
        CityController.getInstance().unInsure(building.position);
    }

}