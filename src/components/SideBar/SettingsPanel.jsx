import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

const SettingsPanel = ({currentSettings, saveNewSettings}) => {
    // State for toggles and inputs
    const [confirmBeforeSave, setConfirmBeforeSave] = useState(currentSettings.confirmBeforeSave);
    const [maxUsers, setMaxUsers] = useState(currentSettings.maxUsers);
    const [defaultPermissions, setDefaultPermissions] = useState(currentSettings.defaultPermissions);

    // Handlers for toggles and inputs
    const handleConfirmToggle = () => {
        setConfirmBeforeSave((prev) => !prev);
    };

    const handlePermissionToggle = (permKey) => {
        setDefaultPermissions((prev) => ({
            ...prev,
            [permKey]: !prev[permKey],
        }));
    };

    const handleMaxUsersChange = (e) => {
        const value = e.target.value;
        setMaxUsers(value ? parseInt(value, 10) : "");
    };

    const handleSave = () => {
        const settingsData = {
            confirmBeforeSave,
            maxUsers,
            defaultPermissions,
        };

        saveNewSettings(settingsData);

        // Replace this console.log with your save logic (e.g., API call)
        console.log("Saving Settings:", settingsData);
        alert("Settings saved successfully!");
    };

    return (
        <Card>
            <Card.Header as="h5">
                <i className="bi bi-gear-fill me-2"></i> Settings
            </Card.Header>
            <Card.Body>
                <Form>
                    {/* Confirm before save */}
                    <Form.Group as={Row} className="align-items-center" controlId="formConfirmBeforeSave">
                        <Form.Label column sm="8" className="mb-0">
                            Confirm before save?
                        </Form.Label>
                        <Col sm="4" className="text-end">
                            <Form.Check
                                type="switch"
                                id="custom-switch-confirm"
                                checked={confirmBeforeSave}
                                onChange={handleConfirmToggle}
                            />
                        </Col>
                    </Form.Group>

                    {/* Max users */}
                    <Form.Group as={Row} className="align-items-center mt-3" controlId="formMaxUsers">
                        <Form.Label column sm="8" className="mb-0">
                            Max users:
                        </Form.Label>
                        <Col sm="4" className="text-end">
                            <Form.Control
                                type="number"
                                value={maxUsers}
                                onChange={handleMaxUsersChange}
                                min="1"
                                max="5"
                            />
                        </Col>
                    </Form.Group>

                    <Card.Title className="mt-4">Default user permissions</Card.Title>

                    {/* Read */}
                    <Form.Group as={Row} className="align-items-center mt-2" controlId="formPermissionRead">
                        <Form.Label column sm="8" className="mb-0">
                            Read:
                        </Form.Label>
                        <Col sm="4" className="text-end">
                            <Form.Check
                                type="switch"
                                id="custom-switch-read"
                                checked={defaultPermissions.read}
                                onChange={() => handlePermissionToggle("read")}
                            />
                        </Col>
                    </Form.Group>

                    {/* Write */}
                    <Form.Group as={Row} className="align-items-center mt-2" controlId="formPermissionWrite">
                        <Form.Label column sm="8" className="mb-0">
                            Write:
                        </Form.Label>
                        <Col sm="4" className="text-end">
                            <Form.Check
                                type="switch"
                                id="custom-switch-write"
                                checked={defaultPermissions.write}
                                onChange={() => handlePermissionToggle("write")}
                            />
                        </Col>
                    </Form.Group>

                    {/* Execute */}
                    <Form.Group as={Row} className="align-items-center mt-2" controlId="formPermissionExecute">
                        <Form.Label column sm="8" className="mb-0">
                            Execute:
                        </Form.Label>
                        <Col sm="4" className="text-end">
                            <Form.Check
                                type="switch"
                                id="custom-switch-execute"
                                checked={defaultPermissions.execute}
                                onChange={() => handlePermissionToggle("execute")}
                            />
                        </Col>
                    </Form.Group>

                    <Button variant="success" className="mt-4 w-100" onClick={handleSave}>
                        <i className="bi bi-save me-2"></i>
                        Save
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default SettingsPanel;
