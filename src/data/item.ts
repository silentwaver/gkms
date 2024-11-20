import { BUFF_TRIGGER_TYPE } from "../Constants/enum";

const item = [
{
    id:0,
    name:'item1',
    desc:'回合开始时,若处于好调状态,手牌使用数+1',
    effects:[],
    trigger:BUFF_TRIGGER_TYPE.TURN_START
}
]
export default item;