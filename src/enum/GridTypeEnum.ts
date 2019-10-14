/**
 * Created by tishoy on 15/1/31.
 * 格子类型枚举
 */
module GridTypeEnum {
  export const UNSET: number = -1;
  /**
    *  格子空
    */
  export const MISS: number = 0;
  /**
    *  格子中
    */
  export const BODY: number = 1;
  /**
    *  格子头
    */
  export const HEAD: number = 2;
  /**
    *  宝箱    //打算设置在角落里
    */
  export const GIFT: number = 3;
  /**
    *  金币    //打算设置在角落里
    */
  export const GOLD: number = 4;
  /**
   * 传送点
   */
  export const TELEPORT: number = 5;
} 