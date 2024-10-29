/*
 * @Author: SilentVver 928872571@qq.com
 * @Date: 2024-10-29 15:11:52
 * @LastEditors: SilentVver 928872571@qq.com
 * @LastEditTime: 2024-10-29 15:34:23
 * @Description: 
 * 
 */
import './App.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Button type="primary" onClick={() => navigate('/prepare')}>学习</Button>
    </div >
  );
}

export default App;
