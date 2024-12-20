/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-10-29 15:50:26
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-12-20 17:16:38
 * @Description: 
 * 
 */

import React, { useEffect, useState } from 'react';
import { Button, Progress } from 'antd';
import { CardType } from '../../types';
import HPBar from '../../Components/Class/HPBar';
import CardArea from '../../Components/CardArea';
import Buff from '../../Components/Class/Buff';
import { buffDic } from '../../data';
import { BUFF_DURATION_TYPE, BUFF_SECTION, BUFF_TRIGGER_TYPE, CARD_TYPE } from '../../Constants/enum';
export default function Lesson(props) {
    const firstHP = 75;
    const secHP = 100;
    const { processEnd, type, cardList, round } = props;
    const [damage, setDamage] = useState(0)
    const [leftTurn, setLeftTurn] = useState<number>(round)
    // const [extraTurn,setExtraTurn] = useState<number>(0)
    const [buffMap, setBuffMap] = useState(new Map())
    const [itemList,setItemList] = useState([])
    const [remainCardUses,setRemainCardUses] = useState(0)
    const _HPBar = new HPBar({});

    useEffect(() => {
        if (leftTurn  < 1) {
            // 结束
            _exit()
        }
        onTurnStart()
    }, [leftTurn])

    function getPercent() {
        if (damage < firstHP) {
            return Math.floor((damage / firstHP) * 100)
        }
        else {
            return Math.floor(((damage - firstHP) / secHP) * 100)
        }
    }

    function getRestHP() {
        if (damage < firstHP) {
            return firstHP - damage;
        }
        else {
            return Math.max(secHP + firstHP - damage, 0);
        }
    }

    function handleRest() {
        _HPBar.setHP(2)
        onTurnEnd()
    }

    function onUseCard(cardInfo: CardType) {
        const { cost, atk, def, buffId, stack, type } = cardInfo

        if (buffId >= 0) {
            if (!buffMap.has(buffId)) {
                const buffInfo = buffDic[buffId]
                buffMap.set(buffId, new Buff({ buffInfo }))
            }
            const buffIns = buffMap.get(buffId)
            buffIns.changeStack(stack)
            setBuffMap(new Map(buffMap))
        }
        const calCardInfo = calculateCardInfo(cardInfo)
        console.log(JSON.stringify(calCardInfo), 'calCardInfo')
        _HPBar.setHP(-(calCardInfo.cost), calCardInfo.def)
        if (type === CARD_TYPE.ACTION) { setDamage(damage + calCardInfo.atk); }
        if(remainCardUses){

        setRemainCardUses(remainCardUses-1)
        }else{
            onTurnEnd()
        }
        
    }

    function calculateCardInfo(cardInfo) {
        // let _cardInfo ={...cardInfo};
        let SectionWeight = [{ atk: 0 ,def:0}, { atk: 0 }]
        const buffLs = Array.from(buffMap.values())
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
        let def = cardInfo.def+SectionWeight[0].def
        return { ...cardInfo, atk,def };

    }
    

    function _enter() {
        initCombat()
    }

    function _exit() {
        _HPBar.clearShield()
        processEnd({ [type]: Math.min(damage, firstHP + secHP) })
    }

    function initCombat() {

        beginCombat()
    }

    function beginCombat() {

    }

    function onTurnStart(){
        itemList.forEach(value=>{
            
        })
    }

    function onTurnEnd() {
        // 牌山整理

        // turnBuff减少
        Array.from(buffMap.entries()).forEach(([buffId,buffIns])=>{
            if(buffIns.durationType === BUFF_DURATION_TYPE.TURN){
                buffIns.changeStack(-1)
                if(buffIns.getStack() === 0){
                    buffMap.delete(buffId)
                }
            }
        })

        setLeftTurn(leftTurn - 1)
    }





    function BuffArea() {
        console.log(buffMap.size, 'buffarea')
        return <>
            {Array.from(buffMap.values()).map((buffIns) => {
                console.log(buffIns.name)
                return buffIns.render()
            })}
        </>
    }


    return (
        <div>
            <div>剩余回合:{leftTurn}</div>
            <Progress type="circle" percent={getPercent()} format={(percent) => getRestHP()} />
            {/* <Button onClick={() => processEnd({ [type]: Math.min(damage,firstHP+secHP) })}>end</Button> */}
            {/* <Button onClick={() => setLeftTurn(leftTurn+1)}>round+1</Button> */}
            <Button onClick={() => handleRest()}>rest</Button>
            <HPBar />
            <div>Buff Area<div> <BuffArea /></div></div>
            <div>Card Area<div><CardArea onUseCard={onUseCard} cardList={cardList} turn={leftTurn} /></div></div>
        </div>
    )
}