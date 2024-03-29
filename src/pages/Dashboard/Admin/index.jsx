import React, { useEffect, useMemo, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { motion } from "framer-motion";
import { Switch, Modal, Box, Skeleton, Autocomplete, TextField } from "@mui/material";

import {
	AiOutlineDelete,
	AiTwotoneEdit,
	AiTwotoneDelete,
	AiFillEdit,
} from "react-icons/ai";
import { FaUserLock } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import DOMPurify from "dompurify";

import { Sidebar, Navbar } from "../components";
import clsx from "./styles.module.css";

import avatar from "../../../images/teacher.png";
import { useAuth } from "../../../contexts/Auth";
import { useSyllabus } from "../../../contexts/Syllabus";

import { GuardedRoute } from "../../../hoc";
import { AdvancedError } from "../../../classes";
import { useLocalStorage } from "../../../hooks";
import { changeSubCategory, getDate, KEY } from "../../../constants";
import Input from "../../../components/Input";
import Loader from "../../../components/Loader";
import UploadForm from "../../../components/UploadForm";
import { Rating } from "react-simple-star-rating";
import vector from "../../../images/vector.png";
import { CourseDetail } from "../../Courses";
import Layout from "../../../components/Layout";
import ChatComponent from "./Chat";
import {
	AddPackage,
	AddSyllabus,
	changeConstants,
	CreateCourseMain,
} from "../Teachers/CreateCourse";
import { AllEarnings } from "../Teachers/Earnings";

import EarningsTable from "./Earnings/Table";

import { BiTrash } from "react-icons/bi";
import { ClassesCard } from "../Teachers/Bootcamps";
import Editor from "../components/Editor";
import Detail from "../../Category/Detail";
import ReactQuill from "react-quill";
import { Grid } from "../../../components/NewLanding/Headstart";
import UploadWidget from "../components/classConsole/components/UploadWidget";


// CATEGORY DETAILS COMPONENT
export function CategoryDetails({ }) {
	const navigate = useNavigate();
	const { getItem } = useLocalStorage();
	let userdata = getItem(KEY);
	const {
		generalState,
		setGeneralState,
		adminFunctions: { fetchCategory, deleteCategory },
	} = useAuth();
	const flag = useRef(false);
	const [formstate, setFormstate] = useState({
		name: "",
		description: "",
		teacher: "",
		student: "",
	});
	const [loading, setLoading] = useState(true);
	const teachers = ["Dr. Joy Castus"];
	const students = ["James Segun"];
	const params = useParams();
	//get user id
	useEffect(() => {
		//fetch course details for the id
		if (flag.current) return;
		(async () => {
			try {
				const res = await fetchCategory(params?.id, userdata?.token);
				const { message, statusCode, success } = res;
				if (!success) throw new AdvancedError(message, statusCode);
				else {
					const { data } = res;
					setFormstate((old) => {
						return {
							...old,
							name: data.name,
							description: data.description,
							categoryId: data.categoryId,
						};
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
				setLoading((_) => false);
			}
		})();
		flag.current = true;
		return () => console.log("Leaving Details page");
	}, []);

	function changeHandler(e) {
		const { name, value } = e.target;
		setFormstate((old) => {
			return {
				...old,
				[name]: value,
			};
		});
	}

	async function deleteCategoryHandler(e) {
		e.preventDefault();
		setGeneralState({ ...generalState, loading: true });
		try {
			const res = await deleteCategory(userdata?.token, formstate.categoryId);
			const { success, message, statusCode } = res;
			if (!success) throw new AdvancedError(message, statusCode);
			else {
				toast.success(message, {
					position: "top-right",
					autoClose: 4000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				navigate(-1);
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
			setGeneralState({ ...generalState, loading: false });
		}
	}

	function editCategoryHandler(e) {
		navigate(`/admin/courses-categories/new?edit=${formstate.name}`);
	}

	return (
		<Admin header="ADMIN">
			{loading && <Loader />}
			<div className={clsx["admin_profile"]}>
				<div className={clsx.admin__student}>
					<div
						className="d-flex justify-content-between align-items-center mb-5"
						style={{ width: "80%" }}
					>
						<button
							type="button"
							className="btn btn-sm btn-danger px-3 py-2"
							style={{ fontSize: "0.8rem" }}
							onClick={deleteCategoryHandler}
						>
							Delete Category
						</button>
						<button
							type="button"
							className="btn btn-sm btn-primary px-3 py-2"
							style={{ fontSize: "0.8rem" }}
							onClick={editCategoryHandler}
						>
							Edit Category
						</button>
					</div>
					<form className="form" style={{ width: "80%", margin: "20px 0px" }}>
						<Input
							label="Name of Category"
							name="name"
							type="text"
							handleChange={changeHandler}
							value={formstate.name}
							readOnly={true}
						/>

						<div className={clsx.form_group}>
							<label
								htmlFor={"description"}
								className="form-label generic_label"
							>
								Description
							</label>
							<div
								className="border rounded p-3"
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(formstate?.description),
								}}
							/>
						</div>

						{/* <div className={clsx.form_group}>
              <div className={clsx.form_group__teachers}>
                <label>Name of teachers</label>
                {
                  teachers.map((t, i) => (
                    <div key={i}>
                      <p>{i + 1}. &nbsp; {t}</p> 
                      <div className={clsx.teachers__actions}>
                        <span className={`${clsx.teachers__actions_delete} text-danger`}><AiOutlineDelete />    Delete</span>
                        <span className={`${clsx.teachers__actions_edit}`}><AiTwotoneEdit />    Edit</span>
                      </div>
                    </div>
                  ))
                }
              </div>
              <Input
                style={{margin: "0px !important"}}
                name="teacher"
                type="text"
                handleChange={changeHandler}
                value={formstate.teacher}
              />
              <button type="button" className={clsx.form_group__button}>
                Add Teacher
              </button>
            </div>

            <div className={clsx.form_group}>
              <div className={clsx.form_group__teachers}>
                <label>Add Student</label>
                {
                  students.map((s, i) => (
                    <div key={i}>
                      <p>{i + 1}. &nbsp; {s}</p> 
                      <div className={clsx.teachers__actions}>
                        <span className={`${clsx.teachers__actions_delete} text-danger`}><AiOutlineDelete />    Delete</span>
                        <span className={`${clsx.teachers__actions_edit}`}><AiTwotoneEdit />    Edit</span>
                      </div>
                    </div>
                  ))
                }
              </div>
              <Input
                name="student"
                type="text"
                handleChange={changeHandler}
                value={formstate.student}
              />
              <button type="button" className={clsx.form_group__button}>
                Add Student
              </button>
            </div> */}
					</form>
				</div>
			</div>
		</Admin>
	);
}

// CATEGORY COMPONENT
export function Category() {
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);

	const [loading, setLoading] = useState(true);
	const {
		generalState,
		setGeneralState,
		adminFunctions: { fetchCategories },
	} = useAuth();
	const { getItem } = useLocalStorage();
	const flag = useRef(false);
	const userdata = getItem(KEY);
	const tableHeaders = ["No", "Name of Category", "Date", "No of Student"];
	const [search, setSearch] = useState("");
	useEffect(() => {
		if (flag.current) return;
		(async () => {
			setGeneralState({ ...generalState, loading: true });
			try {
				const res = await fetchCategories(userdata?.token);
				const { success, statusCode, message } = res;
				setGeneralState({ ...generalState, loading: false });

				if (!success) throw new AdvancedError(message, statusCode);
				else {
					if (res?.data) {
						const { data } = res;
						toast.success(message, {
							position: "top-right",
							autoClose: 4000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
						setCategories((_) => data);
					}
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
			} finally {
				setLoading((_) => false);
			}
		})();
		flag.current = true;
	}, []);

	function showDetailsHandler(e, id) {
		navigate(`details/${id}`);
	}

	return (
		<Admin header="Category">
			{loading && <Loader />}
			<div className={clsx["admin_profile"]}>
				<div className={clsx.admin__student}>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<h4 style={{ margin: 0 }}>Categories</h4>{" "}
						<button
							className="btn btn-primary px-4"
							onClick={(e) => navigate("new")}
						>
							Add Category
						</button>
					</div>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<div>
							<input
								type="search"
								name="search"
								id="search"
								className="form-control"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="search..."
							/>
						</div>
					</div>
					<div className={` ${clsx.admin__student_main}`}>
						{categories.length > 0 ? (
							<table className={`${clsx.admin__student_table}`}>
								<thead>
									{tableHeaders.map((el, i) => (
										<td key={i}>{el}</td>
									))}
								</thead>
								<tbody>
									{categories?.length > 0 &&
										categories
											?.filter(
												(cat) =>
													cat.name
														.toLowerCase()
														.includes(search.toLowerCase()) ||
													cat.description
														.toLowerCase()
														.includes(search.toLowerCase())
											)
											.map(
												(
													{
														bannerImg,
														careerDescription,
														careerList,
														name,
														description,
														iconImg,
														categoryId,
														niche: nicheTitle,
														nicheDescription,
														nicheItems,
													},
													i
												) => (
													<UserInfoCard
														key={i}
														comp="Category"
														name={name}
														num={i}
														date={"2022-06-26T00:00:00.000Z".split("T")[0]}
														students={90}
														id={categoryId}
														showDetailsHandler={(e) =>
															showDetailsHandler(e, name)
														}
													/>
												)
											)}
								</tbody>
							</table>
						) : (
							<h5 style={{ textAlign: "center" }}>No Category found</h5>
						)}
					</div>
				</div>
			</div>
		</Admin>
	);
}

// NICHEMODAL COMPONENT
function NicheModal({ newNiche, updateNiche, open, setOpen, handleChange }) {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		minWidth: 600,
		background: "#fff",
		border: "1px solid #eee",
		borderRadius: "10px",
		boxShadow: 24,
		p: 6,
		padding: "4rem 2rem",
	};

	return (
		<Modal
			open={open}
			onClose={(e) => {
				setOpen((_) => false);
			}}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box style={style}>
				<h5
					className="lead text-primary"
					style={{ color: "var(--theme-blue)" }}
				>
					Add Niche
				</h5>
				<Input
					label="Title"
					name="name"
					type="text"
					handleChange={handleChange}
					value={newNiche.name}
				/>
				<div className="form-group my-3">
					<label htmlFor="description" className="form-label generic_label">
						Description
					</label>
					<textarea
						rows="5"
						id="description"
						name="description"
						className="form-control generic_input"
						value={newNiche.description}
						onChange={handleChange}
					></textarea>
				</div>
				<button
					className="btn btn-primary my-3"
					onClick={updateNiche}
					style={{ backgroundColor: "var(--theme-blue)" }}
				>
					Add
				</button>
			</Box>
		</Modal>
	);
}

// CAREERMODAL COMPONENT
export function CareerModal({
	newCareer,
	updateCareer,
	open,
	setOpen,
	handleChange,
}) {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		minWidth: 600,
		background: "#fff",
		border: "1px solid #eee",
		borderRadius: "10px",
		boxShadow: 24,
		p: 6,
		padding: "4rem 2rem",
	};

	return (
		<Modal
			open={open}
			onClose={(e) => {
				setOpen((_) => false);
			}}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box style={style}>
				<h5
					className="lead text-primary"
					style={{ color: "var(--theme-blue)" }}
				>
					Add Career
				</h5>
				<Input
					label="Name"
					name="name"
					type="text"
					handleChange={handleChange}
					value={newCareer.name}
				/>
				<button
					className="btn btn-primary my-3"
					onClick={updateCareer}
					style={{ backgroundColor: "var(--theme-blue)" }}
				>
					Add
				</button>
			</Box>
		</Modal>
	);
}
// CAREERMODAL COMPONENT
export function PopUpModal({
	newCareer,
	updateCareer,
	open,
	setOpen,
	handleChange,
}) {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		minWidth: 600,
		background: "#fff",
		border: "1px solid #eee",
		borderRadius: "10px",
		boxShadow: 24,
		p: 6,
		padding: "4rem 2rem",
	};

	return (
		<Modal
			open={open}
			onClose={(e) => {
				setOpen((_) => false);
			}}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box style={style}>
				<h5
					className="lead text-primary"
					style={{ color: "var(--theme-blue)" }}
				>
					Add Popup
				</h5>
				<Input
					label="Name"
					name="name"
					type="text"
					handleChange={handleChange}
					value={newCareer}
				/>
				<button
					className="btn btn-primary my-3"
					onClick={updateCareer}
					style={{ backgroundColor: "var(--theme-blue)" }}
				>
					Add
				</button>
			</Box>
		</Modal>
	);
}

// CATEGORYPREVIEWMODAL COMPONENT
export function CategoryPreviewModal({ preview, open, setOpen }) {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		minWidth: "95%",
		background: "#fff",
		border: "1px solid #eee",
		borderRadius: "10px",
		boxShadow: 24,
		p: 6,
		padding: "4rem 2rem",
	};

	return (
		<Modal
			open={open}
			onClose={(e) => {
				setOpen((_) => false);
			}}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<div
					className="position-relative"
					style={{
						height: "80vh",
						overflowY: "scroll",
					}}
				>
					<Layout>
						{preview ? (
							// <CourseDetail preview={preview} />
							<Detail preview={preview} />
						) : (
							<h3>No preview available!!!</h3>
						)}
					</Layout>
				</div>
			</Box>
		</Modal>
	);
}

// SYLLABUS COMPONENT
const Syllabus = ({ title, description }) => {
	return (
		<div className={clsx.syllabus_container}>
			<h5>{title}</h5>
			{description && <p>{description}</p>}
		</div>
	);
};

// CREATECOURSECATEGORY COMPONENT
export function CreateCourseCategory() {
	const {
		adminFunctions: { addCategory, fetchCategory, updateCategory },
	} = useAuth();
	const { getItem } = useLocalStorage();
	const userdata = getItem(KEY);
	const [open, setOpen] = useState(false);
	const [openPreview, setOpenPreview] = useState(false);
	const [previewImage, setPreviewImage] = useState(false);

	const [showCareerModal, setShowCareerModal] = useState(false);
	const [showNicheModal, setShowNicheModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formstate, setFormstate] = useState({
		name: "",
		description: "",
		nicheDescription: "",
		career: "",
		bannerImg: "",
		niche: "Niche title",
		iconImg: "iconImg.png",
	});

	const [nichelist, setNichelist] = useState({
		name: "",
		description: "",
	});
	const [nichelists, setNichelists] = useState([]);
	const [careerlist, setCareerlist] = useState({
		name: "",
	});
	const [careerlists, setCareerlists] = useState([]);
	const flag = useRef(false);
	const location = useLocation();
	const [loader, setLoader] = useState(location.search ? true : false);
	const edit = location.search;
	const [bio, setBio] = useState("");
	const [fileUrl, setFileUrl] = useState("");

	useEffect(() => {
		if (flag.current) return;
		if (location.search) {
			const id = location.search.split("=").reverse()[0];
			(async () => {
				try {
					const res = await fetchCategory(id, userdata?.token);
					const { message, success, statusCode } = res;
					if (!success) throw new AdvancedError(message, statusCode);
					else if (statusCode === 1) {
						const { data } = res;

						const iconImg = data.iconImg?.split("/").slice(-1);
						const bannerImg = data.bannerImg?.split("/").slice(-1);
						setFormstate({
							...data,
							bannerImg: bannerImg[0],
							iconImg: iconImg[0],
						});

						data.nicheItems && setNichelists((_) => data.nicheItems);
						data.careerList && setCareerlists((_) => data.careerList);
						toast.success(message);
					} else {
						throw new AdvancedError(message, statusCode);
					}
				} catch (err) {
					toast.error(err.message);
				} finally {
					setLoader((_) => false);
				}
			})();
		}
		//do some coding
		flag.current = true;
		return () => console.log("Removing CreateCategory component");
	}, []);

	async function submitHandler(e) {
		e.preventDefault();
		setLoading((_) => true);
		try {
			const data = {
				...formstate,
				name: formstate.name.trim().toUpperCase(),
				importance: formstate.name.trim().toUpperCase(),
				nicheItems: [...nichelists],
				careerList: [...careerlists],
				description: bio ? bio : formstate.description,
			};
			const res = edit
				? await updateCategory(userdata?.token, formstate.categoryId, data)
				: await addCategory(data, userdata?.token);
			const { success, message, statusCode } = res;
			if (!success) throw new AdvancedError(message, statusCode);
			else {
				if (res?.data) {
					const { data } = res;
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
	function nicheChangeHandler(e) {
		const { name, value } = e.target;
		setNichelist((old) => {
			return {
				...old,
				[name]: value,
			};
		});
	}
	function careerChangeHandler(e) {
		const { name, value } = e.target;
		setCareerlist((old) => {
			return {
				...old,
				[name]: value,
			};
		});
	}

	function updateNicheHandler(e) {
		if (nichelist.name.trim() !== "" || nichelist.description.trim() !== "") {
			setNichelists((old) => {
				return [...old, nichelist];
			});
			setNichelist((_) => {
				return {
					name: "",
					description: "",
				};
			});
			setShowNicheModal((_) => false);
			toast.success("Niche added successfully");
		} else {
			toast.error("All fields are required");
		}
	}

	function updateCareerHandler(e) {
		if (careerlist.name.trim() !== "" || careerlist.description.trim() !== "") {
			setCareerlists((old) => {
				return [...old, careerlist];
			});
			setCareerlist((_) => {
				return {
					name: "",
				};
			});
			setShowCareerModal((_) => false);
			toast.success("Career added successfully", {
				position: "top-right",
				autoClose: 4000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			toast.error("All fields are required", {
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

	function showUploadFormHandler() {
		setOpen((_) => true);
	}

	return (
		<Admin header="Create Category">
			{loader && <Loader />}

			<div className={clsx["admin_profile"]}>
				<div className={clsx.admin__student}>
					<UploadWidget fileUrl={fileUrl} setFileUrl={setFileUrl} />

					<form className="form" style={{ width: "80%" }}>
						<Input
							label="Name of category"
							name="name"
							type="text"
							handleChange={changeHandler}
							value={formstate.name.toUpperCase()}
						/>

						<Editor
							initialState={formstate.description}
							title="Description"
							setBio={setBio}
						/>
						<div className={clsx.form_group}>
							<label htmlFor={"brief"}>Niche Description</label>
							<textarea
								rows="5"
								name="nicheDescription"
								value={formstate.nicheDescription}
								onChange={changeHandler}
								className="generic_input"
							></textarea>
						</div>
						<div className={clsx.form_group}>
							<label>Niches</label>
							{nichelists.length !== 0 ? (
								nichelists.map(({ name, description }, i) => (
									<Syllabus key={i} title={name} description={description} />
								))
							) : (
								<p
									className="m-0 text-danger"
									style={{ fontSize: "0.8rem", textIndent: 20 }}
								>
									No Niche
								</p>
							)}
						</div>
						<button
							type="button"
							style={{ background: "var(--secondary" }}
							className={`btn btn-primary ${clsx.addniche_button}`}
							onClick={(e) => setShowNicheModal((_) => true)}
						>
							Add Niche Items
						</button>
						<NicheModal
							open={showNicheModal}
							newNiche={nichelist}
							setOpen={setShowNicheModal}
							handleChange={nicheChangeHandler}
							updateNiche={updateNicheHandler}
						/>

						<div className={clsx.form_group}>
							<label htmlFor={"brief"}>Career Description</label>
							<textarea
								rows="5"
								name="career"
								value={formstate.career}
								onChange={changeHandler}
								className="generic_input"
							></textarea>
						</div>
						<div className={clsx.form_group}>
							<label>Career</label>
							{careerlists.length !== 0 ? (
								careerlists.map(({ name }, i) => (
									<Syllabus key={i} title={name} />
								))
							) : (
								<p
									className="m-0 text-danger"
									style={{ fontSize: "0.8rem", textIndent: 20 }}
								>
									No Careers
								</p>
							)}
						</div>
						<button
							type="button"
							style={{ background: "var(--secondary" }}
							className={`btn btn-primary mb-3 ${clsx.addcareer_button}`}
							onClick={(e) => setShowCareerModal((_) => true)}
						>
							Add Career List
						</button>
						<CareerModal
							open={showCareerModal}
							newCareer={careerlist}
							setOpen={setShowCareerModal}
							handleChange={careerChangeHandler}
							updateCareer={updateCareerHandler}
						/>

						<Input
							label="Banner Image"
							name="bannerImg"
							type="text"
							handleChange={changeHandler}
							value={formstate.bannerImg}
						/>

						{/* <Input
              label="Icon Image "
              name="iconImg"
              type="text"
              handleChange={changeHandler}
              value={formstate.iconImg}
            /> */}
						<i className="text-danger">
							Make sure to upload the files and get the file name
						</i>
					</form>
					{loading ? (
						<div className="d-flex justify-content-center">
							<div
								className="spinner-border text-primary"
								role="status"
								style={{ width: "4rem", height: "4rem" }}
							>
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
					) : (
						<div className={clsx.form_button__container}>
							<button className="btn btn-primary" onClick={submitHandler}>
								Submit
							</button>
							<button
								className="btn border-primary text-primary"
								onClick={() => {
									setOpenPreview(!openPreview);
								}}
							>
								Preview
							</button>
						</div>
					)}
				</div>
				<CategoryPreviewModal
					preview={{
						...formstate,
						description: bio,
						nicheItems: [...nichelists],
						careerList: [...careerlists],
					}}
					open={openPreview}
					setOpen={setOpenPreview}
				/>
			</div>
		</Admin>
	);
}

// DASHBOARD COMPONENT
export function Profile() {
	const { getItem, updateItem } = useLocalStorage();
	const {
		adminFunctions: { fetchProfile },
	} = useAuth();
	const flag = useRef(false);
	let userdata = getItem(KEY);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (flag.current) return;
		(async () => {
			try {
				let { data, message, success, statusCode } = await fetchProfile(
					userdata?.token
				);
				if (success) {
					let newValue = {
						...userdata,
						...data,
					};
					userdata = updateItem(KEY, newValue);
				} else throw new AdvancedError(message, statusCode);
			} catch (err) {
				toast.error(err.message);
			} finally {
				setLoading((_) => false);
			}
		})();
		flag.current = true;
	}, []);

	function editProfileHandler(e) {
		navigate("/admin/profile/edit");
	}

	return (
		<Admin header="Dashboard">
			{loading && <Loader />}
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
					<small className="text-muted">Name:</small>
					<h1>
						{userdata?.firstName && userdata.firstName}{" "}
						{userdata?.lastName && userdata.lastName}{" "}
					</h1>
					<small className="text-muted">Bio:</small>
					<p className={clsx["admin__paragraph"]}>
						{userdata?.bio && userdata.bio}
					</p>
				</div>
			</div>
		</Admin>
	);
}

// INFO COMPONENT
function Info({ title, content }) {
	return (
		<div className={clsx.admin__info}>
			<span className={clsx.admin__info_title}>{title}</span>
			<span className={clsx.admin__info_content}>{content}</span>
		</div>
	);
}

//APPROVE STUDENT COMPONENT
export function ApproveStudent() {
	const navigate = useNavigate();
	const [data, setData] = useState(null);
	const [enrollmentData, setEnrollmentData] = useState([]);
	const [kyc, setKyc] = useState({});

	const [loading, setLoading] = useState(false);
	const { getItem } = useLocalStorage();
	let userdata = getItem(KEY);
	const {
		adminStudentFunctions: { verify, fetchStudentsClasses },
		kycFunctions: { getAStudentKYCById },
		generalState,
		setGeneralState,
		commonFunctions: { deleteUser },
	} = useAuth();
	const info = [
		{
			title: "Courses",
			content: "UX Designer",
		},
		{
			title: "Category",
			content: "Cybersecurity, UX, Data Analysis",
		},
	];

	useEffect(() => {
		const studentInfo = getItem("gotocourse-studentDetails");
		setData(studentInfo);
	}, []);

	async function handleVerification(e, id) {
		e.preventDefault();
		let item = {
			userId: id,
		};
		try {
			setGeneralState((old) => {
				return {
					...old,
					loading: true,
				};
			});

			const res = await verify(item, userdata?.token);
			const { message, success, statusCode } = res;

			if (!success) throw new AdvancedError(message, statusCode);
			else {
				//do somethings
				setData({ ...data, accessPledre: !data.isVerified });
				toast.success(message);
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setGeneralState((old) => {
				return {
					...old,
					loading: false,
				};
			});
		}
	}

	async function deleteUserHandler(e, email) {
		try {
			const v = window.confirm("Are you sure you want to delete " + email);
			if (!v) return;
			setGeneralState({ ...generalState, loading: true });
			const res = await deleteUser(userdata?.token, [email]);
			const { statusCode, message, success } = res;
			if (!success) throw new AdvancedError(message, statusCode);
			else {
				navigate(-1);
				toast.success(message);
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setGeneralState({ ...generalState, loading: false });
		}
	}

	async function getStudentKyc(id) {
		const userdata = getItem(KEY);

		try {
			setGeneralState((old) => {
				return {
					...old,
					loading: true,
				};
			});

			const res = await getAStudentKYCById(id, userdata?.token);
			const { message, success, statusCode } = res;
			if (!success) throw new AdvancedError(message, statusCode);
			else {
				//do somethings
				setKyc(res.data);
				// navigate(-1)
			}
		} catch (error) {
			toast.error(error.message);
			console.error(error);
		} finally {
			setGeneralState((old) => {
				return {
					...old,
					loading: false,
				};
			});
		}
	}

	useEffect(() => {
		if (data) {
			getStudentKyc(data.userId);
		}
	}, [data]);

	const fetchStudentEnrollments = useQuery(
		["fetch student enrollments", userdata?.token, data?.userId],
		() => fetchStudentsClasses(userdata?.token, data.userId),
		{
			enabled: data?.userId !== null,
			onSuccess: (res) => {
				if (res?.success) {
					setEnrollmentData(res.data);
					return;
				}
				setEnrollmentData([]);
			},
			onError: (err) => console.error(err),
		}
	);


	function getOutstandingAmount(item) {
		let outAmt = item?.payments
			?.filter((item) => item.status !== "paid")
			.reduce((acc, curr) => acc + curr.amount, 0);
		return outAmt;
	}
	function getDueDate(item) {
		// let paymentData = item?.payments?.filter(item=> item.status !== "paid")
		// let leftOver
		// if(paymentData){
		//   leftOver = paymentData[0]?.dueDate?.split("T")[0]
		// }else {
		//   leftOver = "-"
		// }
		let dueDate =
			item?.payments?.filter((item) => item.status !== "paid").length > 0
				? item?.payments
					?.filter((item) => item.status !== "paid")[0]
					?.dueDate.split("T")[0]
				: "-";
		return dueDate;
	}
	return (
		<Admin header="Approval">
			{loading && <Loader />}
			<div className={clsx["admin_profile"]}>
				<div className={clsx["admin_profile_top"]}>
					<div className={clsx["admin_profile_top_img"]}>
						<img
							src={data ? data.profileImg : avatar}
							style={{ borderRadius: 10 }}
							width="100%"
							alt="Avatar"
						/>
					</div>
				</div>
				<div className={clsx["admin_profile_main"]}>
					<h1>
						{data ? `${data?.firstName} ${data?.lastName}` : "Olu Jacobs"}
					</h1>

					<div className={clsx.admin__profile_info}>
						{/* {info.map(({ title, content }, i) => (
              <Info title={title} content={content} key={i} />
            ))} */}

						<div className={clsx.kyc}>
							{kyc !== null && kyc.question && (
								<>
									<div className={clsx.title}>
										<p className={clsx.question}>Phone Number</p>
										<span className={clsx.answer}>
											{kyc.question?.phoneNumber}
										</span>
									</div>

									<div className={clsx.title}>
										<p className={clsx.question}>Degree</p>
										<span className={clsx.answer}>{kyc.question?.degree}</span>
									</div>

									<div className={clsx.title}>
										<p className={clsx.question}>Experience</p>
										<span className={clsx.answer}>
											{kyc.question?.experience}
										</span>
									</div>

									<div className={clsx.title}>
										<p className={clsx.question}>Employment</p>
										<span className={clsx.answer}>
											{kyc.question?.employment}
										</span>
									</div>

									<div className={clsx.title}>
										<p className={clsx.question}>Country</p>
										<span className={clsx.answer}>{kyc.question?.country}</span>
									</div>

									<div className={clsx.title}>
										<p className={clsx.question}>Region</p>
										<span className={clsx.answer}>{kyc.question?.region}</span>
									</div>
								</>
							)}
						</div>
						<div className={clsx.student_course_info}>
							{fetchStudentEnrollments?.isLoading ? (
								<div className="spinner-border text-primary">
									<div className="visually-hidden">Loading...</div>
								</div>
							) : (
								<div className="table-responsive my-4">
									<table className="table">
										<thead>
											<tr>
												<th>No</th>
												<th>Courses enrolled</th>
												{/* <th>Start date</th> */}
												<th>Amount paid</th>
												<th>Outstanding</th>
												<th>Due date</th>
												<th>Total</th>
											</tr>
										</thead>
										<tbody>
											{enrollmentData?.map((item, i) => (
												<tr>
													<td>{i + 1}</td>
													<td>{item?.bootcampName}</td>
													{/* <td>{item?.startDate}</td> */}
													<td>{item?.amountPaid}</td>
													<td>
														{item?.payments?.length > 0
															? getOutstandingAmount(item)
															: "-"}{" "}
													</td>
													<td>
														{item?.payments?.length > 0
															? getDueDate(item)
															: "-"}{" "}
													</td>
													<td>{item?.bootcampPrice}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}

							{/* <div className="table-responsive my-4">
                <table className="table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Discount on</th>
                      <th>Type of discount</th>
                      <th>Approval</th>
                      
                    </tr>
                  </thead>
                  <tbody>

                    {
                      data?.enrollmentData.map((item, i)=> (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{item?.bootcampName}</td>
                          <td>{item?.startDate}</td>
                          <td>{item?.amountPaid}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div> */}
						</div>

						{/* <button
              className="button d-flex button-lg log_btn w-50 mt-3 justify-content-center"
              style={{
                backgroundColor: data?.isVerified && "var(--theme-blue)",
              }}
              type="submit"
              // onClick={(e) => handleVerification(e, data?.userId)}
            >
              Add student to course
            </button> */}
						<button
							className="button button-lg log_btn w-50 my-3"
							style={{
								backgroundColor: data?.isVerified && "var(--theme-orange",
							}}
							type="submit"
							onClick={(e) => handleVerification(e, data?.userId)}
						>
							{data?.isVerified ? "Revoke Access" : "Approve Access"}
						</button>

						<div className={clsx.user__email}>
							<button onClick={(e) => deleteUserHandler(e, data?.email)}>
								<AiTwotoneDelete /> &nbsp; &nbsp;Delete User
							</button>
						</div>
					</div>
				</div>
			</div>
		</Admin>
	);
}

// APPROVE TEACHER COMPONENT
export function Approve() {
	const navigate = useNavigate();
	const [data, setData] = useState(null);
	const [kyc, setKyc] = useState({});

	const [loading, setLoading] = useState(false);
	const { getItem } = useLocalStorage();
	let userdata = getItem(KEY);
	const {
		adminTeacherFunctions: { verify, verify_pledre, addMentor },
		kycFunctions: { getATeacherKYC, getAMentorKYCById },
		generalState,
		generalState: { pledre },
		setGeneralState,
		commonFunctions: { deleteUser },
	} = useAuth();

	async function getMentorInfo(id) {
		const userdata = getItem(KEY);

		try {
			setGeneralState((old) => {
				return {
					...old,
					loading: true,
				};
			});

			const res = await getAMentorKYCById(id, userdata?.token);
			const { message, success, statusCode } = res;
			if (!success) throw new AdvancedError(message, statusCode);
			else {
				//do somethings
				setKyc(res.data);
				// navigate(-1)
			}
		} catch (error) {
			toast.error("No KYC Found");
		} finally {
			setGeneralState((old) => {
				return {
					...old,
					loading: false,
				};
			});
		}
	}

	useEffect(() => {
		if (data) {
			getMentorInfo(data.userId);
		}
	}, [data]);

	useEffect(() => {
		const teacherInfo = getItem("gotocourse-teacherDetails");
		setData(teacherInfo);
	}, []);

	async function deleteUserHandler(e, email) {
		try {
			setLoading((_) => true);
			let value = window.confirm(
				"Are you sure you want to delete this user? This process is irreversible"
			);
			if (!value) return;
			const res = await deleteUser(userdata?.token, [email]);
			const { statusCode, message, success } = res;
			if (!success) throw new AdvancedError(message, statusCode);
			else {
				toast.success(message);
				navigate(-1);
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading((_) => false);
		}
	}

	async function handleVerification(e, type, id, pledreId) {
		e.preventDefault();
		const userdata = getItem(KEY);
		let item = {
			userId: id,
			pledreTeacherId: pledreId ? pledreId : null,
		};

		if (!data.accessPledre) {
			// give access and save pledre id to backend
			try {
				setGeneralState((old) => {
					return { ...old, loading: true };
				});
				// if pledre sign up fails user pledreId won't exist.
				if (!pledreId)
					throw new AdvancedError("User is not registered to your school.", 0);
				const res = await verify_pledre(item, userdata?.token);
				const { message, success, statusCode } = res;
				if (!success) throw new AdvancedError(message, statusCode);
				else {
					setData({ ...data, accessPledre: !data.accessPledre });
					toast.success(message);
				}
			} catch (error) {
				toast.error(error.message);
			} finally {
				setGeneralState((old) => {
					return {
						...old,
						loading: false,
					};
				});
			}
		} else {
			// revoke access
			try {
				setGeneralState((old) => {
					return { ...old, loading: true };
				});
				const res = await verify_pledre(item, userdata?.token);
				const { message, success, statusCode } = res;
				if (!success) throw new AdvancedError(message, statusCode);
				else {
					setData({ ...data, accessPledre: !data.accessPledre });
					toast.success(message);
				}
			} catch (error) {
				toast.error(error.message);
			} finally {
				setGeneralState((old) => {
					return {
						...old,
						loading: false,
					};
				});
			}
		}
	}
	async function approveApplication(e, id, pledreId) {
		e.preventDefault();
		const userdata = getItem(KEY);

		let item = {
			userId: id,
			pledreTeacherId: pledreId ? pledreId : null,
		};
		try {
			setGeneralState((old) => {
				return {
					...old,
					loading: true,
				};
			});
			const res = await verify(item, userdata?.token);
			const { message, success, statusCode } = res;
			if (!success) throw new AdvancedError(message, statusCode);
			else {
				//do somethingtype s
				localStorage.setItem(
					"gotocourse-teacherDetails",
					JSON.stringify(res.data)
				);

				setData({ ...data, canTeach: !data?.canTeach });
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setGeneralState((old) => {
				return {
					...old,
					loading: false,
				};
			});
		}
	}

	async function conferMentorship(e, id, email) {
		e.preventDefault();
		const userdata = getItem(KEY);
		let item = {
			teacherEmail: email,
		};
		try {
			setGeneralState((old) => {
				return {
					...old,
					loading: true,
				};
			});

			const res = await addMentor(item, userdata?.token);
			const { message, success, statusCode } = res;
			if (!success) throw new AdvancedError(message, statusCode);
			else {
				toast.success(message);
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setGeneralState((old) => {
				return {
					...old,
					loading: false,
				};
			});
		}
	}

	return (
		<Admin header="Approval">
			{loading && <Loader />}
			<div className={clsx["admin_profile"]}>
				<div className={clsx["admin_profile_top"]}>
					<div className={clsx["admin_profile_top_img"]}>
						<img
							src={data ? data.profileImg : avatar}
							style={{ borderRadius: 10 }}
							width="100%"
							alt="Avatar"
						/>
					</div>
				</div>
				<div className={clsx["admin_profile_main"]}>
					<h1>
						{data ? `${data?.firstName} ${data?.lastName}` : "Olu Jacobs"}
					</h1>

					<div className={clsx.admin__profile_info}>
						{/* {info.map(({ title, content }, i) => (
              <Info title={title} content={content} key={i} />
            ))} */}

						<div className={clsx.kyc}>
							{kyc !== null && kyc.question && (
								<>
									<div className={clsx.title}>
										<p className={clsx.question}>Phone Number</p>
										<span className={clsx.answer}>
											{kyc.question?.phoneNumber}
										</span>
									</div>
									<div className={clsx.title}>
										<p className={clsx.question}>Certified</p>
										<span className={clsx.answer}>
											{kyc.question?.certified ? "true" : "false"}
										</span>
									</div>

									<div className={clsx.title}>
										<p className={clsx.question}>Degree</p>
										<span className={clsx.answer}>{kyc.question?.degree}</span>
									</div>

									<div className={clsx.title}>
										<p className={clsx.question}>Expertise</p>
										<span className={clsx.answer}>
											{kyc.question?.expertise}
										</span>
									</div>

									<div className={clsx.title}>
										<p className={clsx.question}>Preferred Course</p>
										<span className={clsx.answer}>
											{kyc.question?.preferredCourse}
										</span>
									</div>

									<div className={clsx.title}>
										<p className={clsx.question}>Employment</p>
										<span className={clsx.answer}>
											{kyc.question?.employment}
										</span>
									</div>

									<div className={clsx.title}>
										<p className={clsx.question}>Country</p>
										<span className={clsx.answer}>{kyc.question?.country}</span>
									</div>

									<div className={clsx.title}>
										<p className={clsx.question}>Region</p>
										<span className={clsx.answer}>{kyc.question?.region}</span>
									</div>
								</>
							)}
						</div>

						<div className="form-group my-3">
							<label
								htmlFor="accessPledre"
								className="form-label generic_label"
							>
								{data?.userType === "mentor"
									? "Revoke Mentorship"
									: "Confer Mentorship"}
							</label>
							<Switch
								onClick={(e) => conferMentorship(e, data?.userId, data?.email)}
								checked={data?.userType === "mentor" ? true : false}
								value="mentorship"
							/>
						</div>
						<div className="form-group my-3">
							<label htmlFor="level" className="form-label generic_label">
								Assign Level
							</label>
							<select
								name="level"
								id="level"
								className="form-select"
								style={{ width: "unset" }}
							>
								<option value="">Select a level</option>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</div>

						<div className={clsx.user__email}>
							<button onClick={(e) => deleteUserHandler(e, data?.email)}>
								<AiTwotoneDelete /> &nbsp; &nbsp;Delete User
							</button>
						</div>

						<button
							className="button button-lg log_btn w-50 mt-3"
							style={{ backgroundColor: data?.canTeach && "red" }}
							type="submit"
							onClick={(e) =>
								approveApplication(e, data?.userId, data?.pledre?._id)
							}
						>
							{data?.canTeach ? "Revoke Application" : "Approve Application"}
						</button>

						{/* <button
              className="button button-lg log_btn w-50 mt-3"
              style={{ backgroundColor: "red" }}
              type="submit"
              onClick={(e) => deleteAUser(e, data?.userId)}
            >
              Delete User
            </button> */}
					</div>
				</div>
			</div>
		</Admin>
	);
}

// USERINFOCARD COMPONENT
export function UserInfoCard({
	user,
	firstName,
	lastName,
	img,
	mentorId,
	email,
	id,
	level,
	details,
	isActive = null,
	isAbsolute,
	type,
	name,
	date,
	paid,
	comp,
	num,
	course,
	model,
	pack,
	rating,
	unpaid,
	students,
	deleteUser,
	status,
	amount,
	accessPledre = null,
	handleVerification,
	handlePledreAccess,
	handleRating,
	starRating,
	start_date,
	course_status,
	enrolled,
	packages = [],
	coursePrice,
	editPayment,
	editPaymentInfo,
	showDetailsHandler = () => {
		return;
	},
	approveHandler = () => {
		return;
	},
}) {
	return (
		<tr
			className={clsx.user__info_card}
			onClick={(e) =>
				comp === "Category" || comp === "Courses"
					? showDetailsHandler(e, id)
					: approveHandler(e, email, details)
			}
		>
			<td className={clsx.user__info}>{num + 1}.</td>
			{user && (
				<td className={clsx.user__details}>
					{img && (
						<img
							src={
								isAbsolute ? img : `${process.env.REACT_APP_IMAGEURL}/${img}`
							}
							alt="avatar"
						/>
					)}
					<span>{`${firstName} ${lastName}`}</span>
				</td>
			)}

			{(comp === "Courses" || comp === "History" || comp === "Teacher") && (
				<td className={clsx.user__info}>{course}</td>
			)}
			{enrolled && <td className={clsx.user__info}>{enrolled}</td>}
			{comp === "Category" && <td className={clsx.user__info}>{status}</td>}

			{(comp === "Courses" || comp === "Category") && (
				<td className={clsx.user__info}>{name}</td>
			)}

			{(comp === "Courses" || date) && (
				<td className={clsx.user__date} style={{ padding: "2px 8px" }}>
					<span>{date}</span>
				</td>
			)}
			{comp === "History" && (
				<td className={clsx.user__date}>
					<span>{amount}</span>
				</td>
			)}
			{comp === "Courses" && (
				<td className={clsx.user__date}>
					{packages.map((item) => (
						<div>{changeConstants(item.title)}</div>
					))}
				</td>
			)}

			{coursePrice && (
				<td className={clsx.user__date}>
					<span>{coursePrice}</span>
				</td>
			)}
			{pack && (
				<td className={clsx.user__date}>
					<span>{pack}</span>
				</td>
			)}
			{start_date && (
				<td className={clsx.user__date}>
					<span>{start_date}</span>
				</td>
			)}

			{email && (
				<td className={clsx.user__email}>
					<span>{email}</span>
				</td>
			)}
			{students && (
				<td className={clsx.user__email}>
					<span>{students}</span>
				</td>
			)}
			{rating && (
				<td className={clsx.user__email}>
					<Rating
						onClick={handleRating}
						ratingValue={starRating}
						size={18}
						initialValue={0}
					/>
				</td>
			)}
			{course_status && (
				<td className={clsx.user__email}>
					<span>{course_status}</span>
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
			{unpaid && (
				<td className={clsx.user__button}>
					<span style={{ color: "red" }}>
						-
						{new Intl.NumberFormat("en-us", {
							style: "currency",
							currency: "USD",
						}).format(unpaid)}
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
			{type !== null && (
				<td className={clsx.user__button}>
					<span>{type}</span>
				</td>
			)}
			{accessPledre !== null && (
				<td className={clsx.user__button}>
					<span>
						<Switch onClick={handlePledreAccess} checked={accessPledre} />
					</span>
				</td>
			)}
			{level && (
				<td className={clsx.user__email}>
					<span>{level}</span>
				</td>
			)}
			{deleteUser && (
				<td className={clsx.user__email}>
					<button onClick={deleteUser}>
						<AiTwotoneDelete />
					</button>
				</td>
			)}
			{editPayment && (
				<td className={clsx.user__email}>
					<button onClick={editPaymentInfo}>
						<AiFillEdit />
					</button>
				</td>
			)}
		</tr>
	);
}

// TEACHERS COMPONENT
export function Teachers() {
	const { getItem } = useLocalStorage();
	let userdata = getItem(KEY);
	const flag = useRef(false);
	const navigate = useNavigate();
	const [teachers, setTeachers] = useState([]);
	const [loading, setLoading] = useState(true);
	const {
		adminTeacherFunctions: { fetch },
	} = useAuth();

	const [search, setSearch] = useState("");
	useEffect(() => {
		if (flag.current) return;
		(async () => {
			try {
				const token = userdata?.token;
				const res = await fetch(token);
				const { message, success, statusCode } = res;
				if (!success) throw new AdvancedError(message, statusCode);
				else {
					const { data } = res;
					//do somethings
					setTeachers((_) => data);
				}
			} catch (err) {
				toast.error(err.message);
			} finally {
				setLoading((_) => false);
			}
		})();
		flag.current = true;
	}, []);
	const tableHeaders = [
		"No",
		"Name",
		"Email",
		"Type",
		"Access Dashboard",
		"Level",
	];

	function approveHandler(e, email, details) {
		localStorage.setItem("gotocourse-teacherDetails", JSON.stringify(details));
		if (email) navigate(`approve?email=${email}`);
	}

	function exportCsv(e) {
		e.preventDefault();

		let headers = ["First name, Last name,  Email"];

		let usersCsv = teachers.reduce((acc, item) => {
			const { firstName, lastName, email } = item;
			acc.push([firstName, lastName, email].join(","));
			return acc;
		}, []);

		let csvData = [...headers, ...usersCsv].join("\n");

		downloadCsv(csvData);
	}

	function downloadCsv(data) {
		const blob = new Blob([data], { type: "text/csv" });
		const href = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = href;
		link.setAttribute("download", "teachers.csv");
		document.body.appendChild(link);
		link.click();

		document.body.removeChild(link);
		URL.revokeObjectURL(href);
	}

	return (
		// <Admin header={"Mentors/Teachers"}>
		<Admin header={"All Teachers"}>
			{loading && <Loader />}
			<div className={clsx["admin_profile"]}>
				<div className={clsx.admin__student}>
					{/* <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h5>Mentors/Teachers</h5>
            <button
              className="btn button-md"
              style={{ background: "var(--theme-blue)", color: "#fff" }}
              type="button"
              onClick={() => navigate("create/mentor")}
            >
              Add Mentor
            </button>
          </div> */}
					<div className="d-flex justify-content-between align-items-center flex-wrap">
						<div>
							<input
								type="text"
								className="form-control"
								placeholder="Search"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
						<button className="btn-plain" onClick={exportCsv}>
							Export to CSV
						</button>
					</div>
					<div className={`${clsx.admin__student_main}`}>
						<table className={`${clsx.admin__student_table}`}>
							<thead>
								{tableHeaders.map((el, i) => (
									<td key={i}>{el}</td>
								))}
							</thead>
							<tbody>
								{teachers?.length > 0 &&
									teachers
										?.filter(
											(teach) =>
												teach.firstName
													.toLowerCase()
													.includes(search.toLowerCase()) ||
												teach.lastName
													.toLowerCase()
													.includes(search.toLowerCase()) ||
												teach.email.toLowerCase().includes(search.toLowerCase())
										)
										.map((teacher, i) => (
											<UserInfoCard
												key={i}
												user={true}
												firstName={teacher.firstName}
												lastName={teacher.lastName}
												img={teacher.profileImg}
												num={i}
												email={teacher.email}
												level={1}
												details={teacher}
												type={teacher.userType}
												approveHandler={approveHandler}
												accessPledre={teacher.isVerified}
												isAbsolute={true}
											/>
										))}
							</tbody>
						</table>
						{teachers <= 0 && (
							<div className="text-center">
								<p style={{ textAlign: "center" }}>No Teachers found</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</Admin>
	);
}
// MENTORS COMPONENT
export function Mentors() {
	const { getItem } = useLocalStorage();
	let userdata = getItem(KEY);
	const flag = useRef(false);
	const navigate = useNavigate();
	const [teachers, setTeachers] = useState([]);
	const [loading, setLoading] = useState(true);
	const {
		otherFunctions: { fetchMentors },
	} = useAuth();

	const [search, setSearch] = useState("");

	useEffect(() => {
		if (flag.current) return;
		(async () => {
			try {
				const token = userdata?.token;
				const res = await fetchMentors(token);

				const { message, success, statusCode } = res;
				if (!success) throw new AdvancedError(message, statusCode);
				else {
					const { data } = res;

					//do somethings
					if (data.length > 0) {
						setTeachers((_) => data);
					} else {
						toast.success("No mentor page found");
					}
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
		})();
		flag.current = true;
	}, []);

	const tableHeaders = ["No", "Name", "Email", "Expertise"];

	function approveHandler(e, email, details) {
		localStorage.setItem("gotocourse-mentorDetails", JSON.stringify(details));
		if (email) navigate(`detail`);
	}

	// function showDetailsHandler(e, id) {
	//   navigate(`details/${id}`);
	// }
	return (
		<Admin header={"Mentors"}>
			{loading && <Loader />}
			<div className={clsx["admin_profile"]}>
				<div className={clsx.admin__student}>
					<div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
						<button
							className="btn button-md ms-auto"
							style={{ background: "var(--theme-blue)", color: "#fff" }}
							type="button"
							onClick={() => navigate("create/mentor")}
						>
							Add Mentor
						</button>
					</div>
					<div className="d-flex justify-content-between align-items-center">
						<h1 className="mb-0">All Mentors</h1>
						<div>
							<input
								type="text"
								className="form-control"
								placeholder="Search"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
						{/* <button className="btn button-md" style={{background:"var(--theme-blue)", color:"#fff"}} type="button" onClick={()=>navigate("create/mentor")}>Add Mentor</button> */}
					</div>
					<div className={` ${clsx.admin__student_main}`}>
						<table className={`${clsx.admin__student_table}`}>
							<thead>
								{tableHeaders.map((el, i) => (
									<td key={i}>{el}</td>
								))}
							</thead>
							<tbody>
								{teachers?.length > 0 &&
									teachers
										?.filter(
											(teach) =>
												teach.mentorFirstName
													.toLowerCase()
													.includes(search.toLowerCase()) ||
												teach.mentorLastName
													.toLowerCase()
													.includes(search.toLowerCase()) ||
												teach.mentorEmail
													.toLowerCase()
													.includes(search.toLowerCase()) ||
												teach.expertise
													.toLowerCase()
													.includes(search.toLowerCase())
										)
										.map((teacher, i) => (
											<UserInfoCard
												key={i}
												user={true}
												firstName={teacher.mentorFirstName}
												lastName={teacher.mentorLastName}
												img={teacher.mentorImg}
												mentorId={teacher.mentorId}
												num={i}
												email={teacher.mentorEmail}
												level={teacher.expertise}
												details={teacher}
												approveHandler={approveHandler}
												isActive={null}
												isAbsolute={false}
												type={null}

											// accessPledre={teacher.accessPledre}
											/>
										))}
							</tbody>
						</table>
						{teachers.length <= 0 && (
							<div className="text-center">
								<p>No mentor page found</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</Admin>
	);
}

// ADD MENTORS COMPONENT

export function AddMentor({ edit }) {
	const {
		adminTeacherFunctions: { makeMentorPage, updateMentor },
	} = useAuth();
	const { getItem } = useLocalStorage();

	const [previewImage, setPreviewImage] = useState(false);

	let userdata = getItem(KEY);

	const [open, setOpen] = useState(false);

	function showUploadFormHandler() {
		setOpen((_) => true);
	}

	const [loading, setLoading] = useState(false);
	const [formstate, setFormstate] = useState({
		mentorFirstName: "",
		mentorLastName: "",
		mentorEmail: "",
		mentorBio: "",
		expertise: "",
		experience: "",
		footnote: "",
		fee: "",
	});

	const [bio, setBio] = useState("");
	const [fileUrl, setFileUrl] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (edit) {
			const editMentorData = getItem("gotocourse-mentorDetails");
			setFormstate(editMentorData);
		}
	}, [edit]);

	async function handleSubmit(e) {
		e.preventDefault();
		const formdata = { ...formstate, mentorBio: bio };
		setLoading(true);
		try {
			const res =
				edit === "mentor"
					? await updateMentor(formstate._id, formdata, userdata?.token)
					: await makeMentorPage(userdata?.token, formdata);
			const { success, message, statusCode, data } = res;
			if (!success) throw new AdvancedError(message, statusCode);
			else {
				toast.success(message, {
					position: "top-right",
					autoClose: 4000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				if (edit === "mentor") {
					localStorage.setItem(
						"gotocourse-mentorDetails",
						JSON.stringify(data)
					);
					navigate(-1);
				}
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

	return (
		<Admin header="ADMIN">
			<div className={clsx["admin_profile"]}>
				<div className={clsx.admin__student}>
					<h3>Add Mentor</h3>
					{/* <UploadForm
            isOpen={open}
            setIsOpen={setOpen}
            setPreviewImage={setPreviewImage}
          /> */}
					{/* <div className="row w-100 mt-4">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <div
                className={clsx.upload__file_box}
                onClick={showUploadFormHandler}
              >
                <img src={vector} alt={"Placeholder"} />
                <p>Upload Mentor image</p>
              </div>
              {previewImage && (
                <div className={clsx.upload__file_box}>
                  <img
                    src={previewImage}
                    alt={"Placeholder"}
                    style={{
                      width: "150px",
                      height: "100px",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </div>
              )}
            </div>
          </div> */}

					<UploadWidget fileUrl={fileUrl} setFileUrl={setFileUrl} />

					<form className="form" style={{ width: "80%" }}>
						<Input
							label="Profile image file name"
							name="mentorImg"
							type="text"
							handleChange={changeHandler}
							value={formstate.mentorImg}
						/>
						<Input
							label="First name"
							name="mentorFirstName"
							type="text"
							handleChange={changeHandler}
							value={formstate.mentorFirstName}
						/>
						<Input
							label="Last name"
							name="mentorLastName"
							type="text"
							handleChange={changeHandler}
							value={formstate.mentorLastName}
						/>
						<Input
							label="Mentor's Email"
							name="mentorEmail"
							type="email"
							handleChange={changeHandler}
							value={formstate.mentorEmail}
						/>
						<div className={clsx.form_group}>
							<label htmlFor={"bio"} className="form-label generic_label">
								Bio
							</label>
							{/* <textarea
                rows="5"
                name="mentorBio"
                value={formstate.mentorBio}
                onChange={changeHandler}
                className="form-control generic_input"
              ></textarea> */}
							<CKEditor
								editor={ClassicEditor}
								data={formstate.mentorBio}
								onReady={(editor) => {
									// You can store the "editor" and use when it is needed.
								}}
								onChange={(event, editor) => {
									const data = editor.getData();
									setBio(data);
									// setFormstate({...formstate, mentorBio: data})
								}}
							/>
						</div>
						<Input
							label="Area of Expertise"
							name="expertise"
							type="text"
							handleChange={changeHandler}
							value={formstate.expertise}
						/>
						<Input
							label="Years of experience"
							name="experience"
							type="text"
							handleChange={changeHandler}
							value={formstate.experience}
						/>
						<Input
							label="Footnote"
							name="footnote"
							type="text"
							handleChange={changeHandler}
							value={formstate.footnote}
						/>

						<Input
							label="Fees per session ($)"
							name="fee"
							type="text"
							handleChange={changeHandler}
							value={formstate.fee}
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
								onClick={handleSubmit}
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

//MENTORS DETAILS COMPONENT
export function MentorsDetail() {
	const navigate = useNavigate();
	const [data, setData] = useState(null);
	const { getItem } = useLocalStorage();
	const {
		adminTeacherFunctions: { deleteMentor },
		setGeneralState,
	} = useAuth();
	const info = [
		{
			title: "Courses",
			content: "UX Designer",
		},
		{
			title: "Category",
			content: "Cybersecurity, UX, Data Analysis",
		},
		{
			title: "Mentorship status",
			content: "Unassigned",
		},
	];

	useEffect(() => {
		const teacherInfo = getItem("gotocourse-mentorDetails");
		setData(teacherInfo);
	}, []);

	let accessPledre = false;

	async function deleteMentorPage(e, id) {
		e.preventDefault();
		const userdata = getItem(KEY);
		let item = {
			userId: id,
		};
		try {
			setGeneralState((old) => {
				return {
					...old,
					loading: true,
				};
			});

			const res = await deleteMentor(id, userdata?.token);
			const { message, success, statusCode } = res;
			if (!success) throw new AdvancedError(message, statusCode);
			else {
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
				navigate(-1);
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
		} finally {
			setGeneralState((old) => {
				return {
					...old,
					loading: false,
				};
			});
		}
	}
	return (
		<Admin header="Mentor Details">
			<div className={clsx["admin_profile"]}>
				<div className={clsx["admin_profile_top"]}>
					<div className={clsx["admin_profile_top_img"]}>
						<img
							src={
								data?.mentorImg
									? `${process.env.REACT_APP_IMAGEURL}/${data?.mentorImg}`
									: avatar
							}
							style={{ borderRadius: 10 }}
							width="100%"
							alt="Avatar"
						/>
					</div>
				</div>
				<div className={clsx["admin_profile_main"]}>
					<h1>
						{data ? `${data?.mentorFirstName} ${data?.mentorLastName}` : ""}
					</h1>

					<div className={clsx.admin__profile_info}>
						<div className={clsx.admin__info}>
							<span className={clsx.admin__info_title}>Email</span>
							<span className={clsx.admin__info_content}>
								{data?.mentorEmail}
							</span>
						</div>
						<div className={clsx.admin__info}>
							<span className={clsx.admin__info_title}>Expertise</span>
							<span className={clsx.admin__info_content}>
								{data?.expertise}
							</span>
						</div>
						<div className={clsx.admin__info}>
							<span className={clsx.admin__info_title}>Bio</span>
							<div
								className={clsx.admin__info_content}
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(data?.mentorBio),
								}}
							/>
						</div>
						<div className={clsx.admin__info}>
							<span className={clsx.admin__info_title}>Fees</span>
							<span className={clsx.admin__info_content}>{data?.fee}</span>
						</div>
						<div className="d-flex align-items-center mt-3"></div>
						<button
							className="button button-lg log_btn me-4"
							style={{ backgroundColor: "red" }}
							type="submit"
							onClick={(e) => deleteMentorPage(e, data?._id)}
						>
							Delete
						</button>
						<button
							className="button button-lg log_btn"
							type="submit"
							onClick={(e) => {
								navigate("edit");
							}}
						>
							Edit
						</button>
					</div>
				</div>
			</div>
		</Admin>
	);
}

// COURSES COMPONENT
export function Courses() {
	const {
		adminFunctions: { fetchCourses },
	} = useAuth();
	const { getItem } = useLocalStorage();
	const navigate = useNavigate();
	const flag = useRef(false);
	let userdata = getItem(KEY);
	const [courseList, setCourseList] = useState([]);
	const [loading, setLoading] = useState(true);
	const tableHeaders = [
		"No",
		"Courses",
		"Name",
		"Date",
		"Package",
		"Rating",
		"Approval",
	];

	const [search, setSearch] = useState("");

	useEffect(() => {
		if (flag.current) return;
		(async () => {
			try {
				const res = await fetchCourses(userdata?.token);
				const { message, success, statusCode } = res;
				if (!success) throw new AdvancedError(message, statusCode);
				else if (statusCode === 1) {
					const { data } = res;
					setCourseList(data);
				} else {
					throw new AdvancedError(message, statusCode);
				}
			} catch (err) {
				toast.error(err.message);
			} finally {
				setLoading((_) => false);
			}
		})();
		flag.current = true;
	}, []);

	function gotoCreateCourseHandler(e) {
		navigate("create");
	}

	function showDetailsHandler(e, id) {
		navigate(`details/${id}`);
	}
	return (
		<Admin header={"Courses"}>
			{loading && <Loader />}
			<div className={clsx["admin_profile"]}>
				<div className={clsx.admin__student}>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<h1 style={{ margin: 0 }}>All Courses</h1>{" "}
						<button
							type="button"
							className="btn btn-primary px-5"
							onClick={gotoCreateCourseHandler}
						>
							Add Course
						</button>
					</div>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<div>
							<input
								type="search"
								name="search"
								id="search"
								className="form-control"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
					</div>

					<div className={clsx.admin__student_main}>
						<table className={clsx.admin__student_table}>
							<thead>
								{tableHeaders.map((el, i) => (
									<td key={i}>{el}</td>
								))}
							</thead>
							<tbody>
								{courseList.length > 0 &&
									courseList
										.filter(
											(course) =>
												course.category
													.toLowerCase()
													.includes(search.toLowerCase()) ||
												course.name
													.toLowerCase()
													.includes(search.toLowerCase()) ||
												course.status
													.toLowerCase()
													.includes(search.toLowerCase())
										)
										.map(
											(
												{
													category,
													name,
													price,
													status,
													type,
													approve,
													courseId,
													startDate,
													packages,
													endDate,
												},
												i
											) => (
												<UserInfoCard
													key={i}
													comp={"Courses"}
													num={i}
													name={category}
													course={name}
													rating={4}
													id={courseId}
													showDetailsHandler={showDetailsHandler}
													packages={packages}
													date={`${startDate ? getDate(startDate) : ""} - ${endDate ? getDate(endDate) : ""
														}`}
													isActive={status === "active" ? true : false}
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

// CREATECOURSE COMPONENT
export function CreateCourse() {
	const location = useLocation();
	const [loader, setLoader] = useState(location.search ? true : false);

	return (
		<Admin header={location.search ? "Edit Course" : "Create Course"}>
			{/* {loader && <Loader />} */}
			<div className={clsx.admin_profile}>
				<CreateCourseMain type={"admin"} />
			</div>
		</Admin>
	);
}

// COURSE DETAILS COMPONENT
export function CourseDetails({ }) {
	const navigate = useNavigate();
	const { getItem, updateItem } = useLocalStorage();
	let userdata = getItem(KEY);
	const {
		generalState,
		setGeneralState,
		adminFunctions: {
			fetchCourses,
			deleteCourse,
			toggleCourseStatus,
			adminUpdateCourse,
		},
	} = useAuth();
	const flag = useRef(false);
	const [formstate, setFormstate] = useState({
		name: "",
		description: "",
		status: false,
		teacher: "",
		student: "",
		instructors: [],
	});

	const [openprompt, setOpenprompt] = useState(false);
	const [courseTutorId, setCourseTutorId] = useState(false);
	const [loading, setLoading] = useState(true);
	const params = useParams();

	//get user id
	useEffect(() => {
		//fetch course details for the id
		if (flag.current) return;
		(async () => {
			try {
				const res = await fetchCourses(userdata?.token);
				const { message, statusCode, success } = res;
				if (!success) throw new AdvancedError(message, statusCode);
				else {
					const { data } = res;
					let course = data.find((d) => d.courseId === params?.id);
					setFormstate((old) => {
						return {
							...old,
							...course,
						};
					});
				}
			} catch (err) {
				toast.error(err.message);
			} finally {
				setLoading((_) => false);
			}
		})();
		flag.current = true;

		return () => console.log("Leaving Details page");
	}, []);

	function changeHandler(e) {
		const { name, value } = e.target;
		setFormstate((old) => {
			return {
				...old,
				[name]: value,
			};
		});
	}

	async function deleteCourseHandler(e) {
		setLoading((_) => true);
		try {
			const res = await deleteCourse(userdata?.token, params?.id);
			const { success, message, statusCode } = res;
			if (!success) throw new AdvancedError(message, statusCode);
			else {
				toast.success(message);
				navigate(-1);
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading((_) => false);
		}
	}

	async function toggleCourseStatusHandler(e) {
		setLoading((_) => true);
		let pledId;
		try {
			if (formstate.status !== "active") {
				// const pledRes = await generalState.pledre.addCourse({
				//   course_name: formstate.name,
				//   course_description: formstate.description,
				//   is_public: false,
				//   short_description: formstate.description,
				//   price: formstate.price,
				// });
				// if (pledRes.id) {
				// pledId = pledRes.id;

				const res = await toggleCourseStatus(userdata?.token, params?.id);
				const { success, message, statusCode } = res;
				if (!success) throw new AdvancedError(message, statusCode);
				setFormstate({
					...formstate,
					status: "active",
					pledreCourseId: pledId,
				});
				toast.success(message);

				// }
			} else {
				const res = await toggleCourseStatus(userdata?.token, params?.id);
				const { success, message, statusCode } = res;
				if (!success) throw new AdvancedError(message, statusCode);
				setFormstate({ ...formstate, status: "inactive" });
				toast.success(message);
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading((_) => false);
		}
	}

	function editCourseHandler(e) {
		setGeneralState({ ...generalState, courseInfo: formstate });
		updateItem("gotocourse-courseEdit", formstate);
		navigate(`/admin/courses/create?edit=${params?.id}`);
	}

	function removeTutor(tutorId) {
		setCourseTutorId(tutorId);
		setOpenprompt(true);
	}

	function closeModal() {
		setOpenprompt(false);
	}

	async function deleteTutor() {
		const newList = formstate.instructors.filter(
			(tutor) => tutor.tutorId !== courseTutorId
		);
		let updatedInstructors = [];
		let startDate = new Date(formstate.startDate).toISOString().split("T")[0];
		let endDate = new Date(formstate.endDate).toISOString().split("T")[0];
		const instrctors = newList.forEach((instructor) =>
			updatedInstructors.push(instructor.email)
		);

		const formdata = {
			...formstate,
			instructors: updatedInstructors,
			startDate,
			endDate,
			categoryName: formstate.category,
		};

		try {
			setLoading(true);
			const res = await adminUpdateCourse(
				userdata?.token,
				formstate?.courseId,
				formdata
			);

			const { success, message, statusCode } = res;

			if (!success) throw new AdvancedError(message, statusCode);
			else {
				setFormstate({ ...formstate, instructors: newList });
				setOpenprompt(false);
				toast.success(message);
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading((_) => false);
		}
	}
	return (
		<Admin header="ADMIN">
			{loading && <Loader />}
			<div className={clsx["admin_profile"]}>
				<div className={clsx.admin__student}>
					<div
						className="d-flex justify-content-between align-items-center mb-5"
						style={{ width: "80%" }}
					>
						<button
							type="button"
							className="btn btn-sm btn-danger px-3 py-2"
							style={{ fontSize: "0.8rem" }}
							onClick={deleteCourseHandler}
						>
							Delete Course
						</button>
						<button
							type="button"
							className="btn btn-sm btn-primary px-3 py-2"
							style={{ fontSize: "0.8rem" }}
							onClick={editCourseHandler}
						>
							Edit Course
						</button>
					</div>
					<form className="form" style={{ width: "80%", margin: "20px 0px" }}>
						<Input
							label="Name of Course"
							name="name"
							type="text"
							handleChange={changeHandler}
							value={formstate.name}
							readOnly={true}
						/>

						<div className={clsx.form_group}>
							<label
								htmlFor={"description"}
								className="form-label generic_label"
							>
								Description
							</label>
							<div
								className="border rounded p-2"
								style={{ background: "#e9ecef" }}
								dangerouslySetInnerHTML={{ __html: formstate.description }}
							/>
						</div>
						<div className={clsx.form_group}>
							<div className={clsx.form_group__teachers}>
								<label>Name of teachers</label>
								{formstate.instructors.length > 0 ? (
									formstate.instructors.map((t, i) => (
										<div key={i}>
											<p>
												{i + 1}. &nbsp; {t.name}
											</p>
											<div className={clsx.teachers__actions}>
												<span
													className={`${clsx.teachers__actions_delete} text-danger`}
													onClick={() => removeTutor(t.tutorId)}
												>
													<AiOutlineDelete /> Delete
												</span>
											</div>
										</div>
									))
								) : (
									<p>{formstate.instructorName}</p>
								)}
								<button type="button" className={clsx.form_group__button}>
									Add Instructor
								</button>
							</div>
						</div>

						<div className={clsx.form_group} style={{ marginTop: 40 }}>
							<label>Change Course Status</label>
							<Switch
								onClick={toggleCourseStatusHandler}
								checked={formstate.status === "active" ? true : false}
							/>
						</div>
					</form>
				</div>
				<DeleteModal
					open={openprompt}
					close={closeModal}
					deleteTutor={deleteTutor}
				/>
			</div>
		</Admin>
	);
}

// DELETE PROMPT MODAL

function DeleteModal({ open, close, deleteTutor }) {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		minWidth: 600,
		background: "#fff",
		border: "1px solid #eee",
		borderRadius: "10px",
		boxShadow: 24,
		p: 6,
		padding: "4rem 2rem",
	};
	return (
		<Modal
			open={open}
			// onClose={close}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box style={style}>
				<h5
					className="lead text-primary text-center"
					style={{ color: "var(--theme-blue)" }}
				>
					Remove Instructor from Class?
				</h5>
				<div className="d-flex justify-content-around align-items-center mt-4">
					<button
						className="btn btn-primary my-3"
						onClick={close}
						style={{ backgroundColor: "var(--theme-blue)" }}
					>
						Cancel
					</button>
					<button
						className="btn btn-primary my-3"
						onClick={deleteTutor}
						style={{ backgroundColor: "var(--theme-orange)" }}
					>
						Remove
					</button>
				</div>
			</Box>
		</Modal>
	);
}
// BOOTCAMPDETAILS COMPONENT
export function BootcampDetails({ }) {
	const navigate = useNavigate();
	const { getItem } = useLocalStorage();
	let userdata = getItem(KEY);

	const {
		adminFunctions: {
			deleteBootcamp,
			fetchBootcamps,
			toggleBootcampStatus,
			updateBootcamp,
			addStudentToClass,
			removeStudentToClass,
			fetchClassStudents,
		},
		adminStudentFunctions: { fetch },
		teacherFunctions: { fetchBootcampApplications },
		generalState,
	} = useAuth();
	const [openprompt, setOpenprompt] = useState(false);
	const params = useParams();

	const flag = useRef(false);
	const [formstate, setFormstate] = useState();
	const [loading, setLoading] = useState(true);
	const [allStudents, setAllStudents] = useState([]);
	const [allEnrolledStudents, setAllEnrolledStudents] = useState([]);
	const [student, setStudent] = useState("");
	const [studentData, setStudentData] = useState({
		userId: "",
		amountPaid: "",
		nextDueDate: "",
		bootcampId: params.id,
	});
	const [removedStudent, setRemovedStudent] = useState("");

	//get user id
	useEffect(() => {
		//fetch bootcamp details for the id
		if (flag.current) return;
		(async () => {
			try {
				const res = await fetchBootcamps(userdata?.token);
				const { message, statusCode, success } = res;
				if (!success) throw new AdvancedError(message, statusCode);
				else {
					const { data } = res;
					let bootcamp = data.find((d) => d.bootcampId === params?.id);
					setFormstate({ ...formstate, ...bootcamp });
					// setInstructors((_) => {
					//   return [bootcamp.instructorName];
					// });
				}
			} catch (err) {
				toast.error(err.message);
			} finally {
				setLoading((_) => false);
			}
		})();
		flag.current = true;
		return () => console.log("Leaving Details page");
	}, []);

	function changeHandler(e) {
		const { name, value } = e.target;
		setFormstate((old) => {
			return {
				...old,
				[name]: value,
			};
		});
	}

	async function toggleBootcampStatusHandler(e) {
		setLoading((_) => true);
		try {
			const res = await toggleBootcampStatus(
				userdata?.token,
				{ pledreClassId: "" },
				params?.id
			);
			const { message, statusCode, success } = res;
			if (statusCode !== 1) throw new AdvancedError(message, statusCode);
			else {
				setFormstate({
					...formstate,
					...res.data,
					isActive: !formstate.isActive,
				});
				// toast.success(message);
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading((_) => false);
		}
	}
	async function deleteBootcampHandler(e) {
		setLoading((_) => true);
		try {
			const res = await deleteBootcamp(userdata?.token, params?.id);
			const { message, success, statusCode } = res;
			if (!success) throw new AdvancedError(message, statusCode);
			else {
				navigate("/admin/classes");
				toast.success(message);
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading((_) => false);
		}
	}

	function editBootcampHandler(e) {
		navigate(`/admin/classes/create?edit=${params?.id}`);
	}

	function closeModal() {
		setOpenprompt(false);
	}

	async function deleteTutor() {
		let startDate = new Date(formstate.startDate).toISOString().split("T")[0];
		let endDate = new Date(formstate.endDate).toISOString().split("T")[0];
		const formdata = {
			...formstate,
			instructor: "",
			startDate,
			endDate,
		};
		delete formdata.instructorName;
		delete formdata.instructorId;
		delete formdata.instructorEmail;

		try {
			setLoading(true);
			const res = await updateBootcamp(
				userdata?.token,
				formstate?.bootcampId,
				formdata
			);
			const { success, message, statusCode } = res;
			if (!success) throw new AdvancedError(message, statusCode);
			else {
				setFormstate({ ...formstate, instructor: "" });
				setOpenprompt(false);
				toast.success(message);
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading((_) => false);
		}
	}

	async function addTutor(e) {
		e.preventDefault();
		let startDate = new Date(formstate.startDate).toISOString().split("T")[0];
		let endDate = new Date(formstate.endDate).toISOString().split("T")[0];
		const formdata = {
			...formstate,
			startDate,
			endDate,
		};
		delete formdata.instructorName;
		delete formdata.instructorId;
		delete formdata.instructorEmail;

		let id = formdata.bootcampId ? formdata.bootcampId : formdata._id;
		try {
			setLoading(true);
			const res = await updateBootcamp(userdata?.token, id, formdata);
			const { success, message, statusCode } = res;
			if (!success) throw new AdvancedError(message, statusCode);
			else {
				// const teacherDetails = await generalState.pledre.getTeacherDetails(formdata.instructor);
				// if(teacherDetails._id){
				//   const addTeachtoCourse = await generalState.pledre.addTeacherToCourse({
				//     teacher_id: teacherDetails?._id,
				//     course_id: formstate.pledreCourseId,
				//   });
				// }

				setFormstate(res.data);
				setOpenprompt(false);
				toast.success(message);
			}
		} catch (err) {
			console.error(err);
			toast.error(err.message);
		} finally {
			setLoading((_) => false);
		}
	}
	function removeTutor(tutorId) {
		setOpenprompt(true);
	}

	// ADD AND REMOVE STUDENTS FROM COURSE

	const fetchAllStudents = useQuery(
		["fetch all students", userdata.token],
		() => fetch(userdata.token),
		{
			enabled: userdata.token !== null,
			onSuccess: (res) => {
				if (res?.data) {
					setAllStudents(res.data);
					return;
				}
				setAllStudents([]);
			},
			onError: (err) => {
				console.error(err);
			},
		}
	);

	const fetchAllEnrolledStudents = useQuery(
		["fetch enrolled students", userdata.token],
		() => fetchClassStudents(userdata.token, params?.id),
		{
			enabled: userdata.token !== null,
			onSuccess: (res) => {
				if (res?.data) {
					setAllEnrolledStudents(res.data);
					return;
				}
				setAllEnrolledStudents([]);
			},
			onError: (err) => {
				console.error(err);
			},
		}
	);

	const addMutation = useMutation(
		([token, data]) => addStudentToClass(token, data),
		{
			onSuccess: (res) => {
				if (res.statusCode === 1) {
					toast.success(res.message);
					window.alert(res.message);
				} else {
					window.alert(res.message);
					toast.error(res.message);
				}
			},
			onError: (err) => { },
		}
	);

	const removeMutation = useMutation(
		([token, data]) => removeStudentToClass(token, data),
		{
			onSuccess: (res) => {
				if (res.statusCode === 1) {
					toast.success(res.message);
					setStudent("");
				} else {
					toast.error(res.message);
				}
			},
			onError: (err) => toast.error(err.message),
		}
	);

	function addStudent() {
		addMutation.mutate([userdata.token, studentData]);
	}

	function removeStudent() {
		removeMutation.mutate([
			userdata.token,
			{ userId: removedStudent, bootcampId: params.id },
		]);
	}


	const defaultProps = {
		options: allStudents,
		// getOptionLabel: (option) => option.email,
		getOptionLabel: (option) => `${option.email} ${option.firstName} ${option.lastName}`
	};

	return (
		<Admin header="ADMIN">
			{/* <ToastContainer
          position="top-right"
          autoClose={4500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
			{loading && <Loader />}
			<div className={clsx["admin_profile"]}>
				<div className={clsx.admin__student}>
					<div
						className="d-flex justify-content-between align-items-center mb-5"
						style={{ width: "80%" }}
					>
						<button
							type="button"
							className="btn btn-sm btn-danger px-3 py-2"
							style={{ fontSize: "0.8rem" }}
							onClick={deleteBootcampHandler}
						>
							Delete Course
						</button>
						<button
							type="button"
							className="btn btn-sm btn-primary px-3 py-2"
							style={{ fontSize: "0.8rem" }}
							onClick={editBootcampHandler}
						>
							Edit Course
						</button>
					</div>
					<form className="form" style={{ width: "80%", margin: "20px 0px" }}>
						<Input
							label="Title"
							name="title"
							type="text"
							handleChange={changeHandler}
							value={formstate?.title}
							readOnly={true}
						/>
						<div className={clsx.form_group}>
							<label
								htmlFor={"description"}
								className="form-label generic_label"
							>
								Description
							</label>
							<div
								className="border rounded"
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(formstate?.description),
								}}
							/>
						</div>

						<div className={clsx.form_group}>
							<div className={clsx.form_group__teachers}>
								<label>Instructor</label>
								{formstate?.instructorName && (
									<div>
										<p>
											{formstate?.instructorName} - {formstate?.instructorEmail}
										</p>
										{/* <div className={clsx.teachers__actions}>
                      <span
                        className={`${clsx.teachers__actions_delete} text-danger`}
                        onClick={() => removeTutor(formstate?.instructorId)}
                      >
                        <AiOutlineDelete />
                        Delete
                      </span>
                    </div> 
                    
                    */}
									</div>
								)}
							</div>

							{/* <Input
                style={{ margin: "0px !important" }}
                name="instructor"
                type="text"
                handleChange={changeHandler}
                value={formstate?.instructor}
              /> */}
						</div>
						<div className={clsx.form_group}>
							<div className={clsx.form_group__teachers}>
								<h6>Add Student</h6>
								<Autocomplete
									disablePortal
									{...defaultProps}
									id="combo-box-demo"
									sx={{ width: 300 }}
									onChange={(e, newValue) => {
										// setValue(newValue);
										setStudentData({ ...studentData, userId: newValue.userId })
									}}
									renderInput={(params) => <TextField {...params} label="student email" />}
								/>


								{/* <select
									name="userId"
									id="userId"
									className="form-select"
									onChange={(e) =>
										setStudentData({ ...studentData, userId: e.target.value })
									}
									value={studentData.userId}
								>
									<option value="">Select student</option>
									{allStudents?.map((item) => (
										<option
											value={item.userId}
										>{`${item.email} - ${item.firstName} ${item.lastName}`}</option>
									))}
								</select> */}
							</div>
							<div className={clsx.form_group}>
								<Input
									label="Amount Paid"
									name="amountPaid"
									type="text"
									handleChange={(e) =>
										setStudentData({
											...studentData,
											amountPaid: e.target.value,
										})
									}
									value={studentData?.amountPaid}
								/>
							</div>
							<div className={clsx.form_group}>
								<Input
									label="Next Due Date"
									name="nextDueDate"
									type="date"
									handleChange={(e) =>
										setStudentData({
											...studentData,
											nextDueDate: e.target.value,
										})
									}
									value={studentData?.nextDueDate}
								/>
							</div>
							<button
								type="button"
								className={clsx.form_group__button}
								onClick={addStudent}
								disabled={addMutation?.isLoading}
							>
								{addMutation?.isLoading ? (
									<div className="spinner-border text-white">
										<div className="visually-hidden">Loading...</div>
									</div>
								) : (
									<span>Add</span>
								)}
							</button>
						</div>
						<div className={clsx.form_group}>
							<div className={clsx.form_group__teachers}>
								<h6>Remove Student</h6>
								<select
									name="student"
									id="student"
									className="form-select"
									onChange={(e) => setRemovedStudent(e.target.value)}
									value={removedStudent}
								>
									<option value="">Select student</option>
									{allEnrolledStudents?.map((item) => (
										<option
											value={item.studentId}
										>{`${item.studentId} - ${item.studentName}`}</option>
									))}
								</select>
								<button
									type="button"
									className={clsx.form_group__button}
									onClick={removeStudent}
									disabled={removeMutation?.isLoading}
								>
									{removeMutation?.isLoading ? (
										<div className="spinner-border text-white">
											<div className="visually-hidden">Loading...</div>
										</div>
									) : (
										<span>Remove</span>
									)}
								</button>
							</div>
						</div>

						{/* <div className={clsx.form_group}>
              <div className={clsx.form_group__teachers}>
                <label>Add Student</label>
                {
                  students.map((s, i) => (
                    <div key={i}>
                      <p>{i + 1}. &nbsp; {s}</p> 
                      <div className={clsx.teachers__actions}>
                        <span className={`${clsx.teachers__actions_delete} text-danger`}><AiOutlineDelete />    Delete</span>
                        <span className={`${clsx.teachers__actions_edit}`}><AiTwotoneEdit />    Edit</span>
                      </div>
                    </div>
                  ))
                }
              </div>
              <Input
                name="student"
                type="text"
                handleChange={changeHandler}
                value={formstate?.student}
              />
              <button type="button" className={clsx.form_group__button}>
                Add Student
              </button>
            </div> */}

						<div className={clsx.form_group} style={{ marginTop: 40 }}>
							<label>Change Class Status</label>
							<Switch
								onClick={toggleBootcampStatusHandler}
								size="large"
								checked={formstate?.isActive}
								value={formstate?.isActive}
							/>
						</div>
						<DeleteModal
							open={openprompt}
							close={closeModal}
							deleteTutor={deleteTutor}
						/>
					</form>
				</div>
			</div>
		</Admin>
	);
}

// BOOTCAMPS COMPONENT
export function Bootcamps() {
	const {
		adminFunctions: { fetchBootcamps },
	} = useAuth();
	const { getItem } = useLocalStorage();
	const navigate = useNavigate();
	const flag = useRef(false);
	let userdata = getItem(KEY);
	const [bootcamps, setBootcamps] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const tableHeaders = [
		"No",
		"Title",
		"Details",
		"Type",
		"Category",
		"Sub-Category",
		"Duration",
		"Date",
		"Time",
		"price",
	];


	useEffect(() => {
		if (flag.current) return;
		(async () => {
			try {
				const res = await fetchBootcamps(userdata?.token);
				const { message, success, statusCode } = res;
				if (!success) throw new AdvancedError(message, statusCode);
				else if (statusCode === 1) {
					const { data } = res;
					setBootcamps((_) => data);
				} else {
					throw new AdvancedError(message, statusCode);
				}
			} catch (err) {
				toast.error(err.message);
			} finally {
				setLoading((_) => false);
			}
		})();
		flag.current = true;
	}, []);

	function gotoCreateCourseHandler(e) {
		navigate("create");
	}

	function detailHandler(e, _id) {
		navigate("details/" + _id);
	}

	function convertDate(start, end) {
		let startDate = getDate(start)
		let endDate = getDate(end)
		if (startDate?.toString().toLowerCase().includes(search) || endDate?.toString().toLowerCase().includes(search)) {
			return true
		}
		return false

	}
	return (
		<Admin header={"Courses"}>
			{loading && <Loader />}
			<div className={clsx["admin_profile"]}>
				<div className={clsx.admin__student}>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<h1 style={{ margin: 0 }}>Courses</h1>{" "}
						<button
							type="button"
							className="btn btn-primary px-5"
							onClick={gotoCreateCourseHandler}
						>
							Add Course
						</button>
					</div>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<div>
							<input
								type="text"
								className="form-control"
								placeholder="search class"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
					</div>
					<div className={clsx.admin__student_main}>
						<table className={clsx.admin__student_table}>
							<thead>
								{tableHeaders.map((el, i) => (
									<th key={i}>{el}</th>
								))}
							</thead>
							<tbody>
								{bootcamps.length > 0 ? (
									bootcamps
										.filter((boot) =>
											boot.title.toLowerCase().includes(search.toLowerCase()) ||
											boot.category?.toLowerCase().includes(search.toLowerCase()) ||
											boot.subCategory?.toLowerCase().includes(search.toLowerCase()) ||
											boot.title?.toLowerCase().includes(search.toLowerCase()) ||
											boot.price?.toString().toLowerCase().includes(search.toLowerCase()) ||
											convertDate(boot.startDate, boot.endDate)
										)
										.map(
											(
												{
													title,
													duration,
													description,
													type,
													startTime,
													endTime,
													endDate,
													startDate,
													bootcampId,
													_id,
													packages,
													price,
													category,
													subCategory,
												},
												i
											) => (
												<BootcampRow
													key={i}
													index={i}
													title={title}
													detail={description}
													duration={duration}
													type={type}
													admin={false}
													clickHandler={(e) => detailHandler(e, bootcampId)}
													time={`${startTime} - ${endTime} CST`}
													date={`${getDate(startDate)} - ${getDate(endDate)}`}
													packages={packages}
													price={price}
													category={category}
													subCategory={subCategory}
												/>
											)
										)
								) : (
									<h6>No Class found</h6>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Admin>
	);
}

// CLASS/BOOTCAMP CONSOLE

export function AdminClassConsole() {
	const {
		adminFunctions: { fetchBootcamps },
	} = useAuth();
	const { getItem } = useLocalStorage();
	const navigate = useNavigate();
	const flag = useRef(false);
	let userdata = getItem(KEY);
	const [bootcamps, setBootcamps] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (flag.current) return;
		(async () => {
			try {
				const res = await fetchBootcamps(userdata?.token);
				const { message, success, statusCode } = res;
				if (!success) throw new AdvancedError(message, statusCode);
				else if (statusCode === 1) {
					const { data } = res;
					setBootcamps((_) => data);
				} else {
					throw new AdvancedError(message, statusCode);
				}
			} catch (err) {
				toast.error(err.message);
			} finally {
				setLoading((_) => false);
			}
		})();
		flag.current = true;
	}, []);

	return (
		<Admin header={"Courses"}>
			{loading && <Loader />}
			<div className={clsx["admin_profile"]}>
				<div className={clsx.admin__student_main}>
					<div className="d-flex justify-content-between align-items-center flex-wrap">
						<div>
							<input
								type="text"
								className="form-control"
								placeholder="Search"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
					</div>
					{bootcamps.length > 0 ? (
						<Grid height="300px">
							{bootcamps
								.filter(
									(course) =>
										// course.category
										//   .toLowerCase()
										//   .includes(search.toLowerCase()) ||
										course.title.toLowerCase().includes(search.toLowerCase())
									//   ||
									// course.status
									//   .toLowerCase()
									//   .includes(search.toLowerCase())
								)
								.map((item, i) => (
									<ClassesCard {...item} all={item} />
								))}
						</Grid>
					) : (
						<h6 className="text-center">No Class found</h6>
					)}
				</div>
			</div>
		</Admin>
	);
}

// CREATEBOOTCAMP COMPONENT
export function CreateBootcamp() {
	const { getItem } = useLocalStorage();
	let userdata = getItem(KEY);
	const flag = useRef(false);
	const navigate = useNavigate();
	const ref = useRef(false);

	const {
		adminFunctions: {
			addBootcamp,
			fetchBootcamps,
			updateBootcamp,
			fetchCategories,
		},
		adminTeacherFunctions: { fetch },
	} = useAuth();
	const [categories, setCategories] = useState([]);
	const location = useLocation();
	const [loader, setLoader] = useState(location.search ? true : false);

	const [formstate, setFormstate] = useState({
		title: "",
		duration: "",
		categoryName: "",
		startDate: "",
		endDate: "",
		startTime: "",
		endTime: "",
		description: "",
		type: "",
		instructor: "",
		instructors: [],
		syllabus: [],
		careerList: [],
		packages: [],
		popupArr: [],
		time: [],
		isPublic: true,
	});

	const [loading, setLoading] = useState(false);
	const [teachers, setTeachers] = useState([]);
	const [bio, setBio] = useState("");
	const [scheduleCount, setScheduleCount] = useState(0);
	const [timeList, setTimeList] = useState([]);
	const [instructors, setInstructors] = useState([])

	useEffect(() => {
		if (flag.current) return;
		if (location.search) {
			const id = location.search.split("=").reverse()[0];
			(async () => {
				try {
					const res = await fetchBootcamps(userdata?.token);
					const { message, success, statusCode } = res;
					if (!success) throw new AdvancedError(message, statusCode);
					else if (statusCode === 1) {
						const { data } = res;
						let found = data.find((d) => d.bootcampId === id);
						found.startDate = found.startDate.split("T")[0];
						found.endDate = found.endDate.split("T")[0];
						found.instructor = found.instructorEmail;
						found.bootcampImg = found.bootcampImg.split("/").slice(-1)[0];

						delete found.instructorName;
						delete found.packages;
						if (found.instructors?.length > 0) {
							let instructorsList = found.instructors;
							let newList = []
							instructorsList.forEach(instructor => newList.push(instructor.email))
							let formerInstructor = found.instuctor
							if(formerInstructor){
								setFormstate({ ...formstate, ...found, instructors: [...newList, found.instructor], type: "FLAT" })
							}else {
								setFormstate({ ...formstate, ...found, instructors: [...newList], type: "FLAT" })
							}
						} else {
							setFormstate({ ...formstate, ...found, type: "FLAT" });
						}
						setBio(found.description);
					} else {
						throw new AdvancedError(message, statusCode);
					}
				} catch (err) {
					toast.error(err.message);
				} finally {
					setLoader((_) => false);
				}
			})();
		}
		//do some coding
		flag.current = true;
		return () => console.log("Removing CreateBootcamp component");
	}, []);

	function changeHandler(e) {
		const { name, value } = e.target;
		setFormstate((old) => {
			return {
				...old,
				[name]: value,
			};
		});
	}

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			if (ref.current) return;
			(async () => {
				try {
					setLoading(true);
					const res = await fetchCategories(userdata?.token);
					const { success, message, statusCode } = res;

					if (!success || statusCode !== 1)
						throw new AdvancedError(message, statusCode);
					const { data } = res;
					setCategories(data);
				} catch (err) {
					console.error(err);
					toast.error("An error occured");
				} finally {
					setLoading(false);
				}
			})();

			ref.current = true;
		}

		return () => (mounted = false);
	}, [userdata.token]);

	useEffect(() => {
		(async () => {
			try {
				const token = userdata?.token;
				const res = await fetch(token);
				const { message, success, statusCode } = res;
				if (!success) throw new AdvancedError(message, statusCode);
				else {
					const { data } = res;
					setTeachers((_) => data);
				}
			} catch (err) {
				toast.error(err.message);
			} finally {
				setLoading((_) => false);
			}
		})();
	}, [])

	async function submitHandler(e) {
		e.preventDefault();
		setLoading(true);
		const formData = {
			...formstate,
			description: bio ? bio : formstate.description,
			type: "FLAT",
			time: [...formstate.time, ...timeList],
		};
		try {
			if (
				formData.description === "" ||
				formData.title === "" ||
				formData.price === ""
			)
				throw new AdvancedError("All fields are required", 0);
			const res = location.search
				? await updateBootcamp(
					userdata?.token,
					location.search.split("=").reverse()[0],
					formData
				)
				: await addBootcamp(userdata?.token, formData);
			const { success, message, statusCode } = res;

			if (!success) throw new AdvancedError(message, statusCode);
			else {
				toast.success(message);
				navigate("/admin/classes");
			}
		} catch (err) {
			toast.error(err.message);
		} finally {
			setLoading((_) => false);
		}
	}

	const [open, setOpen] = useState(false);
	const [openSyllabus, setOpenSyllabus] = useState(false);
	const [previewImage, setPreviewImage] = useState(false);
	const { syllabuses, addtoSyllabus, setSyllabusses } = useSyllabus();
	const [showCareerModal, setShowCareerModal] = useState(false);
	const [showPopupModal, setShowPopupModal] = useState(false);
	const [careerlist, setCareerlist] = useState({
		name: "",
	});
	const [fileUrl, setFileUrl] = useState(null);

	const [popupList, setPopupList] = useState("");

	const [newInstructor, setNewInstructor] = useState("");

	const openModal = () => {
		setOpenSyllabus(true);
	};
	function showUploadFormHandler() {
		setOpen((_) => true);
	}

	function deleteSyllabus(e) {
		let newSyllabusArr = formstate.syllabus.filter(
			(item, index) => item.title + index !== e
		);
		setFormstate({ ...formstate, syllabus: newSyllabusArr });
	}
	function deletePackage(e) {
		let newPackagesArr = formstate.packages.filter(
			(item, index) => item.title + index !== e
		);
		setFormstate({ ...formstate, packages: newPackagesArr });
	}
	function deleteCareer(e) {
		let newCareerArr = formstate.careerList.filter(
			(item, index) => item.name + index !== e
		);
		setFormstate({ ...formstate, careerList: newCareerArr });
	}
	function deletePopup(e) {
		let newPopupArr = formstate.popupArr.filter(
			(item, index) => item + index !== e
		);
		setFormstate({ ...formstate, popupArr: newPopupArr });
	}

	const handleClose = () => {
		setOpenSyllabus(false);
	};
	function updateCareerHandler(e) {
		if (careerlist.name.trim() !== "" || careerlist.description.trim() !== "") {
			setFormstate({
				...formstate,
				careerList: [...formstate.careerList, careerlist],
			});

			setCareerlist((_) => {
				return {
					name: "",
				};
			});

			setShowCareerModal((_) => false);

			toast.success("Career added successfully", {
				position: "top-right",
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			toast.error("All fields are required", {
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
	function careerChangeHandler(e) {
		const { name, value } = e.target;
		setCareerlist((old) => {
			return {
				...old,
				[name]: value,
			};
		});
	}

	function updatePopupHandler(e) {
		if (popupList.trim() !== "") {
			setFormstate({
				...formstate,
				popupArr: [...formstate.popupArr, popupList],
			});

			setPopupList("");

			setShowPopupModal((_) => false);
		} else {
			toast.error("All fields are required", {
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
	function popupChangeHandler(e) {
		setPopupList(e.target.value);
	}

	const [openPackage, setOpenPackage] = useState(false);
	// PACKAGES
	function openPackageModal() {
		setOpenPackage(true);
	}
	function handleClosePackage() {
		setOpenPackage(false);
	}

	function handleTime(e, i) {
		let formCopy = timeList;
		// let timeArray = formCopy.time

		formCopy[i] = { ...formCopy[i], [e.target.name]: e.target.value };
		// formCopy.time = formCopy
		setTimeList(formCopy);
	}

	function deleteTime(id) {
		let newTimeList = formstate?.time.filter((item) => item._id !== id);
		setFormstate({ ...formstate, time: newTimeList });
	}

	function addInstructor(e) {
		setFormstate({
			...formstate,
			instructors: [...formstate?.instructors, newInstructor],
		});
		setInstructors([...instructors, newInstructor])
		setNewInstructor("");
	}

	function removeInstructor(instructor) {
		let current = formstate.instructors;
		let newList = current.filter((item, i) => item + i !== instructor);
		setFormstate({ ...formstate, instructors: newList });
	}

	function removeInstructorFromEdit(instructorId) {
		let current = formstate.instructors;
		let newList = current.filter((item, i) => item.tutorId !== instructorId);
		setFormstate({ ...formstate, instructors: newList });
	}

	function handleClassStatus(e) {
		setFormstate({ ...formstate, isPublic: e.target.checked });
	}
	return (
		<Admin header={location.search ? "Edit Course" : "Create Course"}>
			{loader && <Loader />}
			<div className={clsx.admin_profile}>
				<div className={clsx.edit__profile}>
					<UploadWidget fileUrl={fileUrl} setFileUrl={setFileUrl} />

					<form className="form" onSubmit={submitHandler} noValidate>
						<Input
							label="Course image name"
							name="bootcampImg"
							type="text"
							handleChange={changeHandler}
							value={formstate.bootcampImg}
							required={true}
						/>
						<Input
							label="Title"
							name="title"
							type="text"
							handleChange={changeHandler}
							value={formstate.title}
							required={true}

						/>
						<div className={clsx.form_group}>
							<label htmlFor={"package"} className="generic_label required">Category</label>
							<select
								rows="5"
								name="categoryName"
								value={formstate.categoryName}
								onChange={changeHandler}
								className="form-select generic_input"
							>
								<option value="">Choose a Category</option>
								{categories.length > 0 &&
									categories.map((item, i) => (
										<option key={i} value={item.name}>
											{item.name}
										</option>
									))}
							</select>
						</div>
						<div className={clsx.form_group}>
							<label htmlFor={"package"} className="generic_label required">Subcategory</label>
							<select
								rows="5"
								name="subCategory"
								value={formstate.subCategory}
								onChange={changeHandler}
								className="form-select generic_input"
							>
								<option value="">Choose a Subcategory</option>
								<option value="PATH_FINDERS">Pathfinder Courses</option>
								<option value="HEAD_START">HeadStart Courses</option>
								<option value="UPSKILL_COURSES">Upskill Courses</option>
								<option value="IN_DEMAND">In Demand Career Courses</option>
								<option value="EXECUTIVE_COURSES">Executive Courses</option>
								<option value="SHORT_COURSES">Short Courses</option>
								<option value="TECH_ENTREPRENEURSHIP">
									Tech entrepreneurship courses
								</option>
							</select>
						</div>
						<Input
							label="Duration"
							name="duration"
							type="text"
							handleChange={changeHandler}
							value={formstate.duration}
							required={true}

						/>
						<Input
							label="Price"
							name="price"
							type="number"
							handleChange={changeHandler}
							value={formstate.price}
							noValidate={"true"}
							required={true}

						/>
						<div className="d-flex flex-wrap">
							<div className="col-sm-6 col-md-3 pe-2 ">
								<Input
									label="Starts By (CST)"
									name="startTime"
									type="time"
									handleChange={changeHandler}
									value={formstate.startTime}
									required={true}

								/>
							</div>
							<div className="col-sm-6 col-md-3 pe-2  ">
								<Input
									label="Ends By (CST)"
									name="endTime"
									type="time"
									handleChange={changeHandler}
									value={formstate.endTime}
									required={true}

								/>
							</div>
							<div className="col-sm-6 col-md-3 pe-2 ">
								<Input
									label="Start Date"
									name="startDate"
									type="date"
									value={formstate.startDate}
									handleChange={changeHandler}
									required={true}

								/>
							</div>
							<div className="col-sm-6 col-md-3 ">
								<Input
									label="End Date"
									name="endDate"
									type="date"
									value={formstate.endDate}
									handleChange={changeHandler}
									required={true}

								/>
							</div>
						</div>
						<div>
							{formstate?.time?.map((item) => (
								<div className={clsx.syllabus_container}>
									<h5>{item.day}</h5>
									<p>{item.startTime}</p>
									<p>{item.endTime}</p>

									<p>
										<i
											className="text-danger"
											style={{ cursor: "pointer" }}
											onClick={() => deleteTime(item._id)}
										>
											<BiTrash />
										</i>
									</p>
								</div>
							))}
							{[...Array(scheduleCount)].map((item, i) => (
								<div className="d-flex flex-wrap align-items-end gap-2">
									<div className="col-sm-6 col-md-3 pe-2 ">
										<label htmlFor="time">Day</label>
										<select
											name="day"
											id="day"
											className="form-select generic_input"
											onChange={(e) => handleTime(e, i)}
											value={timeList[i]?.day}
										>
											<option value="">Days</option>
											<option value="Sunday">Sunday</option>
											<option value="Monday">Monday</option>
											<option value="Tuesday">Tuesday</option>
											<option value="Wednesday">Wednesday</option>
											<option value="Thursday">Thursday</option>
											<option value="Firday">Friday</option>
											<option value="Sunday">Saturday</option>
										</select>
									</div>
									<div className="col-sm-6 col-md-3 pe-2 ">
										<Input
											label="Starts By (CST)"
											name="startTime"
											type="time"
											handleChange={(e) => handleTime(e, i)}
											value={timeList[i]?.startTime}
											required={true}

										/>
									</div>
									<div className="col-sm-6 col-md-3 pe-2  ">
										<Input
											label="Ends By (CST)"
											name="endTime"
											type="time"
											handleChange={(e) => handleTime(e, i)}
											value={timeList[i]?.endTime}
											required={true}
										/>
									</div>
								</div>
							))}
							<button
								className="btn btn-primary my-3"
								style={{
									backgroundColor: "var(--theme-blue)",
									fontSize: "14px",
								}}
								type="button"
								onClick={() => setScheduleCount(scheduleCount + 1)}
							>
								Add Schedule
							</button>
						</div>

						<Editor
							initialState={formstate.description}
							title="Description"
							setBio={setBio}
						/>

						{/* <div className={clsx.form_group}>
							<label htmlFor={"instructor"}>Main Instructor</label>
							<select
								name="instructor"
								value={formstate.instructor}
								onChange={changeHandler}
								className="form-select generic_input"
							>
								<option value="">Choose an instructor</option>
								<option value="">None</option>
								{teachers
									.filter((teacher) => teacher.userType !== "mentor")
									.map((teacher) => (
										<option value={teacher.email}>
											{teacher.firstName} - {teacher.lastName}
										</option>
									))}
							</select>
						</div> */}
						<div className={clsx.form_group}>
							{formstate.instructors?.length > 0 ? (
								formstate.instructors?.map((item, index) => (
									<div className={clsx.syllabus_container}>
										<h5>{item}</h5>
										<p>
											<i
												className="text-danger"
												style={{ cursor: "pointer" }}
												onClick={() => removeInstructor(item + index)}
											>
												<BiTrash />
											</i>
										</p>
									</div>
								))
							) : (
								<p>No instructors found</p>
							)}
						</div>
						<div className={clsx.form_group}>
							<Input
								label="Instructor Email"
								name="newInstructor"
								type="text"
								handleChange={(e) => setNewInstructor(e.target.value)}
								value={newInstructor}
								placeholder="Enter Instructor email"
							/>
						</div>

						<button
							className="btn btn-primary my-3"
							style={{ backgroundColor: "var(--theme-blue)", fontSize: "14px" }}
							type="button"
							onClick={addInstructor}
							disabled={!newInstructor}
						>
							Add Instructor
						</button>

						<div className={clsx.form_group}>
							<label className="form-label generic_label">Syllabus</label>
							{formstate.syllabus?.length !== 0 ? (
								formstate.syllabus?.map(({ title, description }, i) => (
									<div className={clsx.syllabus_container}>
										<h5>{title}</h5>
										<p>{description}</p>

										<p>
											<i
												className="text-danger"
												style={{ cursor: "pointer" }}
												onClick={() => deleteSyllabus(title + i)}
											>
												<BiTrash />
											</i>
										</p>
									</div>
								))
							) : (
								<small className="ms-3">No syllabus found</small>
							)}
						</div>
						<button
							className="btn btn-primary my-3"
							style={{ backgroundColor: "var(--theme-blue)", fontSize: "14px" }}
							type="button"
							onClick={openModal}
						>
							Add Syllabus
						</button>

						<Input
							label="Career Title"
							name="careerTitle"
							type="text"
							handleChange={changeHandler}
							value={formstate.careerTitle}
							required={true}

						/>
						<button
							type="button"
							style={{ backgroundColor: "var(--theme-blue)", fontSize: "14px" }}
							className={`btn btn-primary mb-3 ${clsx.addcareer_button}`}
							onClick={(e) => setShowCareerModal((_) => true)}
						>
							Add Career Prospect
						</button>
						<div className={clsx.form_group}>
							<label className="generic_label">Career Prospect</label>
							{formstate.careerList?.length !== 0 ? (
								formstate.careerList?.map(({ name }, i) => (
									// <Syllabus key={i} title={name} />
									<div className={clsx.syllabus_container}>
										<h5>{name}</h5>
										<p>
											<i
												className="text-danger"
												style={{ cursor: "pointer" }}
												onClick={() => deleteCareer(name + i)}
											>
												<BiTrash />
											</i>
										</p>
									</div>
								))
							) : (
								<p
									className="m-0 text-danger"
									style={{ fontSize: "0.8rem", textIndent: 20 }}
								>
									No career prospect found
								</p>
							)}
						</div>
						<Input
							label="Popup Title"
							name="popupTitle"
							type="text"
							handleChange={changeHandler}
							value={formstate.popupTitle}
							required={true}

						/>
						<div className={clsx.form_group}>
							<label className="form-label generic_label">Popup List</label>
							{formstate.popupArr?.length !== 0 ? (
								formstate.popupArr?.map((name, i) => (
									// <Syllabus key={i} title={name} />
									<div className={clsx.syllabus_container}>
										<h5>{name}</h5>
										<p>
											<i
												className="text-danger"
												style={{ cursor: "pointer" }}
												onClick={() => deletePopup(name + i)}
											>
												<BiTrash />
											</i>
										</p>
									</div>
								))
							) : (
								<p
									className="m-0 text-danger"
									style={{ fontSize: "0.8rem", textIndent: 20 }}
								>
									No Popup list found
								</p>
							)}
						</div>

						<button
							type="button"
							style={{ backgroundColor: "var(--theme-blue)", fontSize: "14px" }}
							className={`btn btn-primary mb-3 ${clsx.addcareer_button}`}
							onClick={(e) => setShowPopupModal((_) => true)}
						>
							Add Pop Up
						</button>

						<div className={clsx.form_group} style={{ marginTop: 40 }}>
							<label className="form-label generic_label required">Set class public?</label>
							{formstate?.isPublic ? (
								<small class="d-block text-muted">
									Class is currently set to public. This indicates that students
									can access the class without paying
								</small>
							) : (
								<small class="d-block text-muted">
									Class is currently set to private. This indicates that
									students have to pay to access the class
								</small>
							)}
							<Switch
								onClick={handleClassStatus}
								size="large"
								checked={formstate?.isPublic}
								value={formstate?.isPublic}
							/>
						</div>
						<Input
							label="Average Salary"
							name="averageSalary"
							type="number"
							handleChange={changeHandler}
							value={formstate.averageSalary}
							noValidate={"true"}
						/>

						<CareerModal
							open={showCareerModal}
							newCareer={careerlist}
							setOpen={setShowCareerModal}
							handleChange={careerChangeHandler}
							updateCareer={updateCareerHandler}
						/>
						<PopUpModal
							open={showPopupModal}
							newCareer={popupList}
							setOpen={setShowPopupModal}
							handleChange={popupChangeHandler}
							updateCareer={updatePopupHandler}
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
								{location.search ? "Update" : "Save"}
							</button>
						)}

						<AddSyllabus
							open={openSyllabus}
							addSyllabus={addtoSyllabus}
							formstate={formstate}
							setFormstate={setFormstate}
							setOpen={setOpen}
							handleClose={handleClose}
						/>
					</form>
				</div>
			</div>
		</Admin>
	);
}

// BOOTCAMPROW COMPONENT
export function BootcampRow({
	index,
	title,
	detail,
	time,
	date,
	type,
	duration,
	admin,
	clickHandler = null,
	packages,
	price,
	category,
	subCategory,
}) {
	return (
		<tr className={clsx.user__info_card} onClick={clickHandler}>
			<td className={clsx.user__info}>{index + 1}.</td>
			<td className={clsx.user__info}>{title}</td>
			<td className={clsx.user__info}>
				<p
					className="restricted_line"
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(detail),
					}}
				/>
			</td>
			<td className={clsx.user__info}>{type}</td>
			<td className={clsx.user__info}>{category}</td>
			<td className={clsx.user__info}>
				{subCategory && changeSubCategory(subCategory)}
			</td>
			<td className={clsx.user__info}>{duration}</td>
			<td className={clsx.user__info}>{date}</td>
			<td className={clsx.user__info}>{time}</td>
			<td className={clsx.user__info}>
				{packages?.length > 0 ? packages[0].price : price}
			</td>
			{admin && (
				<td className={clsx.user__info}>
					<div className="d-flex align-items-center" style={{ gap: "1rem" }}>
						<i style={{ fontSize: "24px", color: "var(--theme-orange)" }}>
							<AiOutlineDelete />
						</i>
						<i style={{ fontSize: "24px", color: "var(--theme-blue)" }}>
							<AiTwotoneEdit />
						</i>
					</div>
				</td>
			)}
		</tr>
	);
}

// FEES COMPONENT
export function Fees() {
	const {
		adminFunctions: { fetchPayment, deletePaymentHistory },
		generalState,
		setGeneralState,
	} = useAuth();
	const { getItem } = useLocalStorage();
	let userdata = getItem(KEY);
	const flag = useRef(false);
	const [formstate, setFormstate] = useState([]);
	const [rest, setRest] = useState({});
	const [open, setOpen] = useState(false)
	const [editData, setEditData] = useState({})
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("");

	const tableHeaders = [
		"No",
		"Name",
		"User ID",
		"Title",
		"Date",
		"Course Price",
		"Amount",
		"Status",
		"Due Date",
		"",
		"Action",
	];
	const tableContents = [];

	const queryClient = useQueryClient();

	const [page, setPage] = useState(1);

	const fetchPaymentHistory = useQuery(
		["fetch payment history", userdata?.token, page],
		() => fetchPayment(userdata?.token, page),
		{
			enabled: userdata.token !== null,
			onSuccess: (res) => {
				if (res?.data?.paymentItems) {
					setFormstate(res?.data?.paymentItems);
					setRest(res?.data);
				} else {
					setFormstate([]);
				}
			},
			onError: (error) => toast.error(error.message),
		}
	);

	const deletePaymentMutation = useMutation(
		([token, id]) => deletePaymentHistory(token, id),
		{
			onSuccess: (res) => {
				queryClient.inValidateQueries(["fetch payment history"]);
			},
			onError: (err) => console.error(err),
		}
	);

	function deletePayment(e, id) {
		e.preventDefault();
		if (window.confirm("Are you sure you want to delete this payment")) {
			deletePaymentMutation.mutate([userdata.token, id]);
		}
	}

	function handlePaymentInfoEdit(e, bootcampId, userId, dueDate, amount) {
		setEditData({ nextDueDate: dueDate, bootcampId: bootcampId, userId: userId, amountPaid: amount })
		setOpen(true)
	}


	return (
		<Admin header={"Fees"}>
			{(fetchPaymentHistory?.isLoading || deletePaymentMutation?.isLoading) && (
				<Loader />
			)}
			<div className={clsx["admin_profile"]}>
				<div className={clsx.admin__student}>
					<h1>All Payments</h1>
					<div>
						<input
							type="text"
							className="form-control"
							placeholder="search course"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					<div className={clsx.admin__student_main}>
						{!fetchPaymentHistory?.isLoading && (
							<>
								<table className={`${clsx.admin__student_table}`}>
									<thead>
										{tableHeaders.map((el, i) => (
											<td key={i}>{el}</td>
										))}
									</thead>
									<tbody>
										{formstate?.filter(item => item.bootcampName?.includes(search)).map(
											(
												{
													studentName,
													courseName,
													courseId,
													amount,
													createdAt,
													dueDate,
													status,
													type,
													bootcampPrice,
													bootcampName,
													paymentId,
													userId,
												},
												i
											) => (
												<>
													<UserInfoCard
														key={i}
														num={i}
														enrolled={studentName}
														comp="Category"
														name={bootcampName}
														status={userId}
														coursePrice={
															createdAt
																? new Intl.DateTimeFormat("en-US").format(
																	new Date(createdAt)
																)
																: ""
														}
														date={courseName}
														pack={bootcampPrice ? `$ ${bootcampPrice}` : "-"}
														start_date={`$ ${amount}`}
														email={status}
														students={
															dueDate
																? new Intl.DateTimeFormat("en-US").format(
																	new Date(dueDate)
																)
																: ""
														}
														deleteUser={(e) => deletePayment(e, paymentId)}
														editPayment={true}
														editPaymentInfo={(e) =>
															handlePaymentInfoEdit(e, courseId, userId, dueDate, amount)
														}
													/>
												</>
											)
										)}
									</tbody>
								</table>
								<div className="mt-3">
									<button
										className="btn btn-dark"
										onClick={() => setPage((prev) => page - 1)}
										disabled={page === 1}
									>
										Prev
									</button>
									<span className="mx-2">
										page {page} of {rest?.num_of_pages}
									</span>
									<button
										className="btn btn-dark"
										onClick={() => setPage((prev) => page + 1)}
										disabled={page === rest?.num_of_pages}
									>
										Next
									</button>
								</div>
							</>
						)}
					</div>
				</div>
				<EditPayment open={open} setOpen={setOpen} data={editData} />

			</div>
		</Admin>
	);
}

// EDIT PAYMENT POPUP

function EditPayment({ open, setOpen, data }) {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		minWidth: 600,
		background: "#fff",
		border: "1px solid #eee",
		borderRadius: "10px",
		boxShadow: 24,
		p: 6,
		padding: "4rem 2rem",
	};

	const [formstate, setFormstate] = useState();
	const { adminFunctions: { updateStudentPayment } } = useAuth()
	const { getItem } = useLocalStorage()
	const userdata = getItem(KEY)

	function changeHandler(e) {
		setFormstate({ ...formstate, [e.target.name]: e.target.value })
	}


	useEffect(() => {
		if (data?.bootcampId) {
			let date = data.nextDueDate?.split("T")[0]
			if (date) {
				setFormstate({ ...data, nextDueDate: date })
			} else {
				setFormstate(data)
			}
		}
	}, [data?.bootcampId])



	const mutation = useMutation(([token, data]) => updateStudentPayment(token, data), {
		onSuccess: res => {
			if (res.success) {
				toast.success(res.message)
			} else {
				toast.error(res.message)
			}
		},
		onError: err => {
			toast.success(err.message)
		}
	})



	function submit(e) {
		e.preventDefault()

		mutation.mutate([userdata.token, formstate])
	}
	return (
		<Modal
			open={open}
			onClose={(e) => {
				setOpen((_) => false);
			}}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box style={style}>
				<form className="form" onSubmit={submit}>
					<Input
						label="Amount Paid"
						name="amountPaid"
						type="number"
						handleChange={changeHandler}
						value={formstate?.amountPaid}
					/>
					<Input
						label="Next Due Date"
						name="nextDueDate"
						type="date"
						handleChange={changeHandler}
						value={formstate?.nextDueDate}
					/>
					<button
						className="button d-flex button-lg log_btn w-50 mt-3 justify-content-center"
						// style={{
						//   backgroundColor: data?.isVerified && "var(--theme-blue)",
						// }}
						type="submit"
					// onClick={(e) => handleVerification(e, data?.userId)}
					>
						{
							mutation.isLoading ?
								<span className="spinner-border text-white"><span className="visually-hidden">Loading...</span></span>
								:
								<span>Change</span>
						}

					</button>
				</form>
			</Box>
		</Modal>
	);
}

// NOTIFICATIONS COMPONENT
export function Notification() {
	const { getItem } = useLocalStorage();
	const flag = useRef(false);
	let userdata = getItem(KEY);
	const [loader, setLoader] = useState(false);
	const [load, setLoad] = useState(false);
	const {
		generalState,
		setGeneralState,
		adminFunctions: { fetchNotifications, readNotifications },
	} = useAuth();
	const [reload, setReload] = useState(false);
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		if (flag.current) return;
		(async () => {
			try {
				setLoader(true);
				const res = await fetchNotifications(userdata?.token);
				const { message, success, statusCode } = res;
				if (!success) throw new AdvancedError(message, statusCode);
				const { data } = res;
				if (data.length > 0) {
					setNotifications(data);
					const unread = data.filter(
						(notification) => notification.isRead !== true
					);
					setGeneralState({ ...generalState, notifications: unread.length });
				}
			} catch (err) {
				toast.error(err.message);
			} finally {
				setLoader((_) => false);
			}
		})();
		flag.current = true;
	}, [reload]);

	async function markAsRead(e) {
		e.preventDefault();
		try {
			setLoad(true);
			const res = await readNotifications(userdata?.token);
			const { message, success, statusCode } = res;
			if (!success) throw new AdvancedError(message, statusCode);
			const { data } = res;
			setReload(true);
			flag.current = false;
			toast.success(message, {
				position: "top-right",
				autoClose: 4000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
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
			setLoad((_) => false);
		}
	}

	return (
		<Admin header={""}>
			<NotificationContent
				notifications={notifications}
				markAsRead={markAsRead}
				load={load}
				loader={loader}
			/>
		</Admin>
	);
}
// NOTIFICATIONS COMPONENT
export function NotificationContent({
	notifications,
	markAsRead,
	load,
	loader,
}) {
	return (
		<div className={clsx["admin_profile"]}>
			<div className={clsx.admin__student}>
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h1 className="mb-0">My notifications</h1>
					{notifications.length > 0 && (
						<motion.button
							whileHover={{
								boxShadow: "0px 0px 8px rgb(0, 0, 0)",
								textShadow: "0px 0px 8px rgb(255, 255, 255)",
							}}
							className="btn-plain mark_as_read p-1"
							style={{ fontSize: "14px" }}
							onClick={markAsRead}
						>
							{load ? (
								<div className="spinner-border text-dark">
									<div className="visually-hidden">Loading</div>
								</div>
							) : (
								"Mark all as read"
							)}
						</motion.button>
					)}
				</div>
				<div className={clsx.admin__student_main}>
					{loader ? (
						<div>
							<Skeleton variant="rectangular" width={"100%"} height={58} />
							<br />
							<Skeleton variant="rectangular" width={"100%"} height={58} />
							<br />

							<Skeleton variant="rectangular" width={"100%"} height={58} />
						</div>
					) : notifications.length > 0 ? (
						notifications.map((notification, index) => (
							<div key={index} className={clsx["notification"]}>
								<span>{getDate(notification.createdAt)}</span>
								<span>{notification.message}</span>
								{/* <button className={clsx.admin__notification_button} onClick={()=>handleRead(notification._id)} >Mark as read</button> */}
							</div>
						))
					) : (
						<p className="text-center">No notifications found</p>
					)}
				</div>
			</div>
		</div>
	);
}

// EARNINGS
export function Earnings() {
	const { getItem } = useLocalStorage();
	const flag = useRef(false);
	let userdata = getItem(KEY);
	const [loading, setLoading] = useState(false);
	const [rows, setRows] = useState([]);
	const [earnings, setEarnings] = useState([]);
	const {
		generalState,
		setGeneralState,
		adminFunctions: { fetchEarnings, fetchWithdrawals },
	} = useAuth();

	// const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		if (flag.current) return;

		(async () => {
			try {
				setLoading((_) => true);
				let res = await Promise.all([
					fetchEarnings(userdata?.token),
					fetchWithdrawals(userdata?.token),
				]);
				const [earnings, withdrawals] = res;
				const { success, message, statusCode } = earnings;
				if (!success) throw new AdvancedError(message, statusCode);
				else {
					let { data } = earnings;
					setEarnings(data);
				}
				const {
					success: WSuccess,
					message: WMessage,
					statusCode: WStatusCode,
				} = withdrawals;
				if (!WSuccess) throw new AdvancedError(WMessage, WStatusCode);
				else {
					let { data: WData } = withdrawals;
					setRows(WData);
				}
			} catch (err) {
				toast.error(err.message);
			} finally {
				setLoading((_) => false);
			}
		})();

		flag.current = true;
	}, []);

	return (
		<Admin header={"Earnings"}>
			{loading && <Loader />}
			<div className={clsx["admin_profile"]}>
				<div className={clsx.admin__student}>
					<div className={clsx.admin__student_main}>
						<AllEarnings earnings={earnings} />
					</div>
					<div className="py-3">
						<div className="d-flex justify-content-between flex-wrap">
							<h5>List of Requests</h5>
							<button className="button p-1">Download CSV</button>
						</div>
						<div className={clsx.admin__student_main}>
							<EarningsTable rows={rows} />
						</div>
					</div>
				</div>
			</div>
		</Admin>
	);
}

// STUDENT COMPONENT
export function Student() {
	const [studentList, setStudentList] = useState([]);
	const { getItem } = useLocalStorage();
	const flag = useRef(false);
	let userdata = getItem(KEY);
	const [loader, setLoader] = useState(true);
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const {
		adminStudentFunctions: { fetch, verify, verify_pledre },
		generalState: { loading },
		setGeneralState,
		commonFunctions: { deleteUser },
	} = useAuth();

	async function fetchStudents() {
		if (userdata) {
			try {
				const res = await fetch(userdata?.token);
				const { message, success, statusCode } = res;
				if (!success) throw new AdvancedError(message, statusCode);
				else {
					const { data } = res;
					//do somethings

					setStudentList(data);
				}
			} catch (err) {
				toast.error(err.message);
			} finally {
				setLoader((_) => false);
			}
		}
	}
	useEffect(() => {
		if (flag.current) return;
		fetchStudents();
		flag.current = true;
	}, []);

	function approveHandler(e, email, details) {
		localStorage.setItem("gotocourse-studentDetails", JSON.stringify(details));
		if (email) navigate(`approve?email=${email}`);
	}

	const tableHeaders = [
		"No",
		"Name",
		"Email",
		"Account Verified",
		// "Access Dashboard",
		// "Action",
	];

	return (
		<Admin header={"Student"}>
			{loader && <Loader />}
			<div className={clsx["admin_profile"]}>
				<div className={clsx.admin__student}>
					<div className="d-flex justify-content-between">
						<h1>All Students</h1>
						<div>
							<input
								type="text"
								className="form-control"
								placeholder="search student"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
					</div>

					<div className={`${clsx.admin__student_main}`}>
						<table className={clsx.admin__student_table}>
							<thead>
								<tr>
									{tableHeaders.map((el, i) => (
										<th key={i}>{el}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{studentList?.length > 0 &&
									studentList
										?.filter(
											(stu) =>
												stu.firstName
													.toLowerCase()
													.includes(search.toLowerCase()) ||
												stu.lastName
													.toLowerCase()
													.includes(search.toLowerCase()) ||
												stu.email.toLowerCase().includes(search.toLowerCase())
										)
										.map((student, i) => (
											<UserInfoCard
												key={i}
												name={student.name}
												firstName={student.firstName}
												lastName={student.lastName}
												img={student.profileImg}
												email={student.email}
												num={i}
												isActive={student.isVerified}
												accessPledre={student.accessPledre}
												user={true}
												type={null}
												// deleteUser={(e) => console.Console.log(e)}
												handleVerification={(e) => console.log(e)}
												handlePledreAccess={(e) => console.log(e)}
												isAbsolute={true}
												approveHandler={approveHandler}
												details={student}
											/>
										))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			{loading && <Loader />}
		</Admin>
	);
}
// ENROLLED STUDENT COMPONENT
export function EnrolledStudents() {
	const [studentList, setStudentList] = useState([]);
	const { getItem } = useLocalStorage();
	const flag = useRef(false);
	let userdata = getItem(KEY);
	const [loader, setLoader] = useState(true);
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const {
		adminStudentFunctions: { fetch, verify, verify_pledre },
		generalState: { loading },
		setGeneralState,
		commonFunctions: { deleteUser },
	} = useAuth();

	async function fetchStudents() {
		if (userdata) {
			try {
				const res = await fetch(userdata?.token);
				const { message, success, statusCode } = res;
				if (!success) throw new AdvancedError(message, statusCode);
				else {
					const { data } = res;
					//do somethings

					setStudentList(data);
				}
			} catch (err) {
				toast.error(err.message);
			} finally {
				setLoader((_) => false);
			}
		}
	}
	useEffect(() => {
		if (flag.current) return;
		fetchStudents();
		flag.current = true;
	}, []);

	function approveHandler(e, email, details) {
		localStorage.setItem("gotocourse-studentDetails", JSON.stringify(details));
		if (email) navigate(`approve?email=${email}`);
	}

	const tableHeaders = [
		"No",
		"Name",
		"Email",
		"Account Verified",
		// "Access Dashboard",
		// "Action",
	];

	const enrolledStudents = useMemo(() => {
		let hasPaid;
		if (studentList) {
			let areAccepted = studentList?.filter(
				(item) => item.enrollmentData.length > 0
			);
			hasPaid = areAccepted.filter((item) =>
				item.enrollmentData.find((item) => item.status === "paid")
			);
			return hasPaid;
		}
		return [];
	}, [studentList]);

	return (
		<Admin header={"Students"}>
			{loader && <Loader />}
			<div className={clsx["admin_profile"]}>
				<div className={clsx.admin__student}>
					<div className="d-flex justify-content-between">
						<h1>Enrolled Students</h1>
						<div>
							<input
								type="text"
								className="form-control"
								placeholder="search student"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
					</div>

					<div className={`${clsx.admin__student_main}`}>
						<table className={clsx.admin__student_table}>
							<thead>
								<tr>
									{tableHeaders.map((el, i) => (
										<th key={i}>{el}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{enrolledStudents?.length > 0 &&
									enrolledStudents
										?.filter(
											(stu) =>
												stu.firstName
													.toLowerCase()
													.includes(search.toLowerCase()) ||
												stu.lastName
													.toLowerCase()
													.includes(search.toLowerCase()) ||
												stu.email.toLowerCase().includes(search.toLowerCase())
										)
										.map((student, i) => (
											<UserInfoCard
												key={i}
												name={student.name}
												firstName={student.firstName}
												lastName={student.lastName}
												img={student.profileImg}
												email={student.email}
												num={i}
												isActive={student.isVerified}
												accessPledre={student.accessPledre}
												user={true}
												type={null}
												handleVerification={(e) => console.log(e)}
												handlePledreAccess={(e) => console.log(e)}
												isAbsolute={true}
												approveHandler={approveHandler}
												details={student}
											/>
										))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			{loading && <Loader />}
		</Admin>
	);
}

// PROFILEEDIT COMPONENT
export function Edit() {
	const {
		adminFunctions: { updateAvatar, updateProfile },
	} = useAuth();
	const { updateItem, getItem } = useLocalStorage();
	let userdata = getItem(KEY);
	const [imageUrl, setImageUrl] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
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
	const navigate = useNavigate();

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
				const newItem = {
					...userdata,
					...data,
				};
				userdata = updateItem(KEY, newItem);
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
				const newValue = {
					...userdata,
					...data,
				};
				userdata = updateItem(KEY, newValue);
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
		<Admin header="ADMIN">
			<div className={clsx["admin_profile"]}>
				<div className={clsx.admin__student}>
					<h3>Update Profile</h3>
					<div className="row w-100 mt-4 mb-2 mx-0">
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
								isUploading ? (
									<div className="spinner-border text-primary" role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
								) : (
									<p
										style={{
											cursor: isUploading && "not-allowed",
											color: "var(--theme-orange",
											fontWeight: "700",
										}}
										onClick={changeProfilePictureHandler}
									>
										Click to Upload Photo
									</p>
								)
							) : (
								<p onClick={uploadPicture} style={{ cursor: "pointer" }}>
									Select a photo to upload
								</p>
							)}
						</div>
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
					<form
						className="form"
						onSubmit={submitHandler}
						style={{ width: "min(100% - 0.5rem, 400px)" }}
					>
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

// CHAT COMPONENT
export function Chat() {
	const [loader, setLoader] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoader((_) => false);
		}, 2000);
	}, []);

	const [tabs, setTabs] = useState([
		{
			active: true,
			name: "New Messages",
		},
		{
			active: false,
			name: "Teacher",
		},
		{
			active: false,
			name: "Community",
		},
	]);

	const chatType = [
		{
			id: 1,
			type: "New Messages",
		},
		{
			id: 2,
			type: "Teachers/Mentors",
		},
		{
			id: 4,
			type: "Others",
		},
	];

	return (
		<Admin header={"Chat"}>
			{loader && <Loader />}
			<ChatComponent tabs={tabs} chatType={chatType} usertype="admin" />
		</Admin>
	);
}

export const Admin = ({ children, header }) => {
	const {
		generalState: { isMobile, showSidebar, loading },
		generalState,
		setGeneralState,
		adminFunctions: { fetchNotifications, getMessages, getUnreadMessages },
	} = useAuth();
	const { getItem } = useLocalStorage();
	const [loader, setLoading] = useState(false);

	const flag = useRef(false);
	let userdata = getItem(KEY);
	const toggleSidebar = () => {
		setGeneralState({ ...generalState, showSidebar: !showSidebar });
	};

	useEffect(() => {
		if (flag.current) return;
		(async () => {
			try {
				const res = await fetchNotifications(userdata?.token);
				const { message, success, statusCode } = res;
				if (!success) throw new AdvancedError(message, statusCode);
				const { data } = res;
				if (data.length > 0) {
					const unread = data.filter(
						(notification) => notification.isRead !== true
					);
					setGeneralState({ ...generalState, notifications: unread.length });
				}
			} catch (err) {
				toast.error(err.message);
			}
		})();
		flag.current = true;
	}, []);

	// fetch messages
	const getMessage = useQuery(
		["fetch admin messages"],
		() => getUnreadMessages(userdata?.token),
		{
			onError: (err) => {
				toast.error(err.message);
			},
			onSuccess: (res) => {
				if (res.data?.statusCode === 2) {
				return
			}
				if (res.data?.statusCode !== 1) {
					toast.error(res.data?.message);
				}
				const unread = res.data.data?.filter(
					(messages) => messages.status === "unread"
				);
				if (unread.length > 0) {
					// toast.info(`You have ${unread.length} messages`);
					setGeneralState({ ...generalState, chat: unread.length });
				}
			},
		}
	);
	const admin = {
		title: "ADMIN",
		logo: <FaUserLock size="2.5rem" color="#0C2191" />,
	};

	// for Create
	const isCreator = userdata?.userType === "schools";

	return (
		<GuardedRoute>
			<div className={clsx["admin"]}>
				<ToastContainer
					position="top-right"
					autoClose={4500}
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
					{!isCreator && (
						<Navbar
							content={admin}
							toggleSidebar={toggleSidebar}
							header={header}
						/>
					)}
					{children}
				</div>
				{loading && <Loader />}
			</div>
		</GuardedRoute>
	);
};
