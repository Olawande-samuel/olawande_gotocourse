import { useEffect, useRef, useState } from "react";
import style from "../style.module.css";
import { useLocalStorage } from "../../../../../hooks";
import { CLASSID, KEY } from "../../../../../constants";
import { useAuth } from "../../../../../contexts/Auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AdvancedError } from "../../../../../classes";
import { Modal } from "react-bootstrap";
import { FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { MdAttachFile, MdOutlineNote } from "react-icons/md";
import { VscNote } from "react-icons/vsc";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";

export function ReuseableModalContent({ show, handleClose, editData, domainId}) {
  const [showMore, setShowMore] = useState(false);
  const { getItem } = useLocalStorage();
  const classId = localStorage.getItem(CLASSID)
  const userdata = getItem(KEY)
  const { consoleFunctions: { addContent } } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams()
  const [ formstate, setFormstate ] = useState({
    isLocked: false
  })
  const queryClient = useQueryClient()
  const fetchDomains = useQuery(["fetch domains", classId], () => fetchDomains(userdata.token, classId))

  const addContentMutation = useMutation(([token, state]) => addContent(token, state), {
    onSuccess: (res) => {
      queryClient.invalidateQueries('fetch domains')
      if(res.statusCode !== 1){
        toast.error(res.message)
        return
      }
      toast.success(res.message)
      setSearchParams({content: res?.data?._id})
      // set content params
      handleClose();
    },
    onError: (err) => {
      console.error("error adding content", err)
      toast.error(err.message)
    }
  })

  function handleChange(e) {
    setFormstate({ ...formstate, [e.target.name]: e.target.value });
  }

  function createContent() {
    let formcontent = { ...formstate, domainId}
    console.log({formcontent})
    addContentMutation.mutate([userdata.token, { ...formcontent, classId }])
  }

  function handleNotifyStudent() {
    setFormstate({ ...formstate, notifyStudents: !formstate?.notifyStudents })
  }
  
  function handleIsLocked() {
    setFormstate({ ...formstate, isLocked: !formstate?.isLocked })
  }
    
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className={style.modal__header}>
          <Modal.Title className={style.modal__title}>Add Content</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={style.content__form}>
              <FormControl>
                <InputLabel id="content-type-label">Content Type</InputLabel>
                <Select
                  className="quizselect"
                  labelId="content-type-label"
                  id="content-type"
                  label="Content Type"
                  value={formstate?.type}
                  onChange={handleChange}
                  name="type"
                  disabled={editData?._id}
                >
                  <MenuItem value="Select Content Type" defaultValue>
                    Select Content
                  </MenuItem>
                  <MenuItem value="FILE_VIDEO">
                    <i>
                      <MdAttachFile />
                    </i>
                    File/Videos
                  </MenuItem>
                  <MenuItem value="QUIZ">
                    <i>
                      <VscNote />
                    </i>
                    Quiz
                  </MenuItem>
                  <MenuItem value="NOTE">
                    <i>
                      <MdOutlineNote />
                    </i>
                    Note
                  </MenuItem>
                </Select>
              </FormControl>
            <FormControl>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Content Title"
                variant="outlined"
                placeholder="Content Title"
                onChange={handleChange}
                value={formstate?.title || ""}
                name="title"
              />
            </FormControl>
            

            {/* accordion */}

            <div className={style}>
              <div className={style.content_item_span}>
                <span>Advance Options</span>

                <i>
                  {showMore ? (
                    <BiCaretUp onClick={() => setShowMore(!showMore)} />
                  ) : (
                    <BiCaretDown onClick={() => setShowMore(!showMore)} />
                  )}
                </i>
              </div>

              {showMore && (
                <div>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Content Objective"
                    variant="outlined"
                    placeholder="Content Objective"
                    name="objective"
                    value={formstate?.objective}
                  />
                  <FormHelperText>
                    What will your student do/learn with this content
                  </FormHelperText>

                  <div className={style.switchBorder}>
                    <FormControlLabel
                      control={<Switch />}
                      label="Lock course content"
                      labelPlacement="top"
                      value="lock course"
                      checked={formstate?.isLocked}
                      onClick={handleIsLocked}
                    />
                    <p className={style.formtext}>
                      Content is currently {formstate?.isLocked ? "locked" : "unlocked"}
                    </p>
                  </div>

                  <div className={style.switchBorder}>
                    <FormControlLabel
                      control={
                        <Switch
                          onClick={handleNotifyStudent}
                          checked={formstate?.notifyStudents}
                          value="notifyStudent"
                        />
                      }
                      label="Notify students on update"
                      labelPlacement="top"
                    />

                    <p className={style.formtext}>
                      Email notification would be sent to student of the new
                      course and when the course locked status changes
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button className={style.contentform__btn} onClick={createContent} disabled={addContentMutation.isLoading}>
              {
                addContentMutation.isLoading ? <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> :
                  <span>Submit</span>
                  
              }
            </button>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
                    <button variant="secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button variant="primary" onClick={handleClose}>
                        Save Changes
                    </button>
                </Modal.Footer> */}
      </Modal>
    </div>
  );
}


export default function AddDomainContent({id}){
    const [showContentModal, setShowContentModal] = useState(false);

    function openModal(){
      setShowContentModal(true)
    }
    
    function closeModal(){
      setShowContentModal(false)
    }

    return (
      <div>
        <i>
          <AiOutlinePlus size={18} color="#fff" onClick={openModal} />
        </i>
        <ReuseableModalContent
          show={showContentModal}
          handleClose={closeModal}
          domainId={id}
        />
      </div>
    )
  }