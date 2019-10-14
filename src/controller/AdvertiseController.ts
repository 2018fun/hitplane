/**
 * 广告组件
 * creat by tishoy
 * 2019.10.3
 */
class AdvertiseController {
    private static instance: AdvertiseController = null;

    private _vedioAd;
    private _interstitialAd;
    private _bannerAd;

    constructor() {
        if (AdvertiseController.instance) {
            throw new Error("AdvertiseController singlon error")
        }
    }

    public async initAd() {
        this._vedioAd = await platform.fetchVedio();
        this._interstitialAd = await platform.fetchInterstitial();
        this._bannerAd = await platform.fetchBanner();
    }

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new AdvertiseController();
        }
        return this.instance;
    }

    public get vedio() {
        return this._vedioAd;
    }

    public get interstitial() {
        return this._interstitialAd;
    }

    public get banner() {
        return this._bannerAd;
    }

    public setBannerPosition(x, y, width, height) {
    }

    public showBanner() {
        platform.showBanner(this.banner);
    }

    public showVedio(onPlay, onEnd) {
        platform.vedioPlay(this.vedio, onPlay, onEnd);
    }

    public showInterstitial() {
        
    }

}