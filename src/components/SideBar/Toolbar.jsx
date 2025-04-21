// src/components/SideBar/Toolbar.jsx

// Import the React Framework
import React, { useRef } from 'react';

// Importing CSS and Bootstrap
import { Col, Row, Button } from 'react-bootstrap';

import {triggerFileUpload} from "../../utils/files"

const ToolbarButton = ({ icon = "plus", iconSize = 6, globalThemeDark = false, onClick }) => {
    return (
        <Col xs={3}>
            <Button className={`btn rounded-circle border ${globalThemeDark && 'btn-dark' || 'btn-light'}`} onClick={onClick}>
                <i className={`bi bi-${icon} fs-${iconSize}`}></i>
            </Button>
        </Col>
    );
}

const Toolbar = ({ globalThemeDark = false, IDEVars }) => {
    const handleUploadFile = () => {
        triggerFileUpload({
            onFileRead: IDEVars.editorContent.set,
            onFileName: IDEVars.fileName.set,
        });
    };

    return (
        <Row style={{ height: "7vh" }} className={`align-content-center text-center justify-content-around px-0 border-bottom ${(globalThemeDark && 'bg-dark') || 'bg-light'}`}>
            <ToolbarButton icon='plus' globalThemeDark={globalThemeDark} iconSize={6} />
            <ToolbarButton icon='upload' globalThemeDark={globalThemeDark} onClick={handleUploadFile} />
            <ToolbarButton icon='search' globalThemeDark={globalThemeDark} />
            <ToolbarButton icon='trash' globalThemeDark={globalThemeDark} />
        </Row>
    );
}

export default Toolbar;