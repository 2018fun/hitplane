//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2018-present, Eyeball(E8) Technology. 
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY E8 AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL E8 AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        if (AdaptSceenUtil.curWidth() > AdaptSceenUtil.displayWidth() && AdaptSceenUtil.curHeight() > AdaptSceenUtil.displayHeight()) {
            egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
        }
        else {
            if (AdaptSceenUtil.curWidth() / AdaptSceenUtil.curHeight() < AdaptSceenUtil.displayWidth() / AdaptSceenUtil.displayHeight()) {
                egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            }
            else {
                egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            }
        }
        egret.lifecycle.addLifecycleListener(function (context) {
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
            CityController.getInstance().onPause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
            CityController.getInstance().onResume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showLoading();
                        return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 3:
                        userInfo = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.showLoading = function () {
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = AdvertiseController.getInstance();
                        return [4 /*yield*/, platform.fetchVedio()];
                    case 1:
                        _a.vedio = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 21, , 22]);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, RES.loadConfig("resource/loading.res.json", "resource/")];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, RES.loadConfig("resource/config.res.json", "resource/")];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, RES.loadConfig("resource/animate.res.json", "resource/")];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, RES.loadConfig("resource/placing.res.json", "resource/")];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, RES.loadConfig("resource/result.res.json", "resource/")];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, RES.loadConfig("resource/sound.res.json", "resource/")];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, RES.loadConfig("resource/guide.res.json", "resource/")];
                    case 10:
                        _b.sent();
                        return [4 /*yield*/, RES.loadGroup("config", 0)];
                    case 11:
                        _b.sent();
                        return [4 /*yield*/, RES.loadGroup("guide_res", 0)];
                    case 12:
                        _b.sent();
                        // await RES.loadGroup("animate", 0);
                        return [4 /*yield*/, RES.loadGroup("loading", 0)];
                    case 13:
                        // await RES.loadGroup("animate", 0);
                        _b.sent();
                        return [4 /*yield*/, RES.loadGroup("placing_scene", 0)];
                    case 14:
                        _b.sent();
                        return [4 /*yield*/, RES.loadGroup("scene", 0)];
                    case 15:
                        _b.sent();
                        SceneManager.getInstance().init(this.stage);
                        // const loadingView = SceneManager.getInstance().loadingScene;
                        // this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadGroup("away_scene", 0)];
                    case 16:
                        // const loadingView = SceneManager.getInstance().loadingScene;
                        // this.stage.addChild(loadingView);
                        _b.sent();
                        return [4 /*yield*/, RES.loadGroup("city_scene", 0)];
                    case 17:
                        _b.sent();
                        return [4 /*yield*/, RES.loadGroup("result_scene", 0)];
                    case 18:
                        _b.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0)];
                    case 19:
                        _b.sent();
                        return [4 /*yield*/, RES.loadGroup("sound", 0)];
                    case 20:
                        _b.sent();
                        return [3 /*break*/, 22];
                    case 21:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3 /*break*/, 22];
                    case 22: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        platform.initSDK();
        platform.onShow(function (res) {
            var query = res.query;
            if (query && query !== undefined && query.mapId !== undefined) {
                console.log("query");
                var mapId = query.mapId;
                GuideController.getInstance().guideFinished();
                GameController.getInstance().attackSharedMap(mapId);
            }
        });
        // platform.enterFrom();
        /**
         * UI界面
         */
        SceneManager.getInstance().initUIView();
        /**
         * 计算离线 行为
         */
        AIController.getInstance().calOffline();
        BuildingDataCache.getInstance();
        /**
         * 游戏主场景
         */
        SceneManager.getInstance().prepareScene();
        // 通过不同入口，进入不同界面
        var launchOption = platform.getLaunchOption();
        var query = launchOption.query;
        if (query && query !== undefined && query.mapId !== undefined) {
            console.log("query");
            var mapId = query.mapId;
            GuideController.getInstance().guideFinished();
            GameController.getInstance().attackSharedMap(mapId);
        }
        else {
            if (GuideController.getInstance().isFinished()) {
                SceneManager.getInstance().toCityScene();
            }
            else {
                GameController.getInstance().attackOpponent();
            }
        }
        // platform.callFunction("setMapData", { mapId: 123456, isWin: false, bullets: 15 }, () => {
        // })
        // SoundManager.getInstance().playBGM();
        // SceneManager.getInstance().toCityScene();
        // SceneManager.getInstance().toPlacingScene();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
