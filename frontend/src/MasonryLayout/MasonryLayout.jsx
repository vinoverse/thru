// import styles of this component
import styles from "./MasonryLayout.module.css"

// import other react pkg to use
import Masonry from "react-masonry-css"

// import other component to use
import MasonryBox from './MasonryBox/MasonryBox';
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';

// MasonryLayout Component
const MasonryLayout = ({ images }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  const { account } = useWeb3React();
  const [nfts, setNfts] = useState([]);

  useEffect(() => {   
    fetch("http://localhost:8080/api/user/nfts/" + account).then((res) => res.json()).then((res) => {
      setNfts(res["result"]);
      console.log(nfts);
    });
  }, []);

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles["my-masonry-grid"]}
      columnClassName={styles["my-masonry-grid_column"]}
    >
      {nfts.map(item => (
        <MasonryBox 
          key={item.name} 
          wallSrc={item.originUrl}
        />
      ))}
    </Masonry>
  )
}

export default MasonryLayout