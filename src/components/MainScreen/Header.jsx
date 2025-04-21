// src/components/MainScreen/Header.jsx

import React, { useState } from 'react';

import { useDocument } from '@automerge/automerge-repo-react-hooks';
import { updateText } from '@automerge/automerge/next';

import { compile } from '../../utils/compiler';
import { LANGUAGES } from '../../utils/constants';

const Header = ({
    handleOpenDarkModeSettings,
    handleOpenShareLink,
    handleFileSave,
    globalThemeDark,
    IDEVars
}) => {
    // const setFileName = (e) => {
    //     console.log(e.target.value);
    //     IDEVars.fileName.set(e.target.value); 
    // }
    // const setOutput = (e) => {
    //     console.log(e.target.value);
    //     IDEVars.output.set(e.target.value); 
    // }

    const compileCode = async (btnElement) => {
        btnElement.disabled = true;
        // btnElement.addClassName("")
        
        let language = LANGUAGES[IDEVars.fileName.ext] || "javascript";
        let compileResult = await compile(language, IDEVars.editorContent.value, IDEVars.fileName.value, "stdin");

        if(compileResult.status === "success"){
            if(compileResult.error)
                IDEVars.outputContent.set(compileResult.error, true);
            else
                IDEVars.outputContent.set(compileResult.output, false);
        }
        // IDEVars.outputContent.error = compileResult.status === 'error';
        // IDEVars.outputContent.set(compileResult.output);

        btnElement.disabled = false;
    }

    return (
        <div id="Main-Screen-Header" className='d-flex align-items-center w-100 border-bottom'>
            <h2 className='text-start pe-4'>
                ZeroEdit
            </h2>

            <div className="g-2">
                <b style={{ alignSelf: 'center' }}>File :</b> &nbsp;
                <input
                    type="text"
                    placeholder="Enter file name"
                    value={IDEVars.fileName.value}
                    onChange={(e) => IDEVars.fileName.set(e.target.value)}
                    style={{ padding: '5px', fontSize: '14px' }}
                />
                &nbsp;
                <button name="saveFile" id="saveFile" onClick={handleFileSave} className={`${(globalThemeDark && 'text-light')}`}>
                    <i className='bi bi-floppy fs-5'></i>
                    &nbsp;
                    Save
                </button>
                &nbsp;
                <button name="Compile/Run" id="CompileRun" className='text-success' onClick={(e) => compileCode(e.target)}>
                    <i className='bi bi-play-circle-fill fs-5'></i>
                    &nbsp;
                    Run
                </button>
                &nbsp;
                {/* <button name="Compile/Run" id="Compile/Run" className='text-danger'>
                    <i className='bi bi-stop-circle-fill fs-5'></i>
                    &nbsp;
                    Stop
                </button> */}
            </div>

            <div style={{ marginLeft: 'auto', alignSelf: 'right' }}>
                <button name="shareLink" id="shareLink" onClick={handleOpenShareLink} className={`${(globalThemeDark && 'text-light')}`}>
                    <i className='bi bi-link fs-3'></i>
                </button>
                <button name="threeDots" id="threeDots" onClick={handleOpenDarkModeSettings} className={`${(globalThemeDark && 'text-light')}`}>
                    <i className='bi bi-three-dots fs-3'></i>
                </button>
            </div>

        </div>
    );
}

export default Header;