import React, {useEffect} from "react";



import clsx from "./styles.module.css";
import Logo from "../../../components/Logo";




const AuthLayout = ({children}) => (
    <div className={clsx["auth_layout"]}>
        <div className={clsx["layout_header"]}>
            <Logo />
        </div>
        <div className={clsx["layout_body"]}>
            {children}
        </div>
    </div>
)




export default AuthLayout;