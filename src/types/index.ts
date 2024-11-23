/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-10-30 21:34:29
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-11-09 10:13:31
 * @Description: 
 * 
 */
import { CARD_TYPE } from "../Constants/enum";

/** 战斗内卡牌 */
export interface CardType {
    nameStr: string;
    cost: number;
    atk: number;
    type: CARD_TYPE
    def?: number;
    buffId?: number;
    stack?: number;
    isOnce?:boolean;

}

export interface EffectType {
    id: number,
    desc: string;
    execute: (cardInfo: CardType, buffInfo?: any) => CardType;
}
export interface BuffType {
    stack: number;
    effects: Array<EffectType>
}

/** 日程信息 */
export interface DateType {
    list: Array<any>;
    type: string;
    round?: number;
}

export interface HPBarType {
    hp: number;
    shield: number;
}

