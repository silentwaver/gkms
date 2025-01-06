import { Component } from "react";
import Item from "../Components/Class/Item";
import { ItemType } from "../types";
import itemDic from "../data/item";

/*
 * @Author: SilentVver silentwaver.code@gmail.com
 * @Date: 2025-01-05 20:18:58
 * @LastEditors: SilentVver silentwaver.code@gmail.com
 * @LastEditTime: 2025-01-06 18:19:07
 * @Description: 
 * 
 */

let instance = null;
class ItemManager extends Component{

    state = {
        itemMap:new Map() as Map<number,Item>
    }

    constructor(props?) {
        super(props);
        if (instance) return instance;
        this.addItem(0)
        instance = this;

    }

    destoryIns(){
        instance = null
    }

    addItem(itemId:number){
        if(!this.hasItem(itemId)){
            const itemInfo = itemDic[itemId];
            console.log(itemInfo,'itemInfoitemInfoitemInfoitemInfo')
            this.state.itemMap.set(itemId,new Item({itemInfo}))
            this.setState({ itemMap: this.state.itemMap })
        }
    }

    hasItem(itemId:number){
        return this.state.itemMap.has(itemId)
    }


    

    triggerItemList(lessonInfo){
      
        this.state.itemMap.forEach((item,itemId)=>{
            item.trigger(lessonInfo)
        })
    }


    render() {
        return (<> 
        {
        Array.from(this.state.itemMap.values())
        .map((itemIns) => {
            console.log(itemIns.name)
            return itemIns.render()
        })}</>)
    }
}

export default ItemManager