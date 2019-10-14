var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SettingController = (function () {
    function SettingController() {
        this.init();
    }
    SettingController.prototype.init = function () {
    };
    SettingController.getInstance = function () {
        if (this.instance === null) {
            this.instance = new SettingController();
        }
        return this.instance;
    };
    Object.defineProperty(SettingController.prototype, "SoundPlaying", {
        get: function () {
            if (this._soundPlaying === undefined) {
                var soundPlaying = SaveDataManager.getInstance().getSoundStatus();
                if (soundPlaying === null || soundPlaying === undefined || soundPlaying === "" || soundPlaying === "1") {
                    this.SoundPlaying = true;
                }
                else {
                    this._soundPlaying = soundPlaying === "1" ? true : false;
                }
            }
            return this._soundPlaying;
        },
        set: function (playing) {
            this._soundPlaying = playing;
            if (playing) {
                SaveDataManager.getInstance().saveSoundStatus("1");
                SoundManager.getInstance().playBGM();
            }
            else {
                SaveDataManager.getInstance().saveSoundStatus("0");
                SoundManager.getInstance().stopBGM();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingController.prototype, "Lang", {
        get: function () {
            if (this._lang === undefined) {
                var lang = SaveDataManager.getInstance().getLang();
                if (lang === null || lang === undefined || lang === "") {
                    this._lang = "zh_CN";
                }
                else {
                    this._lang = lang;
                }
            }
            return this._lang;
        },
        set: function (lang) {
            SaveDataManager.getInstance().setLang(lang);
            this._lang = lang;
        },
        enumerable: true,
        configurable: true
    });
    SettingController.instance = null;
    return SettingController;
}());
__reflect(SettingController.prototype, "SettingController");
