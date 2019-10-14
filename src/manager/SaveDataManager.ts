/**
 * 存档
 */
class SaveDataManager {

    private static instance: SaveDataManager = null;

    constructor() {
        this.init();
    }

    private userData: UserData = null;

    private isNew: boolean = true;
    private isGuideFinished: boolean = false;

    private init() {
        //this.userData = new UserData();
    }

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new SaveDataManager();
        }
        return this.instance;
    }

    public getUserData() {
        if (!this.userData) {
            this.userData = new UserData();
        }
        return this.userData;
    }

    public saveUserData() {
        this.userData.saveUserData();
    }

    public getFromLocal(tag): string {
        return egret.localStorage.getItem(tag);
    }

    public saveToLocal(tag, data) {
        egret.localStorage.setItem(tag, data);
    }


    /**
     * 声音存储
     * status: "1" playing "0" silence
     */
    public saveSoundStatus(status) {
        egret.localStorage.setItem("soundPlaying", status);
    }

    public getSoundStatus() {
        return egret.localStorage.getItem("soundPlaying");
    }

    /**
     * 语言设置
     */
    public getLang() {
        return egret.localStorage.getItem("lang")
    }

    public setLang(lang) {
        egret.localStorage.setItem("lang", lang);
    }

    /**
     * 
     */
    public getGuide() {
        return this.userData.guide;
    }

    public setGuide(data) {
        this.userData.guide = data;
    }

}
