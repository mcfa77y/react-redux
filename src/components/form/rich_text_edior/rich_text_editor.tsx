import React, { useState, useCallback } from 'react'

import {
    EditorState, convertToRaw, convertFromHTML,
    ContentState
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './rich_text_editor.css';
import draftToHtml from 'draftjs-to-html';
import RichTextEditorColorPicker from './rich_text_editor_color_picker';
import { Use_Count_Renders } from '../../../utils/use_count_renders';
// import htmlToDraft from 'html-to-draftjs';


type RichTextEditorProps = {
    value: string,
    id: string,
    onChange: (id: string, value: string) => void,
}
export const html_to_editor_state = (html: string): EditorState => {
    const blocksFromHTML = convertFromHTML(html);
    const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
    );
    return EditorState.createWithContent(state);
}

const RichTextEditor = React.memo(({ value, id, onChange }: RichTextEditorProps) => {

    const initEditorState = html_to_editor_state(value);

    const [editorState, setEditorState] = useState(initEditorState);

    const handleEditorStateChange = useCallback(
        (editorState: any) => {
            setEditorState(editorState);
            // const foo = convertToRaw(editorState.getCurrentContent());
            // console.log(`editorState: ${JSON.stringify(editorState, null, 2)}`);
            const html_string = draftToHtml(convertToRaw(editorState.getCurrentContent()))
            onChange(id, html_string);
        }, []
    )
Use_Count_Renders('RichTextEditor: ' + id);
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
                    'blockType',
                    'fontFamily',
                    'colorPicker',
                    'list',
                    'textAlign',
                    'link',
                    'image',
                    'remove',
                    'history',
                ],
                textAlign: { inDropdown: true },
                blockType: { inDropdown: true },
                link: { inDropdown: true },
                colorPicker: { component: RichTextEditorColorPicker },

            }}
            onEditorStateChange={handleEditorStateChange}
        />
        {/* <textarea
            disabled
            style={{ width: "100%" }}
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}

    </div >
)
})

export default RichTextEditor;
