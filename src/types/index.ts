/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-10-30 21:34:29
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-11-07 23:28:01
 * @Description: 
 * 
 */

import { Component } from "react";

/** 战斗内卡牌 */
export interface CardType {
    nameStr: string;
    cost: number;
    atk: number;
    def?: number;
    buff?:Object;
}

export interface BuffType {
    desc:string;
    comp:Component;
}

/** 日程信息 */
export interface DateType {
    list: Array<any>;
    type: string;
    round?: number;
}

export interface HPBarType {
    hp: number;
    shield:number;
}
