import { MdSearch } from "react-icons/md";



import useStyles from "./styles";



const Searchbar = ({showIcon, placeholder="", changeHandler, value}) => {
    const clsx = useStyles();

    return (
        <div style={clsx['searchbar']}>
            {showIcon && <MdSearch />}
            <input type="text" placeholder={placeholder} onChange={changeHandler}
            value={value} style={clsx["searchbar_input"]} />
        </div>
    )
}



export default Searchbar;