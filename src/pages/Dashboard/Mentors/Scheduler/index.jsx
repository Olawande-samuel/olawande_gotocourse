import React, {useState} from "react";
import styled from "styled-components";
import { Calendar } from "react-calendar";



import Layout from "../Layout";
import clsx from "../styles.module.css";
import { useAuth } from "../../../../contexts/Auth";
import { useLocalStorage, useEffectOnMount } from "../../../../hooks";
import { AdvancedError } from "../../../../classes";
import { KEY } from "../../../../constants";




const DateContaainer = styled.div`
    position: absolute;
    top: 150px;
    padding: 10px;
    border-radius: 10px 0px 0px 10px;
    right: 30px;
    display: inline-block;
    background-color: var(--textBlue);


    & p {
        color: var(--white);
        font-size: 0.7rem;
        letter-spacing: 0.4px;
        margin: 0;
    }
`


const SchedulerContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;


    & h2 {
        color: var(--textBlue);
        font-weight: 700;
        padding: 30px;
        margin-bottom: 20px;
    }
`;

const StyledCalendar = styled(Calendar)`
    background-color: transparent;
    border: none;
    color: var(--grey);
    width: 100%;

    & div {
        text-decoration: none;
        width: 100%;
    }

    & .react-calendar__tile {
        background-color: transparent;
        color: var(--white);
        font-weight: 700;
        border-radius: 4px;
        border: none;
    }

    & .react-calendar__tile--active {
        background-color: rgba(255, 255, 255, .25);
        color: var(--white);
        font-weight: 700;
        border-radius: 50% / 50% 10px;
    }

    & .react-calendar__navigation{
        width; 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: transparent;
        margin-bottom: 40px;
    }

    & .react-calendar__navigation__label__labelText {
        text-transform: uppercase;
        font-weight: 700;
    }

    & .react-calendar__month-view__weekdays__weekday {
        color: var(--gray);
        text-align: center;
        


        & abbr {
            text-decoration: none;
            font-weight: 800;
        }
    }

    & button {
        padding: 20px;
        background-color: transparent;
        border: none;
        color: var(--white);
        font-weight: 500;
        font-size: 1.2rem;

        &:hover {
            color:#0C2191;
            background-color: var(--white);
            border-radius: 4px;
            font-weight: 700;
        }
    }
`


const CalendarContainer = styled.div`
    width: min(100% - 2rem, 650px);
    background-color: var(--textBlue);
    padding: 20px;
    margin-left: 30px;
    border-radius: 10px;
    border: none;
`


const TimeContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 40px;
    gap: 20px;
    width: min(100% - 2rem, 650px);


    & button {
        background-color: var(--textBlue);
        color: var(--white);
        border: none;
        padding: 10px 40px;
        border-radius: 10px;
        margin-top: 30px;
    }
`;


const TimeFormContainer = styled.div`
    display: flex;
    flex-direction: column;


    & label {
        color: #0C2191;
        font-weight: 500;
        margin-bottom: 8px;
        letter-spacing; 0.4px;
    }

`;


const TimeInput = styled.input`
    outline: none;
    padding: 12px;
    border: 1px solid #999999;
    background: #EFECEC;
    width: min(150px, 200px);
    border-radius: 10px;
`




function getBookingDay(date){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${days[date.getDay()]}, ${months[date.getUTCMonth()]} ${date.getDate()}`;
}

const Scheduler = () => {
    const [date, setDate] = useState(new Date());
    const [formstate, setFormstate] = useState({
        from: "09:00",
        to: "12:00"
    })
    const {getItem} = useLocalStorage();
    let userdata = getItem(KEY);
    useEffectOnMount(() => {
        console.log("Mentors Scheduler is mounted");
        return () => console.log("Mentors Scheduler is unmounted");
    }, [])
    console.log({userdata});


    function changeHandler(e){
        const {name, value} = e.target;
        console.log(e.target, value, name);
        setFormstate(old => {
            return {
                ...old,
                [name]: value
            }
        })
    }


    return(
        <Layout header="Scheduler">
            <div className={clsx.teachers_profile}>
                {/* <DateContaainer>
                    <p>{date.toString().substring(0, 16)}</p>
                </DateContaainer> */}
                <SchedulerContainer>
                    <h2>Create bookable session</h2>
                    <CalendarContainer>
                        <StyledCalendar onChange={setDate} value={date} />
                    </CalendarContainer>
                    <TimeContainer>
                        <TimeFormContainer>
                            <label>From:</label>
                            <TimeInput name="from" value={formstate.from} onChange={changeHandler} type="time" />
                        </TimeFormContainer>
                        <TimeFormContainer>
                            <label>To:</label>
                            <TimeInput name="to" value={formstate.to} onChange={changeHandler} type="time" />
                        </TimeFormContainer>
                        <button>Add</button>
                    </TimeContainer>
                </SchedulerContainer>
            </div>
        </Layout>
    )
}




export default Scheduler;