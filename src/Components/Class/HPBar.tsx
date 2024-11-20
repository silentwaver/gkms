import { Progress } from "antd";
import { Component } from "react";
import { HPBarType } from "../../types";

/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-11-06 22:50:32
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-11-08 19:01:17
 * @Description: 
 * 
 */

let instance = null;
class HPBar extends Component {
    maxHP = 30
    state: Readonly<HPBarType> = {
        hp: this.maxHP,
        shield: 0
    }
    constructor(props?) {
        super(props);
        if (instance) return instance;
        instance = this;
    }

    destroyInstance() {
        instance = null;
    }

    setHP(hpc: number, shieldc?: number) {
        console.log(shieldc,'shieldc')
        const { shield, hp } = this.state;
        // 中间量
        let _hp = hpc;
        let _shield = shieldc ? shieldc : 0;

        //计算体力与盾改变值
        if (hpc > 0 && hpc + this.state.hp > this.maxHP) {
            _hp = this.maxHP - this.state.hp;
        } else {
            if (shield >= 0) {
                // cost大于盾
                if (Math.abs(hpc) >= shield) {
                    _shield = -shield;
                    _hp = -(Math.abs(hpc) - shield)
                } else {
                    _shield = hpc;
                    _hp = 0;
                }
            }
        }

        //计算最终盾改变值
        _shield+=shieldc | 0;
        this.setHPShield(_hp, _shield)
    }
    /** _xx:改变量 */
    setHPShield(_hp: number, _shield: number) {
        console.log(_shield,'_shield')
        const { hp, shield } = this.state;
        this.setState({ hp: hp + _hp, shield: shield + _shield });
        this.forceUpdate()
    }

    clearShield(){
        this.setState({shield:0})
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