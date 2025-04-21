// src/components/SideBar/SideBar.jsx

//Import the React Framework
import React, { useState } from "react";

// Importing CSS and Bootstrap
import { Row, Col, Modal } from 'react-bootstrap';

import Toolbar from './Toolbar'
import RecentFiles from './RecentFiles'
import ActiveUsers from './ActiveUsers'
import SettingsButton from './SettingsButton'

import SettingsPanel from "./SettingsPanel"
import PermissionsPopup from "./PermissionsPopup"

import './SideBar.css';

import { saveSettings, loadSavedSettings } from "../../utils/storage"

function SettingsPopup({ show, handleClose, currentSettings, saveNewSettings, userName }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <SettingsPanel currentSettings={currentSettings} saveNewSettings={saveNewSettings} />
        </Modal>
    );
}

const SideBar = ({ colSize = 2, DarkTheme, IDEVars, userName }) => {
    const [showSettingsPopup, setShowSettingsPopup] = useState(false);
    const handleOpenSettings = () => setShowSettingsPopup(true);
    const handleCloseSettings = () => setShowSettingsPopup(false);

    const [selectedUser, setSelectedUser] = useState();
    const [showPermissionsPopup, setShowPermissionsPopup] = useState(false);
    const handleOpenPermissions = (index) => {
        setSelectedUser(index);
        setShowPermissionsPopup(true);
    };

    const handleClosePermissions = () => {
        setShowPermissionsPopup(false)
        setSelectedUser();
    };

    const [settings, updateSettings] = useState(loadSavedSettings() || {
        confirmBeforeSave: true,
        maxUsers: 5,
        defaultPermissions: {
            read: true,
            write: true,
            execute: true,
        }
    })

    const saveNewSettings = (settings) => {
        updateSettings(settings);
        saveSettings(settings);
    }

    //TODO : Add the UserList Here, with Owner and selfIndex states.
    return (
        <Col xs={colSize} >
            <Toolbar globalThemeDark={DarkTheme.global.value} IDEVars={IDEVars} />
            <RecentFiles openFileName={IDEVars.fileName.value} />
            <ActiveUsers handleOpenPermissions={handleOpenPermissions} selfUserName={userName} usersList={IDEVars.users.list} ownerUserName={IDEVars.users.owner}/>
            <SettingsButton handleClick={handleOpenSettings} />

            <PermissionsPopup
                show={showPermissionsPopup}
                onHide={handleClosePermissions}
                modalSize={"md"}
                selectedUser={selectedUser}
            />

            {/* Modal for Settings Popup */}
            <SettingsPopup
                show={showSettingsPopup}
                handleClose={handleCloseSettings}

                currentSettings={settings}
                saveNewSettings={saveNewSettings}
            />
        </Col>
    );
}

export default SideBar;