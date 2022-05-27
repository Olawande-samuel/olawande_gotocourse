import {useEffect} from "react";
import {MdEdit} from "react-icons/md"



import { Sidebar, Searchbar } from "../components";
import useStyles from "./styles";
import { colors } from "../../../constants";
import avatar from "../../../images/teacher.png"




export function Profile(){
    const clsx = useStyles()
    return (  
        <Students>              
            <div style={clsx['students_profile']}>
                <div style={clsx["students_profile_top"]}>
                    <div style={clsx['students_profile_top_img']}>
                        <img src={avatar} style={{borderRadius: 10}} width="100%" alt="Avatar" />
                    </div>
                    <button style={clsx["students_profile_top_button"]}>
                        <MdEdit style={{marginRight: 15}} />    Edit
                    </button>
                </div>
                <div style={clsx["students_profile_main"]}>
                    <h1 style={{...clsx['students__header'], marginBottom: 30}}>Olu Jacobs</h1>
                    <p style={clsx["students__paragraph"]}>Enjoys writing and playing video games. <br />
                    I joined Gotocourse to make friends connect with people virtually
                    </p>

                </div>
            </div>
        </Students>
    )
}


export function Classes(){
    const clsx = useStyles()
    return ( 
        <Students>               
            <div style={clsx['students_profile']}>
                <h3>Classes</h3>
            </div>
        </Students>
    )
}


function ClassesCard({clsx}){
    return (
        <div style={clsx['classes_card']}>
            
        </div>
    )
}



const Students = ({children}) => {
    const clsx = useStyles();
    useEffect(() => {
        console.log("Students component is mounted")
        return () => console.log("Students component is unmounted");
    }, [])



    return (
        <div style={clsx['students']}>
            <Sidebar />
            <div style={clsx['students_main']}>
                <div style={clsx['students_header']}>
                    <h1 style={{...clsx['students__header'], marginRight: 150}}>Olu Jacobs</h1>
                    <Searchbar showIcon={true} placeholder="Search" />
                </div>
                {children}
            </div>
        </div>
    )
}
