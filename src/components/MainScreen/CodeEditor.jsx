// src/components/MainScreen/CodeEditor.jsx

import React, {useRef} from 'react';
import Editor from '@monaco-editor/react';

import {LANGUAGES} from "../../utils/constants";

const CodeEditor = ({ editorThemeDark = false, IDEVars }) => {
    const ext = IDEVars.fileName.ext;
    const editorRef = useRef(null);

    const handleEditorChange = (content) => {
        IDEVars.editorContent.set(content);

        if (editorRef.current) {
            const position = editorRef.current.getPosition();
            // console.log(`[${position.lineNumber} : ${position.column}] => ${content.split("\n")[position.lineNumber-1][position.column-2]}`);
        }
    };

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    return (
        <div className='px-1 pb-1' style={{ overflow: 'hidden' }}>
            <Editor
                defaultValue=''
                defaultLanguage='javascript'
                theme={(editorThemeDark && "vs-dark") || "vs-light"}
                language={LANGUAGES[ext] || "javascript"}
                value={IDEVars.editorContent.value}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                options={{
                    fontSize: 14,
                    lineNumbers: 'on',
                    minimap: {
                        enabled: true,
                    },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    suggest:true
                }}
            />
        </div>
    );
};

export default CodeEditor;
