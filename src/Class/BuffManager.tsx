/*
 * @Author: SilentVver silentwaver.code@gmail.com
 * @Date: 2024-11-10 18:07:23
 * @LastEditors: SilentVver silentwaver.code@gmail.com
 * @LastEditTime: 2025-01-05 21:21:54
 * @Description: 
 * 
 */
import { Component } from "react";
import { BuffType, CardType } from "../types";
import { buffDic } from "../data";
import Buff from "../Components/Class/Buff";
import { BUFF_DURATION_TYPE, BUFF_SECTION, BUFF_TRIGGER_TYPE, CARD_TYPE } from '../Constants/enum';


let instance = null;
class BuffManager extends Component {
    
    state= {
        buffMap:new Map() as Map<number,Buff> };

    constructor(props?) {
        super(props);
        if (instance) return instance;
        instance = this;
    }

    addBuff(buffId: number, stack) {
        if (buffId >= 0) {
            if (!this.state.buffMap.has(buffId)) {
                const buffInfo = buffDic[buffId]
                this.state.buffMap.set(buffId, new Buff({ buffInfo }))
            }
            const buffIns = this.state.buffMap.get(buffId)
            buffIns.changeStack(stack)
            this.setState({ buffMap: this.state.buffMap })
        }
    }

    calBuff(cardInfo) {
        let SectionWeight: any[] = [{ atk: 0, def: 0 }, { atk: 0 }]
        const buffLs = Array.from(this.state.buffMap.values())
        buffLs.forEach((buffIns) => {
            console.log(buffIns.triggerType, 'ttype')
            SectionWeight[0] = buffIns.execute(BUFF_TRIGGER_TYPE.USE_CARD, BUFF_SECTION.A, SectionWeight[0])
        })
        buffLs.forEach((buffIns) => {
            console.log(buffIns.triggerType, 'ttype')
            SectionWeight[1] = buffIns.execute(BUFF_TRIGGER_TYPE.USE_CARD, BUFF_SECTION.B, SectionWeight[1])
        })
        console.log(JSON.stringify(SectionWeight), 'SectionWeight')
        let atk = Math.ceil((cardInfo.atk + SectionWeight[0].atk) * (1 + SectionWeight[1].atk))
        let def = cardInfo.def + SectionWeight[0].def
        return { ...cardInfo, atk, def };
    }

    decBuffStackOnTurnEnd() {
        Array.from(this.state.buffMap.entries()).forEach(([buffId, buffIns]) => {
            if (buffIns.durationType === BUFF_DURATION_TYPE.TURN) {
                buffIns.changeStack(-1)
                if (buffIns.getStack() === 0) {
                    this.state.buffMap.delete(buffId)
                }
            }
        })
    }

    destoryIns(){
        instance = null
    }

    render() {
        return (<> 
        {
        Array.from(this.state.buffMap.values())
        .map((buffIns) => {
            console.log(buffIns.name)
            return buffIns.render()
        })}</>)
    }

}

export default  BuffManager;