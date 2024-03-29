import { IoIosSearch } from "react-icons/io";
import { colors } from "../../../constants";


import clsx from "./styles.module.css";



const Searchbar = ({showIcon, placeholder="", changeHandler, value, style}) => {

    return (
        <div className={clsx.searchbar} style={style}>
            {showIcon && <IoIosSearch />}
            <input type="text" placeholder={placeholder} onChange={changeHandler}
            value={value} className={`d-none d-sm-block ${clsx.searchbar_input}`} />
        </div>
    )
}



export default Searchbar;