import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs, IconButton, Paper, Backdrop, Tooltip } from "@mui/material";
import { MdNavigateNext, MdShare, MdMoreVert, MdMenu, MdMessage } from "react-icons/md";
import { BiCloudDownload } from "react-icons/bi";
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { RiVideoAddFill } from "react-icons/ri";



import { Sidebar } from "./components";
import { CustomButton } from './components/Sidebar';
import { useEffectOnMount, useLocalStorage } from '../../../../hooks';
import quiz from '../../../../images/classroom_quiz.svg';
import { useAuth } from '../../../../contexts/Auth';
import { KEY } from '../../../../constants';
import { useQuery } from '@tanstack/react-query';


const Container = styled.div`
position: relative;

`
const IconContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: .8rem .4rem;
    width: 50px;
    height: auto;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    border: 1px solid var(--theme-blue);
    border-radius: 10px;
    background: #EEF5FF;
    box-shadow: 0px 203px 81px rgba(0, 0, 0, 0.01), 0px 114px 68px rgba(0, 0, 0, 0.05), 0px 51px 51px rgba(0, 0, 0, 0.09), 0px 13px 28px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
`

const ClassroomContainer = styled.div`
    width: 100%;
    height: calc(100vh - 75px);
    display: grid;
    grid-template-columns: 300px 1fr;
    margin: 0;
    margin-top: 75px;
    overflow-y: hidden;

    @media screen and (max-width: 960px){
        grid-template-columns: 1fr;
    }
`;

const BreadcrumbLink = styled(Link)`
    color: ${props => props.$isCurrentPage ? '#0C2191' : '#666363'};
    font-weight: 400;
    font-size: 0.9rem;
    cursor: ${(props) => props.$isCurrentPage ? 'not-allowed' : 'pointer'};

    &:hover {
        color:#0C2191
    }
`;


const ClassroomMain = styled.div`
    width: min(100% - 3rem, 950px);
    margin-inline: auto;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
`;


const ClassroomMainTop = styled.div`
    width: 100%;
    margin-block: 40px;
`;

const Navbar = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background-color: var(--textBlue);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--white);
    box-shadow: 0px 0px 20px -5px #222;

    & h5 {
        font-weight: 300;
        font-size: 1.15rem;
    }
`;

const NavLeft = styled.div`
    display: flex;
    align-items: center;

    & svg {
        color: var(--white);
    }
`;


const ClassroomMainBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const BodyContent = styled.div`
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
`

const BodyInfo = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;


    & h3 {
        font-size: 1rem;
        font-weight: 300;
    }
`;


const PaperTop = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & h5 {
        font-weight: 300;
        font-size: 0.9rem;
        margin: 0;
    }
`;

const PaperBody = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
`;


const BodyActions = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;


const VideoAction = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
`;


const QuizAction = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
`;


const NextButton = styled(CustomButton)`
    font-size: 0.8rem !important;

    & svg {
        color: var(--textBlue);
        margin-left: 10px;
    }
`;


const PreviousButton = styled(NextButton)`
    & svg {
        margin-right: 10px;
    }
`

const Quiz = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;


const Note = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const QuizImageContainer = styled.div`
    width: 425px;
    height: 425px;
`;

const QuizImage = styled.img`
    width: 100%;
    height: 100%;
`;
const QuizButton = styled(CustomButton)`
    background-color: #3f50b5 !important;
    color: white !important;
`;

const MenuButton = styled(IconButton)`
    display: none;

    & svg {
        color: var(--white);
    }

    @media screen and (max-width: 960px){
        display: inline-block;
    }
`



let mods = [
    {
        title: 'Cybersecurity',
        attachments: [
            {
                type: 'video',
                isLocked: false,
                title: 'Test 2',
                isComplete: true
            }
        ]
    },
    {
        title: 'Benefits of Cybersecurity',
        attachments: [
            {
                type: 'quiz',
                isLocked: false,
                title: 'Hey',
                isComplete: false,
            },
            {
                type: 'video',
                isLocked: false,
                title: 'Poll',
                isComplete: false,
            },
        ]
    },
    {
        title: 'Origin of the web',
        attachments: [
            {
                type: 'video',
                isLocked: false,
                title: 'Bootcamp',
                isComplete: true,
            },
            {
                type: 'quiz',
                isLocked: false,
                title: 'my quiz',
                isComplete: true,
            },
            {
                type: 'video',
                isLocked: false,
                title: 'My video content',
                isComplete: true,
            },
            {
                type: 'note',
                isLocked: true,
                title: 'new note 1',
                isComplete: true,
            },
            {
                type: 'note',
                isLocked: false,
                title: 'new note 2',
                isComplete: true,
            },
        ]
    },
    {
        title: 'Unsafe Practices',
        attachments: [
            {
                type: 'video',
                isLocked: true,
                title: 'Hello',
                isComplete: false,
            },
            {
                type: 'quiz',
                isLocked: false,
                title: 'Bllnbl',
                isComplete: false,
            },
        ]
    },
    {
        title: "Conclusion",
        attachments: []
    }
];


const Classroom = () => {
    const [showMobile, setShowMobile] = useState(false);
    const [modules, setModules] = useState(() => mods);
    // const [modules, setModules] = useState([]);
    const { getItem } = useLocalStorage()
    const userdata = getItem(KEY)
    let location = useLocation()

    const classDetail = location.state.bootcamp
    console.log(classDetail);
    const { id } = useParams()
    console.log(id);

    const { consoleFunctions: { fetchStudentDomains, fetchStudentContents, fetchStudentQuiz, fetchStudentFile, fetchStudentNote  }, } = useAuth();

    const fetchDomains = useQuery(["fetch domains", id], () => fetchStudentDomains(userdata.token, id))
    const getDomainContent = useQuery(["getDomainContent", id], () => fetchStudentContents(userdata.token, id));
    const fetchFile = useQuery(["fetch file", id], () => fetchStudentFile(userdata.token, id))
    const fetchNotee = useQuery(["fetch file", id], () => fetchStudentNote(userdata.token, id))
    const getQuiz = useQuery(["quiz content", id], () => fetchStudentQuiz(userdata.token, id), {
        onSuccess: (res)=> {
            console.log("successful query")
            console.log(res)
            if(res.data.length > 0){
                // setFormData({...res.data[0]})
            }
        }
    } )

    // useEffect(() => {
    //     if (getDomainContent?.data?.data?.length > 0) {
    //         setModules(getDomainContent?.data?.data)
    //       }

    //   }, [getDomainContent?.data?.data])


    let attachements = useMemo(() => {
        return modules.map(m => m.attachments).flat();
    }, [...modules]);

    const [activeMedia, setActiveMedia] = useState(() => {
        return attachements.find((_, i) => i === 0);
    })

    const active = useMemo(() => {
        return activeMedia.title;
    }, [activeMedia])


    console.log({ attachements, activeMedia, active })


    useEffectOnMount(() => {
        console.log('Student classroom is mounted');
        return () => console.log('Student classroom is unmounted')
    }, [])




    const mediaContent = useMemo(() => {
        return activeMedia?.type === 'video' ?
            (<Paper variant='outlined'>
                <PaperTop>
                    <h5>shell.svg</h5>
                    <IconButton>
                        <MdMoreVert />
                    </IconButton>
                </PaperTop>
                <PaperBody>
                    <BodyActions>
                        <IconButton>
                            <BiCloudDownload />
                        </IconButton>
                        <CustomButton>Open</CustomButton>
                    </BodyActions>
                </PaperBody>
            </Paper>)
            : activeMedia?.type === 'quiz' ?
                (<Quiz>
                    <QuizImageContainer>
                        <QuizImage src={quiz} alt="Quiz Image" />
                    </QuizImageContainer>
                    <QuizButton>Open Quiz</QuizButton>
                </Quiz>) :
                (<Note>
                    <h4>Hey this is a demo note heading</h4>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat fuga ducimus perferendis commodi. Iste nisi neque blanditiis, officiis rerum iure unde molestiae optio pariatur fuga ipsa officia, doloremque ipsam voluptates?</p>
                </Note>);
    }, [activeMedia])

    const mediaAction = useMemo(() => {
        return activeMedia?.type === 'video' ?
            (<VideoAction>
                <NextButton variant="outlined">
                    Next Content <FaCaretRight />
                </NextButton>
            </VideoAction>)
            : activeMedia?.type === 'quiz' ?
                (<QuizAction>
                    <PreviousButton variant="outlined">
                        <FaCaretLeft />  Previous Content
                    </PreviousButton>
                    <QuizButton>
                        Mark as Completed
                    </QuizButton>
                </QuizAction>) :
                (<QuizAction>
                    <PreviousButton variant="outlined">
                        <FaCaretLeft />  Previous Content
                    </PreviousButton>
                    <NextButton variant="outlined">
                        Next Content <FaCaretRight />
                    </NextButton>
                </QuizAction>)
    }, [activeMedia])


    function setActiveMediaHandler(title) {
        let newActive = attachements.find(a => a.title === title);
        let active = { ...newActive };
        active.active = true;
        setActiveMedia(_ => active);
        console.log({ newActive });
    }

   

    return (
        <Container>
            <Navbar>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <MenuButton onClick={e => setShowMobile(_ => true)}>
                        <MdMenu />
                    </MenuButton>
                    <h5 style={{ margin: 0 }}>Classroom</h5>
                </div>
                <NavLeft>
                    <IconButton>
                        <MdShare />
                    </IconButton>
                    <IconButton>
                        <MdMoreVert />
                    </IconButton>
                </NavLeft>
            </Navbar>
            <ClassroomContainer>
                <Backdrop
                    sx={{ color: '#fff', zIndex: 1000 }}
                    open={showMobile}
                    onClick={e => setShowMobile(_ => false)}
                >
                    <Sidebar isMobile={true} modules={modules} activeMedia={active} changeActive={setActiveMediaHandler} />
                </Backdrop>
                <Sidebar isMobile={false} modules={modules} activeMedia={active} changeActive={setActiveMediaHandler} />
                <ClassroomMain>
                    <ClassroomMainTop>
                        <Breadcrumbs separator={<MdNavigateNext />} aria-label="breadcrumb">
                            <BreadcrumbLink to="/">
                                Dashboard
                            </BreadcrumbLink>
                            <BreadcrumbLink to="#">
                                {classDetail?.title}
                            </BreadcrumbLink>
                            <BreadcrumbLink to="#" $isCurrentPage={true}>
                                {activeMedia?.title}
                            </BreadcrumbLink>
                        </Breadcrumbs>
                    </ClassroomMainTop>
                    <ClassroomMainBody>
                        <BodyInfo>
                            <h3>{activeMedia?.title}</h3>
                            <CustomButton>Ask tutor a question</CustomButton>
                        </BodyInfo>
                        <BodyContent>
                            {mediaContent}
                            {mediaAction}
                        </BodyContent>
                    </ClassroomMainBody>
                </ClassroomMain>
            </ClassroomContainer>

            <IconComponent classId={id}/>
        </Container>
    )
}


const IconComponent = ({ classId }) => {
    const studentIcon = [
        {
            id: 1,
            icon: MdMessage,
            title: "Mail",
            link: `/student/console/myclasses/${classId}`
        },

        {
            id: 2,
            icon: RiVideoAddFill,
            title: "Live Class",
            link: "/student/live-class"
        },
    ];
    return (
        <IconContainer className='iconbar'>
            {studentIcon.map(({ title, id, icon: Icon, link }) => (
                <Tooltip title={title} key={id}>
                    <IconButton>
                        <Link to={link} className="d-inline-flex">
                            <Icon size="1.5rem" color="#0C2191" />
                        </Link>
                    </IconButton>
                </Tooltip>
            ))
            }
        </IconContainer>
    )
}




export default Classroom;