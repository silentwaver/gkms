/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-10-29 15:35:55
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-10-29 15:36:08
 * @Description: 
 * 
 */
import { Button } from "antd";
import { useNavigate } from 'react-router-dom';
function Prepare(){
    const navigate = useNavigate();
    return (
        <div>
            <Button type="primary" onClick={()=>navigate('/produce')}>开始学习</Button>
        </div>
    )
}

export default Prepare;