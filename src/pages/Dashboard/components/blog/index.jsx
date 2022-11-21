import { Button } from "@mui/material"
import { useState } from "react"
import { BiCloudDownload } from "react-icons/bi"
import styled from "styled-components"
import { AdvancedError } from "../../../../classes"
import { KEY } from "../../../../constants"
import { useAuth } from "../../../../contexts/Auth"
import { useLocalStorage } from "../../../../hooks"
import { Admin } from "../../Admin"

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
        height: 300px;
        background: #FAFAFA;
        border: 1px solid rgba(188, 183, 183, 0.5);
        border-radius: 10px;
        outline: none;
        padding: .5rem ;
    
    }
}




`



export const Blog = () => {

    const [formState, setFormState] = useState({
        title: "",
        content: "",

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
            console.log({data});
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

                    <label htmlFor="title">Blog Title
                        <input type="text"
                            name="title"
                            value={formState.title}
                            onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                        />
                    </label>

                    <label htmlFor="content">Content
                        <textarea name="content"
                            value={formState.content}
                            onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}></textarea>
                    </label>

                    <label htmlFor="upload">Upload</label>
                    <Button variant="contained" component="label" style={{ width: "50%", color: "#FFFFFF", background: "#0C2191" }}>
                        <BiCloudDownload style={{ fontSize: "2rem", color: "#FFFFFF" }} /> Upload
                        <input hidden accept="image/*" multiple type="file"
                        />
                    </Button>


                    <Button variant="contained" component="label" style={{ color: "#FFFFFF", background: "#0C2191" }} onClick={(e) => Submit(e)}>
                        Publish
                    </Button>



                </form>
            </Form>
        </Admin>
    )
}