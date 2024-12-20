import { CARD_TYPE } from "../Constants/enum";
import { CardType } from "../types";

/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-10-30 21:51:32
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-12-20 16:43:31
 * @Description: 
 * 
 */
export const CardList: Array<CardType> = [
    {
        nameStr: 'atk1',
        cost: 1,
        atk: 9,
        def: 2,
        type:CARD_TYPE.ACTION
    },
    {
        nameStr: 'atk2',
        cost: 3,
        atk: 17,
        type:CARD_TYPE.ACTION
    },
    {
        nameStr: 'atk2',
        cost: 3,
        atk: 17,
        type:CARD_TYPE.ACTION
    },
    {
        nameStr: 'atk3',
        cost: 5,
        atk: 30,
        type:CARD_TYPE.ACTION,
        isOnce:true
    },
    {
        nameStr: '集中+3',
        cost: 0,
        atk: 0,
        def: 7,
        buffId:1,
        stack:3,
        type:CARD_TYPE.MENTAL
    },
    {
        nameStr: '好调+2',
        cost: 3,
        atk: 3,
        buffId:0,
        stack:2,
        type:CARD_TYPE.ACTION
    },
    {
        nameStr: '护盾+7',
        cost: 0,
        atk: 0,
        def: 7,
        type:CARD_TYPE.MENTAL
    },
    {
        nameStr: '干劲+5',
        cost: 2,
        atk: 0,
        buffId:2,
        stack:5,
        type:CARD_TYPE.MENTAL
    },
]