import React, { useEffect, useState } from "react";
import { Link } from '@reach/router';

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
            <div className='mainside breakpoint__xl-only '>
              <div class="menu">
                <div class="navbar-item">
                  <NavLink to="/" className="btn-main">
                    <i className="icon_wallet_alt"></i>
                    <span>Connect Wallet</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>     
      </header>
    );
}
export default Header;