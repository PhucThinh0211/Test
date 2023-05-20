import React from "react";
import { Header } from "antd/es/layout/layout";
import HeaderLogo from "image/icon/jasminelogo.svg";
import styles from "./HeaderSection.module.css";
import { ProfileSection } from "./ProfileSection";

export const HeaderSection = () => {
  // const getWindowDimensions = () => {
  //   const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
  //   const height = typeof window !== 'undefined' ? window.innerHeight : null;
  //   return {
  //     width,
  //     height,
  //   };
  // }
  // const [widthWin, setWitdhWin] = useState(getWindowDimensions().width);
  // window.addEventListener('resize', () => {
  //   var withWindows = getWindowDimensions().width;
  //   setWitdhWin(withWindows ?? 1000);
  // });
  return (
    <Header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <img src={HeaderLogo} alt="logo" className={styles.logo}></img>
          <span className={styles.logoName}>ANYON</span>
        </div>
        {/* <ProfileSection /> */}
      </div>
    </Header>
  );
};
