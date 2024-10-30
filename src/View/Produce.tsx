
import { Button, Progress } from "antd";
import { useEffect, useState } from "react";
import { process } from "../data/process";
import Lesson from "./Process/Lesson";
function Produce() {
    const maxHP = 30
    const [week, setWeek] = useState(0)
    const [date, setDate] = useState({list:[],type:""})
    const [processDate, setProcessDate] = useState<any>({})
    const [isProcess, setIsProcess] = useState(false);

    const [capability, setCapability] = useState({ Math: 0, YuWen: 0, ZongHe: 0 })
    const [hp, setHP] = useState(maxHP);

    const [cardList,setCardList] = useState([])

    useEffect(() => {
        setDate(process[week])
    }, [])


    function addWeek() {
        if (week < process.length - 1) setWeek(week + 1)
        setDate(process[week])
    }

    function handleDate() {
        const { type, list } = date;
        if (type == "Daily") {
            return list.map((item) => {
                console.log(item)
                return <Button onClick={() => { beforeIntoProcess(item) }}>{item.subType}</Button>
            })
        } else {
            return <Button onClick={() => processEnd()}>end</Button>
        }
    }

    function handleProcess() {
        console.log(processDate)
        const { type, subType } = processDate;
        beforeProcessStart();
        if (type == "lesson") return <Lesson processEnd={processEnd} type={subType} />

    }
    function handleRest() {
        beforeProcessStart();
        let _hp = Math.min(maxHP,hp+10);
        setHP(_hp)
        processEnd({},true)
    }

    function beforeIntoProcess(item) {
        setIsProcess(true)
        setProcessDate(item)
    }

    function beforeProcessStart() {
        console.log("beforeProcessStart")
    };

    function processEnd(addCapability?,rest=false) {
        const { Math: ns, YuWen: ny, ZongHe: nz } = addCapability || {};
        const { Math, YuWen, ZongHe } = capability;

        setCapability({ Math: Math + (ns || 0), YuWen: YuWen + (ny || 0), ZongHe: (nz || 0) + ZongHe })
        setIsProcess(false);
        // if(!rest)setHP(hp-3)
        addWeek()
    }


    return (
        <div>

            {isProcess ?
                <>
                    <div>{handleProcess()}</div>

                </> :
                <><div>week:{week + 1} {date.type}</div>
                    <div>
                        <Progress
                            percent={Math.floor((hp/maxHP)*100)}
                            size={[60, 10]}
                            showInfo={false}
                            strokeColor="#52C41A"
                        />
                        {hp}/{maxHP}
                    </div>
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