import { CardType, EffectType } from "../types";

/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-11-08 17:19:16
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-11-09 10:23:58
 * @Description: 
 * 
 */
const effectDic: Array<EffectType> = [
    {
        id: 0,
        desc: "攻击力提高50%",
        execute(cardInfo) {
            const { atk } = cardInfo;
            return { ...cardInfo, atk: atk + 0.5 }
        }
    },
    {
        id: 1,
        desc: '每层使攻击力加1',
        execute(cardInfo, buffInfo) {
            const { atk } = cardInfo;
            const { stack } = buffInfo;
            return { ...cardInfo, atk: atk + stack }
        }
    },
    {
        id: 2,
        desc: '每层使护盾增加值加1',
        execute(cardInfo, buffInfo) {
            const { def } = cardInfo;
            const { stack } = buffInfo;
            return { ...cardInfo, def: def + stack }
        }
    },
    {
        id:3,
        desc:'手牌使用数+1',
        execute(cardInfo){
            
            return {...cardInfo}
        }
    }
]

export default effectDic;