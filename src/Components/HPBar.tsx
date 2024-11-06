import { Progress } from "antd";
import { Component } from "react";
import { HPBarType } from "../types";

/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-11-06 22:50:32
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-11-06 23:50:15
 * @Description: 
 * 
 */

let instance = null;
class HPBar extends Component {
    maxHP = 30
    state: Readonly<HPBarType> = {
        hp: 0
    }
    constructor(props) {
        super(props);
        if (instance) return instance;
        instance = this;
    }

    setHP(hp:number){
        console.log(hp)
        this.setState({hp})
        this.forceUpdate()
    }

    getHP(){
        return this.state.hp;
    }
    render() {
        return (
            <div>
                <Progress
                    percent={Math.floor((this.state.hp / this.maxHP) * 100)}
                    size={[60, 10]}
                    showInfo={false}
                    strokeColor="#52C41A"
                />
                {this.state.hp}/{this.maxHP}
            </div>
            )
    }

}

export default HPBar;