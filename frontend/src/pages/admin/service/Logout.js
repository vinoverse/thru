import React from 'react';

const Logout = () => {
    window.localStorage.removeItem("thruUser");
    window.location.href="/admin/login";

    return (
        <div>
            
        </div>
    );
};

export default Logout;