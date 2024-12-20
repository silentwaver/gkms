/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-11-07 16:28:56
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-12-20 17:04:34
 * @Description: 
 * 
 */

import { useEffect, useState } from "react";
import { CardType } from "../types"
import GKCard from "./GKCard"
import { clearArray, getRandomIndex } from '../func'

export default function CardArea(props) {
    const { onUseCard, cardList, turn } = props;

    const [curtList, setCurtList] = useState<CardType[]>([]);//手札
    const [mountainList, setMountainList] = useState<CardType[]>([...cardList]); //山扎
    const [abandonList, setAbandonList] = useState<CardType[]>([]); //舍扎
    const [dropList, setDropList] = useState<CardType[]>([]); //除外

    const _curtLs = [...curtList]
    const _mountainLs = [...mountainList]
    const _abandonLs = [...abandonList]
    const _dropLs = [...dropList]

    useEffect(() => {
        onTurnChange()
    }, [turn])


    function onTurnChange() {
        moveCurtToAbandon()
        genCurtList()
        setCurtList([..._curtLs])
        setMountainList([..._mountainLs]);
        setAbandonList([..._abandonLs]);
        console.log(_dropLs, 'ddd')
        setDropList([..._dropLs])
    }

    /** 将剩余手牌移动到舍弃堆 */
    function moveCurtToAbandon() {
        if (_curtLs.length === 0) return;
        _abandonLs.push(..._curtLs)
        _curtLs.splice(0, _curtLs.length)
    }

    function genCurtList() {
        if (_mountainLs.length < 3) {
            moveAbandonToMountain()
        }
        const indexList = getRandomIndex(3, _mountainLs.length).sort((a, b) => b - a)
        const tempCurtLs = []
        for (const index of indexList) {
            tempCurtLs.push(_mountainLs[index])
            _mountainLs.splice(index, 1)
        }
        _curtLs.push(...tempCurtLs)
    }

    function moveAbandonToMountain() {
        _mountainLs.push(..._abandonLs)
        _abandonLs.splice(0, _abandonLs.length)
    }

    function _onUseCard(cardInfo: CardType, index) {
        if (cardInfo.isOnce === true) {
            _dropLs.push(cardInfo)
        } else {
            _abandonLs.push(cardInfo)
        }
        _curtLs.splice(index, 1)

        setCurtList([..._curtLs])
        setAbandonList([..._abandonLs]);
        setDropList([..._dropLs])

        onUseCard(cardInfo)
    }

    return <>{

        curtList.map((item: CardType, index: number) => {

            return <GKCard cardInfo={item} onUseCard={_onUseCard} index={index} />
        })
    }
        <div>
            山扎
            <div>
                {
                    mountainList.map((item: CardType, index: number) => {
                        if (!!item) { return <GKCard cardInfo={item} index={index} /> }
                    })}
            </div>
        </div>
        <div>
            舍扎
            <div>
                {
                    abandonList.map((item: CardType, index: number) => {
                        if (!!item) { return <GKCard cardInfo={item} index={index} /> }
                    })}
            </div>
        </div>
        <div>
            除外
            <div>
                {
                    dropList.map((item: CardType, index: number) => {
                        if (!!item) { return <GKCard cardInfo={item} index={index} /> }

                    })}
            </div>
        </div>
    </>
}