/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-12-20 17:09:56
 * @LastEditors: SilentVver silentwaver.code@gmail.com
 * @LastEditTime: 2025-01-06 18:37:11
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

        const {name,effects,id,desc,itemType,trigger} = props.itemInfo;
        this.name = name;
        this.id = id;
        this.desc = desc;
        this.itemType = itemType;
        this.effects = effects;
        this.#trigger=trigger

    }

    trigger(lessonInfo){
        if(this.#isTriggered) return;
        let _t = this.#trigger(lessonInfo)
        // 未被觸發退出
        if(!_t) return;
        this.#stack--
        if(this.#stack == 0){
            this.#isTriggered = true;
        }
        return;
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