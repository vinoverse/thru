import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import MainHeader from '../components/MainHeader';

const MainNFT = () => {
    return (
        <>
        <MainHeader />
        <div className="container">
            <sction className="myinfo">
                <div className="wallet-address">
                    <span className="wa-text">0xd1B948b9eB3D433d780b9E699f5494429e4CA51D</span>
                </div>
                <div className="option">
                    <div>
                        <img src="./img/main/setting.png" />
                    </div>
                    <div>
                        <img src="./img/main/notification.png" />
                    </div>
                </div>
            </sction>
            <section className="main-first-section">
                <div className="top">
                    <div>
                        <span className="header-title">MY NFT</span>
                    </div>
                    <div></div>
                </div>
                <div className="nfts">
                    <Swiper
                        slidesPerView={2.2}
                        spaceBetween={8}
                        freeMode={true}
                        pagination={{
                        clickable: true,
                        }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <div className="nft-item">
                                <img className="nft-img" src="./img/main/nft1.png" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="nft-item">
                                <img className="nft-img" src="./img/main/nft1.png" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="nft-item">
                                <img className="nft-img" src="./img/main/nft1.png" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="nft-item">
                                <img className="nft-img" src="./img/main/nft1.png" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="nft-item">
                                <img className="nft-img" src="./img/main/nft1.png" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="nft-item">
                                <img className="nft-img" src="./img/main/nft1.png" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="nft-item">
                                <img className="nft-img" src="./img/main/nft1.png" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="nft-item">
                                <img className="nft-img" src="./img/main/nft1.png" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="nft-item">
                                <img className="nft-img" src="./img/main/nft1.png" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                
            </section>
            <section className="event">
                <div className="event-type">
                    <div>
                        <span className="header-title">Hosting</span>
                    </div>
                    <div className="tickets">
                        <Swiper
                            slidesPerView={1.2}
                            spaceBetween={8}
                            freeMode={true}
                            modules={[FreeMode]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <div className="ticket-item">
                                    <div className="left-circle"></div>
                                    <div className="ticket-info">
                                        <div>
                                            <img className="ticket-img" src="./img/main/nft2.png" />
                                        </div>
                                        <div className="ticket-title">
                                            <span>Yacht &amp; Wine</span>
                                        </div>
                                        <div className="ticket-by">
                                            <span>by </span><span>vanilla void</span>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/timecircle.png" />
                                            </div>
                                            <div>
                                                <span>24 Dec, 18:00 ~ END</span>
                                            </div>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/location.png" />
                                            </div>
                                            <div>
                                                <span>TBD</span>
                                            </div>
                                        </div>
                                        <div className="scanning">
                                            <div></div>
                                            <div className="text">
                                                <span>Go Scanning &gt;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-circle"></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="ticket-item">
                                    <div className="left-circle"></div>
                                    <div className="ticket-info">
                                        <div>
                                            <img className="ticket-img" src="./img/main/nft2.png" />
                                        </div>
                                        <div className="ticket-title">
                                            <span>Yacht &amp; Wine</span>
                                        </div>
                                        <div className="ticket-by">
                                            <span>by </span><span>vanilla void</span>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/timecircle.png" />
                                            </div>
                                            <div>
                                                <span>24 Dec, 18:00 ~ END</span>
                                            </div>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/location.png" />
                                            </div>
                                            <div>
                                                <span>TBD</span>
                                            </div>
                                        </div>
                                        <div className="scanning">
                                            <div></div>
                                            <div className="text">
                                                <span>Go Scanning &gt;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-circle"></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="ticket-item">
                                    <div className="left-circle"></div>
                                    <div className="ticket-info">
                                        <div>
                                            <img className="ticket-img" src="./img/main/nft2.png" />
                                        </div>
                                        <div className="ticket-title">
                                            <span>Yacht &amp; Wine</span>
                                        </div>
                                        <div className="ticket-by">
                                            <span>by </span><span>vanilla void</span>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/timecircle.png" />
                                            </div>
                                            <div>
                                                <span>24 Dec, 18:00 ~ END</span>
                                            </div>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/location.png" />
                                            </div>
                                            <div>
                                                <span>TBD</span>
                                            </div>
                                        </div>
                                        <div className="scanning">
                                            <div></div>
                                            <div className="text">
                                                <span>Go Scanning &gt;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-circle"></div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        
                    </div>
                </div>
                <div className="event-type">
                    <div>
                        <span className="header-title">Upcoming</span>
                    </div>
                    <div className="tickets">
                        <Swiper
                            slidesPerView={1.2}
                            spaceBetween={8}
                            freeMode={true}
                            modules={[FreeMode]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <div className="ticket-item">
                                    <div className="left-circle"></div>
                                    <div className="ticket-info">
                                        <div>
                                            <img className="ticket-img" src="./img/main/nft2.png" />
                                        </div>
                                        <div className="ticket-title">
                                            <span>Yacht &amp; Wine</span>
                                        </div>
                                        <div className="ticket-by">
                                            <span>by </span><span>vanilla void</span>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/timecircle.png" />
                                            </div>
                                            <div>
                                                <span>24 Dec, 18:00 ~ END</span>
                                            </div>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/location.png" />
                                            </div>
                                            <div>
                                                <span>TBD</span>
                                            </div>
                                        </div>
                                        <div className="scanning">
                                            <div></div>
                                            <div className="text">
                                                <span>Go Scanning &gt;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-circle"></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="ticket-item">
                                    <div className="left-circle"></div>
                                    <div className="ticket-info">
                                        <div>
                                            <img className="ticket-img" src="./img/main/nft2.png" />
                                        </div>
                                        <div className="ticket-title">
                                            <span>Yacht &amp; Wine</span>
                                        </div>
                                        <div className="ticket-by">
                                            <span>by </span><span>vanilla void</span>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/timecircle.png" />
                                            </div>
                                            <div>
                                                <span>24 Dec, 18:00 ~ END</span>
                                            </div>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/location.png" />
                                            </div>
                                            <div>
                                                <span>TBD</span>
                                            </div>
                                        </div>
                                        <div className="scanning">
                                            <div></div>
                                            <div className="text">
                                                <span>Go Scanning &gt;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-circle"></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="ticket-item">
                                    <div className="left-circle"></div>
                                    <div className="ticket-info">
                                        <div>
                                            <img className="ticket-img" src="./img/main/nft2.png" />
                                        </div>
                                        <div className="ticket-title">
                                            <span>Yacht &amp; Wine</span>
                                        </div>
                                        <div className="ticket-by">
                                            <span>by </span><span>vanilla void</span>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/timecircle.png" />
                                            </div>
                                            <div>
                                                <span>24 Dec, 18:00 ~ END</span>
                                            </div>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/location.png" />
                                            </div>
                                            <div>
                                                <span>TBD</span>
                                            </div>
                                        </div>
                                        <div className="scanning">
                                            <div></div>
                                            <div className="text">
                                                <span>Go Scanning &gt;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-circle"></div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                <div className="event-type">
                    <div>
                        <span className="header-title">Past</span>
                    </div>
                    <div className="tickets">
                        <Swiper
                            slidesPerView={1.2}
                            spaceBetween={8}
                            freeMode={true}
                            modules={[FreeMode]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <div className="ticket-item">
                                    <div className="left-circle"></div>
                                    <div className="ticket-info">
                                        <div>
                                            <img className="ticket-img" src="./img/main/nft2.png" />
                                        </div>
                                        <div className="ticket-title">
                                            <span>Yacht &amp; Wine</span>
                                        </div>
                                        <div className="ticket-by">
                                            <span>by </span><span>vanilla void</span>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/timecircle.png" />
                                            </div>
                                            <div>
                                                <span>24 Dec, 18:00 ~ END</span>
                                            </div>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/location.png" />
                                            </div>
                                            <div>
                                                <span>TBD</span>
                                            </div>
                                        </div>
                                        <div className="scanning">
                                            <div></div>
                                            <div className="text">
                                                <span>Go Scanning &gt;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-circle"></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="ticket-item">
                                    <div className="left-circle"></div>
                                    <div className="ticket-info">
                                        <div>
                                            <img className="ticket-img" src="./img/main/nft2.png" />
                                        </div>
                                        <div className="ticket-title">
                                            <span>Yacht &amp; Wine</span>
                                        </div>
                                        <div className="ticket-by">
                                            <span>by </span><span>vanilla void</span>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/timecircle.png" />
                                            </div>
                                            <div>
                                                <span>24 Dec, 18:00 ~ END</span>
                                            </div>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/location.png" />
                                            </div>
                                            <div>
                                                <span>TBD</span>
                                            </div>
                                        </div>
                                        <div className="scanning">
                                            <div></div>
                                            <div className="text">
                                                <span>Go Scanning &gt;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-circle"></div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="ticket-item">
                                    <div className="left-circle"></div>
                                    <div className="ticket-info">
                                        <div>
                                            <img className="ticket-img" src="./img/main/nft2.png" />
                                        </div>
                                        <div className="ticket-title">
                                            <span>Yacht &amp; Wine</span>
                                        </div>
                                        <div className="ticket-by">
                                            <span>by </span><span>vanilla void</span>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/timecircle.png" />
                                            </div>
                                            <div>
                                                <span>24 Dec, 18:00 ~ END</span>
                                            </div>
                                        </div>
                                        <div className="info">
                                            <div className="ticket-icon">
                                                <img src="./img/main/location.png" />
                                            </div>
                                            <div>
                                                <span>TBD</span>
                                            </div>
                                        </div>
                                        <div className="scanning">
                                            <div></div>
                                            <div className="text">
                                                <span>Go Scanning &gt;</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-circle"></div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
};

export default MainNFT;