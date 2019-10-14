/**
 * 
 */
class AirportControlView extends BuildingControlView {
    constructor() {
        super();
        this.initAirport()
    }

    INIT_STATUS = 0;
    OPPONENT_STATUS = 1;


    private awayButton: E8TextButton;
    private placingButton: E8TextButton;
    private refreshButton: E8TextButton;

    private scrollView: egret.ScrollView;

    private oppoContiner: egret.Sprite;
    private opponentList: Array<OpponentView>;

    private status: number;

    private initAirport() {

        this.status = this.INIT_STATUS;

        this.demolishButton.visible = false;



        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 72;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.titleTextField.text = i18n.getInstance().getLanguage(CityController.getInstance().selectedData.name);
        this.addChild(this.titleTextField);


        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10 + this.backButton.width / 2;
        this.backButton.y = this.backButton.height / 2;
        this.backButton.visible = false;
        this.addChild(this.backButton);


        this.scrollView = new egret.ScrollView();
        this.oppoContiner = new egret.Sprite();

        this.opponentList = new Array<OpponentView>();
        if (CityController.getInstance().getBuildingByPostion(0).level > 0) {
            let opponentData = AIController.getInstance().randomOpponent();
            let opponentView: OpponentView;


            for (let i = 0; i < opponentData.length; i++) {
                opponentView = new OpponentView();
                opponentView.touchEnabled = true;
                opponentView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectedOpponent, this);
                opponentView.x = 200 * i;
                opponentView.level = opponentData[i];
                this.oppoContiner.addChild(opponentView);
                this.opponentList.push(opponentView);

            }
        } else {
            this.repairButton.visible = true;
        }


        this.refreshButton = new E8TextButton(this, RES.getRes("btn_green_png"), this.onRefreshButtonTouched);
        this.refreshButton.scale(0.5, 0.5);
        this.refreshButton.setButtonText(i18n.getInstance().getLanguage("ui_refresh"));
        this.refreshButton.x = this.refreshButton.width / 2 + 10;
        this.refreshButton.y = 200;
        this.addChild(this.refreshButton);

        this.scrollView.x = this.refreshButton.width + 10;
        this.scrollView.width = AdaptSceenUtil.curWidth() - 120;
        this.scrollView.y = 80;
        this.scrollView.height = 200;
        this.scrollView.bounces = false;
        this.scrollView.touchEnabled = true;
        this.scrollView.setContent(this.oppoContiner);
        this.addChild(this.scrollView)


        this.awayButton = new E8TextButton(this, RES.getRes("btn_red_png"), this.onToAwayScene);
        this.awayButton.scale(0.5, 0.5);
        this.awayButton.setButtonText(i18n.getInstance().getLanguage("ui_attack"));
        this.awayButton.x = AdaptSceenUtil.curWidth() - 4 * this.levelUpButton.width - 30;
        this.awayButton.y = 200;
        this.addChild(this.awayButton);

        this.placingButton = new E8TextButton(this, RES.getRes("btn_green_png"), this.onToPlacingScene);
        this.placingButton.scale(0.5, 0.5);
        this.placingButton.setButtonText(i18n.getInstance().getLanguage("ui_placing"));
        this.placingButton.x = AdaptSceenUtil.curWidth() - 2 * this.levelUpButton.width - 20;;
        this.placingButton.y = 200;
        this.addChild(this.placingButton);




        this.updateView();
    }

    private updateView() {
        if (this.status === this.OPPONENT_STATUS) {
            this.placingButton.visible = false;
            this.awayButton.visible = false;
            this.scrollView.visible = true;
            this.backButton.visible = true;
            this.levelUpButton.visible = false;
            this.refreshButton.visible = true;
            this.repairButton.visible = false;
        } else {
            this.placingButton.visible = true;
            this.awayButton.visible = true;
            this.scrollView.visible = false;
            this.backButton.visible = false;
            this.levelUpButton.visible = true;
            this.refreshButton.visible = false;
            if (CityController.getInstance().selectedData.level < CityController.getInstance().selectedData.top) {
                this.repairButton.visible = true
            } else {
                this.repairButton.visible = false;
            }

        }
    }


    private onToPlacingScene(e) {
        GameController.getInstance().startPlacingGame();
        SceneManager.getInstance().toPlacingScene();
    }

    private onToAwayScene(e) {
        this.status = this.OPPONENT_STATUS;
        this.updateView();

    }

    private onSelectedOpponent(e: egret.TouchEvent) {
        let oppo = e.target as OpponentView;
        if (GameController.getInstance().costGas(Math.pow(oppo.level, 3) * 2)) {
            GameController.getInstance().attackOpponent(oppo.level);
        } else {
            
            platform.vedioPlay(AdvertiseController.getInstance().vedio, ()=> {

            }, (result) =>{
                if (result.finish) {
                    GameController.getInstance().attackOpponent(oppo.level);
                }
            });
        }


        
    }

    private onBackButtonTouched() {
        if (this.status === this.OPPONENT_STATUS) {
            this.status = this.INIT_STATUS;
            this.updateView();
        }
    }

    private onRefreshButtonTouched() {
        let opponentData = AIController.getInstance().randomOpponent();
        let opponentView;
        for (let i = 0; i < opponentData.length; i++) {
            if (this.opponentList.length >= i) {
                this.opponentList[i].level = opponentData[i];
            } else {
                opponentView = new OpponentView();
                opponentView.touchEnabled = true;
                opponentView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectedOpponent, this);
                opponentView.x = 200 * i;
                opponentView.level = opponentData[i];
                this.oppoContiner.addChild(opponentView);
                this.opponentList.push(opponentView);
            }


        }
    }

}