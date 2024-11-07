import { Progress } from "antd";
import { Component } from "react";
import { HPBarType } from "../types";

/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-11-06 22:50:32
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-11-08 00:05:32
 * @Description: 
 * 
 */

let instance = null;
class HPBar extends Component {
    maxHP = 30
    state: Readonly<HPBarType> = {
        hp: this.maxHP,
        shield: 10
    }
    constructor(props?) {
        super(props);
        if (instance) return instance;
        instance = this;
    }

    destroyInstance() {
        instance = null;
    }

    setHP(hp: number) {
       
        const { shield } = this.state;
        let _hp = hp;
        let _shield = 0;

        if (hp > 0 && hp + this.state.hp > this.maxHP) {
            _hp = this.maxHP - this.state.hp;
        } else {
            if(shield>0){
                // cost大于盾
                if(Math.abs(hp)>=shield){
                    _shield = -shield;
                    _hp = -(Math.abs(hp)-shield)
                }else{
                    _shield = hp;
                    _hp = 0;
                }
            }
        }
        console.log(this.state.hp,hp,_hp,shield,_shield)
        this.setHPShield(_hp, _shield)
    }

    setShield(shield: number) {
        this.setHPShield(0, shield);
    };

    /** _xx:改变量 */
    setHPShield(_hp: number, _shield: number) {
        const { hp, shield } = this.state;
        console.log(hp,_hp,shield,_shield,'change')
        this.setState({ hp: hp + _hp, shield: shield + _shield });
    }


    getHP() {
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
                {this.state.hp}/{this.maxHP} {this.state.shield}
            </div>
        )
    }

}

export default HPBar;