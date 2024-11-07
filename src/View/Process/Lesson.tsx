/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-10-29 15:50:26
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-11-08 00:08:46
 * @Description: 
 * 
 */

import React, { useEffect, useState } from 'react';
import { Button, Progress } from 'antd';
import { CardType } from '../../types';
import HPBar from '../../Components/HPBar';
import GKCard from '../../Components/GKCard';
export default function Lesson(props) {
    const firstHP = 75;
    const secHP = 100;
    const { processEnd, type, cardList, round } = props;
    const [damage, setDamage] = useState(0)
    const [leftRound, setLeftRound] = useState<number>(round)
    
    const _HPBar = new HPBar({});

    useEffect(()=>{
        if (leftRound < 1) {
            // 结束
            _exit()
        } 
    },[leftRound])

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

    function genCardArea() {
        return <>{
            cardList.map((item: CardType) => {

                return <GKCard cardInfo={item} onUseCard={onUseCard} />
            })
        }</>
    }

    function attack(cost:number,atk:number) {
        _HPBar.setHP(-cost)
        setDamage(damage + atk);
        // 废牌移动
        onRoundEnd()
    }


    
    function handleRest() {
        _HPBar.setHP(2)
        onRoundEnd()
    }

    function onUseCard(cardInfo: CardType){
        const { cost, atk,def,buff } = cardInfo
        attack(cost,atk)
       if(def){ _HPBar.setShield(def);}
    }





    function _enter(){
        initCombat()
    }

    function _exit(){
        processEnd({ [type]: Math.min(damage, firstHP + secHP) })
    }

    function initCombat(){

        beginCombat()
    }

    function beginCombat(){

    }

    
    function onRoundEnd() {
        // 牌山整理
         
        setLeftRound(leftRound - 1)
    }




    return (
        <div>
            <div>剩余回合:{leftRound}</div>
            <Progress type="circle" percent={getPercent()} format={(percent) => getRestHP()} />
            {/* <Button onClick={() => attack()}>attack</Button> */}
            {/* <Button onClick={() => processEnd({ [type]: Math.min(damage,firstHP+secHP) })}>end</Button> */}
            {/* <Button onClick={() => setLeftRound(leftRound+1)}>round+1</Button> */}
            <Button onClick={() => handleRest()}>rest</Button>
            <HPBar/>
            <div>Card Area<div>{genCardArea()}</div></div>
        </div>
    )
}