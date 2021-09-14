import React from "react"
import styles from "./Logo.module.scss"
import { Link } from 'react-router-dom';
export const Logo = (props) => {
  return (
    <Link to="/" id="logo">
    <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
  </Link>
    // <svg fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={styles.logoSvg}>
    //   <rect width="100%" height="100%" fill="url(#pattern0)" />
    //   <defs>
    //     <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
    //       <use xlinkHref="#image0" transform="translate(0 -0.00417213) scale(0.00144928)" />
    //     </pattern>
   
    //   </defs>
    // </svg>
  )
}