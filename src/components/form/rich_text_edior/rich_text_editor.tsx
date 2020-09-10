import React, { useState } from 'react'

import {
    EditorState, convertToRaw, convertFromHTML,
    ContentState
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './rich_text_editor.css';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';


type RichTextEditorProps = {
    value: string,
    id: string,
    cb: any,
}

export default function RichTextEditor({ value, id, cb }: RichTextEditorProps) {
    const blocksFromHTML = convertFromHTML(value);
    const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
    );
    const initEditorState = EditorState.createWithContent(state);

    const [editorState, setEditorState] = useState(initEditorState);

    const handleEditorStateChange = (editorState: any) => {
        setEditorState(editorState);
        const foo = convertToRaw(editorState.getCurrentContent());
        console.log(`editorState: ${JSON.stringify(foo, null, 2)}`);
        html_string = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        cb(foo)
    };

    return (
        <div>
            <Editor
                key={id}
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbar={{
                    options: ['inline',
                        'fontSize',
                        'fontFamily',
                        'list',
                        'textAlign',
                        'link',
                        'image',
                        'remove',
                        'history'],
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                }}
                onEditorStateChange={handleEditorStateChange}
            />
        </div>
    )
}
