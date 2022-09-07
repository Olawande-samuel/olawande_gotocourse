import { useQuery } from "@tanstack/react-query";
import  {useState} from "react";
import { useAuth } from "../../contexts/Auth";
import {Lounge} from "../Courses";
import style from "./style.module.css";
import {CelebCard} from "./index"
function AllCelebs(){
    const [search, setSearch] = useState("");
    const {otherFunctions: {fetchMentors}} = useAuth();
    const {data, isLoading, isError} = useQuery(["tech mentors"], fetchMentors, {
        initialValue: []
    })

    console.log({data})
    console.log(data?.data?.filter(item=>item.mentorFirstName.toLowerCase().includes(search.toLowerCase())))

    return (
        <Lounge>
            <div className="container">
                <div className={`d-flex justify-content-between align-items-center ${style.top}`}>
                    <h3 className={style.section_title}>All MENTORS</h3>
                    <div className={`${style.input_wrapper} d-flex`}>
                        <input
                        type="search"
                        name="search"
                        id="search"
                        className="form-control"
                        placeholder="Search Mentors"
                        onChange={(e)=>setSearch(e.target.value)}
                        value={search}
                        />
                        <button className="button" style={{background: "var(--theme-orange"}}>Search</button>
                    </div>
                </div>
                <main className={style.new_main}>
                    <div className={style.all_mentors}>
                    {
                        data?.data?.length> 0 && data?.data?.filter(item=>(item.mentorFirstName.toLowerCase().includes(search.toLowerCase()) 
                        || item.mentorLastName.toLowerCase().includes(search.toLowerCase()) 
                        || item.expertise.toLowerCase().includes(search.toLowerCase()))).map((item, index) => (
                            <CelebCard {...item} key={index} item={item} />    
                        ))
                    }
                    </div>
                </main>
            </div>
        </Lounge>

    )
}
export default AllCelebs