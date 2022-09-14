import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import MainHeader from '../components/MainHeader';

const MainEvent = () => {
    return (
        <>
        <MainHeader />
        <div className="container">
            <section className="main-first-section">
                <div className="top">
                    <div>
                        <span className="header-title">All Events</span>
                    </div>
                </div>
                <div className="events">
                    <Swiper
                            slidesPerView={1.3}
                            spaceBetween={-1}
                            freeMode={true}
                            modules={[FreeMode]}
                            className="mySwiper"
                        >
                        <SwiperSlide>
                            <div className="event-item">
                                <div className="ticket-frame">
                                    <div className="frame-content">
                                        <div className="frame-top">
                                            <img className="frame-img" src="./img/main/ticket-image1.png" />
                                            <div className="ticket-icon">
                                                <img className="frame-ticket-img" src="./img/main/ticket.png" />
                                            </div>
                                            
                                        </div>
                                        <div className="frame-bottom">
                                            <div className="frame-title">
                                                <span>Year End Party</span>
                                            </div>
                                            <div className="frame-by">
                                                <span>by vanilla void</span>
                                            </div>
                                            <div className="frame-info">
                                                <div className="frame-icon">
                                                    <img src="./img/main/timecircle.png" />
                                                </div>
                                                <div>
                                                    <span>24 Dec, 18:00 ~ END</span>
                                                </div>
                                            </div>
                                            <div className="frame-info">
                                                <div className="frame-icon">
                                                    <img src="./img/main/location.png" />
                                                </div>
                                                <div>
                                                    <span>JW</span>
                                                </div>
                                            </div>
                                            <div className="frame-info">
                                                <div className="frame-icon">
                                                    <img src="./img/main/user.png" />
                                                </div>
                                                <div>
                                                    <span>40</span>
                                                </div>
                                            </div>
                                            <div className="detail">
                                                <div></div>
                                                <div className="text">
                                                    <span>details &gt;</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className="event-item">
                                <div className="ticket-frame">
                                    <div className="frame-content">
                                        <div className="frame-top">
                                            <img className="frame-img" src="./img/main/ticket-image1.png" />
                                            <div className="ticket-icon">
                                                <img className="frame-ticket-img" src="./img/main/ticket.png" />
                                            </div>
                                            
                                        </div>
                                        <div className="frame-bottom">
                                            <div className="frame-title">
                                                <span>Year End Party</span>
                                            </div>
                                            <div className="frame-by">
                                                <span>by vanilla void</span>
                                            </div>
                                            <div className="frame-info">
                                                <div className="frame-icon">
                                                    <img src="./img/main/timecircle.png" />
                                                </div>
                                                <div>
                                                    <span>24 Dec, 18:00 ~ END</span>
                                                </div>
                                            </div>
                                            <div className="frame-info">
                                                <div className="frame-icon">
                                                    <img src="./img/main/location.png" />
                                                </div>
                                                <div>
                                                    <span>JW</span>
                                                </div>
                                            </div>
                                            <div className="frame-info">
                                                <div className="frame-icon">
                                                    <img src="./img/main/user.png" />
                                                </div>
                                                <div>
                                                    <span>40</span>
                                                </div>
                                            </div>
                                            <div className="detail">
                                                <div></div>
                                                <div className="text">
                                                    <span>details &gt;</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="create-event">
                    <div>
                        <span className="header-title">+ Create new event</span>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
};

export default MainEvent;