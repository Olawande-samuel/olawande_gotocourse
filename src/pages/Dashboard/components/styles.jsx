import { breakpoints, colors } from "../../../constants";



const useStyles = () => {
    return {

        //SIDEBAR
        sidebar: {
            padding: 10,
            paddingLeft: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            backgroundColor: colors.white,
            maxWidth: 250,

        },
        sidebar_items: {
            display: "flex",
            // alignItems: "center",
            marginTop: 50,
            flexDirection: "column"
        },

        sidebar_item: {
            cursor: "pointer",
            // padding: 10,     
            padding: "15px",
            color: colors.gray,
            marginTop: 20,
            display: "flex",
            alignItems: 'center',
            width: 221,
            borderRadius: 4,
        },
        sidebar_icon: {
            marginRight: 20,
            fontSize: "1.3rem",
            color: colors.gray,
        },


        //SEARCHBAR
        searchbar: {
            backgroundColor: colors.white,
            padding: 4,
            borderRadius: 10,
            minWidth: 300,
            width:500
        },
        searchbar_input: {
            backgroundColor: 'transparent',
            border: "none",
            outline: "none",
            lineHeight: 2,
            padding: 4,
            color: colors.textColorDark,
            flex: 1,
        }
    }
}



export default useStyles;