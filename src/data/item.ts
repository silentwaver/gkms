/*
 * @Author: SilentVver silentwaver.code@gmail.com
 * @Date: 2024-11-22 21:20:23
 * @LastEditors: SilentVver silentwaver.code@gmail.com
 * @LastEditTime: 2025-01-06 18:37:35
 * @Description: 
 * 
 */
import BuffManager from "../Class/BuffManager";
import { BUFF_TRIGGER_TYPE, ITEM_TRIGGER_TYPE } from "../Constants/enum";
const itemDic = [
{
    id:0,
    name:'item1',
    desc:'回合开始时,若处于好调状态,好調+2',
    effects:[],
    trigger:function(lessonInfo:{buff:BuffManager}){
        if(lessonInfo.buff.checkBuff(0)){
            lessonInfo.buff.getBuffIns(0).changeStack(2)
            return true
        }
        return false
    },
    itemType: ITEM_TRIGGER_TYPE.BATTLE,
}
]
export default itemDic;