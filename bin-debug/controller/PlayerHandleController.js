var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 用户操作控制
 *
 */
var PlayerHandleController = (function () {
    function PlayerHandleController() {
        if (PlayerHandleController.instance) {
            throw new Error("AIController singlon error");
        }
        this.init();
    }
    PlayerHandleController.prototype.init = function () {
    };
    PlayerHandleController.getInstance = function () {
        if (this.instance === null) {
            this.instance = new PlayerHandleController();
        }
        return this.instance;
    };
    PlayerHandleController.prototype.playerTouchedGameView = function (gridId) {
        if (GameController.getInstance().isHitGaming()) {
            if (GameController.getInstance().isAttackPhase) {
                if (RecordController.getInstance().isGridOpen(gridId)) {
                    SceneManager.getInstance().showTip(i18n.getInstance().getLanguage("tip_already_hit_this_place"));
                }
                else {
                    GameController.getInstance().hitGrid(gridId, BulletController.getInstance().useBullet());
                }
                // GameController.getInstance().hitGrid(gridId);
                // SceneManager.getInstance().awayScene.updateBullets();
            }
            else {
            }
        }
        else if (GameController.getInstance().isDoubleHitting()) {
        }
        else if (GameController.getInstance().isPlacing()) {
            SceneManager.getInstance().placingScene.rotationPlane(gridId);
        }
        else if (GameController.getInstance().isGuiding()) {
            GuideController.getInstance().hitGridGuide(gridId);
        }
    };
    /**
     *
     * @param gridId
     */
    PlayerHandleController.prototype.playerBeginMoveInGameView = function (gridId, e) {
        if (GameController.getInstance().isHitGaming() && GameController.getInstance().isAttackPhase) {
            // SceneManager.getInstance().awayScene.getGameView().setSelected(gridId);
            SceneManager.getInstance().awayScene.showTargetBullet(e);
            SceneManager.getInstance().awayScene.getGameView().showTouchEffect(gridId);
        }
        else if (GameController.getInstance().isPlacing()) {
            SceneManager.getInstance().placingScene.selectOneGrid(gridId);
        }
    };
    PlayerHandleController.prototype.playerMovingInGameView = function (gridId, e) {
        if (GameController.getInstance().isHitGaming() && GameController.getInstance().isAttackPhase) {
            // SceneManager.getInstance().awayScene.getGameView().setSelected(gridId);
            SceneManager.getInstance().awayScene.moveTargetBullet(e);
            SceneManager.getInstance().awayScene.getGameView().resetTouchEffect();
            SceneManager.getInstance().awayScene.getGameView().showTouchEffect(gridId);
        }
        else if (GameController.getInstance().isPlacing()) {
            SceneManager.getInstance().placingScene.movingOnePlane(gridId, e);
        }
    };
    PlayerHandleController.prototype.playerReleaseOnGameView = function (gridId, e) {
        if (GameController.getInstance().isHitGaming()) {
            // SceneManager.getInstance().awayScene.getGameView().setSelected(-1);
            SceneManager.getInstance().awayScene.cancelTargetBullet(e);
            SceneManager.getInstance().awayScene.getGameView().resetTouchEffect();
        }
        else if (GameController.getInstance().isPlacing()) {
            SceneManager.getInstance().placingScene.releaseOnePlane(gridId, e);
        }
    };
    PlayerHandleController.prototype.playerReleaseOut = function (gridId, e) {
        if (GameController.getInstance().isHitGaming()) {
            // SceneManager.getInstance().awayScene.getGameView().setSelected(-1);
            SceneManager.getInstance().awayScene.cancelTargetBullet(e);
            SceneManager.getInstance().awayScene.getGameView().resetTouchEffect();
        }
        else if (GameController.getInstance().isPlacing()) {
            // SceneManager.getInstance().placingScene.releaseOnePlane(gridId, e);
        }
    };
    PlayerHandleController.instance = null;
    return PlayerHandleController;
}());
__reflect(PlayerHandleController.prototype, "PlayerHandleController");
