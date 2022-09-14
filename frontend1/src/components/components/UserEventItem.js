import React from 'react';

const UserEventItem = (props) => {
    const {event, setMenuModalShow, setEvent} = props;
    
    let info = null;
    if (event.info) {
        info = JSON.parse(event.info);
    }

    const clickItem = () => {
        setMenuModalShow(true);
        setEvent(event);
    }

    return (
        <li>
            <div className="act_list_text_only" onClick={clickItem}>
                <h4>{event.title}</h4>
                {"infoTitle2" in info
                ?
                <>{info.infoTitle2} : <span className='color'>{info.infoValue2}</span><br /></>
                :""}
                {"infoTitle3" in info
                ?
                <>{info.infoTitle3} : <span className='color'>{info.infoValue3}</span></>
                :""}
                
                <span className="act_list_date">{info.infoValue1}</span>
            </div>
        </li>
    );
};

export default UserEventItem;