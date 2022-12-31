import styled from "styled-components"
import { KEY } from "../../../constants";
import { useAuth } from "../../../contexts/Auth";
import { useLocalStorage } from "../../../hooks";
import { Students } from "../Students"

const Container =  styled.div`

`

const Cart = () => {
    const { generalState: { isMobile }, studentFunctions: { fetchCourses, fetchWishlist, fetchBootcamps: fetchMyClasses }, otherFunctions: { fetchCourses: fetchAllCourses, fetchBootcamps } } = useAuth();
    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    return (
        <Container>
             {/* <Students 
             isMobile={isMobile} 
             userdata={userdata} 
             header={"Cart"} > */}

                testing

                
             {/* </Students> */}

        </Container>
    )
}

export default Cart