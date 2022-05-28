import {Link} from "react-router-dom";
import src from "../images/Logo.png";


const Logo = () => {
    const clsx = {
        logo: {
            display: "inline-flex",
            width: "100%",
            padding: 25,
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
    return (
        <Link to="/">
            <div style={clsx['logo']}>
            <img src={src} width="100%" alt="logo" />
            </div>
        </Link>
    )
}



export default Logo;