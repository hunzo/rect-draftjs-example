import { Editor } from 'react-draft-wysiwyg'
import { convertToRaw, EditorState } from 'draft-js'
import React, { useState } from 'react'
import draftToHtml from 'draftjs-to-html'
import DOMPurify from 'dompurify'

const MyEditor = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    )

    const [content, setContent] = useState('')
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html),
        }
    }

    return (
        <div>
            {/* {JSON.stringify(content)} */}

            <Editor
                toolbarOnFocus
                toolbarClassName="toolbar-class"
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                editorState={editorState}
                onEditorStateChange={(newState) => {
                    setEditorState(newState)
                    setContent(
                        draftToHtml(
                            convertToRaw(editorState.getCurrentContent())
                        )
                    )
                }}
                toolbar={{
                    options: [
                        'inline',
                        'blockType',
                        'fontSize',
                        'fontFamily',
                        'list',
                        'colorPicker',
                        'link',
                        'textAlign',
                        'history',
                        'embedded',
                        'emoji',
                        'image',
                    ],
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                }}
            />
            <div className="container">
                <textarea
                
                    disabled
                    value={draftToHtml(
                        convertToRaw(editorState.getCurrentContent())
                    )}
                />
            <div className="preview" dangerouslySetInnerHTML={createMarkup(content)} />
            </div>
            {/* <div className="preview" dangerouslySetInnerHTML={createMarkup(content)} /> */}
        </div>
    )
}

export default MyEditor
