import Breadcrumb from 'react-bootstrap/Breadcrumb';
import '../classConsole/Content.css'
import style from "./style.module.css"
import { NavLink } from 'react-router-dom';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { useState } from 'react'

export default function Note() {
    const [details, showDetails] = useState(false)
    return (
        <div className=''>
          

            <small className='smallnote'>Make sure you constantly save your note as you type.</small>
            <main className='note'>
                <div className="texteditor">
                    {/* <CKEditorContext context={Context}>
                                    <h2>Using the CKeditor 5 context feature in React</h2>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={{
                                            plugins: [Paragraph, Bold, Italic, Essentials],
                                            toolbar: ['bold', 'italic']
                                        }}
                                        data="<p>Hello from the first editor working with the context!</p>"
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor1 is ready to use!', editor);
                                        }}
                                    />

                                </CKEditorContext> */}

                    <CKEditor
                        editor={ClassicEditor}
                        data="<p>Hello from CKEditor 5!</p>"
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />

                    <div className="notebtn">
                        <button>Save note</button>
                    </div>

                </div>






            </main>



        </div>


    )
}