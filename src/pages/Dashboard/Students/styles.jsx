import { breakpoints, colors } from "../../../constants"



const useStyles = () => {
    return {
        students: {
            display: "flex",
            alignItems: "center"
        },
        students_main: {
            height: "100vh",
            flex: 1,
            backgroundColor: colors.primary,
            padding: 30,
            display: 'flex',
            flexDirection: 'column',
        },
        students_header: {
            display: 'flex',
            alignItems: "center",
            marginBottom: 50
        },
        students_profile: {
            backgroundColor: colors.white,
            minHeight: "70vh",
            padding: 40,
            borderRadius: 10
        },
        students_profile_top: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: 20
        },
        students_profile_top_img: {
            width: 120,
            height: 120,
            marginRight: 40
        },
        students_profile_top_button: {
            backgroundColor: colors.info,
            color: colors.white,
            border: 'none',
            padding: "10px 30px",
            borderRadius: 10
        },
        students__header: {
            fontSize: "1.5rem",
            color: colors.textColorDark
        },
        students__paragraph: {
            lineHeight: 2,
            fontSize: "1.2rem",
            letterSpacing: 0.6
        }
    }
}





export default useStyles;