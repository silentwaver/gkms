/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-12-20 17:09:56
 * @LastEditors: SilentVver silentwaver.code@gmail.com
 * @LastEditTime: 2025-01-04 13:49:56
 * @Description: 
 * 
 */
import { Component } from "react";
import { ITEM_TRIGGER_TYPE } from "../../Constants/enum";
class Item extends Component {
    name:string;
    id:number;
    desc:string;

    #trigger:Function;
    #isTriggered:boolean = false;
    #stack:number = 1;
    effects = []
    itemType: ITEM_TRIGGER_TYPE;

    constructor(props:{itemInfo:any}){
        super(props)

        const {itemInfo} = props.itemInfo;
        this.#trigger=itemInfo

    }
    


    render(){
        return (
            <div>
                {this.name}
            </div>
        )
    }
}

export default Item;