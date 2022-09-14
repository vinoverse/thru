import React from 'react';

const MainHeader = () => {
    return (
        <header className="header container">
            <div>
                <img className="banner" src="./img/header/waht.png"/>
            </div>
            <div className="blank"></div>
            <div className="menu">
                <div className="nft">
                    <img className="nft-profile" src="./img/header/profile.png" />
                </div>
                <div className="ticket">
                    <img className="ticket-img" src="./img/header/calendar.png" />
                </div>
            </div>
        </header>
    );
};

export default MainHeader;