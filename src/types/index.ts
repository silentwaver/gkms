/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-10-30 21:34:29
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-11-06 23:13:06
 * @Description: 
 * 
 */
/** 战斗内卡牌 */
export interface CardType {
    nameStr: string;
    cost: number;
    atk: number;
    def?: number;
}

/** 日程信息 */
export interface DateType {
    list: Array<any>;
    type: string;
    round?: number;
}

export interface HPBarType {
    hp: number;
}
