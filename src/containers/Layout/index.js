import ball10 from "@Assets/images/ball10.png";
import ball11 from "@Assets/images/ball11.png";
import ball12 from "@Assets/images/ball12.png";
import ball8 from "@Assets/images/ball8.png";
import ball9 from "@Assets/images/ball9.png";
import Footer from "@Components/Footer";
import Header from "@Components/Header";
import breakpoints from "@Theme/breakpoints";
import React,{useEffect, useState} from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background-image: url(${ball8}), url(${ball9}), url(${ball10}), url(${ball11}),
    url(${ball12}), linear-gradient(113.49deg, #062c69 -30.3%, #181e41 75.64%);
  background-size: initial;
  background-repeat: no-repeat;
  background-position: 60% top,left 40vh,right 60vh,40% 110vh,right 155vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  @media ${breakpoints.sm} {
      background: linear-gradient(113.49deg, #062c69 -30.3%, #181e41 75.64%);
  }
  justify-content: space-between;
`;

const Layout = () => {
  const location = useLocation();
  const [isList, setIsList] = useState(false);
  useEffect(() => {
    switch (location.pathname) {
      case "/market-land":
      case "/my-land":
      case "/marketplace":
        setIsList(true);
        break;
      default:
        setIsList(false);
    }
  },[location]);
  return (
    <Wrapper>
      <Header isAdmin={false} />
      <Outlet />
      {!isList && <Footer />}
    </Wrapper>
  );
};

export default Layout;
