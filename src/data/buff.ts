/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-11-08 17:19:22
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-11-09 10:22:48
 * @Description: 
 * 
 */
import { BUFF_DURATION_TYPE, BUFF_SECTION, BUFF_TRIGGER_TYPE, BUFF_TYPE } from "../Constants/enum";

const buffDic = [
    {
        name: '好调',
        id: 0,
        desc: "分数增加50%",
        type: BUFF_TYPE.VALUE,
        duration: BUFF_DURATION_TYPE.TURN,
        trigger: BUFF_TRIGGER_TYPE.USE_CARD,
        effectID: [0],
        isStack: true,
        section: BUFF_SECTION.B
    },
    {
        name: '集中',
        id: 1,
        desc: "每层使分数增加1",
        type: BUFF_TYPE.VALUE,
        duration: BUFF_DURATION_TYPE.PERMANENT,
        trigger: BUFF_TRIGGER_TYPE.USE_CARD,
        effectID: [1],
        isStack: true,
        section: BUFF_SECTION.A
    },
    {
        name: '干劲',
        id:2,
        desc:"每层使护盾增加值+1",
        type: BUFF_TYPE.VALUE,
        duration: BUFF_DURATION_TYPE.PERMANENT,
        trigger: BUFF_TRIGGER_TYPE.USE_CARD,
        effectID: [2],
        isStack: true,
        section: BUFF_SECTION.A
    }
]
export default buffDic;