/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-10-29 15:50:26
 * @LastEditors: SilentVver silentwaver.code@gmail.com
 * @LastEditTime: 2025-01-05 21:26:06
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
import BuffManager from '../../Class/BuffManager';
export default function Lesson(props) {
    const firstHP = 75;
    const secHP = 100;
    const { processEnd, type, cardList, round } = props;
    const [damage, setDamage] = useState(0)
    const [leftTurn, setLeftTurn] = useState<number>(round)
    // const [extraTurn,setExtraTurn] = useState<number>(0)
    const [itemList,setItemList] = useState([])
    const [remainCardUses,setRemainCardUses] = useState(0)
    const _HPBar = new HPBar({});
    const buffManager = new BuffManager()
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

        buffManager.addBuff(buffId,stack)
        const calCardInfo = buffManager.calBuff(cardInfo)
        console.log(JSON.stringify(calCardInfo), 'calCardInfo')
        _HPBar.setHP(-(calCardInfo.cost), calCardInfo.def)
        if (type === CARD_TYPE.ACTION) { setDamage(damage + calCardInfo.atk); }
        if(remainCardUses){

        setRemainCardUses(remainCardUses-1)
        }else{
            onTurnEnd()
        }
        
    }
    

    function _enter() {
        initCombat()
    }

    function _exit() {
        _HPBar.clearShield()
        buffManager.destoryIns()
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
        buffManager.decBuffStackOnTurnEnd()

        setLeftTurn(leftTurn - 1)
    }








    return (
        <div>
            <div>剩余回合:{leftTurn}</div>
            <Progress type="circle" percent={getPercent()} format={(percent) => getRestHP()} />
            {/* <Button onClick={() => processEnd({ [type]: Math.min(damage,firstHP+secHP) })}>end</Button> */}
            {/* <Button onClick={() => setLeftTurn(leftTurn+1)}>round+1</Button> */}
            <Button onClick={() => handleRest()}>rest</Button>
            <HPBar />
            <div>Buff Area<div>{buffManager.render()}</div></div>
            <div>Card Area<div><CardArea onUseCard={onUseCard} cardList={cardList} turn={leftTurn} /></div></div>
        </div>
    )
}