import { createBrowserRouter } from 'react-router-dom'
import App from './App';
import Produce from './View/Produce';
import Prepare from './View/Prepare';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/battle',
        element: <div>battle</div>
    },
    {
        path: '/prepare',
        element: <Prepare />
    },
    {
        path: '/produce',
        element: <Produce />,
    }
])

export default router;