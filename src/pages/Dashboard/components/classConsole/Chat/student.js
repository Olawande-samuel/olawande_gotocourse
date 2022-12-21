import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineMore, AiOutlineArrowLeft } from "react-icons/ai";
import { MdSearch, MdSend } from 'react-icons/md';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffectOnMount, useLocalStorage } from "../../../../../hooks";
import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import { useAuth } from "../../../../../contexts/Auth";
import { KEY } from "../../../../../constants";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ActionButton, ChatBox, ChatDetails, ChatInfo, ChatStudentList, ContentContainer, GroupChat, Send, Sender, SenderContainer, StudentsContainer, StudentSearch, Title, UserImage, StudentList } from ".";
import { FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";


// const groups = [
//     {
//         title: 'Group A',
//         description: 'Hold discussions, go live and collaborate with one another',
//         participants: 20
//     },
//     {
//         title: 'Group A',
//         description: 'Hold discussions, go live and collaborate with one another',
//         participants: 20
//     },
//     {
//         title: 'Group A',
//         description: 'Hold discussions, go live and collaborate with one another',
//         participants: 20
//     },
// ]


const ChatContainer = styled.div`
    // width: 100%;
    // height: 100%;
    // display: flex;
    // flex-direction: column;
`;

// const Tabs = styled.div`
//     width: 100%;
//     display: flex;
//     padding: 20px;
// `;

// const Tab = styled.span`
//     padding: 5px;
//     border-bottom: 4px solid ${props => props.$active ? 'var(--textBlue)' : 'transparent'};
//     cursor: pointer;
//     width: min(200px, 150px);
//     color: ${props => props.$active ? 'var(--textBlue)' : '#222'};
//     margin-right: 10px;
//     font-size: 1rem;
//     font-weight: ${props => props.$active ? 500: 400};
//     display: inline-block;
//     transition: border-bottom 0.5s ease-out, color 0.5s ease-out;
//     letter-spacing: 0.4px;

//     &:hover {
//         border-bottom: 4px solid var(--textBlue);
//         color: var(--textBlue);
//         font-weight: 500;
//     }
// `;


const Chatbody = styled.div`
    width: 100%;
    padding: 15px;
    margin-top: 50px;

    & h2 {
        font-weight: 400;
    }


    & p {
        font-weight: 200;
    }
`;


const Groups = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    margin: 30px 0;

    @media screen and (max-width: 1225px){
        grid-template-columns: 1fr 1fr;
    }
`;


const Group = styled.div`
    width: min(100% - 1rem, 300px);
    margin-inline: auto;
    display: flex;
    flex-direction: column;
`

const ChatGroup = styled.div`
    width: 100%;
    height: 100%;


`
const Createbutton = styled.button`
    padding: 8px 24px;
    background-color: var(--theme-blue);
    color:#fff;
    border:none;
    border-radius:8px;
`
const GroupTop = styled.div`
    width: 100%;
    color: var(--white);
    background-color: var(--textBlue);
    padding: 20px;
    position: relative;
    border-radius: 8px 8px 0px 0px;

    & h2 {
        text-align: center;
        font-size: 1.5rem;
        font-weight: bolder;
    }

    & span {
        position: absolute;
        top:10px;
        right: 20px;
        cursor: pointer;

        & svg {
            font-size: 1.2rem;
        }
    }
`;


const GroupBody = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    background-color: #D8E8FF;
    border-radius: 0px 0px 8px 8px;


    @media screen and (max-width: 930px){
        & footer {
    
    
            & span {
                font-size: 0.8rem;
            }
    
    
            & button {
                font-size: 0.8rem;
            }
        }
    }


    & h3 {
        font-size: 1.1rem;
        color: #0C2191;
        margin-bottom: 30px;
    }


    & p {
        color: #0C2191;
        margin-bottom: 30px;
    }


    & footer {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;


        & span {
            font-weight: 400;
            font-size: 0.9rem;
        }


        & button {
            border: 1px solid #0C2191;
            color: #0C2191;
            background-color: transparent;
            padding: 8px;
            font-size: 0.9rem;
        }
    }
`


const GroupDropdown = styled.ul`
    position: absolute;
    top: 100%;
    background-color: #D9D9D9;
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: ${props => props.$show ? 'block' : 'none'};
    box-shadow: 0px 0px 20px -5px #ccc;
    animation: toggle  2s 0.5s 1 ease-out;


    @keyframes toggle {
        from { y: -100px}
        to {y: 0}
    }


    & li {
        width: 100%;
        min-width: 100px;
        padding: 10px;
        color: #222;
        cursor: pointer;
        font-size: 0.9rem;

        &:hover {
            background-color: var(--white);
        }
    }
`;


const ModalContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left:0;
    right: 0;
    height: 100vh;
    z-index: 200;
    background-color: rgba(70, 70, 70, 0.46);
`;


const ModalContent = styled.div`
    background-color: var(--white);
    padding: 20px;
    border-radius: 10px;
    width: min(100% - 5rem, 400px);
`;

const ModalTop = styled.div`
    width: 100%;

    & span:nth-child(1) {
        margin-right: 10px;
        color: #0C2191;
        cursor: pointer;
    }

    & span:nth-child(2) {
        font-weight: 300;
    }
`;

const ModalBody = styled.div`
    width: 100%;
    padding: 10px;
    margin-top: 15px;
`;

const FormContainer = styled.div`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;


    & button {
        background-color: #0C2191;
        border: none;
        outline: none;
        cursor: pointer;
        color: var(--white);
        padding: 10px 35px;
        border-radius: 10px;
    }
`;

const Input = styled.input`
    width: 100%;
    border: 1px solid #0C2191;
    padding: 12px;
    border-radius: 10px;
    line-height: 2;
`;


const MailContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;


const MailBodyContainer = styled.div`
    margin-bottom: 30px;
    width: min(100% - 4rem, 900px);
    background-color: #D8E8FF;
    padding: 15px;
    margin-inline: auto;
`;

const MailBody = styled.div`
    width: 100%;
    height: 100%;
`;

const MailButton = styled.div`
    width: min(100% - 4rem, 900px);
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: center;


    & button {
        border: none;
        background-color: var(--textBlue);
        padding: 15px;
        width: min(100% - 5rem, 500px);
        color: var(--white);
        letter-spacing: 0.4px;
    }
`;

const MailBodyTop = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 3px solid #D9D9D9;
    align-items: center;
    padding: 15px;
    background-color: var(--white);
    padding-left: 30px;

    & span {
        padding: 10px;
        padding-bottom: 0px;
        cursor: pointer;
        color: #464646;
        font-size: 0.95rem;
    }
`;

const MailBodySecond = styled.div`
    border-bottom: 3px solid #D9D9D9;
    display: flex;
    width: 100%;
    align-items: center;
    padding: 10px;
    background-color: var(--white);
    padding-left: 30px;
`;

const Options = styled.div`
    margin-right: 50px;
`;
const Select = styled.select`
    outline: none;
    border: none;
    margin: 10px;
    font-weight: 200;
    font-size: 0.9rem;
`;
const Settings = styled.div``;
const Setting = styled.span`
    padding: 5px;
    margin-inline: 10px;
    cursor: pointer;
`;
const MailBodyMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--white);


    & textarea {
        width: 100%;
        border: none;
        outline: none;
        padding: 4px;
        text-indent: 20px;
    }

    & footer {
        width: 100%;
        display: flex;
        border-top: 3px solid #D9D9D9;
        justify-content: flex-end;
        padding: 5px;

        & span {
            color: #464646;
            font-weight: 200;
        }
    }
`;


const ActiveChatContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;


const ActiveChatTop = styled.div`
    display: flex;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const InputContainer = styled.div`
    width: min(400px, 100% - 8rem);
    display: flex;
    align-item: center;
    border: 1px solid rgba(130, 130, 130, .1);
    padding: 6px;
    border-radius: 20px;
    margin-right: 20px;


    & input {
        padding: 4px;
        line-height: 2;
        border: none;
        outline: none;
        flex: 1;
        text-align: center;
    }

    & svg {
        font-size: 2.5rem;
    }
`;

const Button = styled.button`
    border: 1px solid var(--textBlue);
    color: var(--textBlue);
    padding: 10px 30px;
    border-radius: 10px;
    background-color: transparent;
`;

const ActiveChatBody = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 30px;
`;
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }} style={{ height: "100%" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}


const ActiveChatCard = styled.div`
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;

    & h3 {
        margin-bottom: 20px;
    }
`;

const UserCardContainer = styled.div`
    display: flex;
    border: 1px solid rgba(130, 130, 130, .1);
    width: 100%;
    cursor: pointer;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;

    &:hover {
        background-color: rgba(0, 0, 0, .03);
    }
`;

const UserAvatar = styled.span`
    display:flex;
    width: 80px;
    height: 80px;
    background-color: var(--textBlue);
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 800;
    border-radius: 50%;
    color: var(--white);
`;

const UserInfo = styled.div`
    margin-left: 20px;

    & h6 {
        font-size: 0.8rem;
        margin-bottom: 5px;
    }
    & h3 {
        font-size: 1rem;
        margin-bottom: 10px;
    }
    & h5 {
        font-size: 0.9rem;
        margin: 0;
        color: var(--gray);
    }
    & p {
        font-size: 0.8rem;
        margin: 0;
    }
`

const StudentChatModule = () => {
    const { pathname, search } = useLocation();
    const { getItem } = useLocalStorage()
    const userdata = getItem(KEY)
    let path = pathname.split("/")
    let classId = path[path.length - 1]
    // console.log(classId);

    // console.log({ userdata });

    const { consoleFunctions: { fetchGroups, joinGroup }, } = useAuth();

    const [activeTab, setActiveTab] = useState(0);
    const [show, setShow] = useState(false);
    useEffectOnMount(() => {
        // console.log('ChatModule is mounted');
        return () => console.log('ChatModule is unmounted');
    }, [])
    // const [newGroups, setNewGroups] = useState(_ => {
    //     return groups.map(g => {return {...g, showActions: false}});
    // })

    const [newGroups, setNewGroups] = useState([])

    const tabs = ['Teams', 'Active Chat'];

    function toggleActionsHandler(e, index) {
        setNewGroups(old => {
            // let copy = [...old];
            // let foundIndex = copy.findIndex((_, i) => i === index);
            // let innerCopy = {...copy[foundIndex]};
            // innerCopy.showActions = !innerCopy.showActions;
            // copy[foundIndex] = innerCopy;
            // console.log(copy[foundIndex]);
            // return copy;
        })
    }


    function toggleActionsHandler(e, index) {

    }


    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const getAllGroupsQuery = useQuery(["all groups"], () => fetchGroups(userdata?.token, classId), {
        onSuccess: (res) => {
            // console.log("successful query")
            // console.log(res.data)
            setNewGroups(res.data)

        }
    })



    const tabContent = [<ChatTab groups={newGroups} toggle={toggleActionsHandler} setShow={setShow} />, <ActiveChat />]

    return (
        <ChatContainer>
            {show && <Modal setShow={setShow} />}

            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
                TabIndicatorProps={{ sx: { backgroundColor: '#F75C4E' } }}
                sx={{
                    "& button": { color: '#F75C4E' },
                    "& button.Mui-selected": { color: '#F75C4E !important', fontWeight: 'bold' },
                }}

            >

                {tabs.map((h, i) => (
                    <Tab
                        key={i}
                        label={h}
                        className="text-capitalize fw-bold text-dark"
                        {...a11yProps(i)}
                    />
                ))}

            </Tabs>
            {
                tabContent.map((h, i) => (
                    <TabPanel
                        value={value}
                        index={i}
                        style={{ height: "100%", width: "100%", paddingBottom: "1rem" }}
                        key={i}
                    >
                        {h}
                    </TabPanel>

                ))
            }
        </ChatContainer>
    )
}



function ChatContent({ title, user, body, fromUser, isTutor, type }) {
    return (
        <ChatInfo>
            <UserImage>
                <FaUser size="1.5rem" color="#fff" />
            </UserImage>
            <ChatDetails>
                <h6>{isTutor ? "Teacher" : fromUser}</h6>
                <p>{body}</p>
            </ChatDetails>
        </ChatInfo>
    )
}

function ChatAside() {
    return (
        <ChatStudentList>
            <StudentSearch>
                <input type="search" placeholder="Search student list" />
                <div>
                    <div></div>
                    <FaSearch />
                </div>
            </StudentSearch>
            <StudentsContainer>
                <h6>Students <span>(1)</span></h6>
                <div>
                    <ChatInfo>
                        <UserImage aside={true}>
                            <FaUser size=".7rem" color="#fff" />
                        </UserImage>
                        <ChatDetails>
                            <h6>Student</h6>
                            <small>student@mail.com</small>
                        </ChatDetails>
                        {/* <ActionButton>
                            Remove
                        </ActionButton> */}
                    </ChatInfo>
                </div>
            </StudentsContainer>

        </ChatStudentList>
    )
}


export function ActiveChat() {
    const [activeChats, setActiveChats] = useState([{
        status: 'Student',
        fullname: 'Rice Hansel',
        number: '147-2-101',
        lastsent: JSON.parse(JSON.stringify(new Date()))
    }]);
    const [teachers, setTeachers] = useState([{
        status: 'Teacher',
        fullname: 'Gretel Lard',
        number: '147-2-101',
    }, {
        status: 'Teacher',
        fullname: 'Lorde Kim',
        number: '147-2-101',
    }]);
    const [admins, setAdmins] = useState([
        {
            status: 'Admin',
            fullname: 'Ade Clutch',
            number: '147-2-101',
        },
        {
            status: 'Admin',
            fullname: 'Mix Maven',
            number: '147-2-101',
        },
        {
            status: 'Admin',
            fullname: 'Max Hunt',
            number: '147-2-101',
        }
    ]);



    const handleChange = () => {

    }
    return (
        <ContentContainer>
            <GroupChat>
                <SenderContainer>
                    <Title>
                        <h4>Group name</h4>
                    </Title>
                    <ChatBox>
                        <ChatContent />
                        <ChatContent />
                    </ChatBox>
                    <Sender>
                        <input type="text" name="msg" id="msg" className="form-control" onChange={handleChange} />
                        <Send>
                            <i>
                                <MdSend size="1.5rem" />
                            </i>
                        </Send>
                    </Sender>
                </SenderContainer>
            </GroupChat>
            <StudentList>
                <ChatAside />
            </StudentList>
        </ContentContainer>
    )
}


function UserCard({ status, fullname, number, lastsent, isChat }) {
    return (
        <UserCardContainer>
            <UserAvatar>
                {fullname.substring(0, 2)}
            </UserAvatar>
            <UserInfo>
                <h6>{status}</h6>
                <h3>{fullname}</h3>
                <h5>{number}</h5>
                {isChat && <p>Last sent: {lastsent}</p>}
            </UserInfo>
        </UserCardContainer>
    )
}




function ChatTab({ groups, toggle, setShow }) {


    return (
        <ChatGroup>
            <h2>My Group</h2>
            <Groups>
                {
                    groups.map((group, i) => (
                        <GroupInfo key={group._id} group={group} toggle={toggle} setShow={setShow} />
                    ))
                }
            </Groups>

            <h2>All Group</h2>
            <Groups>
                {
                    groups.map((group, i) => (
                        <GroupInfo key={group._id} group={group} toggle={toggle} setShow={setShow} index={i} />

                    ))
                }
            </Groups>
        </ChatGroup>
    )
}

const GroupInfo = ({ group, toggle, setShow, index }) => {
    const { getItem } = useLocalStorage();
    const [loading, setLoading] = useState(false);

    let userdata = getItem(KEY);
    const { generalState: { isMobile }, consoleFunctions: { joinGroup, fetchUserGroupstatus, fetchUserGroups } } = useAuth();

    let [userJoined, setUserJoined] = useState(false);

    //   const userGroupStatus = useQuery(["fetch user groups file", group._id], () => fetchUserGroupstatus(userdata.token, group._id), {
    //     onSuccess: (res) => {
    //         console.log(res)
    //     }
    // })

    const userGroups = useQuery(["fetch user groups", group._id], () => fetchUserGroups(userdata.token, group._id), {
        onSuccess: ({ data }) => {
            console.log(data.joindGroups)
            console.log({ userdata });
            console.log("user joined", data.joindGroups.map(d => d.studenId).indexOf(userdata.id));
            setUserJoined(data.joindGroups.map(d => d.studenId).indexOf(userdata.id) >= 0 && data.joindGroups.map(d => d.groupId).indexOf(group._id) >= 0 ? true : false)
        }
    })
    console.log({ group });

    const joinGroupBtn = async (id, classId) => {
        setLoading(true)
        try {
            // console.log("token", userdata?.token);
            // console.log("id", id);
            const { data } = await joinGroup(userdata?.token, id, classId)
            console.log({ data });
            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Group >
            <GroupTop>
                <h2>{group.title}</h2>
                <span onClick={e => toggle(e, index)}>
                    <AiOutlineMore />
                    {/* <GroupDropdown $show={showActions ? true : false}>
                    <li>Edit</li>
                    <li>Archive</li>
                </GroupDropdown> */}
                </span>
            </GroupTop>
            <GroupBody>
                <h3>{group.title}</h3>
                <p className="restricted_line">{group.description}</p>
                <footer>
                    <span>{group.students} participants</span>
                    {/* <button onClick={e => joinGroupBtn(e, group._id, group)}>Open team</button> */}

                    {userJoined ?
                        <button >
                            <Link to={`/student/console/myclasses/mail/group/${group._id}`}>
                            {/* <Link to={`chat`}> */}
                                Open team
                            </Link>

                        </button>
                        :
                        loading ? (
                            <button className="button button-md log_btn w-100 mt-3"
                                disabled={loading}
                            >
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </button>
                        ) :
                            <button onClick={() => joinGroupBtn(group._id, group)}>Join team</button>


                    }
                </footer>
            </GroupBody>
        </Group>
    )
}



function Modal({ setShow }) {
    const [formstate, setFormstate] = useState({
        title: '',
        description: ''
    })
    const inputs = [
        {
            type: 'text',
            name: 'title',
            placeholder: 'Title',
            value: formstate.title
        },
        {
            type: 'text',
            name: 'description',
            placeholder: 'Description',
            value: formstate.description
        },
    ]
    return (
        <ModalContainer>
            <ModalContent>
                <ModalTop>
                    <span onClick={e => setShow(_ => false)}><AiOutlineArrowLeft /></span>
                    <span>Create new team</span>
                </ModalTop>
                <ModalBody>
                    {
                        inputs.map(({ type, name, placeholder, value }, i) => (
                            <FormContainer key={i}>
                                <Input type={type} value={value} name={name} placeholder={placeholder} />
                            </FormContainer>
                        ))
                    }
                    <FormContainer>
                        <button>Create</button>
                    </FormContainer>
                </ModalBody>
            </ModalContent>
        </ModalContainer>
    )
}


export function StudentGroupContent(){
    const {getItem} = useLocalStorage();
    const {groupID} = useParams()
    const userdata = getItem(KEY)
    const {teacherConsoleFunctions: { sendMessage, fetchMessages}} = useAuth()                      
    const [messageList, setMessageList] = useState([])

    const [body, setBody] = useState("")

    const queryClient = useQueryClient()
    const fetchGroupMessages = useQuery(["group message", groupID, userdata?.token], ()=>fetchMessages(userdata.token, groupID), {
        onSuccess: (res)=> {
            setMessageList(res.data)

        }
    })

    const mutation = useMutation(([usertoken, groupId, data]) => sendMessage(usertoken, groupId, data), {
        onSuccess: (res)=> {
            console.log(res)
            setMessageList([...messageList, res.data])
            queryClient.invalidateQueries("group message")
        },
        onError: (err)=> console.error(err)
    })
    
    
    function handleChange(e){
        setBody(e.target.value)
    }

    function send(e){
        e.preventDefault();
        mutation.mutate([userdata.token, groupID, {body}])
        setBody("")

    }
    return (
        <ContentContainer>
            <GroupChat>
                <SenderContainer>
                    <Title>
                        <h4>Group name</h4>
                    </Title>
                    <ChatBox>
                        {
                            messageList?.map(item=>(
                                <ChatContent {...item} key={item._id} />
                            ))
                        }
                    </ChatBox>
                    <Sender>
                        <input type="text" name="msg" id="msg" className="form-control" onChange={handleChange} value={body} />
                        <Send>
                            <i>
                                <MdSend size="1.5rem" onClick={send} color="var(--theme-blue)" />
                            </i>
                        </Send>
                    </Sender>
                </SenderContainer>
            </GroupChat>
            <StudentList>
                <ChatAside />
            </StudentList>
        </ContentContainer>    
    )
}



export default StudentChatModule;