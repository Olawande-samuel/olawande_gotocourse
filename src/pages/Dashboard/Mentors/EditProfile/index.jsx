import { MdPersonAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";


import Layout from "../Layout";
import avatar from "../../../../images/teacher.png";
import clsx from "../styles.module.css";
import { useAuth } from "../../../../contexts/Auth";
import { AdvancedError } from "../../../../classes";
import { useEffectOnMount, useLocalStorage } from "../../../../hooks";
import {KEY} from "../../../../constants";
import Input from "../../../../components/Input";





const EditProfile = () => {
    const {
      setGeneralState,
      teacherFunctions: { updateAvatar, updateProfile },
    } = useAuth();
  
    const { updateItem, getItem } = useLocalStorage();
    let userdata = getItem(KEY);
  
    const navigate = useNavigate();
  
    const [imageUrl, setImageUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const [formstate, setFormstate] = useState({
      firstName: userdata?.firstName ?? "",
      lastName: userdata?.lastName ?? "",
      work: userdata?.work ?? "",
      location: userdata?.location ?? "",
      category: userdata?.category ?? "",
      bio: userdata?.bio ?? "",
      goals: userdata?.goals ?? "",
    });
  
    useEffect(() => {
      // to prevent data from disappearing on page reload
      // setFormstate({...formstate, ...userdata})
    }, []);
  
    async function submitHandler(e) {
      e.preventDefault();
      setLoading(true);
      try {
        if (
          formstate.firstName === "" ||
          formstate.lastName === "" ||
          formstate.brief_intro === "" ||
          formstate.location === "" ||
          formstate.profession === ""
        )
          throw new AdvancedError("All fields are required", 0);
        //submit updated profile
        const res = await updateProfile(formstate, userdata.token);
        const { success, message, statusCode } = res;
        if (!success) throw new AdvancedError(message, statusCode);
        else {
          const { data } = res;
          const newValue = {
            ...userdata,
            ...data,
          };
          userdata = updateItem(KEY, newValue);
          setGeneralState((old) => {
            return {
              ...old,
              notification: message,
            };
          });
          navigate("/teacher/");
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
          const { profileImg } = data;
          //updated successfully
          //set the localStorage here
          const newValue = {
            ...userdata,
            profileImg,
          };
          userdata = updateItem(KEY, newValue);
  
          setImageUrl((_) => null);
          setFile((_) => null);
  
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
  
    return (
      <Layout header="Edit Profile">
        <div className={clsx.teachers_profile}>
          <div className={clsx.edit__profile}>
            <h2>Update Profile</h2>
            <div className={clsx.edit__picture}>
              {userdata?.profileImg ? (
                <img src={imageUrl ?? userdata.profileImg} alt="Avatar" />
              ) : !imageUrl ? (
                <span>
                  <MdPersonAdd />
                </span>
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
                  isUploading ? 
                  <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                 </div> : 
  
               <p
                  style={{ cursor: isUploading && "not-allowed", color: "var(--theme-orange", fontWeight:"700" }}
                  onClick={changeProfilePictureHandler}
                >
                  Click to Upload Photo
                </p>
            
              ) : (
                <p onClick={uploadPicture} style={{ cursor: "pointer" }}>
                 Select a photo to upload
                </p>
              )}
            </div>
            <div className={clsx.edit__picture}>
              <button
                style={{
                  border: "1px dotted var(--theme-blue)",
                  outline: "none",
                  color: "var(--theme-blue)",
                  padding: "4px",
                  borderRadius: "8px",
                }}
                type="button"
                onClick={() => {
                  navigate("/change-password");
                }}
              >
                Change Password
              </button>
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
                <label htmlFor={"bio"}>Brief Introduction</label>
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
      </Layout>
    );
}





export default EditProfile;