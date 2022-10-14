import Console from '../classConsole/index';
import { Outlet} from 'react-router-dom';
import ChatModule from "./Chat";
// import Out from '../../../Out';

export default function Content({type}) { 
    return (
        <>
            <Console>
                <Outlet />
            </Console>
        </>
    )

}

export function ChatComponent(){
    return <ChatModule />
}
