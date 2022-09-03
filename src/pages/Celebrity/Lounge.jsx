import  {useState} from "react";
import {Lounge} from "../Courses";
import style from "./style.module.css";
import { CelebrityMentor, AlistMentors, TechExperts, TechExperts2, } from "./index"

const MenLounge = () => {
    const [search, setSearch] = useState("");

    return (
        <Lounge>
            <div className="container">
                <div className={`d-flex justify-content-between align-items-center ${style.top}`}>
                    <h3 className={style.section_title}>MENTORS LOUNGE</h3>
                    <div className={`${style.input_wrapper} d-flex`}>
                        <input
                        type="search"
                        name="search"
                        id="search"
                        className="form-control"
                        placeholder="Search Courses"
                        onChange={(e)=>setSearch(e.target.value)}
                        value={search}
                        />
                        <button className="button" style={{background: "var(--theme-orange"}}>Search</button>
                    </div>
                </div>
                <main className={style.new_main}>
                    <CelebrityMentor />
                    <AlistMentors />
                    <TechExperts />
                    <TechExperts2 />
                </main>
            </div>
        </Lounge>
    )
}
export default MenLounge