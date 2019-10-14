var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
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
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.initSDK = function () {
    };
    DebugPlatform.prototype.onShow = function (func) {
    };
    DebugPlatform.prototype.initAnalytics = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        gameKey: "02a2d376f1268780cdeb969e3385bae2",
                        secretKey: "9b426779362d3259747c55f90ce0a40500524bcb"
                    }];
            });
        });
    };
    DebugPlatform.prototype.analytics = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(key, value);
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.setLifeCycleCallBack = function (onPause, onResume) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                egret.lifecycle.onPause = function () {
                    onPause();
                };
                egret.lifecycle.onResume = function () {
                    onResume();
                };
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.setLoadingProgress = function (per) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.loadingComplete = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.print = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(msg);
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.existRank = function () {
        return false;
    };
    DebugPlatform.prototype.getRank = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        console.log("获取");
                        resolve([
                            { "nick": "哈N她!)|A(1", "score": 5, "selfFlag": 1, "url": "http://thirdqq.qlogo.cn/g?b=sdk&k=F7aCnicxWzpicK89d0gkh7cw&s=100&t=1516260478" },
                            { "nick": "哈N她!)A(2", "score": 5, "selfFlag": 1, "url": "http://thirdqq.qlogo.cn/g?b=sdk&k=F7aCnicxWzpicK89d0gkh7cw&s=100&t=1516260478" },
                            { "nick": "哈N她!)|A(3", "score": 5, "selfFlag": 1, "url": "http://thirdqq.qlogo.cn/g?b=sdk&k=F7aCnicxWzpicK89d0gkh7cw&s=100&t=1516260478" },
                            { "nick": "哈N她!)|A(4", "score": 5, "selfFlag": 1, "url": "http://thirdqq.qlogo.cn/g?b=sdk&k=F7aCnicxWzpicK89d0gkh7cw&s=100&t=1516260478" },
                            { "nick": "哈N她!)|A(5", "score": 5, "selfFlag": 1, "url": "http://thirdqq.qlogo.cn/g?b=sdk&k=F7aCnicxWzpicK89d0gkh7cw&s=100&t=1516260478" },
                            { "nick": "哈N她!)|A(6", "score": 5, "selfFlag": 1, "url": "http://thirdqq.qlogo.cn/g?b=sdk&k=F7aCnicxWzpicK89d0gkh7cw&s=100&t=1516260478" },
                            { "nick": "哈N她!)|A(7", "score": 5, "selfFlag": 1, "url": "http://thirdqq.qlogo.cn/g?b=sdk&k=F7aCnicxWzpicK89d0gkh7cw&s=100&t=1516260478" },
                            { "nick": "哈N她!)|A(8", "score": 5, "selfFlag": 1, "url": "http://thirdqq.qlogo.cn/g?b=sdk&k=F7aCnicxWzpicK89d0gkh7cw&s=100&t=1516260478" },
                            { "nick": "哈N她!)|A(9", "score": 5, "selfFlag": 1, "url": "http://thirdqq.qlogo.cn/g?b=sdk&k=F7aCnicxWzpicK89d0gkh7cw&s=100&t=1516260478" },
                            { "nick": "哈N她!)|A(10", "score": 5, "selfFlag": 1, "url": "http://thirdqq.qlogo.cn/g?b=sdk&k=F7aCnicxWzpicK89d0gkh7cw&s=100&t=1516260478" },
                            { "nick": "哈N她!)|A(11", "score": 5, "selfFlag": 1, "url": "http://thirdqq.qlogo.cn/g?b=sdk&k=F7aCnicxWzpicK89d0gkh7cw&s=100&t=1516260478" },
                            { "nick": "哈N她!)|A(12", "score": 5, "selfFlag": 1, "url": "http://thirdqq.qlogo.cn/g?b=sdk&k=F7aCnicxWzpicK89d0gkh7cw&s=100&t=1516260478" },
                            { "nick": "哈N她!)|A(13", "score": 5, "selfFlag": 1, "url": "http://thirdqq.qlogo.cn/g?b=sdk&k=F7aCnicxWzpicK89d0gkh7cw&s=100&t=1516260478" },
                            { "nick": "哈N她!)|A(14", "score": 5, "selfFlag": 1, "url": "http://thirdqq.qlogo.cn/g?b=sdk&k=F7aCnicxWzpicK89d0gkh7cw&s=100&t=1516260478" }
                        ]);
                    })];
            });
        });
    };
    DebugPlatform.prototype.share = function (title, url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(title);
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.uploadRank = function (key, score) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, score];
            });
        });
    };
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.offsetHead = function () {
        return 0;
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.fetchBanner = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, null];
            });
        });
    };
    DebugPlatform.prototype.showBanner = function (banner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.hideBanner = function (banner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.fetchInterstitial = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, null];
            });
        });
    };
    DebugPlatform.prototype.showInterstitial = function (interstitialAd) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.fetchVedio = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, null];
            });
        });
    };
    DebugPlatform.prototype.reloadVedio = function (vedio) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.vedioPlay = function (vedio, onPlay, onEnd) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                onEnd(true);
                return [2 /*return*/];
            });
        });
    };
    /**获得文件内容 */
    DebugPlatform.prototype.getSaveData = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { key: "key" }];
            });
        });
    };
    /**文件中写入 */
    DebugPlatform.prototype.setSaveData = function (fileName, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.rankView = function (show) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.getGameRecorderManager = function () {
        return null;
    };
    DebugPlatform.prototype.shareVedio = function (onShare) {
    };
    DebugPlatform.prototype.showTip = function (title) {
    };
    DebugPlatform.prototype.stopRecord = function () {
    };
    DebugPlatform.prototype.pauseRecord = function () {
    };
    DebugPlatform.prototype.resumeRecord = function () {
    };
    DebugPlatform.prototype.startRecord = function () {
    };
    DebugPlatform.prototype.loadNextStage = function (newLoadStage) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [2 /*return*/];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    DebugPlatform.prototype.loadFont = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.getAppName = function () {
        return "";
    };
    DebugPlatform.prototype.hasBannerSDK = function () {
        return false;
    };
    DebugPlatform.prototype.hasInterstitialSDK = function () {
        return false;
    };
    DebugPlatform.prototype.hasVedioSDK = function () {
        return false;
    };
    DebugPlatform.prototype.hasShareSDK = function () {
        return false;
    };
    DebugPlatform.prototype.hasShareVedioSDK = function () {
        return false;
    };
    DebugPlatform.prototype.openScheme = function () {
    };
    DebugPlatform.prototype.getLaunchOption = function () {
        return {};
    };
    DebugPlatform.prototype.callFunction = function (func, data, callback) {
        callback();
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
    window.platform.name = "web";
}
