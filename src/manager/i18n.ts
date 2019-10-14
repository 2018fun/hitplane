/**
 * 
 */
class i18n {
    private static instance: i18n = null;
    private langData;

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new i18n();
        }
        return this.instance;
    }

    public getLanguage(word) {
        return this.langData[SettingController.getInstance().Lang][word];
    }

    constructor() {
        this.langData = RES.getRes("language_json");
    }
}