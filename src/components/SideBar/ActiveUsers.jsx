// src/components/SideBar/ActiveUsers.jsx

// Import the React Framework
import React from 'react';

// Importing CSS and Bootstrap
import { Col, Row } from 'react-bootstrap';

const User = ({userName, handleOpenPermissions, isSelf, isOwner}) => {
    return (
        <Row className='mb-1'>
            <Col>
                <div 
                    className={`user ${(isSelf)?'user-self':''} ${(isOwner)?'user-owner':''} text-start pt-0`}
                >
                    <span>
                        <i className={`bi bi-person-circle`}></i> &nbsp;
                        {userName}
                    </span>
                    <b>
                        <button 
                            onClick={() => {console.log(`Editing Permissions of ${userName}`); handleOpenPermissions(userName)}} 
                            className="user-permissions-menu" 
                            disabled={(isOwner) || (isSelf)}
                        >
                            <i className='bi bi-three-dots fs-5 text-secondary' ></i>
                        </button>
                    </b>
                </div>
            </Col>
        </Row>
    );
}

const ActiveUsers = ({usersList = ["Shreyas", "Sudhanva", "Rakshita", "Mohaneesh", "riqena"], ownerIndex=0, selfIndex=0, handleOpenPermissions, selfUserName, ownerUserName="Shreyas"}) => {
    
    return (
        <Col style={{height:"44vh", textAlign: "left"}}>
            <Row>
                <h5>Online Users</h5>
            </Row>

            {
                usersList.map((uname, index) => {
                    return (
                        <User 
                            key={index}

                            userName={uname}
                            isSelf={uname === selfUserName}
                            isOwner={uname === ownerUserName}

                            handleOpenPermissions={handleOpenPermissions}
                        />
                    );
                })
            }

        </Col>
    )
}

export default ActiveUsers;