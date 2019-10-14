/**
 * 用户操作控制
 * 
 */
class PlayerHandleController {
    private static instance: PlayerHandleController = null;


    constructor() {
        if (PlayerHandleController.instance) {
            throw new Error("AIController singlon error")
        }
        this.init();
    }

    private init() {

    }

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new PlayerHandleController();
        }
        return this.instance;
    }


    public playerTouchedGameView(gridId) {
        if (GameController.getInstance().isHitGaming()) {
            if (GameController.getInstance().isAttackPhase) {
                if (RecordController.getInstance().isGridOpen(gridId)) {
                    SceneManager.getInstance().showTip(i18n.getInstance().getLanguage("tip_already_hit_this_place"));
                } else {
                    GameController.getInstance().hitGrid(gridId, BulletController.getInstance().useBullet());
                }


                // GameController.getInstance().hitGrid(gridId);
                // SceneManager.getInstance().awayScene.updateBullets();
            } else {

            }
        } else if (GameController.getInstance().isDoubleHitting()) {

        } else if (GameController.getInstance().isPlacing()) {
            SceneManager.getInstance().placingScene.rotationPlane(gridId);
        } else if (GameController.getInstance().isGuiding()) {
            GuideController.getInstance().hitGridGuide(gridId);
        }
    }

    /**
     * 
     * @param gridId 
     */
    public playerBeginMoveInGameView(gridId, e) {
        if (GameController.getInstance().isHitGaming() && GameController.getInstance().isAttackPhase) {
            // SceneManager.getInstance().awayScene.getGameView().setSelected(gridId);
            SceneManager.getInstance().awayScene.showTargetBullet(e);
            SceneManager.getInstance().awayScene.getGameView().showTouchEffect(gridId);
        } else if (GameController.getInstance().isPlacing()) {
            SceneManager.getInstance().placingScene.selectOneGrid(gridId);
        }

    }

    public playerMovingInGameView(gridId, e) {
        if (GameController.getInstance().isHitGaming() && GameController.getInstance().isAttackPhase) {
            // SceneManager.getInstance().awayScene.getGameView().setSelected(gridId);
            SceneManager.getInstance().awayScene.moveTargetBullet(e);
            SceneManager.getInstance().awayScene.getGameView().resetTouchEffect();
            SceneManager.getInstance().awayScene.getGameView().showTouchEffect(gridId);
        } else if (GameController.getInstance().isPlacing()) {
            SceneManager.getInstance().placingScene.movingOnePlane(gridId, e);
        }

    }

    public playerReleaseOnGameView(gridId, e) {
        if (GameController.getInstance().isHitGaming()) {
            // SceneManager.getInstance().awayScene.getGameView().setSelected(-1);
            SceneManager.getInstance().awayScene.cancelTargetBullet(e);
            SceneManager.getInstance().awayScene.getGameView().resetTouchEffect();
        } else if (GameController.getInstance().isPlacing()) {
            SceneManager.getInstance().placingScene.releaseOnePlane(gridId, e);
        }

    }

    public playerReleaseOut(gridId, e) {
        if (GameController.getInstance().isHitGaming()) {
            // SceneManager.getInstance().awayScene.getGameView().setSelected(-1);
            SceneManager.getInstance().awayScene.cancelTargetBullet(e);
            SceneManager.getInstance().awayScene.getGameView().resetTouchEffect();
        } else if (GameController.getInstance().isPlacing()) {
            // SceneManager.getInstance().placingScene.releaseOnePlane(gridId, e);
        }
    }

}