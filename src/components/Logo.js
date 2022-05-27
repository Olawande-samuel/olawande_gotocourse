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
        <div style={clsx['logo']}>
           <img src={src} width="100%" alt="logo" />
        </div>
    )
}



export default Logo;