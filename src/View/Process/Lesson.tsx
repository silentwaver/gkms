/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-10-29 15:50:26
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-11-06 23:54:36
 * @Description: 
 * 
 */

import React, { useEffect, useState } from 'react';
import { Button, Flex, Progress } from 'antd';
import { CardType } from '../../types';
import HPBar from '../../Components/HPBar';
export default function Lesson(props) {
    const firstHP = 75;
    const secHP = 100;
    const { processEnd, type, cardList, round } = props;
    const [damage, setDamage] = useState(0)
    const [leftRound, setLeftRound] = useState<number>(round)
    // const [_HPBar.getHP(), set_HPBar.getHP()] = useState(__HPBar.getHP());
    const _HPBar = new HPBar({});

    useEffect(()=>{
        if (leftRound < 1) {
            // 结束
            processEnd({ [type]: Math.min(damage, firstHP + secHP) })
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

                return <Button
                    onClick={() => attack(item)}
                    disabled={isCardAvailable(item.cost)}>
                    <div>{item.nameStr}</div>
                    <div>cost:{item.cost}</div>
                    <div>atk:{item.atk}</div>
                    {item.def ? <div>def:{item.def}</div> : null}
                </Button>
            })
        }</>
    }

    function attack(cardInfo: CardType) {
        console.log(cardInfo)
        const { cost, atk } = cardInfo
        _HPBar.setHP(_HPBar.getHP() - cost)
        setDamage(damage + atk);
        // 废牌移动
        onRoundEnd()
    }


    


    function onRoundEnd() {
        // 牌山整理
         
        setLeftRound(leftRound - 1)
    }



    function isCardAvailable(cost: number) {
        return _HPBar.getHP() < cost
    }

    function handleRest() {
        let _hp = Math.min(_HPBar.maxHP, _HPBar.getHP() + 10);
        _HPBar.setHP(_hp)
        onRoundEnd()
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