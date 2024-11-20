/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-11-07 16:28:56
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-11-08 10:06:20
 * @Description: 
 * 
 */

import { CardType } from "../types"
import GKCard from "./GKCard"

export default function CardArea(props){
    const {onUseCard,cardList} = props;
    return <>{
        cardList.map((item: CardType) => {

            return <GKCard cardInfo={item} onUseCard={onUseCard} />
        })
    }</>
}