/**
 * 声音管理
 * create by tishoy
 * 2018.8.8
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundManager = (function () {
    function SoundManager() {
        this.init();
    }
    SoundManager.prototype.init = function () {
        if (SoundManager.instance !== null) {
            throw new Error("single instance error");
        }
        // this.loadBGM();
    };
    SoundManager.getInstance = function () {
        if (this.instance === null) {
            this.instance = new SoundManager();
        }
        return this.instance;
    };
    SoundManager.prototype.loadBGM = function () {
        var sound = new egret.Sound();
        var url = "resource/assets/sound.mp3";
        //添加加载完成侦听
        sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //开始加载
        sound.load(url);
    };
    SoundManager.prototype.onLoadComplete = function (event) {
        this.bgm = event.target;
        //播放音乐
        this.bgmChannel = this.bgm.play(0, 0);
    };
    SoundManager.prototype.playBGM = function () {
        if (SettingController.getInstance().SoundPlaying) {
            if (this.bgm === undefined || this.bgm === null) {
                this.bgm = RES.getRes(SoundEnum.BACKGROUND_MP3);
                if (this.bgm === undefined || this.bgm === null) {
                    return;
                }
            }
            this.bgmChannel = this.bgm.play(0, 0);
        }
    };
    SoundManager.prototype.playSound = function (sound_res, loop) {
        if (loop === void 0) { loop = 1; }
        if (SettingController.getInstance().SoundPlaying) {
            var sound = RES.getRes(sound_res);
            if (sound === undefined || sound === null) {
                return;
            }
            this.soundChannel = sound.play(0, loop);
        }
    };
    SoundManager.prototype.onPlayOver = function () {
        // this.map[sound_res] = null;
    };
    SoundManager.prototype.stopBGM = function () {
        this.bgmChannel.stop();
        if (this.soundChannel !== undefined) {
            this.soundChannel.stop();
        }
    };
    SoundManager.instance = null;
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
