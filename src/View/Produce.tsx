
import { Button, Progress } from "antd";
import { useEffect, useRef, useState } from "react";
import { process } from "../data/process";
import Lesson from "./Process/Lesson";
import { CardList } from "../data/cardList";
import { CardType, DateType } from "../types";
import HPBar from "../Components/Class/HPBar";

function Produce() {
    const [week, setWeek] = useState(0)
    const [date, setDate] = useState<DateType>({ list: [], type: "" })
    const [processDate, setProcessDate] = useState<any>({})
    const [isProcess, setIsProcess] = useState(false);

    const [capability, setCapability] = useState({ Math: 0, YuWen: 0, ZongHe: 0 })

    const [cardList, setCardList] = useState<CardType[]>([])

    const _HPBar = new HPBar({});


    useEffect(() => {
        setDate(process[week])
        setCardList([...CardList])
        
    }, [])


    function addWeek() {
        if (week < process.length - 1) setWeek(week + 1)
        setDate(process[week])
    }

    function handleDate() {
        const { type, list, round } = date;
        if (type == "Daily") {
            return list.map((item) => {
                console.log(item)
                return <Button onClick={() => { beforeIntoProcess({ ...item, round }) }}>{item.subType}</Button>
            })
        } else {
            return <Button onClick={() => processEnd()}>end</Button>
        }
    }

    function handleProcess() {
        console.log(processDate)
        const { type, subType, round } = processDate;
        beforeProcessStart();
        if (type == "lesson") {
            return <Lesson
                processEnd={processEnd}
                type={subType}
                cardList={cardList}
                round={round}
            // userHP={hp}
            // maxHP={maxHP}
            />
        }

    }
    function handleRest() {
        beforeProcessStart();
        let _hp = Math.min(_HPBar.maxHP, _HPBar.getHP() + 10);
        console.log(_HPBar.maxHP, _HPBar.getHP(),_hp)
        _HPBar.setHP(_hp)
        processEnd({}, true)
    }

    function beforeIntoProcess(item) {
        setIsProcess(true)
        setProcessDate(item)
    }

    function beforeProcessStart() {
        console.log("beforeProcessStart")
    };

    function processEnd(addCapability?, rest = false) {
        const { Math: ns, YuWen: ny, ZongHe: nz, userHP } = addCapability || {};
        const { Math, YuWen, ZongHe } = capability;

        setCapability({ Math: Math + (ns || 0), YuWen: YuWen + (ny || 0), ZongHe: (nz || 0) + ZongHe })
        setIsProcess(false);
        // if(!rest && date.type==='Daily')setHP(userHP)
        addWeek()
    }



    return (
        <div>

            {isProcess ?
                <>
                    <div>{handleProcess()}</div>

                </> :
                <><div>week:{week + 1} {date.type}</div>
                    <HPBar />
                    <div>
                        <div>数学：{capability.Math}</div>
                        <div>语文：{capability.YuWen}</div>
                        <div>综合：{capability.ZongHe}</div>
                    </div>
                    <div>
                        {handleDate()}
                        <div><Button onClick={() => handleRest()}>rest</Button></div>
                    </div>
                </>}
        </div>
    )
}

export default Produce;