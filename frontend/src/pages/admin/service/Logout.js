import React from 'react';
import { Navigate } from 'react-router-dom';

const Logout = (props) => {
    const {logout} = props; 

    logout();

    return (
        <div>
            <Navigate to="/" />
        </div>
    );
};

export default Logout;