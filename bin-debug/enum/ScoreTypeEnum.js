/**
 *
 */
var ScoreTypeEnum;
(function (ScoreTypeEnum) {
    /**
     *
     */
    ScoreTypeEnum.NO_SCORE = 0;
    ScoreTypeEnum.YOU_ARE_CHEATER = 3;
    /**
     * SSS
     */
    ScoreTypeEnum.SSS = 5;
    /**
     *  S
     */
    ScoreTypeEnum.S = 10;
    /**
      *  A
      */
    ScoreTypeEnum.A = 15;
    /**
      *  B
      */
    ScoreTypeEnum.B = 20;
    ScoreTypeEnum.C = 81;
    ScoreTypeEnum.SCORE = [ScoreTypeEnum.SSS, ScoreTypeEnum.S, ScoreTypeEnum.A, ScoreTypeEnum.B, ScoreTypeEnum.C];
})(ScoreTypeEnum || (ScoreTypeEnum = {}));
