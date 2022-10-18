import Console from '../classConsole/index';
import { Outlet} from 'react-router-dom';
import ChatModule from "./Chat";
import { ToastContainer } from 'react-toastify';
// import Out from '../../../Out';

export default function Content({type}) { 
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Console>
                <Outlet />
            </Console> 
        </>
    )

}

export function ChatComponent(){
    return <ChatModule />
}
