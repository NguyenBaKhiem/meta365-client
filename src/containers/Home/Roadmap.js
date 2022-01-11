import jupiter from "@Assets/images/Jupiter.png";
import mercury from "@Assets/images/Mercury.png";
import Text from "@Components/Text";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import React, { useState } from "react";
import Slider from "react-slick";
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

const Slide = styled.div`
  color: white;
  margin: 50px 0;
`;

const Line = styled.div`
  border-bottom: 1px solid #f5f5f5;
  position: relative;
  margin: 24px 0;
  &:after {
    content: "|";
    position: absolute;
    font-size: 30px;
    height: 32px;
    left: 24px;
    top: -15px;
  }
`;
const Title = styled.span`
  display: block;
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  margin: 24px;
  line-height: 44px;
  letter-spacing: -0.02em;
  color: #ffffff;
`;

const Content = styled.span`
  display: block;
  font-style: normal;
  font-weight: normal;
  margin: 24px;
  font-size: 16px;
  line-height: 20px;
  color: #c0c0c0;
  ul {
    margin-left: 24px;
    li {
      list-style: disc outside;
      font-size: 16px;
      line-height: 20px;
      color: #c0c0c0;
    }
  }
`;

const Icon = styled.img.attrs((props) => ({
  src: props.src,
  alt: "",
}))`
  margin: 24px;
  width: 120px;
  height: 120px;
`;

function ItemNav1(props) {
  const { title, content, children } = props;
  return (
    <Slide>
      <Title>{title}</Title>
      <Line></Line>
      {content ? (
        <Content>{content}</Content>
      ) : (
        <Content>
          <ul>
            {children &&
              children.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
          </ul>
        </Content>
      )}
    </Slide>
  );
}

const dataNav1 = [
  {
    title: "2018",
    content: "Develop core product",
    children: [],
  },
  {
    title: "Mar 2018",
    content: "Build infrastructure - VR360",
    children: [],
  },
  {
    title: "Jul 2018",
    content: "Test API VR-AR",
    children: [],
  },
  {
    title: "Dec 2018",
    content: "Digitize successfully images",
    children: [],
  },
  {
    title: "2019",
    content: "",
    children: [
      "Develop governing products",
      "Digitize tourism and commercial real estate",
      "Construct administrative model",
    ],
  },
  {
    title: "2020",
    content: "",

    children: [
      "Establish Blockchain Labs for real estate",
      "Establish a small lab to study blockchain in digitizing properties",
      "Test successfully 3 Smart contracts of transferring properties",
      "Research Rust and Binance Smart Chain",
    ],
  },
  {
    title: "2021",
    content: "Research Rust and Binance Smart Chain",
    children: [],
  },
  {
    title: "Jun 2021",
    content: "Launch Meta365 in Metaverse",
    children: [],
  },
  {
    title: "Aug 2021",
    content: "Introduce Team & Advisors",
    children: [],
  },
  {
    title: "Sep 2021",
    content: "Introduce Business Model with VR-AR and Blockchain",
    children: [],
  },
  {
    title: "Nov 2021",
    content: "Introduce Pitch deck, Whitepaper version 3, Tokenomics",
    children: [],
  },
  {
    title: "Dec 2021",
    content: "Introduce Meta365, NFT VR Marketplace, Private Sale",
    children: [],
  },
  {
    title: "Q1 2022",
    content: "",

    children: [
      "Audit by Certik",
      "Digital signature system for real estate transactions",
      "Meta-API Server",
      "Launch IDO UCC Token",
      "List on Pancake, CEX and Coinmarketcap",
    ],
  },
  {
    title: "Q2 2022",
    content: "",

    children: [
      "List on Binance",
      "NFT Marketplace V2",
      "Digitization campaign: Digitize 500 tourism real estate by NFT",
    ],
  },
  {
    title: "Q3-Q4 2022",
    content: "",

    children: [
      "Upgrade the interface",
      "Partner up with 200 real estate exchanges",
      "Digitize 1000 real estate projects",
    ],
  },
  {
    title: "2023",
    content: "",

    children: [
      "Traffic: 25 million visits",
      "Target users in the international market such as Philippine, Germany, Australia, Dubai, EU Savado, etc.",
    ],
  },
  {
    title: "Nov 2023",
    content: "Unicornchain (testnet)",
    children: [],
  },
  {
    title: "May 2024",
    content: "Unicornchain (mainnet), UCC Wallet",
    children: [],
  },
  {
    title: "Nov 2025",
    content: "Multichain",
    children: [],
  },
];

const dataNav2 = [
  {
    src: jupiter,
  },
  {
    src: mercury,
  },
  {
    src: jupiter,
  },
  {
    src: mercury,
  },
  {
    src: jupiter,
  },
  {
    src: mercury,
  },
  {
    src: jupiter,
  },
  {
    src: mercury,
  },
  {
    src: jupiter,
  },
  {
    src: mercury,
  },
  {
    src: jupiter,
  },
  {
    src: mercury,
  },
  {
    src: jupiter,
  },
  {
    src: mercury,
  },
  {
    src: jupiter,
  },
  {
    src: mercury,
  },
  {
    src: jupiter,
  },
  {
    src: mercury,
  },
  {
    src: jupiter,
  },
];
const Roadmap = () => {
  const belowSM = useMedia(breakpoints.sm);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  return (
    <ContainerWrapper>
      <div className="container">
        <Text color={colors.text_header} type={"header3"}>
          Roadmap
        </Text>
        <Text color={colors.text_body} type={"body"}>
          We are at the very beginning of a major metaverse project. With these
          steps, an ecosystem is created which will develop into a global
          digital platform on which businesses can thrive.
        </Text>
        <Text color={colors.accent} type={"body"}>
          Get involved at the very beginning. Be an early adopter!
        </Text>
        {!belowSM && (
          <div>
            <Slider
              arrows={false}
              draggable={false}
              slidesToShow={2}
              speed={900}
              asNavFor={nav2}
              ref={(slider1) => setNav1(slider1)}
            >
              {dataNav2.map((item, index) => (
                <div key={index}>
                  <Icon src={item.src} alt=""></Icon>
                </div>
              ))}
            </Slider>
            <Slider
              asNavFor={nav1}
              ref={(slider2) => setNav2(slider2)}
              slidesToShow={2}
              swipeToSlide={true}
              autoplay={true}
              focusOnSelect={true}
              arrows={false}
            >
              {dataNav1.map((item, index) => (
                <ItemNav1
                  title={item.title}
                  children={item.children}
                  content={item.content}
                  key={index}
                />
              ))}
            </Slider>
          </div>
        )}
        {belowSM &&
          dataNav1.map((item, index) => (
            <ItemNav1
              title={item.title}
              content={item.content}
              children={item.children}
              key={index}
            />
          ))}
      </div>
    </ContainerWrapper>
  );
};

export default Roadmap;
