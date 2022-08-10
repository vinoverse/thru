import { Link } from '@reach/router';
import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import UserEventItem from '../components/UserEventItem';

const Activity = () => {
    const {account} = useSelector((store) => store);
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        fetch("/api/user/event/" + account).then((res) => res.json()).then((res) => {
            console.log(res["eventList"])
            setEventList(res["eventList"]);
        }).catch((error) => {
            
        });
    }, []);

    return (
        <div>
            <section className='jumbotron breadcumb no-bg'>
                <div className='mainbreadcumb'>
                    <div className='container'>
                        <div className='row m-10-hor'>
                            <div className='col-12'>
                                <h1 className='text-center'>My Events</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='container'>
                <div className='row'>
                    <Link to="/eventInput">이벤트 등록</Link>
                </div>
                <div className='row'>
                    <div className="col-md-14">
                        <ul className="activity-list">
                        {eventList.map((event, index) => (
                           <UserEventItem key={index} event={event} />
                        ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Activity;