import React from "react";
import styled from "styled-components";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const Loading = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
   disableBodyScroll(ref.current);
   setTimeout(() => {
    clearAllBodyScrollLocks()
   }, 1000);
  }, [])
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%", zIndex: 999, position: "absolute",overflow:'hidden' }} ref={ref}>
        <Wrapper />
        <ImageLoad src={require("../assets/img/load.gif")} alt="loading..." resize="cover" />
      </div>
    </>
  );
};

const Wrapper = styled.section`
  height: 100%;
  width: 100%;
  background: #666;
  opacity: 0.4;
  position: absolute;
`;

const ImageLoad = styled.img`
  height: 100px;
  width: 100px;
  position: absolute;
  border-radius: 100px !important;
  -webkit-box-shadow: 3px 6px 24px -6px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 6px 24px -6px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 6px 24px -6px rgba(0, 0, 0, 0.75);
`;


export default Loading;
