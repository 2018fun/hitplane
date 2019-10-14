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

class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        if (AdaptSceenUtil.curWidth() > AdaptSceenUtil.displayWidth() && AdaptSceenUtil.curHeight() > AdaptSceenUtil.displayHeight()) {
            egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
        } else {
            if (AdaptSceenUtil.curWidth() / AdaptSceenUtil.curHeight() < AdaptSceenUtil.displayWidth() / AdaptSceenUtil.displayHeight()) {
                egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            } else {
                egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            }
        }
        egret.lifecycle.addLifecycleListener((context) => {

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
            CityController.getInstance().onPause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
            CityController.getInstance().onResume();

        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {

        this.showLoading();


        await this.loadResource();
        this.createGameScene();

        await platform.login();
        const userInfo = await platform.getUserInfo();

    }

    private showLoading() {

    }

    private async loadResource() {
         AdvertiseController.getInstance().initAd();

        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadConfig("resource/loading.res.json", "resource/");
            await RES.loadConfig("resource/config.res.json", "resource/");
            await RES.loadConfig("resource/animate.res.json", "resource/");
            await RES.loadConfig("resource/placing.res.json", "resource/");
            await RES.loadConfig("resource/result.res.json", "resource/");
            await RES.loadConfig("resource/sound.res.json", "resource/");
            await RES.loadConfig("resource/guide.res.json", "resource/");
            await RES.loadGroup("config", 0);
            await RES.loadGroup("guide_res", 0);
            // await RES.loadGroup("animate", 0);
            await RES.loadGroup("loading", 0);
            await RES.loadGroup("placing_scene", 0);
            await RES.loadGroup("scene", 0);
            SceneManager.getInstance().init(this.stage);
            // const loadingView = SceneManager.getInstance().loadingScene;
            // this.stage.addChild(loadingView);
            await RES.loadGroup("away_scene", 0);
            await RES.loadGroup("city_scene", 0);
            await RES.loadGroup("result_scene", 0);
            await RES.loadGroup("preload", 0);
            await RES.loadGroup("sound", 0);

            // this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }


    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {

        platform.initSDK();
        platform.onShow((res) => {
            let query = res.query;
            if (query && query !== undefined && query.mapId !== undefined) {
                console.log("query");
                let mapId = query.mapId;
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

        let launchOption = platform.getLaunchOption();
        let query = launchOption.query;
        if (query && query !== undefined && query.mapId !== undefined) {
            console.log("query");
            let mapId = query.mapId;
            GuideController.getInstance().guideFinished();
            GameController.getInstance().attackSharedMap(mapId);
        } else {
            if (GuideController.getInstance().isFinished()) {
                SceneManager.getInstance().toCityScene();
            } else {
                GameController.getInstance().attackOpponent();
            }
        }

        // platform.callFunction("setMapData", { mapId: 123456, isWin: false, bullets: 15 }, () => {

        // })

        // SoundManager.getInstance().playBGM();



        // SceneManager.getInstance().toCityScene();
        // SceneManager.getInstance().toPlacingScene();

    }
}