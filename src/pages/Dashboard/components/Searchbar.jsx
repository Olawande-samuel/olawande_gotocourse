import { IoIosSearch } from "react-icons/io";
import { colors } from "../../../constants";


import clsx from "./styles.module.css";



const Searchbar = ({showIcon, placeholder="", changeHandler, value}) => {

    return (
        <div className={clsx.searchbar}>
            {showIcon && <IoIosSearch />}
            <input type="text" placeholder={placeholder} onChange={changeHandler}
            value={value} className={clsx.searchbar_input} />
        </div>
    )
}



export default Searchbar;