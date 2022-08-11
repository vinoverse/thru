import { Link, Redirect } from '@reach/router';
import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import UserEventItem from '../components/UserEventItem';

const UserEvents = () => {
    const {account} = useSelector((store) => store);
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        if (!!account) {
            fetch("/api/user/event/" + account).then((res) => res.json()).then((res) => {
                setEventList(res["eventList"]);
            }).catch((error) => {
                setEventList([]);
            });
        }
    }, []);

    return (
        <>
        {account
        ?
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
                        <ul className="activity-list-text">
                        {eventList.map((event, index) => (
                           <UserEventItem key={index} event={event} />
                        ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
        :<Redirect noThrow={true} to="/"/>
        }
        </>
    );
};

export default UserEvents;