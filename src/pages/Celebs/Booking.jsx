import React, {useState} from "react";
import styled from "styled-components";
import {AiOutlineArrowLeft, AiFillClockCircle} from "react-icons/ai"
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {useNavigate} from "react-router-dom"




import { useAuth } from "../../contexts/Auth";
import {useLocalStorage} from "../../hooks";
import Layout from "../../components/Layout";
import { useEffectOnMount } from "../../hooks";
import { IMAGEURL } from "../../constants";



const StyledCalendar = styled(Calendar)`
    background-color: transparent;
    border: none;
    color: var(--grey);
    width: 400px;

    & div {
        text-decoration: none;
    }

    & .react-calendar__tile--active {
        background-color: var(--white);
        color: #0C2191;
        font-weight: 700;
        border-radius: 4px;
    }

    & button {
        padding: 20px;
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

const Booking = styled.div`
    width: 100%;
    height: 90vh;
    background: linear-gradient(180.9deg, #191046 18.68%, rgba(16, 51, 70, 0.95) 97.29%);
    padding: 30px;
    margin: 0;
    box-sizing: border-box;
    display: flex;
`;


const Icon = styled.span`
    padding: 5px;
    cursor: pointer;
    color: var(--white);
    font-size: 1.8rem;
    position: relative;
    top: -20px;
`;


const CalendarContainer = styled.div`
    background-color: #3876C9;
    border-radius: 10px;
    padding: 20px;
    max-width: 900px;
    height: 60vh;
    margin-bottom: 20px;
    display: flex;
    gap: 20px;
    align-items: center;
`;


const CalendarLeft = styled.div`;
    flex: 1;
    height: 100%;
    & h3 {
        color: var(--white);
        font-weight: 700;
        font-size: 1.2rem;
        margin-bottom: 20px;
    }
`;


const CalendarRight = styled.div`
    width: 250px;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 100px;

    & h4 {
        color: var(--white);
        font-weight: 400;
        font-size: 1.1rem;
        margin-bottom: 30px;
    }


    & button {
        width: 100%;
        border: 2px solid var(--white);
        outline: none;
        color: var(--white);
        font-weight: 600;
        margin: 15px 0px;
        padding: 10px;
        background-color: transparent;
        text-transform: uppercase;

        &:hover {
            background-color: var(--white);
            color: #0C2191;
        }

        &.active {
            background-color: var(--white);
            color: #0C2191;
        }
    }
`


const BookingContainer = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    height: 100vh;
    gap: 30px;
    padding: 20px;
    margin-top: 20px;
    position: relative;
    left: 20px;
`;


const BookingRight = styled.div`
    flex: 1;
    height: 100%;
`;

const BookingLeft = styled.div`
    max-width: 300px;
    height: 100%;
    color: var(--white);
    letter-spacing: 0.4px;

    & h3 {
        font-size: 1.4rem;
    }

    & p {
        display: flex;
        align-items: center;
    }
`;

const BookingImageContainer = styled.div`
    width: 250px;
    margin-bottom: 30px;
`;


const BookingImage = styled.img`
    width: 100%;
`;

const ButtonContainer = styled.div`
    display: flex;
    max-width: 900px;
    align-items: center;
    justify-content: flex-end;

    & button {
        padding: 15px 30px;
        border: none;
        outline: none;
        border-radius:10px;
        font-size: 1rem;
    }

    & button:first-child {
        border: 1px solid var(--white);
        color: var(--white);
        background-color: transparent;
        margin-right: 30px;
    }

    & button:last-child {
        color: var(--white);
        background-color: #F75C4E;
    }
`;


function getBookingDay(date){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${days[date.getDay()]}, ${months[date.getUTCMonth()]} ${date.getDate()}`;
}



const BookingMentor = () => {
    const [date, setDate] = useState(() => new Date());
    const [mentorData, setMentorData] = useState({});
    const navigate = useNavigate();
    const {getItem} = useLocalStorage();
    let _mentorData = getItem('gotocourse-viewMentor');

    console.log(_mentorData);
    useEffectOnMount(() => {
        console.log(date);
        console.log("Booking Mentor page is mounted");
        setMentorData(old => {
            return {
                name: `${_mentorData?.mentorFirstName} ${_mentorData?.mentorLastName}`,
                image: _mentorData?.img,
                id: _mentorData?.id,
                profession: _mentorData?.expertise
            }
        })
        return () => console.log("Booking Mentor page is unmounted");
    }, [date])

    function goBack(){
        navigate(-1);
    }

    return(
        <Layout>
            <Booking>
                <Icon onClick={goBack}>
                    <AiOutlineArrowLeft />
                </Icon>
                <BookingContainer>
                    <BookingLeft>
                        <BookingImageContainer>
                            <BookingImage src={mentorData.image} alt="Booking Image" />
                        </BookingImageContainer>
                        <h3>{mentorData.name}</h3>
                        <p><AiFillClockCircle /> &nbsp; 20 mins</p>
                    </BookingLeft>

                    <BookingRight>
                        <CalendarContainer>
                            <CalendarLeft>
                                <h3>Select a Date & Time</h3>
                                <StyledCalendar onChange={setDate} value={date} />
                            </CalendarLeft>
                            <CalendarRight>
                                <h4>{getBookingDay(date)}</h4>
                                <button>10:30 am</button>
                                <button className="active">12:00 pm</button>
                                <button>1:30 pm</button>
                                <button>3:00 pm</button>
                                <button>4:30 pm</button>
                            </CalendarRight>
                        </CalendarContainer>
                        <ButtonContainer>
                            <button onClick={goBack}>Back</button>
                            <button>Continue</button>
                        </ButtonContainer>
                    </BookingRight>
                </BookingContainer>
            </Booking>
        </Layout>
    )
}




export default BookingMentor;