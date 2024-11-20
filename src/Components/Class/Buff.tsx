/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-11-07 10:50:11
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-11-09 10:32:38
 * @Description: buff类
 * 
 */
import { Component } from "react";
import { BUFF_DURATION_TYPE, BUFF_SECTION, BUFF_TRIGGER_TYPE, BUFF_TYPE } from "../../Constants/enum";
import {  CardType } from "../../types";
import effectDic from "../../data/effect";

class Buff extends Component {
    name: string;
    id: number;
    desc: string;

    buffType: BUFF_TYPE;
    durationType: BUFF_DURATION_TYPE;
    triggerType: BUFF_TRIGGER_TYPE;
    section: BUFF_SECTION;
    isStack: boolean;
    #stack: number = 0;
    effects= []

    constructor(props: {  buffInfo: any }) {
        super(props)

        const {  buffInfo } = props
        const { name, id, desc, type, duration, trigger, effectID, isStack,section } = buffInfo

        this.name = name;
        this.id = id;
        this.desc = desc;
        this.buffType = type;
        this.durationType = duration;
        this.triggerType = trigger;
        this.isStack = isStack;
        this.section = section

        for (const effect of effectID) {
            this.effects.push(effectDic[effect])
        }
   
    }

    changeStack(_stack:number){
        if(this.isStack) {
           this.#stack += _stack
        }
    }

    getStack(){
        return this.#stack;
    }
    
    execute(trigger: BUFF_TRIGGER_TYPE,section:BUFF_SECTION,cardInfo:CardType) {
        if (trigger === this.triggerType && this.section === section) {
            let _cardInfo = {...cardInfo}
            for (const effect of this.effects) {
                _cardInfo =  effect.execute(_cardInfo,{stack:this.#stack})
            }
            return _cardInfo
        }
        return cardInfo;
    }


    render() {
        return (
            <div>
                {this.name}({this.#stack})
            </div>
        )
    }
}

export default Buff;