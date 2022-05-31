import clsx from "./styles.module.css";

const Toggle = ({isActive}) => {
    function clickHandler(e){
        console.log(document.getElementById("toggle"))
    }
    return (
        <div className={clsx.toggle} onClick={clickHandler}>
            <input type="checkbox" id="toggle" />
            <label htmlFor="toggle" className={clsx.toggle__label}>
                <div className={clsx.switch}>
                    <div className={clsx.dot}></div>
                </div>
            </label>
        </div>
    )
} 



export default Toggle;