import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Switch } from "@mui/material";
import { AiOutlineMenu } from "react-icons/ai";

import { Sidebar, Searchbar } from "../components";
import clsx from "./styles.module.css";

import avatar from "../../../images/teacher.png";
import { useAuth } from "../../../contexts/AuthContext";
import img01 from "../../../images/mentor1.png";
import img02 from "../../../images/mentor2.png";
import { GuardedRoute } from "../../../hoc";
import { AdvancedError } from "../../../classes";
import useCookies from "../../../hooks/useCookie";

import Input from "../../../components/Input";
import Loader from "../../../components/Loader";

const key = "gotocourse-profiledata";

export function Dashboard() {
  const { updateCookie, fetchCookie } = useCookies();
  const {
    generalState: { userdata },
    setGeneralState,
    adminFunctions: { fetchProfile },
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (userdata) {
      async function get() {
        try {
          let { data, message, success, statusCode } = await fetchProfile(
            userdata?.token
          );
          if (success) {
            updateCookie("gotocourse-userdata", data);
          } else throw new AdvancedError(message, statusCode);
        } catch (error) {
          toast.error(error.message, {
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
    }
  }, [userdata?.token]);

  function editProfileHandler(e) {
    navigate("/admin/profile/edit");
  }

  return (
    <Admin header="Dashboard">
      <div className={clsx["admin_profile"]}>
        <div className={clsx["admin_profile_top"]}>
          <div className={clsx["admin_profile_top_img"]}>
            <img
              src={userdata?.profileImg ? userdata.profileImg : avatar}
              style={{ borderRadius: 10, width: "120px", height: "120px" }}
              width="100%"
              alt="Avatar"
            />
          </div>
          <button
            className={clsx["admin_profile_top_button"]}
            type="button"
            onClick={editProfileHandler}
          >
            <MdEdit style={{ marginRight: 15 }} /> <span>Edit</span>
          </button>
        </div>
        <div className={clsx["admin_profile_main"]}>
          <h1>Olu Jacobs</h1>
          <p className={clsx["admin__paragraph"]}>
            Enjoys writing and playing video games. <br />I joined Gotocourse to
            make friends connect with people virtually
          </p>
        </div>
      </div>
    </Admin>
  );
}

function Info({ title, content }) {
  return (
    <div className={clsx.admin__info}>
      <span className={clsx.admin__info_title}>{title}</span>
      <span className={clsx.admin__info_content}>{content}</span>
    </div>
  );
}

export function Approve() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const info = [
    {
      title: "Brief Introduction",
      content: "Enjoys writing and playing video games",
    },
    {
      title: "Location",
      content: "Lagos, Nigeria",
    },
    {
      title: "Courses",
      content: "UX Designer",
    },
    {
      title: "Category",
      content: "Cybersecurity, UX, Data Analysis",
    },
  ];
  const tableContents = [
    {
      name: "Melanie Grutt",
      img: img01,
      date: "Feb 24",
      email: "melanie@gmail.com",
      approve: true,
    },
    {
      name: "Kiera Danlop",
      img: img02,
      date: "Mar 23",
      email: "kiera@gmail.com",
      approve: false,
    },
    {
      name: "Melanie Grutt",
      img: img01,
      date: "Feb 24",
      email: "melanie@gmail.com",
      approve: true,
    },
  ];
  useEffect(() => {
    const email = location.search.split("=")[1];
    console.log(email);

    setData((_) => {
      return tableContents.find((t) => t.email === email);
    });
  }, []);
  return (
    <Admin header="Approval">
      {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />              */}
      <div className={clsx["admin_profile"]}>
        <div className={clsx["admin_profile_top"]}>
          <div className={clsx["admin_profile_top_img"]}>
            <img
              src={data ? data.img : avatar}
              style={{ borderRadius: 10 }}
              width="100%"
              alt="Avatar"
            />
          </div>
        </div>
        <div className={clsx["admin_profile_main"]}>
          <h1>{data ? data.name : "Olu Jacobs"}</h1>

          <div className={clsx.admin__profile_info}>
            {info.map(({ title, content }, i) => (
              <Info title={title} content={content} key={i} />
            ))}

            <button
              className="button button-lg log_btn w-50 mt-3"
              style={{ backgroundColor: data?.approve && "red" }}
              type="submit"
            >
              {data?.approve ? "Revoke" : "Approve"}
            </button>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export function UserInfoCard({
  img,
  name,
  date,
  email,
  isActive = null,
  paid,
  comp,
  num,
  course,
  pack,
  rating,
  firstName,
  lastName,
  user,
  accessPledre,
  handleVerification,
  handlePledreAccess,
  approveHandler = () => { return; },
}) {
  return (
    // <div>
    <tr
      className={clsx.user__info_card}
      onClick={(e) => approveHandler(e, email)}
    >
      <td className={clsx.user__info}>{num + 1}.</td>
      {user && (
        <td className={clsx.user__details}>
        {img &&  <img src={img} alt="avatar" />}
          <span>{`${firstName} ${lastName}`}</span>
        </td>
      )}

      {comp === "Courses" && <td className={clsx.user__info}>{course}</td>}

      {comp === "Courses" && <td className={clsx.user__info}>{name}</td>}

      {date && (
        <td className={clsx.user__date}>
          <span>{date}</span>
        </td>
      )}

      {pack && (
        <td className={clsx.user__date}>
          <span>{pack}</span>
        </td>
      )}
      {email && (
        <td className={clsx.user__email}>
          <span>{email}</span>
        </td>
      )}
      {rating && (
        <td className={clsx.user__email}>
          <span>{rating}</span>
        </td>
      )}
      {paid && (
        <td className={clsx.user__button}>
          <span>
            {new Intl.NumberFormat("en-us", {
              style: "currency",
              currency: "USD",
            }).format(paid)}
          </span>
        </td>
      )}
      {isActive !== null && (
        <td className={clsx.user__button}>
          <span>
            <Switch onClick={handleVerification} checked={isActive} />
          </span>
        </td>
      )}
      {accessPledre !== null && (
        <td className={clsx.user__button}>
          <span>
            <Switch onClick={handlePledreAccess} checked={accessPledre} />
          </span>
        </td>
      )}
    </tr>
    // </div>
  );
}

export function Teachers() {
  const navigate = useNavigate();
  const {
    adminTeacherFunctions: { fetch },
    generalState: { userdata },
  } = useAuth();
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(userdata?.token);
        console.log(res);
        const { message, success, statusCode } = res;
        if (!success) throw new AdvancedError(message, statusCode);
        else {
          const { data } = res;
          //do somethings
          console.log(data);
        }
      } catch (err) {
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
    })();
  }, []);
  const tableHeaders = ["No", "Name", "Date", "Email", "Approve"];
  const tableContents = [
    {
      name: "Melanie Grutt",
      img: img01,
      date: "Feb 24",
      email: "melanie@gmail.com",
      approve: true,
    },
    {
      name: "Kiera Danlop",
      img: img02,
      date: "Mar 23",
      email: "kiera@gmail.com",
      approve: false,
    },
    {
      name: "Melanie Grutt",
      img: img01,
      date: "Feb 24",
      email: "melanie@gmail.com",
      approve: true,
    },
    {
      name: "Kiera Danlop",
      img: img02,
      date: "Mar 23",
      email: "kiera@gmail.com",
      approve: false,
    },
    {
      name: "Melanie Grutt",
      img: img01,
      date: "Feb 24",
      email: "melanie@gmail.com",
      approve: true,
    },
    {
      name: "Kiera Danlop",
      img: img02,
      date: "Mar 23",
      email: "kiera@gmail.com",
      approve: true,
    },
    {
      name: "Melanie Grutt",
      img: img01,
      date: "Feb 24",
      email: "melanie@gmail.com",
      approve: false,
    },
  ];

  function approveHandler(e, email) {
    console.log(e.target, email);

    if (email) navigate(`approve?email=${email}`);
  }
  return (
    <Admin header={"Mentors/Teachers"}>
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <h1>All Mentors</h1>
          <div className={`table-responsive ${clsx.admin__student_main}`}>
            <table className={`${clsx.admin__student_table}`}>
              <thead>
                {tableHeaders.map((el, i) => (
                  <td key={i}>{el}</td>
                ))}
              </thead>
              <tbody>
                {tableContents.map(({ img, email, date, name, approve }, i) => (
                  <UserInfoCard
                    key={i}
                    name={name}
                    img={img}
                    num={i}
                    date={date}
                    email={email}
                    isActive={approve}
                    approveHandler={approveHandler}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export function Courses() {
  const tableHeaders = [
    "No",
    "Courses",
    "Name",
    "Date",
    "Package",
    "Rating",
    "Approval",
  ];
  const tableContents = [
    {
      name: "Melanie Grutt",
      course: "Cybersecurity",
      date: "Feb 24",
      package: "Cohort",
      rating: "Bronze",
      approve: true,
    },
    {
      name: "Keira Danlop",
      course: "UI/UX",
      date: "Feb 24",
      package: "Cohort",
      rating: "Silver",
      approve: true,
    },
    {
      name: "Diop Grutt",
      course: "HTML",
      date: "Apr 1",
      package: "One on One",
      rating: "Gold",
      approve: false,
    },
    {
      name: "Diop Grutt",
      course: "Data Analytics",
      date: "Sept 1",
      package: "Self paced",
      rating: "Diamond",
      approve: false,
    },
  ];
  return (
    <Admin header={"Courses"}>
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <h1>All Courses</h1>

          <div className={clsx.admin__student_main}>
            <table className={clsx.admin__student_table}>
              <thead>
                {tableHeaders.map((el, i) => (
                  <td key={i}>{el}</td>
                ))}
              </thead>
              <tbody>
                {tableContents.map(
                  (
                    {
                      img,
                      email,
                      date,
                      name,
                      approve,
                      package: p,
                      course,
                      rating,
                    },
                    i
                  ) => (
                    <UserInfoCard
                      key={i}
                      name={name}
                      num={i}
                      comp={"Courses"}
                      rating={rating}
                      date={date}
                      email={email}
                      isActive={approve}
                      pack={p}
                      course={course}
                    />
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export function Fees() {
  const tableHeaders = ["No", "Name", "Date", "Email", "Paid"];
  const tableContents = [
    {
      name: "Melanie Grutt",
      img: img01,
      date: "Feb 24",
      email: "melanie@gmail.com",
      paid: 2000,
    },
    {
      name: "Kiera Danlop",
      img: img02,
      date: "Mar 23",
      email: "kiera@gmail.com",
      paid: 4000,
    },
    {
      name: "Melanie Grutt",
      img: img01,
      date: "Feb 24",
      email: "melanie@gmail.com",
      paid: 1000,
    },
    {
      name: "Kiera Danlop",
      img: img02,
      date: "Mar 23",
      email: "kiera@gmail.com",
      paid: 6000,
    },
  ];
  return (
    <Admin header={"Fees"}>
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <h1>All Fees</h1>

          <div className={clsx.admin__student_main}>
            <table className={clsx.admin__student_table}>
              <thead>
                {tableHeaders.map((el, i) => (
                  <td key={i}>{el}</td>
                ))}
              </thead>
              <tbody>
                {tableContents.map(({ img, email, date, name, paid }, i) => (
                  <UserInfoCard
                    key={i}
                    name={name}
                    img={img}
                    paid={paid}
                    date={date}
                    email={email}
                    isActive={false}
                    num={i}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export function Student() {
  const { adminStudentFunctions: { fetch, verify }, generalState: { userdata, loading },setGeneralState } = useAuth();
  const [studentList, setStudentList] = useState([])
  useEffect(() => {
      if(userdata) {
          (async () => {
            try {
              const res = await fetch(userdata?.token);
              console.log(res);
              const { message, success, statusCode } = res;
              if (!success) throw new AdvancedError(message, statusCode);
              else if (statusCode === 1) {
                const { data } = res;
                //do somethings

                setStudentList(data)
                console.log(data);
              } else {
                  throw new AdvancedError(message, statusCode)
              }
            } catch (err) {
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
          })();
      }
  }, [userdata]);

  async function handleVerification (id){
    setGeneralState((old)=>{
      return {
        ...old,
        loading:true
      }
    })
      let item = {
        userId: id
      } 
      try {
        const res = await verify(item, userdata?.token);
        
          let item = {
            userId: id
          } 
        console.log(res);
        const { message, success, statusCode } = res;
        console.log(res);

        if (!success) throw new AdvancedError(message, statusCode);
        else {
          const { data } = res;
          //do somethings
          toast.success(message, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(data);
        } 
      } catch (error) {
        toast.error(error.message, {
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
  async function handlePledreAccess (){

  }
  const tableHeaders = ["No", "Name", "Email", "Approve", "Access Pledre"];
  
  return (
    <Admin header={"Student"}>
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <h1>All Students</h1>

          <div className={`table-responsive ${clsx.admin__student_main}`}>
            <table className={clsx.admin__student_table}>
              <thead>
                {tableHeaders.map((el, i) => (
                  <td key={i}>{el}</td>
                ))}
              </thead>
              <tbody>
                {studentList.length > 0 && studentList.map(({ userId, profileImg,accessPledre, email, date, name, isVerified, firstName, lastName }, i) => (
                  <UserInfoCard
                    key={i}
                    name={name}
                    firstName={firstName}
                    lastName={lastName}
                    img={profileImg}
                    date={date}
                    email={email}
                    num={i}
                    isActive={isVerified}
                    accessPledre={accessPledre}
                    user={true}
                    handleVerification={()=>handleVerification(userId)}
                    handlePledreAccess={()=>handlePledreAccess(userId)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <Loader /> */}
    </Admin>
  );
}

export function Edit() {
  const {
    generalState: { isMobile, userdata },
    setGeneralState,
    adminFunctions: { updateAvatar, updateProfile },
  } = useAuth();
  const { updateCookie, isCookie, saveCookie } = useCookies();
  const [imageUrl, setImageUrl] = useState(null);
  const [isUplaoding, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formstate, setFormstate] = useState({
    firstName: userdata?.firstName ?? "",
    lastName: userdata?.lastName ?? "",
    bio: userdata?.bio ?? "",
    location: userdata?.location ?? "",
    work: userdata?.work ?? "",
    category: userdata?.category ?? "",
  });
  useEffect(() => {
    if (userdata) {
      setFormstate({
        firstName: userdata.firstName,
        lastName: userdata.lastName,
        bio: userdata.bio,
        location: userdata.location,
        phoneNumber: userdata.phoneNumber,
        work: userdata.work,
        categoty: userdata.category,
      });
    }
  }, [userdata]);

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        formstate.firstName === "" ||
        formstate.lastName === "" ||
        formstate.bio === "" ||
        formstate.location === "" ||
        formstate.work === ""
      )
        throw new AdvancedError("All fields are required", 0);
      //submit updated profile

      const res = await updateProfile(formstate, userdata.token);
      const { success, message, statusCode, data } = res;
      if (!success) throw new AdvancedError(message, statusCode);
      else {
        if (isCookie(key)) {
          updateCookie(key, data);
        } else {
          saveCookie(key, data);
        }
        setGeneralState((old) => {
          return {
            ...old,
            userdata: { ...old.userdata, ...data },
          };
        });
        toast.success(message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      // setTimeout(() => {}, 2000);
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading((_) => false);
    }
  }

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormstate((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  function uploadPicture() {
    let input = document.getElementById("imageUpload");
    input.click();
  }

  function changeImageHandler(e) {
    let file = e.target.files[0];
    let url = URL.createObjectURL(file);
    setImageUrl((_) => url);
    setFile((_) => file);
  }

  async function changeProfilePictureHandler(e) {
    setIsUploading((_) => true);
    try {
      let formdata = new FormData();
      formdata.append("image", file, file.name);

      const res = await updateAvatar(formdata, userdata.token);
      const { success, message, statusCode } = res;
      if (!success) throw new AdvancedError(message, statusCode);
      else {
        const { data } = res;
        if (isCookie(key)) {
            updateCookie(key, data);
          } else {
            saveCookie(key, data);
          }
          setGeneralState((old) => {
            return {
              ...old,
              userdata: { ...old.userdata, ...data },
            };
          });
        toast.success(message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsUploading((_) => false);
    }
  }

  console.log("user", userdata)
  return (
    <Admin header="ADMIN">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <h3>Update Profile</h3>
          <div className="row w-100">
            <div className={` col-sm-3 ${clsx.edit__picture}`}>
              {userdata?.profileImg ? (
                <img
                  src={imageUrl ?? userdata.profileImg}
                  alt="Avatar"
                  style={{ width: "120px", height: "120px" }}
                />
              ) : !imageUrl ? (
                <span>placeholder</span>
              ) : (
                <img src={imageUrl} alt="Avatar" />
              )}
              <input
                id="imageUpload"
                type="file"
                style={{ display: "none" }}
                onChange={changeImageHandler}
              />
              {imageUrl ? (
                <p
                  style={{ cursor: isUplaoding && "not-allowed" }}
                  onClick={changeProfilePictureHandler}
                >
                  Change Picture
                </p>
              ) : (
                <p onClick={uploadPicture} style={{ cursor: "pointer" }}>
                  Upload Photo
                </p>
              )}
            </div>
          </div>

          <form className="form" onSubmit={submitHandler}>
            <Input
              label="First name"
              name="firstName"
              type="text"
              handleChange={changeHandler}
              value={formstate.firstName}
            />
            <Input
              label="Last name"
              name="lastName"
              type="text"
              handleChange={changeHandler}
              value={formstate.lastName}
            />

            <div className={clsx.form_group}>
              <label htmlFor={"bio"} className="form-label generic_label">
                Bio
              </label>
              <textarea
                rows="5"
                name="bio"
                value={formstate.bio}
                onChange={changeHandler}
                className="form-control generic_input"
              ></textarea>
            </div>

            <Input
              label="Location"
              name="location"
              type="text"
              handleChange={changeHandler}
              value={formstate.location}
            />

            <Input
              label="Profession"
              name="work"
              type="text"
              handleChange={changeHandler}
              value={formstate.work}
            />

            <Input
              label="Category"
              name="category"
              type="text"
              handleChange={changeHandler}
              value={formstate.category}
            />

            {loading ? (
              <button className="button button-lg log_btn w-100 mt-3">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
            ) : (
              <button
                className="button button-lg log_btn w-100 mt-3"
                type="submit"
              >
                Save
              </button>
            )}
          </form>
        </div>
      </div>
    </Admin>
  );
}

const Admin = ({ children, header }) => {
  const {
    generalState: { isMobile, showSidebar },
    generalState,
    setGeneralState,
  } = useAuth();
  useEffect(() => {
    console.log("Admin component is mounted");
    return () => console.log("Admin component is unmounted");
  }, []);

  const toggleSidebar = () => {
    setGeneralState({ ...generalState, showSidebar: !showSidebar });
  };
  return (
    <GuardedRoute>
      <div className={clsx["admin"]}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Sidebar isMobile={isMobile} />
        <div className={clsx["admin_main"]}>
          <div className={`align-items-center ${clsx["admin_topbar"]}`}>
            <div className="d-md-none">
              <i>
                <AiOutlineMenu
                  style={{ fontSize: "24px", color: "#0C2191" }}
                  onClick={toggleSidebar}
                />
              </i>
            </div>
            <h1 className="d-none d-md-block">{header}</h1>
            <Searchbar showIcon={true} placeholder="Search" />
          </div>
          {children}
        </div>
      </div>
    </GuardedRoute>
  );
};
