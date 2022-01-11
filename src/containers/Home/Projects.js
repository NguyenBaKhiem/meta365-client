import globle from "@Assets/images/globle.png";
import Button from "@Components/Button";
import Text from "@Components/Text";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import React, { useEffect, useRef, useState } from "react";
import Globe from 'react-globe.gl';
import { Link } from "react-router-dom";
import { useMedia } from "react-use";
import styled from "styled-components";

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  @media ${breakpoints.sm} {
    margin-top: 80px;
  }
`;
const GridCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative; 
  p{
    margin-left:0px ;
  }
`;
const GlobleStyle = styled.div`
  position: absolute;
  @media ${breakpoints.sm} {
    position: unset;
    display: flex;
    align-items: center;
    justify-content: center; 
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 100px;
  @media ${breakpoints.sm} {
    grid-template-columns: 1fr;
  }
`;

const Projects = () => {
  const globeEl = useRef();
  const [size, setSize] = useState([0,0]);
  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 4;
    globeEl.current.controls().enableZoom = false;
    if(window.innerWidth<=768 && window.innerWidth>425){
      setSize([window.innerWidth *0.6 ,window.innerWidth *0.6 ]);
  
    }
    if(window.innerWidth>=1440 && window.innerWidth <2560 ){
      setSize([window.innerWidth *0.28 ,window.innerWidth *0.28 ]);
  
    }
    if(window.innerWidth>=2560){
      setSize([window.innerWidth *0.18 ,window.innerWidth *0.18 ]);
  
    }
    if(window.innerWidth>=1024 && window.innerWidth <1440 ){
      setSize([window.innerWidth *0.25 ,window.innerWidth *0.25 ]);
  
    }
    if( window.innerWidth<=425){
      setSize([window.innerWidth *0.8 ,window.innerWidth *0.8 ]);
  
    }

  }, []);
  
  return (
    <ContainerWrapper>
      <div className="container">
        <Grid>
          <GridCell>
            <Text type={"header3"} color={colors.text_header}>
            Superficial Real Estate in<br />Metaverse
            </Text>
            <Text type={"body"} color={colors.text_body}>
              Meta365 plans to introduce a real estate portal, where you can own
              and operate a portfolio of high-quality development properties in
              Metaverses. This virtual dimension is the exact replica of our
              real world, which help potentail buyers and users navigate and
              smoothen any real estate transactions.
            </Text>
            <Text type={"body"} color={colors.accent}>
              Own your dream land now! Metaverse and virtual land ownership are
              right up your street!
            </Text>
            <Link to="land">
            <Button color={colors.new_button} mobile={"full"} width={"252px"}>
              <Text color={colors.button} type={"button"}>
                SEE ALL PROJECT
              </Text>
            </Button>
            </Link>
          </GridCell>

          <GridCell>
            <GlobleStyle>
              <Globe
                width={size[0]}
                height={size[1]}
                ref={globeEl}
                hexPolygonMargin={0.62}
                backgroundColor="rgba(6, 44, 105, 0)"
                globeImageUrl={globle}
                arcColor={'color'}
                arcDashAnimateTime={() => Math.random() * 4000 + 500}
              />
            </GlobleStyle>
          </GridCell>
        </Grid>
      </div>
    </ContainerWrapper>
  );
}

export default Projects;
