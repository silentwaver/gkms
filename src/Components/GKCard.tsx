/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-11-07 16:23:35
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-11-07 23:26:43
 * @Description: 
 * 
 */
import React from 'react'
import { CardType } from '../types'
import { Button } from 'antd'
import HPBar from './Class/HPBar'

export default function GKCard(props: { cardInfo: CardType, onUseCard: Function }) {
  const _HPBar = new HPBar()
  
  function isCardAvailable(cost: number) {
    return _HPBar.getHP() < cost
  }

  function onUseCard(cardInfo: CardType){
    props.onUseCard(cardInfo)
  }
  return (
    <Button
      onClick={() => onUseCard(props.cardInfo)}
      disabled={isCardAvailable(props.cardInfo.cost)}>
      <div>{props.cardInfo.nameStr}</div>
      <div>cost:{props.cardInfo.cost}</div>
      <div>atk:{props.cardInfo.atk}</div>
      {props.cardInfo.def ? <div>def:{props.cardInfo.def}</div> : null}
    </Button>
  )
}
