/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-10-29 15:50:26
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-10-30 22:54:59
 * @Description: 
 * 
 */

import React, { useEffect, useState } from 'react';
import { Button, Flex, Progress } from 'antd';
import { CardType } from '../../types';
export default function Lesson(props) {
    const firstHP = 75;
    const secHP = 100;
    const { processEnd, type, cardList, round, userHP: _userHP, maxHP } = props;
    const [damage, setDamage] = useState(0)
    const [leftRound, setLeftRound] = useState<number>(round)
    const [userHP, setUserHP] = useState(_userHP);

    useEffect(()=>{
        if (leftRound < 1) {
            // 结束
            processEnd({ [type]: Math.min(damage, firstHP + secHP), userHP })
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
        setUserHP(userHP - cost)
        setDamage(damage + atk);
        // 废牌移动
        onRoundEnd()
    }


    


    function onRoundEnd() {
        // 牌山整理
         
        setLeftRound(leftRound - 1)
    }



    function isCardAvailable(cost: number) {
        return userHP < cost
    }

    function handleRest() {
        let _hp = Math.min(maxHP, userHP + 10);
        setUserHP(_hp)
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
            <div>
                <Progress
                    percent={Math.floor((userHP / maxHP) * 100)}
                    size={[60, 10]}
                    showInfo={false}
                    strokeColor="#52C41A"
                />
                {userHP}/{maxHP}
            </div>
            <div>Card Area<div>{genCardArea()}</div></div>
        </div>
    )
}