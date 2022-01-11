import cancel from "@Assets/images/X.png";
import breakpoints from "@Theme/breakpoints";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Text from "../../components/Text";
import { colors } from "../../theme/colors";
import Market from "./Tab/Market";
import RegularAuction from "./Tab/RegularAuction";
import ReverseAuction from "./Tab/ReverseAuction";
export const ModalWrapper = styled.div`
  position: fixed;
  z-index: 15;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #2c375b5a;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${breakpoints.xs} {
    align-items: flex-start;
    top: 100px;
    height: calc(100vh - 100px);
  }
`;
export const ModalBoxTest = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(100px);
  border-radius: 8px;
  padding: 24px 32px;
  width: 700px;
  @media ${breakpoints.xs} {
    width: 320px;
    position:relative;
    overflow:auto;
    height:100%;
  }
  & > h2{
    font-size: 14px;
    line-height: 22px;
    color: #C0C0C0;
    margin: 16px 0;
  }
`;
export const TextHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${breakpoints.xs} {
    width: 90%;
  }
  & > p {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: -0.01em;
    color: #f5f5f5;
  }
  & > div {
    cursor: pointer;
  }
`;

export const Response = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
`;

const Tab = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 20px;
  padding: 14px;
`;

const TabLabel = styled.div`
  cursor: pointer;
  position: relative;
  color: ${(props) => (props.active ? "#F6F9FF" : "rgba(246, 249, 255, 0.3)")};
  &:before {
    display: ${(props) => (props.active ? "block" : "none")};
    position: absolute;
    content: "";
    border-bottom: 2px solid #4285f4;
    padding: 14px;
    width: 100%;
  }
  transition: all 1s;
`;

const BatchSell = ({ ...props }) => {
  const { selectedItem, onCloseModal, handleDelete, isUpdate, sellType } =
    props;
  const [type, setType] = useState("market");

  const renderLayout = () => {
    switch (type) {
      case "market":
        return (
          <Market
            isMulti={true}
            handleDelete={handleDelete}
            data={selectedItem}
          />
        );
      case "auction":
        return (
          <RegularAuction
            isMulti={true}
            handleDelete={handleDelete}
            data={selectedItem}
          />
        );
      case "reverse-auction":
        return <ReverseAuction isMulti={true} data={selectedItem} />;
      default:
    }
  };
  useEffect(() => {
    selectedItem.length === 0 && onCloseModal();
  }, [selectedItem]);
  return (
    <>
      <ModalWrapper>
        <ModalBoxTest>
          <>
            <TextHeader>
              <Text type={"header2"} color={colors.text_header}>
                Select your selling method
              </Text>
              <div onClick={onCloseModal}>
                <img src={cancel} alt=""/>
              </div>
            </TextHeader>
            <Tab>
              <TabLabel
                active={type === "market"}
                onClick={() => setType("market")}
              >
                Market
              </TabLabel>
              <TabLabel
                active={type === "auction"}
                onClick={() => setType("auction")}
              >
                Regular Auction
              </TabLabel>
              <TabLabel
                active={type === "reverse-auction"}
                onClick={() => setType("reverse-auction")}
              >
                Reverse Auction
              </TabLabel>
            </Tab>
          </>
          {renderLayout()}
        </ModalBoxTest>
      </ModalWrapper>
    </>
  );
};
export default BatchSell;
