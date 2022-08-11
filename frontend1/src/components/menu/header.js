import React, { useEffect, useState } from "react";
import { Link } from '@reach/router';
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import useOnclickOutside from "react-cool-onclickoutside";

setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const NavLink = props => (
  <Link 
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : 'non-active',
      };
    }}
  />
);


const Header= function() {
    const [openMenu, setOpenMenu] = React.useState(false);

    const closeMenu = (): void => {
      setOpenMenu(false);
    };
   
    const ref = useOnclickOutside(() => {
      closeMenu();
    });


    const [showmenu, btn_icon] = useState(false);
    useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
        btn_icon(false);
        if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
          totop.classList.add("show");
          
        } else {
          header.classList.remove("sticky");
          totop.classList.remove("show");
        } if (window.pageYOffset > sticky) {
          closeMenu();
        }
      });
      return () => {
        window.removeEventListener("scroll", scrollCallBack);
      };
    }, []);
    
    useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
        btn_icon(false);
        if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
          totop.classList.add("show");
          
        } else {
          header.classList.remove("sticky");
          totop.classList.remove("show");
        } if (window.pageYOffset > sticky) {
          closeMenu();
        }
      });
      return () => {
        window.removeEventListener("scroll", scrollCallBack);
      };
    }, []);

    return (
      <header id="myHeader" className='navbar white'>
        <div className='container'>
          <div className='row w-100-nav'>
            <div className='logo px-0'>
              <div className='navbar-title navbar-item'>
                <NavLink to="/">
                  <img
                    src="./img/waht-red.png"
                    className="img-fluid d-block"
                    alt="#"
                  />
                  <img
                    src="./img/waht-red.png"
                    className="img-fluid d-3"
                    alt="#"
                  />
                  <img
                    src="./img/waht-red.png"
                    className="img-fluid d-none"
                    alt="#"
                  />
                </NavLink>
              </div>
            </div>

            <BreakpointProvider>
                <Breakpoint l down>
                  {showmenu && 
                  <div className='menu'>
                    <div className='navbar-item'>
                      <div ref={ref}>
                        <NavLink className="dropdown-custom btn" to="/mynft" onClick={() => btn_icon(!showmenu)}>My NFT</NavLink>
                      </div>
                    </div>
                    <div className='navbar-item'>
                      <div ref={ref}>
                        <NavLink className="dropdown-custom btn" to="/myevents" onClick={() => btn_icon(!showmenu)}>Event</NavLink>
                      </div>
                    </div>
                  </div>
                  }
                </Breakpoint>

                <Breakpoint xl>
                  <div className='menu'>
                    <div className='navbar-item'>
                        <div ref={ref}>
                          <NavLink className="dropdown-custom btn" to="/mynft" onClick={() => btn_icon(!showmenu)}>My NFT</NavLink>
                        </div>
                    </div>
                    <div className='navbar-item'>
                        <div ref={ref}>
                          <NavLink className="dropdown-custom btn" to="/myevents" onClick={() => btn_icon(!showmenu)}>Event</NavLink>
                        </div>
                    </div>
                  </div>
                </Breakpoint>
              </BreakpointProvider>
            
            <div className='mainside'>
              <div className='connect-wal'>
                <NavLink to="/" className="btn-main">
                  <i className="icon_wallet_alt"></i>
                  <span>Connect Wallet</span>
                </NavLink>
              </div>
            </div>

            <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
              <div className="menu-line white"></div>
              <div className="menu-line1 white"></div>
              <div className="menu-line2 white"></div>
            </button>
          </div>
        </div>     
      </header>
    );
}
export default Header;