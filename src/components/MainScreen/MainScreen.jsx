// src/components/MainScreen/CodeEditor.jsx

//Import the React framework
import React, { useState } from 'react';

// Importing components
import CodeEditor from './CodeEditor';
import OutputArea from './OutputArea';

import Header from './Header';

import DarkModeSettings from "./DarkModeSettings"
import LinkPopup from "./ShareLinkPopup";
import ConfirmModal from '../ConfirmBox';

import { Row, Col, Modal } from 'react-bootstrap';

import { downloadFile } from "../../utils/files"
import { CLIENT_SERVER_MODE } from '../../utils/constants';

import './MainScreen.css';

function DarkModeSettingsPopup({ show, handleClose, DarkTheme, docUrl }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <DarkModeSettings
                DarkTheme={DarkTheme}
            />
        </Modal>
    );
}

const MainScreen = ({
    colSize = 10,
    DarkTheme,
    IDEVars,
    docUrl, 
    userName
}) => {
    // Dark Mode Settings Popup Modal Configuration
    const [darkModeSettingsPopup, setShowDarkModeSettingsPopup] = useState(false);
    const handleOpenDarkModeSettings = () => setShowDarkModeSettingsPopup(true);
    const handleCloseDarkModeSettings = () => setShowDarkModeSettingsPopup(false);

    // Share Link Popup Modal Configuration
    // const [shareLink, setShareLink] = useState(document.location.href);
    const shareLink = `${document.location.host}/${CLIENT_SERVER_MODE?'':'?host='+userName}#${docUrl}`;
    const [shareLinkPopup, setShowShareLinkPopup] = useState(false);
    const handleOpenShareLink = () => setShowShareLinkPopup(true);
    const handleCloseShareLink = () => setShowShareLinkPopup(false);

    const [showConfirmSave, setShowConfirmSave] = useState(false);
    const handleSave = () => {
        console.log(`File ${IDEVars.fileName.value} saved ✅`);
        downloadFile({
            fileName: IDEVars.fileName.value,
            fileContent: IDEVars.editorContent.value
        });
    };

    return (
        <Col xs={colSize} style={{ borderLeft: "1px solid #000" }}>
            <Row style={{ height: "7vh" }}>
                <Header
                    handleOpenDarkModeSettings={handleOpenDarkModeSettings}
                    handleOpenShareLink={handleOpenShareLink}
                    handleFileSave={() => setShowConfirmSave(true)}
                    globalThemeDark={DarkTheme.global.value}
                    IDEVars={IDEVars}
                />
            </Row>
            <Row style={{ height: "60vh", paddingTop: "1vh" }}>
                <CodeEditor
                    editorThemeDark={DarkTheme.editor.value}
                    IDEVars={IDEVars}
                />
            </Row>
            <Row style={{ borderTop: "1px solid black", height: "90%", maxHeight: "33vh" }}>
                <OutputArea error={IDEVars.outputContent.error} value={IDEVars.outputContent.value} />
            </Row>
            {/* Modals for Popups */}
            <DarkModeSettingsPopup
                show={darkModeSettingsPopup}
                handleClose={handleCloseDarkModeSettings}
                DarkTheme={DarkTheme}
            />
            <LinkPopup
                show={shareLinkPopup}
                onHide={handleCloseShareLink}
                link={shareLink}
            />
            <ConfirmModal
                show={showConfirmSave}
                onClose={() => setShowConfirmSave(false)}
                onConfirm={handleSave}
                title="Save Changes?"
                message="This will overwrite the current file. Are you sure you want to continue?"
                confirmText="Save"
                cancelText="Cancel"
                confirmVariant="success"
            />
        </Col>
    );
}

export default MainScreen;