import {useState, useEffect} from "react";


import ChatComponent from "../../Admin/Chat";
import Layout from "../Layout";
import { useLocalStorage } from "../../../../hooks";
import { KEY } from "../../../../constants";


const Chat = () => {
    const {getItem} = useLocalStorage()
    const [loading, setLoading] = useState(true);
    let userdata = getItem(KEY);
  
    useEffect(() => {
      setTimeout(() => {
        setLoading(_ => false);
      }, 2000)
    }, [])
    const [tabs, setTabs] = useState([
      {
        active: true,
        name: "New Messages",
      },
      {
        active: false,
        name: "Admin",
      },
      {
        active: false,
        name: "Students",
      },
    ]);
  
    const chatType = [
      {
        id: 1,
        type: "New Messages",
      },
      {
        id: 2,
        type: "Others",
      },
      {
        id: 4,
        type: "Teachers",
      },
    ];
    return (
        <Layout userdata={userdata} loading={loading} header="Chat">
            <ChatComponent tabs={tabs} chatType={chatType} usertype="teacher" />
        </Layout>
    );
}




export default Chat;