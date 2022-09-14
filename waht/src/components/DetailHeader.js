import React from 'react';
import '../assets/secondHeader.css';

const DetailHeader = () => {
    return (
        <header className="detail-header container">
            <div className="back">
                <img src="./img/header/arrow.png" />
            </div>
            <div className="scan">
                <img src="./img/header/scan.png" />
            </div>
            <div className="share">
                <img src="./img/header/upload.png" />
            </div>
        </header>
    );
};

export default DetailHeader;