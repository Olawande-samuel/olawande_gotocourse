import React, {useState, useMemo} from "react";
import styled from "styled-components";
import {AiOutlineArrowLeft, AiFillClockCircle} from "react-icons/ai"
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import TimezoneSelect from "react-timezone-select";
import {BiWorld} from "react-icons/bi"


import { useAuth } from "../../contexts/Auth";
import {useLocalStorage} from "../../hooks";
import Layout from "../../components/Layout";
import { useEffectOnMount } from "../../hooks";
import { AdvancedError } from "../../classes";
import Loader from "../../components/Loader";
// import { IMAGEURL } from "../../constants";



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
    gap: 30px;
`;


const Icon = styled.span`
    padding: 5px;
    cursor: pointer;
    color: var(--white);
    font-size: 1.8rem;
    position: relative;
    top: -20px;
    left: 20px;
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


const LayoutContainer = styled(CalendarContainer)`
    min-width: 300px;
    position: relative;
    left: 100px;
    min-height: 65vh;
    padding: 40px 20px;
    max-width: 600px;
`


const Form = styled.form`
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const SuccessContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 100%;
    height: 100%;
    color: var(--white);
    flex-direction: column;
`;

const IconContainer = styled.div`
    & svg {
        margin-bottom: 20px;
    }
`


const HalfFormContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
`;

const FormContainer = styled.div`
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    color: var(--white);
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 8px;
`;


const Input = styled.input`
    outline: none;
    focus: none;
    border: none;
    border-radius:10px;
    background-color: var(--white);
    line-height: 2.5;
    padding: 8px;
`;


const TextArea = styled.textarea`
    outline: none;
    focus: none;
    border: none;
    border-radius:10px;
    background-color: var(--white);
    padding: 8px
`


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


const GenericContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100vh;
    padding: 20px;
`


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
`;

const TimeZone = styled.div`
    color: var(--white);
    display: flex;
    align-items: center;
    padding: 20px;
    & svg {
        font-size: 2rem;
    }

    & div {
        background: transparent;
        border: none;
        color: var(--white);
        cursor: pointer;
        outline: none;

        &:focus {
            outline: none;
        }

        & span {
            display: none;
        }
    }
`

const Time = styled.span`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`

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
    const [page, setPage] = useState(0);
    const [formstate, setFormstate] = useState({
        firstName: "",
        lastName: "",
        email: "",
        purpose: ""
    })
    const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [loading, setLoading] = useState(false);
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

    const changeHandler = (e) => {
        const {name, value} = e.target;
        console.log({name, value});
        setFormstate(old => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    const continueHandler = (e) => {
        setPage(old => old += 1);
    }

    const backHandler = e => {
        setPage(old => old -= 1);
    }

    const submitHandler = e => {
        setLoading(_ => true);
        try{
            e.preventDefault();
            const isValid = () => Object.values(formstate).every(v => v.trim() !== "");
            console.log(isValid());
            if(!isValid()) throw new AdvancedError("All fields must be entered and valid to book a session", 0);
            else {
                //it is valid
                console.log(formstate);
                setTimeout(() => setPage(old => old+=1));
            }
        }catch(err){
            toast.error(err.message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }finally{setLoading(_ => false);}
    }

    const changeTimezone = t => {
        console.log(t);
        setTimezone(_=> t);
    }


    return(
        <Layout>
            <ToastContainer />
            {loading && <Loader />}
            <Booking>
                <Icon onClick={goBack}>
                    <AiOutlineArrowLeft />
                </Icon>
                {page === 0 ?
                    (<BookingContainer>
                    <BookingLeft>
                        <BookingImageContainer>
                            <BookingImage src={mentorData.image} alt="Booking Image" />
                        </BookingImageContainer>
                        <h3>{mentorData.name}</h3>
                        <Time><AiFillClockCircle /> &nbsp; 20 mins</Time>
                    </BookingLeft>

                    <BookingRight>
                        <CalendarContainer>
                            <CalendarLeft>
                                <h3>Select a Date & Time</h3>
                                <StyledCalendar onChange={setDate} value={date} />
                                <TimeZone>
                                    <BiWorld />
                                    <TimezoneSelect
                                    value={timezone}
                                    onChange={changeTimezone}
                                    />
                                </TimeZone>
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
                            <button onClick={continueHandler}>Continue</button>
                        </ButtonContainer>
                    </BookingRight>
                    </BookingContainer>) 
                    : page === 1 ? (
                        <GenericContainer>
                            <LayoutContainer>
                                <Form id="booking" onSubmit={submitHandler} autoComplete="off">
                                    <HalfFormContainer>
                                        <FormContainer>
                                            <Label>First Name</Label>
                                            <Input type="text" name="firstName" value={formstate.firstName} onChange={changeHandler} />
                                        </FormContainer>
                                        <FormContainer>
                                            <Label>Last Name</Label>
                                            <Input type="text" name="lastName" value={formstate.lastName} onChange={changeHandler} />
                                        </FormContainer>
                                    </HalfFormContainer>
                                    <FormContainer>
                                        <Label>Email</Label>
                                        <Input type="email" name="email" value={formstate.email} onChange={changeHandler} />
                                    </FormContainer>
                                    <FormContainer>
                                        <Label>Purpose</Label>
                                        <TextArea rows="10" name="purpose" value={formstate.purpose} onChange={changeHandler} />
                                    </FormContainer>
                                </Form>
                            </LayoutContainer>
                            <ButtonContainer style={{maxWidth: 700}}>
                                <button onClick={backHandler}>Back</button>
                                <button form="booking">Submit</button>
                            </ButtonContainer>
                        </GenericContainer>
                    ) : (
                        <GenericContainer>
                            <LayoutContainer>
                                <SuccessContainer>
                                    <IconContainer>
                                        <svg width="296" height="296" viewBox="0 0 296 296" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M147.997 0.441406C118.813 0.441406 90.2849 9.09539 66.0196 25.309C41.7542 41.5226 22.8416 64.5676 11.6735 91.5299C0.505339 118.492 -2.41675 148.161 3.27671 176.784C8.97017 205.407 23.0235 231.698 43.6595 252.335C64.2955 272.971 90.5874 287.024 119.21 292.717C147.833 298.411 177.502 295.489 204.464 284.321C231.426 273.152 254.471 254.24 270.685 229.974C286.899 205.709 295.553 177.181 295.553 147.997C295.553 108.863 280.007 71.3315 252.335 43.6594C224.663 15.9874 187.131 0.441406 147.997 0.441406ZM244.369 98.4736L123.189 219.561L51.6248 147.997C49.1789 145.551 47.8048 142.234 47.8048 138.775C47.8048 135.316 49.1789 131.998 51.6248 129.553C54.0707 127.107 57.388 125.733 60.847 125.733C64.306 125.733 67.6234 127.107 70.0693 129.553L123.374 182.857L226.109 80.2136C227.32 79.0025 228.758 78.0419 230.34 77.3864C231.923 76.731 233.619 76.3937 235.331 76.3937C237.044 76.3937 238.74 76.731 240.323 77.3864C241.905 78.0419 243.343 79.0025 244.554 80.2136C245.765 81.4247 246.725 82.8625 247.381 84.4448C248.036 86.0272 248.374 87.7231 248.374 89.4358C248.374 91.1486 248.036 92.8445 247.381 94.4269C246.725 96.0092 245.765 97.447 244.554 98.6581L244.369 98.4736Z" fill="white"/>
                                        </svg>
                                    </IconContainer>
                                    <h2>Submitted Successfully</h2>
                                    <p>
                                    {mentorData?.name}’s response will be sent to your mail and dashboard with 24-48 hours
                                    </p>
                                    <Time><AiFillClockCircle /> &nbsp; 20 mins</Time>
                                    <Time>12:30pm - 13:00pm</Time>
                                    <TimeZone>
                                        <BiWorld />
                                        <TimezoneSelect
                                        value={timezone}
                                        onChange={changeTimezone}
                                        />
                                    </TimeZone>
                                </SuccessContainer>
                            </LayoutContainer>
                        </GenericContainer>
                    )
                }
            </Booking>
        </Layout>
    )
}




export default BookingMentor;