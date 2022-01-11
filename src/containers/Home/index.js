import ball1 from "@Assets/images/ball1.png";
import ball2 from "@Assets/images/ball2.png";
import ball3 from "@Assets/images/ball3.png";
import ball4 from "@Assets/images/ball4.png";
import ball5 from "@Assets/images/ball5.png";
import ball6 from "@Assets/images/ball6.png";
import ball7 from "@Assets/images/ball7.png";
import breakpoints from "@Theme/breakpoints";
import React, { useEffect } from "react";
import styled from "styled-components";
import Banner from "./Banner";
import Features from "./Features";
import LandOwner from "./LandOwner";
import NewWay from "./NewWay";
import Projects from "./Projects";
import Roadmap from "./Roadmap";
import Support from "./Support";
import Team from "./Team";
import VRExperience from "./VRExperience";

const Background = styled.div`
  background: url(${ball1}), url(${ball2}), url(${ball3}), url(${ball4}),
    url(${ball5}), url(${ball6}), url(${ball7}),
    linear-gradient(113.49deg, #062c69 -30.3%, #181e41 75.64%);
  background-repeat: no-repeat;
  background-size: initial;
  background-position: left 13%, right 21%, 45% 28%, left 35%, right 53%,
    32% 58%, 70% 77%;
  @media ${breakpoints.sm} {
    background: linear-gradient(113.49deg, #062c69 -30.3%, #181e41 75.64%);
  }
`;

const Home = (props) => {
  useEffect(() => {
    document.addEventListener("scroll", function () {
      let pageTop = document.documentElement.scrollTop;
      let pageBottom = pageTop + window.innerHeight;
      let tabs = document.querySelectorAll(".tab");

      for (let item of tabs) {
        if (item.offsetTop < pageBottom) {
          item.style.opacity = "1";
          item.style.transform = "translate(0, 0)";
        } else {
          item.style.opacity = "0";
          item.style.transform = "translate(0, 10vh)";
        }
      }
    });
    return () => {
      document.removeEventListener("scroll", function () {});
    };
  }, []);

  return (
    <>
      <Background>
        <Banner />
        <Projects />
        {/* <Universe/> */}
        <NewWay />
        <VRExperience />
        {/* <Experience /> */}
        <LandOwner />
        <Support />
        <Features />
        <Roadmap />
        <Team />
      </Background>
    </>
  );
};

export default Home;
