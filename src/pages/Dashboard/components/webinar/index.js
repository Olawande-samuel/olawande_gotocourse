import { useState } from "react"
import styled from "styled-components"
import { Admin } from "../../Admin"
import { Button } from "@mui/material"
import { BiCloudDownload } from "react-icons/bi"
import { useLocalStorage } from "../../../../hooks"
import { KEY } from "../../../../constants"
import { useAuth } from "../../../../contexts/Auth"
import { AdvancedError } from "../../../../classes"
import { Link } from "react-router-dom"

const Form = styled.section`
padding: 1rem;
// border: 2px solid red;
overflow-y: scroll;

form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    label{
        color: #000F62;
        font-size: 14px;
        line-height: 27px;
    }
    
    
    input{
        width: 100%;
        padding: .5rem ;
        background: #FAFAFA;
        border: 1px solid rgba(188, 183, 183, 0.5);
        border-radius: 10px;
        outline: none;
    }
    
    textarea{
        width: 100%;
        height: 150px;
        background: #FAFAFA;
        border: 1px solid rgba(188, 183, 183, 0.5);
        border-radius: 10px;
        outline: none;
        padding: .5rem ;
    
    }
}




`

const DateTime = styled.div`
width: 100%;
display: flex;
align-items: center;
gap: 2rem;
// justify-content: space-between;
// border: 2px solid red;


label, input{
    width: 40%;
}


`

const Container = styled.section`
overflow-y: scroll;
`

const Header = styled.header`
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
// border: 2px solid red;

label{
    color: #595959;
    font-size: 14px;
line-height: 19px;
}

input{
    width: 300px;
    padding: .5rem;
    border: .2px solid ;
    margin-left: 1rem;
}

button{
    border: none;
    outline: none;
    border-radius: 5px;
    a{
        color: #fff;
        background: #0C2191;
        padding:.8rem 1rem;
    }
}

@media (max-width: 768px){
    flex-direction: column;

    input{
        width: unset;
        margin-left: 1rem;
    }
}
`

const WebinarContent = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap: 1rem;


.webinartop{
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;

    div:nth-of-type(1){
        flex: .3;
    };

    div:nth-of-type(2){
        flex: .15;
    };
    div:nth-of-type(3){
        flex: .2;
    };
    div:nth-of-type(4){
        flex: .3;
    };
    div:nth-of-type(5){
        flex: .1;
    };

    div:nth-of-type(6){
        flex: .1;
    };


    @media (max-width: 768px){
        flex-direction: column;
    }
}

.webinarcontent{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;

    .webinaritem{
        display: flex;
        align-items: center; 
        
        div:nth-of-type(1){
            flex: .3;
        };
    
        div:nth-of-type(2){
            flex: .15;
        };
        div:nth-of-type(3){
            flex: .2;    
        };
        div:nth-of-type(4){
            flex: .3;
    
        };
        div:nth-of-type(5){
            flex: .1;
            color: #087118;
        };
        div:nth-of-type(6){
            flex: .1;
            color: #C41000;    
        };
    }


    @media (max-width: 768px){
        .webinaritem{
            flex-direction: column;

        }
    }
    
}




`
export const AdminWebinar = () => {
    const [formState, setFormState] = useState({
        title: "",
        description: "",

    })


    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    const { generalState: { isMobile, loading }, setGeneralState, generalState, adminFunctions: { addBlog } } = useAuth();

    const Submit = async (e) => {
        e.preventDefault();

        setGeneralState({ ...generalState, loading: true })
        try {
            const response = await addBlog(userdata?.token, formState)
            const { success, message, statusCode } = response
            if (!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
            const { data } = response
            console.log({ data });
        } catch (error) {
            console.error(error)
        } finally {
            setGeneralState({ ...generalState, loading: false })

        }

    }


    return (
        <Admin>
            <Form >

                <form>

                    <label htmlFor="title">Webinar title
                        <input type="text"
                            name="title"
                            value={formState.title}
                            onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                        />
                    </label>

                    <label htmlFor="description">Description:
                        <textarea name="Description"
                            value={formState.description}
                            onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}></textarea>
                    </label>

                    <label htmlFor="upload">Upload</label>
                    <Button variant="contained" component="label" style={{ width: "50%", color: "#FFFFFF", background: "#0C2191" }}>
                        <BiCloudDownload style={{ fontSize: "2rem", color: "#FFFFFF" }} /> Upload
                        <input hidden accept="image/*" multiple type="file"
                        />
                    </Button>



                    <DateTime>
                        <label htmlFor="title">Date
                            <input type="date"
                                name="date"
                                value={formState.title}
                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                            />
                        </label>
                        <label htmlFor="time">Time
                            <input type="time"
                                name="title"
                                value={formState.title}
                                onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                            />
                        </label>

                    </DateTime>


                    <h3>Presenters</h3>
                    <label htmlFor="presenter">Name of presenter
                        <input type="presenter"
                            name="text"
                            value={formState.status}
                            onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                        />
                    </label>

                    <label htmlFor="presenterDescription">Descrption of presenter
                        <input type="presenterDescription"
                            name="text"
                            value={formState.status}
                            onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                        />
                    </label>


                    <label htmlFor="upload">Upload</label>
                    <Button variant="contained" component="label" style={{ width: "50%", color: "#FFFFFF", background: "#0C2191" }}>
                        <BiCloudDownload style={{ fontSize: "2rem", color: "#FFFFFF" }} /> Upload
                        <input hidden accept="image/*" multiple type="file"
                        />
                    </Button>


                    <Button variant="contained" component="label" style={{ width: "200px", background: "#FFFFFF", color: "#0C2191", border: "1px solid #0C2191" }}>
                        Add presenter
                    </Button>


                    <Button variant="contained" component="label" style={{ color: "#FFFFFF", background: "#0C2191" }} onClick={(e) => Submit(e)}>
                        Save
                    </Button>



                </form>
            </Form>
        </Admin>
    )
}



export const AdminWebinarDashboard = () => {
    return (
        <Admin>
            <Container>
            <Header>
                <div>
                    <label htmlFor="filter">Filter By:
                        <input type="search" placeholder="search" />
                    </label>
                </div>

                <button>
                    <Link to={`create`}>
                        Create Webinar
                    </Link>
                </button>
            </Header>

            <WebinarContent>

                <div className="webinartop">
                    <div>Name</div>
                    <div>Date</div>
                    <div>Time</div>
                    <div>Presenter</div>
                    <div />
                    <div />
                </div>
                <div className="webinarcontent">

                    {[...Array(5)].map((x, id) => (
                        <div className="webinaritem">
                            <div>UIUX</div>
                            <div>Feb 24</div>
                            <div>8:00 pm CST</div>
                            <div>Admin 1 </div>
                            <div>Edit</div>
                            <div>Delete</div>
                        </div>
                    ))}
                </div>

            </WebinarContent>

            </Container>
        </Admin>

    )
}