/*
 * @Author: SilentVver silentwaver.code@gmail.com
 * @Date: 2024-11-22 21:20:23
 * @LastEditors: SilentVver silentwaver.code@gmail.com
 * @LastEditTime: 2025-01-04 13:45:30
 * @Description: 
 * 
 */
export enum BUFF_TYPE {
    /** 数值型,直接导致角色数值变化 */
    VALUE,
    /** 状态型,不直接影响角色数值 */
    STATUS
}

export enum BUFF_DURATION_TYPE{
    /** 永久 */
    PERMANENT,
    /** 随回合变化 */
    TURN
}

export enum BUFF_TRIGGER_TYPE {
    TURN_START,
    TURN_END,
    BEFORE_ATTACK,
    AFTER_ATTACK,
    USE_CARD,
}

export enum BUFF_SECTION {
    A,
    B,
}

export enum ITEM_TRIGGER_TYPE {
    /** 戰鬥中 */
    BATTLE,
    /** 流程中 */
    PHASE
}

export enum CARD_TYPE {
    ACTION,
    MENTAL
}