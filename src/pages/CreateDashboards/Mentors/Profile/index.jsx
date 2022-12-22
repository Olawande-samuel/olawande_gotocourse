import { MdEdit } from "react-icons/md";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";


import Layout from "../Layout";
import avatar from "../../../../images/teacher.png";
import clsx from "../styles.module.css";
import { useAuth } from "../../../../contexts/CreateAuth";
import { AdvancedError } from "../../../../classes";
import { useEffectOnMount, useLocalStorage } from "../../../../hooks";
import {KEY} from "../../../../constants";




function Info({ title, content }) {
    return (
      <div className={clsx.teachers__info}>
        <span className={clsx.teachers__info_title}>{title}</span>
        <span className={clsx.teachers__info_content}>{content}</span>
      </div>
    );
}


const Profile = () => {
    const { updateItem, getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    const {
      generalState: { isMobile, notification, loading },
      setGeneralState,
      generalState,
      teacherFunctions: { fetchProfile },
    } = useAuth();
    const flag = useRef(false);
  
    const navigate = useNavigate();
    useEffect(() => {
      setTimeout(() => {
        setGeneralState((old) => {
          return {
            ...old,
            notification: null,
          };
        });
      }, 5000);
    }, []);

    useEffectOnMount(() => {
        console.log("Mentors Profile is mounted");
        return () => console.log("Mentors Profile is unmounted");
    }, [])
  
    useEffect(() => {
      if (flag.current) return;
  
      if (userdata) {
        async function get() {
          setGeneralState({ ...generalState, loading: true });
          try {
            let data = await fetchProfile(userdata?.token);
            setGeneralState({ ...generalState, loading: false });
  
            const { success, message, statusCode } = data;
            if (!success || statusCode !== 1)
              throw new AdvancedError(message, statusCode);
            else {
              const { data: d } = data;
              const newValue = {
                ...userdata,
                ...d,
              };
              userdata = updateItem(KEY, newValue);
              setGeneralState((old) => {
                return {
                  ...old,
                  userdata: { ...old.userdata, ...d },
                };
              });
            }
          } catch (err) {
            setGeneralState({ ...generalState, loading: false });
  
            toast.error(err.message, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
        get();
        console.log(userdata, 'line 99');
      }
  
      flag.current = true;
    }, [userdata?.token]);
  
    function editProfileHandler(e) {
      navigate("/mentor/profile/edit");
    }
    return (
      <Layout
        // isMobile={isMobile}
        // userdata={userdata}
        // notification={notification}
        header="Profile"
        loading={loading}
      >
        <div className={clsx.teachers_profile}>
          <div className={clsx.teachers_profile_top}>
            <div className={clsx.teachers_profile_top_img}>
              <img
                src={userdata?.profileImg ?? avatar}
                style={{ borderRadius: 10 }}
                width="100%"
                height="100%"
                alt="Avatar"
              />
              <button
                className={clsx.teachers_profile_top_button}
                onClick={editProfileHandler}
              >
              <MdEdit />
            </button>
            </div>
          </div>
          <div className={clsx.teachers_profile_main}>
            <h1 className={clsx.teachers__header} style={{ marginTop: 20 }}>
              {userdata?.firstName} {userdata?.lastName}
            </h1>
  
            <div className={clsx.teachers__profile_info}>
              <Info title="Email Address" content={userdata?.email} />
              <Info title="Brief Introduction" content={userdata?.bio} />
              <Info title="Location" content={userdata?.location.toUpperCase()} />
              {/* <Info title="Courses" content={userdata?.courses} /> */}
              {/* <Info title="Category" content={userdata?.category} /> */}
            </div>
          </div>
        </div>
      </Layout>
    );
}





export default Profile;