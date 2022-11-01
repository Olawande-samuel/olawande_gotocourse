import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react'
import clsx from  "../Admin/styles.module.css"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({initialState, setBio, title= "Bio"}) => {
  return (
    <div className={clsx.form_group}>
              <label htmlFor={"bio"} className="form-label generic_label">
                {title}
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
                data={initialState}
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
  )
}

export default Editor