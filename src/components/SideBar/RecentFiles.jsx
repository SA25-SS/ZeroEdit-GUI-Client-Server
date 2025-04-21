// src/components/SideBar/RecentFiles.jsx

// Import the React Framework
import React from 'react';

// Importing CSS and Bootstrap
import { Col, Row, Button } from 'react-bootstrap';

const File = ({index, fileName, selectedFileIndex}) => {
    let button;
    let fileType= fileName.split(".")[1];

    if(index !== selectedFileIndex){
        button = (
            <Button 
                index={index} 
                className='file file-unselected text-start pt-0'>
                    <i className={`bi bi-filetype-${fileType}`}></i> &nbsp;
                    {fileName}
            </Button>
        );
    } else {
        button = (
            <div 
                key={index} 
                className='file file-selected text-start pt-0'
            >
                <span>
                    <i className={`bi bi-filetype-${fileType}`}></i> &nbsp;
                    {fileName}
                </span>
                <b>
                    <button 
                        onClick={() => console.log(`Remove file: ${fileName}`)} 
                        className="close-icon"
                    >
                        <i className='bi bi-x fs-5 text-danger'></i>
                    </button>
                </b>
            </div>
        );
    }
    
    return (
        <Row className='mb-1'>
            <Col>
                {button}
            </Col>
        </Row>
    );
}

const RecentFiles = ({fileNames = [], selectedFileIndex=-1, openFileName}) => {
    if(openFileName){
        fileNames.push(openFileName);
        selectedFileIndex=(fileNames.length-1);
    }
    
    return (
        <Col style={{height:"44vh", textAlign: "left" }}>
            <Row>
                <h5>Recent Files</h5>
            </Row>

            {
                fileNames.map((file, index) => <File key={index} index={index} fileName={file} selectedFileIndex={selectedFileIndex}/>)
            }

        </Col>
    )
}

export default RecentFiles;