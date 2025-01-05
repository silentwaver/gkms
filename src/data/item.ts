/*
 * @Author: SilentVver silentwaver.code@gmail.com
 * @Date: 2024-11-22 21:20:23
 * @LastEditors: SilentVver silentwaver.code@gmail.com
 * @LastEditTime: 2025-01-04 13:51:19
 * @Description: 
 * 
 */
import { BUFF_TRIGGER_TYPE, ITEM_TRIGGER_TYPE } from "../Constants/enum";

const item = [
{
    id:0,
    name:'item1',
    desc:'回合开始时,若处于好调状态,好調+2',
    effects:[],
    trigger:function(lessonInfo){
        if(lessonInfo.buff.has(0)){
            lessonInfo.buff.get(0).changeStack(2)
        }
    },
    itemType: ITEM_TRIGGER_TYPE.BATTLE,
}
]
export default item;