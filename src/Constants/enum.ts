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

export enum CARD_TYPE {
    ACTION,
    MENTAL
}