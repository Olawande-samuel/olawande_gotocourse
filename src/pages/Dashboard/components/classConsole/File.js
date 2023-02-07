import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "../classConsole/Content.css";
import { IoMdCloudDownload } from "react-icons/io";
import { PopModalContent } from ".";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import UploadForm from "./components/upload";
import { useAuth } from "../../../../contexts/Auth";
import { useLocalStorage } from "../../../../hooks";
import { KEY } from "../../../../constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IconButton, Modal, stepContentClasses, Tooltip } from "@mui/material";
import { UploadScreenRecording, UploadVideoRecording } from "./Suite";
import VideoImageThumbnail from "react-video-thumbnail-image";
import processed from "../../../../images/processed.png";
import { AiOutlineClose } from "react-icons/ai";
import { MenuOptionsPopup } from "./components";
import { FiEdit } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import axios from "axios";
import UploadWidget from "./components/UploadWidget";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

export default function File() {
	const { pathname, search } = useLocation();

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(0);
	const [openUpload, setOpenUpload] = useState(false);
	const [screenOpen, setScreenOpen] = useState(false);
	const [videoOpen, setVideoOpen] = useState(false);
	const [fileData, setFileData] = useState([]);
	const [fileUrl, setFileUrl] = useState("")
	const [uploadData, setUploadData] = useState({})
	const queryClient = useQueryClient()


	const {
		consoleFunctions: { fetchFile, addFile },
	} = useAuth();
	const { getItem } = useLocalStorage();

	const bread = pathname?.split("/");
	let path = pathname.split("/");
	let classId = path[path.length - 1];
	let searchData = search.split("=").reverse()[0];
	const [searchParams, setSearchParams] = useSearchParams();
	const contentId = searchParams.get("content");

	const userdata = getItem(KEY);

	const OpenToggle = () => setOpen(!open);
	const closeSmall = () => setOpen(false);
	function a11yProps(index) {
		return {
			id: `simple-tab-${index}`,
			"aria-controls": `simple-tabpanel-${index}`,
		};
	}

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	function goBack() {
		let pathArray = pathname.split("/")[1];

		switch (pathArray) {
			case "teacher":
				return "/teacher";
			case "student":
				return "/student";
			default:
				return "/admin";
		}
	}

	const getFiles = useQuery(
		["file content", contentId, userdata?.token],
		() => fetchFile(userdata.token, searchData),
		{
			onSuccess: (res) => {
				if (res.data?.length > 0) {
					setFileData(res.data);
				} else {
					setFileData([]);
				}
			},
		}
	);

	
	const mutation = useMutation(([token, data]) => addFile(token, data), {
        onSuccess: (res) => {
            queryClient.invalidateQueries("file content")
        },
        onError: (err) => console.error(err)
    })

    // create content after upload

    function createFileContent(file, fileId, fileName) {
            // call file upload function
            mutation.mutate([userdata?.token, {
                classId,
                contentId,
                fileName: uploadData.name,
                title: uploadData?.originalName
            }])
        
    }

	useEffect(()=>{
		if(uploadData.name){
			createFileContent()
		}
	},[uploadData?.name])
	
	return (
		<>
			<div className="">
				<Box sx={{ width: "100%" }}>
					<Box sx={{ marginBottom: "2rem" }}>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label="basic tabs example"
						>
							<Tab label="File" {...a11yProps(0)} />
							<Tab label="Integration" {...a11yProps(1)} />
						</Tabs>
					</Box>

					{/* <div className="contentbreadcrumb">
                            <nav arial-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to={goBack(pathname)} style={{ color: "var(--theme-blue", textTransform: "uppercase" }}>
                                            Dashboard
                                        </Link>
                                    </li>
                                    {bread
                                        .filter((item) => item !== "")
                                        .map((item, idx) => (
                                            <li className="breadcrumb-item text-uppercase" key={idx}>
                                                <Link
                                                    style={{ color: "var(--theme-blue" }}
                                                    to={`${bread.slice(0, idx + 2).join("/")}`}
                                                >
                                                    {item.split("-").join(" ")}
                                                </Link>
                                            </li>
                                        ))}
                                </ol>
                            </nav>
                        </div> */}

					<TabPanel value={value} index={0}>
						<section className="contenttop">
							<div className="contentbutton">
								<button className="">Refresh</button>
								<UploadWidget fileUrl={fileUrl} setFileUrl={setFileUrl} type="console" setUploadData={setUploadData} />
								{/* <button className="" onClick={OpenToggle}>
									Add New +
								</button> */}
							</div>
						</section>

						<main className="contentbody">
							{getFiles?.isLoading ? (
								<div className="spinner-border text-primary">
									<div className="visually-hidden">Loading...</div>
								</div>
							) : (
								<div className="filecardcontainer">
									{fileData?.map((item) => (
										<FileCard {...item} key={item._id} />
									))}
								</div>
							)}
						</main>

						{/* <div className="contentbutton">
                            <button className=''>Open</button>
                            <div>
                            <IoMdCloudDownload />
                            </div>
                        </div> */}
						<UploadVideoRecording
							isVideoOpen={videoOpen}
							setIsVideoOpen={setVideoOpen}
							uploadType="content"
							fileCreate={true}
						/>
						<UploadScreenRecording
							isScreenOpen={screenOpen}
							setIsScreenOpen={setScreenOpen}
							uploadType="content"
							fileCreate={true}
						/>

						{/* <UploadWidget fileUrl={fileUrl} setFileUrl={setFileUrl} type="console" setUploadData={setUploadData} /> */}
 
						<UploadForm
							isOpen={openUpload}
							setIsOpen={setOpenUpload}
							uploadType="content"
						/>
					</TabPanel>

					<TabPanel value={value} index={1}>
						Integration
					</TabPanel>
				</Box>
			</div>
			<PopModalContent
				open={open}
				closeSmall={closeSmall}
				openUpload={setOpenUpload}
				setVideoOpen={setVideoOpen}
				setScreenOpen={setScreenOpen}
			/>
		</>
	);
}

function FileCard({ title, fileName, contentId, type, _id }) {
	const [open, setOpen] = useState(false);
	const [content, setContent] = useState("");
	const [anchorEl, setAnchorEl] = useState(null);
	const openAnchor = Boolean(anchorEl);
	const { teacherConsoleFunctions: { deleteDomain, deleteContent } } = useAuth();

	const { getItem } = useLocalStorage();
	const userdata = getItem(KEY)

	const queryClient = useQueryClient()

	const contextMenu = [
		{
			id: 1,
			title: "Edit File Name",
			iconImg: FiEdit,
			// event: handleEdit
		},
		{
			id: 2,
			title: "Move Content",
			iconImg: IoIosArrowUp,
			// event: handleEdit
		},
		{
			id: 3,
			title: "Move Content",
			iconImg: IoIosArrowDown,
			// event: handleEdit
		},
		{
			id: 4,
			title: "Delete",
			iconImg: BiTrash,
			event: handleDelete
		},

	]


	const contentdelete = useMutation(([token, id]) => deleteContent(token, id), {
		onSuccess: (res) => {
			queryClient.invalidateQueries("file content")
		},
		onError: (err) => {
			console.error(err)
		}
	})


	function handleDelete() {
		if (window.confirm("Are you sure you want to delete")) {
			// delete
			contentdelete.mutate([userdata.token, _id])

		}
	}



	function MoveUp() {

	}



	function MoveDown() {

	}



	function openContent() {
		setOpen(true);
		setContent(fileName);
	}



	function downloadContent(file, fileName, type) {

		axios({
			url: file,
			method: 'GET',
			responseType: 'blob',
		}).then((response) => {
			const href = URL.createObjectURL(response.data);
			const link = document.createElement('a');
			link.href = href;
			link.setAttribute('download', fileName);
			document.body.appendChild(link);
			link.click();

			document.body.removeChild(link);
			URL.revokeObjectURL(href);
		});

	}

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const TYPES = {
		noPreview: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || "text/csv",

	}

	return (
		<div className={`filecard ${type === TYPES?.noPreview && "small__filecard"}`}>
			{(type.includes("video") || (type.includes("image") && !type.includes("pdf"))) && (
				<div className="filetop">
					{type === "video/mp4" || type.includes("video") ? (
						<video
							src={fileName}
							controls
							muted
							style={{
								width: "100%",
								height: "100%",
								border: "1px solid #eee",
								borderRadius: "8px",
							}}
						/>
					) : (
						<img src={fileName} alt="" />
					)}
				</div>
			)}

			{(type === "application/pdf" || type.includes("pdf") ||
				type ===
				"application/vnd.openxmlformats-officedocument.presentationml.presentation") && (
					<div className="filetop">
						<object
							type={type}
							data={fileName}
							width="100%"
							height="200"
							aria-label={fileName}

						></object>
					</div>
				)}

			{type === TYPES?.noPreview && (
				<div className="filetop d-none">
					<object
						type={type}
						data={fileName}
						width="100%"
						height="200"
						aria-label={fileName}
					></object>
				</div>
			)}

			<div className="filebottom">
				<div className="position-absolute end-0" style={{ cursor: "pointer" }}>
					<MenuOptionsPopup handleClick={handleClick} anchorEl={anchorEl} setAnchorEl={setAnchorEl} openAnchor={openAnchor} data={contextMenu} id={_id} content={true} type={type} />
				</div>
				<h3>{title}</h3>
				<div className="filebutton">
					<i>
						{/* <a href={fileName} download="gotocourse data" target="_blank" rel="noreferrer"> */}
						<Tooltip
							title="download"
							onClick={() => downloadContent(fileName, title, type)}
						>
							<IconButton>
								<IoMdCloudDownload size="1.5rem" color="var(--theme-blue)" />
							</IconButton>
						</Tooltip>
						{/* </a> */}
					</i>
					<button onClick={openContent}>Open</button>
				</div>
			</div>

			<ViewModal
				open={open}
				setOpen={setOpen}
				file={content}
				type={type}
				title={title}
			/>
		</div>
	);
}

export function ViewModal({ open, setOpen, file, creator, type, title }) {
	const style = {
		position: "absolute",
		bottom: 0,
		left: "50%",
		transform: "translateX(-50%)",
		width: "100%",
		height: "100%",
		background: "#fff",
		border: "1px solid #eee",
		borderRadius: "10px",
		boxShadow: 24,
		p: 6,
		// padding: "4rem 2rem",
		overflowY: "auto",
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
				<div>
					<AiOutlineClose
						onClick={(e) => {
							setOpen((_) => false);
						}}
						size="1.5rem"
						style={{ marginLeft: "auto", display: "block", cursor: "pointer" }}
					/>
				</div>
				<p>{title}</p>
				{type === "video/mp4" || type?.includes("video") ? (
					<video
						src={`${file}`}
						controls
						autoPlay
						type={type?.includes("matroska") && type}
						style={{
							width: "100%",
							height: "100%",
							border: "1px solid #eee",
							borderRadius: "8px",
						}}
					></video>
				) : type === "application/pdf" || type.includes("pdf") ? (
					<Pdf document={file} />
				) : (
					<img
						src={creator ? `${process.env.REACT_APP_IMAGEURL}${file}` : file}
						alt=""
						className="w-100 h-100"
						style={{ objectFit: "contain" }}
					/>
				)}
			</Box>
		</Modal>
	);
}

function Pdf({ document }) {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(10);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	return (
		<div>
			<Document
				file={{
					url: document,
				}}
				onLoadSuccess={onDocumentLoadSuccess}
			>
				<Page pageNumber={pageNumber} width={800} />
			</Document>
			<p>
				Page {pageNumber} of {numPages}
			</p>
		</div>
	);
}
