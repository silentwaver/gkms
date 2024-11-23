/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-11-07 16:28:56
 * @LastEditors: SilentVver silentwaver.code@gmail.com
 * @LastEditTime: 2024-11-23 11:51:33
 * @Description: 
 * 
 */

import { useEffect } from "react";
import { CardType } from "../types"
import GKCard from "./GKCard"

export default function CardArea(props) {
    const { onUseCard, cardList, turn } = props;
    let dropList = []; //除外
    let curtList = []; //手札
    let mountainList = [] //山扎
    let abandonList = [] //舍扎
    useEffect(() => {
        mountainList = [...cardList]
    }, [])

    useEffect(() => {
        onTurnChange()
    },[turn])

    function getRandomIndex(len:number,max:number):number[]{
        const uniqueNumbers = new Set();
        while (uniqueNumbers.size < len) {
            const randomNumber = Math.floor(Math.random() * max );
            uniqueNumbers.add(randomNumber);
        }
        return Array.from(uniqueNumbers) as number[];
    }
    function onTurnChange() {

        moveCurtToAbandon()
        genCurtList()
    }

    function moveCurtToAbandon(){
        abandonList.push(curtList)
        curtList = []
    }
    function moveAbandonToMountain(){
        mountainList.push(...abandonList)
        abandonList = []
    }
    function genCurtList(){
        if(mountainList.length<3){
            moveAbandonToMountain()
        }
       const indexList =  getRandomIndex(3,mountainList.length)
        for(const index of indexList){
            curtList.push(mountainList[index])
        }
    }
    function _onUseCard(cardInfo:CardType,index){
        if(cardInfo.isOnce){
            dropList.push(cardInfo)
        }else{
            abandonList.push(cardInfo)
        }
        curtList.splice(index,1)
        onUseCard(cardInfo)
    }

    return <>{
        curtList.map((item: CardType,index:number) => {

            return <GKCard cardInfo={item} onUseCard={_onUseCard} index={index}/>
        })
    }</>
}