
import React, { useState } from 'react';
import { Button, Flex, Progress } from 'antd';
export default function Lesson(props) {
    const firstHP = 75;
    const secHP = 100;
    const { processEnd, type } = props;
    const [damage, setDamage] = useState(0)


    function getPercent() {
        if (damage < firstHP) {
            return Math.floor((damage / firstHP) * 100)
        }
        else {
            return Math.floor(((damage-firstHP)/secHP) *100)
        }
    }

    function getRestHP(){
        if (damage < firstHP) {
            return firstHP-damage;
        }
        else {
            return Math.max(secHP+firstHP -damage,0);
        }
    }

    function attack(){
        console.log('attack')
        setDamage(damage+10);
    }

    return (
        <div>
            <Progress type="circle" percent={getPercent()} format={(percent) => getRestHP()} />
            <Button onClick={() => attack()}>attack</Button>
            <Button onClick={() => processEnd({ [type]: Math.min(damage,firstHP+secHP) })}>end</Button>

            <div>Card Area</div>
        </div>
    )
}