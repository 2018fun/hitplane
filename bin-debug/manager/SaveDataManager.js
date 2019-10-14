var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 存档
 */
var SaveDataManager = (function () {
    function SaveDataManager() {
        this.userData = null;
        this.isNew = true;
        this.isGuideFinished = false;
        this.init();
    }
    SaveDataManager.prototype.init = function () {
        //this.userData = new UserData();
    };
    SaveDataManager.getInstance = function () {
        if (this.instance === null) {
            this.instance = new SaveDataManager();
        }
        return this.instance;
    };
    SaveDataManager.prototype.getUserData = function () {
        if (!this.userData) {
            this.userData = new UserData();
        }
        return this.userData;
    };
    SaveDataManager.prototype.saveUserData = function () {
        this.userData.saveUserData();
    };
    SaveDataManager.prototype.getFromLocal = function (tag) {
        return egret.localStorage.getItem(tag);
    };
    SaveDataManager.prototype.saveToLocal = function (tag, data) {
        egret.localStorage.setItem(tag, data);
    };
    /**
     * 声音存储
     * status: "1" playing "0" silence
     */
    SaveDataManager.prototype.saveSoundStatus = function (status) {
        egret.localStorage.setItem("soundPlaying", status);
    };
    SaveDataManager.prototype.getSoundStatus = function () {
        return egret.localStorage.getItem("soundPlaying");
    };
    /**
     * 语言设置
     */
    SaveDataManager.prototype.getLang = function () {
        return egret.localStorage.getItem("lang");
    };
    SaveDataManager.prototype.setLang = function (lang) {
        egret.localStorage.setItem("lang", lang);
    };
    /**
     *
     */
    SaveDataManager.prototype.getGuide = function () {
        return this.userData.guide;
    };
    SaveDataManager.prototype.setGuide = function (data) {
        this.userData.guide = data;
    };
    SaveDataManager.instance = null;
    return SaveDataManager;
}());
__reflect(SaveDataManager.prototype, "SaveDataManager");
