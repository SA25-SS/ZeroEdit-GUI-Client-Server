//Import the Logo
// import logo from './logo.svg';

// Importing CSS and Bootstrap
import './MainIDE.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Container, Row } from 'react-bootstrap';

//Import the React framework
import React, { useEffect, useState } from 'react';

// Importing components
import MainScreen from './components/MainScreen/MainScreen';
import SideBar from './components/SideBar/SideBar';
import LoadingScreen from './LoadingScreen'

// import { Text } from 'automerge'
import { useDocument } from '@automerge/automerge-repo-react-hooks';

import { loadSavedAuthToken, loadSavedUsername } from './utils/storage';
import { verifyToken } from './utils/auth';
import { Navigate } from 'react-router-dom';

function MainIDE({ DarkTheme, docUrl }) {
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Track authentication status

    // const [fileName, _setFileName] = useState("somethingcool.js");
    // const [editorContent, _setEditorContent] = useState("console.log('Something Cool')");
    // const [outputContent, _setOutputContent] = useState("Something Cool");

    // Automerge Doc
    const [doc, changeDoc] = useDocument(docUrl);
    const authToken = loadSavedAuthToken();
    const currentUserName = loadSavedUsername();

    document.location.hash = docUrl;

    useEffect(() => {
        const checkAuthToken = async () => {
            if (authToken) {
                try {
                    const response = await verifyToken(authToken);
                    let data = await response.json();
                    if (data.status === 'success') {
                        setIsAuthenticated(true); // Token is valid
                    } else {
                        setIsAuthenticated(false); // Token is invalid
                    }
                } catch (error) {
                    console.error('Error verifying token:', error);
                    setIsAuthenticated(false); // Handle errors gracefully
                }
            } else {
                setIsAuthenticated(false); // No token found
            }
        };

        checkAuthToken();
    }, [authToken]);


    useEffect(() => {
        if (!doc) return; // doc not ready yet

        changeDoc(d => {
            if (!d.owner) d.owner = currentUserName;

            if (!d.activeUsers) d.activeUsers = [];
            if (!d.activeUsers.includes(currentUserName))
                d.activeUsers.push(currentUserName);
        });
    }, [doc, changeDoc, currentUserName]);

    const setFileName = (value) => {
        changeDoc((d) => { d.fileName = value; });
        // _setFileName(value);
    };

    const setEditorContent = (value) => {
        changeDoc((d) => { d.fileContent = value; });
        // _setEditorContent(value);
    };

    const setOutputContent = (value, error = false) => {
        changeDoc((d) => {
            d.outputContent = value;
            d.outputStatus = error;
        });
        // _setOutputContent(value);
    };

    const setOwner = (userName) => {
        changeDoc(d => {
            if (d.owner === null)
                d.owner = userName;
        })
    }

    const addUser = () => {
        changeDoc(d => {
            if (d && d?.activeUsers && !d?.activeUsers?.includes(currentUserName))
                d.activeUsers.push(currentUserName)
        })
    }

    const IDEVars = {
        fileName: {
            // value: doc?.fileName ?? fileName,
            value: doc?.fileName ?? "somethingcool.js",
            set: setFileName,
            ext: (doc?.fileName ?? "somethingcool.js").split(/\.(?=[^\.]+$)/)[1]
        },
        editorContent: {
            // value: doc?.fileContent ?? editorContent,
            value: doc?.fileContent ?? "console.log('Something Cool')",
            set: setEditorContent

        },
        outputContent: {
            error: doc?.outputStatus ?? false,
            value: doc?.outputContent ?? "-",
            set: setOutputContent
        },
        users: {
            owner: doc?.owner ?? currentUserName,
            list: doc?.activeUsers ?? [currentUserName],
            setOwner: setOwner,
            add: addUser,
        }
    }

    console.log(IDEVars.users)

    if (isAuthenticated === false) {
        return <Navigate to="/login" />; // Redirect to login if not authenticated
    }

    if (isAuthenticated === null) {
        return <LoadingScreen DarkTheme={DarkTheme} />; // Show a loading state while verifying the token
    }

    return (
        <Container className={`App px-0 ${(DarkTheme.global.value && "bg-dark text-light") || "bg-light text-dark"}`} fluid>
            <Row className='mx-0'>
                <SideBar colSize={2} DarkTheme={DarkTheme} IDEVars={IDEVars} docUrl={docUrl} userName={currentUserName} />
                <MainScreen colSize={10} DarkTheme={DarkTheme} IDEVars={IDEVars} docUrl={docUrl} userName={currentUserName}/>
            </Row>
        </Container>
    );
}

export default MainIDE;
