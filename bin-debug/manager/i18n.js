var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var i18n = (function () {
    function i18n() {
        this.langData = RES.getRes("language_json");
    }
    i18n.getInstance = function () {
        if (this.instance === null) {
            this.instance = new i18n();
        }
        return this.instance;
    };
    i18n.prototype.getLanguage = function (word) {
        return this.langData[SettingController.getInstance().Lang][word];
    };
    i18n.instance = null;
    return i18n;
}());
__reflect(i18n.prototype, "i18n");
