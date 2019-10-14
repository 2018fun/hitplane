/**
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var PlacingControlView = (function (_super) {
    __extends(PlacingControlView, _super);
    function PlacingControlView() {
        var _this = _super.call(this) || this;
        _this.INIT_STATUS = 0;
        _this.HISTORY_STATUS = 1;
        _this.initView();
        return _this;
    }
    PlacingControlView.prototype.initView = function () {
        this.controlViewBg = new egret.Bitmap();
        this.controlViewBg.texture = RES.getRes("control_bg_png");
        this.controlViewBg.width = AdaptSceenUtil.curWidth();
        // this.controlViewBg.x = ;
        // this.controlViewBg.width = AdaptSceenUtil.curWidth();
        this.addChild(this.controlViewBg);
        // this.controlViewBg.height = 180;
        this.historyButton = new E8TextButton(this, RES.getRes("btn_yellow_png"), this.onHistoryButtonTouched);
        this.historyButton.touchEnabled = true;
        this.historyButton.scale(0.8, 0.5);
        this.historyButton.x = AdaptSceenUtil.curWidth() - 3 * this.historyButton.width - 30;
        this.historyButton.y = 200;
        this.historyButton.setButtonText("分享历史");
        this.addChild(this.historyButton);
        this.shareButton = new E8TextButton(this, RES.getRes("btn_green_png"), this.shareButtonTouched);
        this.shareButton.touchEnabled = true;
        this.shareButton.scale(0.8, 0.5);
        this.shareButton.x = AdaptSceenUtil.curWidth() - 2 * this.historyButton.width - 20;
        this.shareButton.y = 200;
        this.shareButton.setButtonText("分享此地图");
        this.addChild(this.shareButton);
        this.randomButton = new E8TextButton(this, RES.getRes("btn_purple_png"), this.onRandomButtonTouched);
        this.randomButton.touchEnabled = true;
        this.randomButton.scale(0.5, 0.5);
        this.randomButton.x = AdaptSceenUtil.curWidth() - this.randomButton.width - 10;
        this.randomButton.y = 200;
        this.randomButton.setButtonText("随机");
        this.addChild(this.randomButton);
        this.titleTextField = new egret.TextField();
        this.titleTextField.x = 72;
        this.titleTextField.y = 18;
        this.titleTextField.bold = true;
        this.titleTextField.size = 28;
        // this.titleTextField.fontFamily = ""
        this.titleTextField.textAlign = egret.HorizontalAlign.CENTER;
        this.titleTextField.text = "我的飞机图";
        this.addChild(this.titleTextField);
        this.backButton = new E8Button(this, RES.getRes("back_png"), this.onBackButtonTouched);
        this.backButton.touchEnabled = true;
        this.backButton.x = -10 + this.backButton.width / 2;
        this.backButton.y = this.backButton.height / 2;
        this.backButton.visible = false;
        this.addChild(this.backButton);
        this.scrollView = new egret.ScrollView();
        this.mapController = new egret.Sprite();
        this.mapList = new Array();
        this.scrollView.x = 90;
        this.scrollView.width = AdaptSceenUtil.curWidth() - 90;
        this.scrollView.y = 80;
        this.scrollView.height = 200;
        this.scrollView.bounces = false;
        this.scrollView.touchEnabled = true;
        this.scrollView.setContent(this.mapController);
        this.addChild(this.scrollView);
        this.newMapButton = new E8Button(this, RES.getRes("new_map"), this.onRandomButtonTouched);
        this.newMapButton.x = this.newMapButton.width / 2;
        this.newMapButton.y = this.controlViewBg.height - this.newMapButton.height / 2;
        this.addChild(this.newMapButton);
        this.updateView();
    };
    PlacingControlView.prototype.mapTouched = function (e) {
        var map = e.target;
        // map
        PlacingController.getInstance().selectedSharedMap(map);
    };
    PlacingControlView.prototype.updateView = function () {
        if (this.status === this.HISTORY_STATUS) {
            this.shareButton.visible = false;
            this.randomButton.visible = false;
            this.historyButton.visible = false;
            this.scrollView.visible = true;
            this.newMapButton.visible = true;
            this.backButton.visible = true;
        }
        else {
            this.mapController.removeChildren();
            var map = void 0;
            var history_map = SaveDataManager.getInstance().getUserData().getSharedMap();
            for (var i = 0; i < history_map.length; i++) {
                map = new MiniGameView(history_map[i]);
                map.x = 200 * i;
                // map.y = this.controlViewBg.height - map.height;
                this.mapController.addChild(map);
                this.mapList.push(map);
                map.touchEnabled = true;
                map.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mapTouched, this);
            }
            this.shareButton.visible = true;
            this.randomButton.visible = true;
            this.historyButton.visible = true;
            this.scrollView.visible = false;
            this.newMapButton.visible = false;
            this.backButton.visible = false;
        }
    };
    PlacingControlView.prototype.shareButtonTouched = function () {
        PlacingController.getInstance().shareMap();
    };
    PlacingControlView.prototype.onRandomButtonTouched = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                SceneManager.getInstance().placingScene.resetView();
                PlacingController.getInstance().randomMap();
                return [2 /*return*/];
            });
        });
    };
    PlacingControlView.prototype.onHistoryButtonTouched = function () {
        this.status = this.HISTORY_STATUS;
        this.updateView();
    };
    PlacingControlView.prototype.onBackButtonTouched = function () {
        if (this.status === this.HISTORY_STATUS) {
            this.status = this.INIT_STATUS;
            this.updateView();
        }
    };
    return PlacingControlView;
}(egret.Sprite));
__reflect(PlacingControlView.prototype, "PlacingControlView");
