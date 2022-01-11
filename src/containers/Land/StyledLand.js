import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import styled from "styled-components";

export const LandWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  padding-bottom: 120px;
  min-height:540px;
  @media ${breakpoints.sm} {
    background-image: none;
  }
`;
export const LandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 48px;
  @media ${breakpoints.sm} {
    grid-template-columns: 85vw;
  }
`;

export const Card = styled.div`
  position: relative;
  .detail{
    overflow: hidden;
  }
  &:hover {
    .detail {
      animation: slideIn 0.2s linear forwards;
    }
  }
  @keyframes slideIn {
    from {
      opacity: 0;
      height: 0px;
    }
    to {
      opacity: 1;
      height: 145px;
    }
  }
  img {
    width: 100%;
    aspect-ratio: 1.5/1;
    object-fit: cover;
    border-radius: 4px;
  }
`;
export const LandFlex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px 24px;
  background: rgba(30, 32, 39, 0.6);
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0;
  transition: all 0.5s;
  opacity: 0;
  @media ${breakpoints.sm} {
    padding-bottom: 30px;
  }
`;
export const LandDetailWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-size: cover;
  background-position: center;
  padding: 0px 0;
`;
export const ContentWrapper = styled.div`
  padding: 32px 24px;
  border-radius: 16px;
  background-color: ${colors.second_bg};
  width: 323px;
  height: 67%;
  opacity: 0.85;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.5s;
  @media ${breakpoints.sm} {
    position: fixed;
    width: 100vw;
    height: fit-content;
    left: 0;
    border-radius: 0;
    bottom: 0;
  }
`;
export const FlexMiddle = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0;
  }
`;
export const InfoDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LandInfo = styled.div`
  padding: 32px 0;
  @media ${breakpoints.sm} {
    padding: 24px 0;
  }
`;
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 50px 0px 30px 0px;
  @media ${breakpoints.sm} {
    flex-direction: column;
    margin-top: 25px;
  }
`;
export const CloseIcon = styled.img`
  width: 16px;
  height: 16px;
  display: none;
  @media ${breakpoints.sm} {
    display: block;
  }
`;
export const ModalWrapper = styled.div`
  position: fixed;
  z-index: 15;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${breakpoints.sm} {
    align-items: end;
  }
`;

export const ModalBox = styled.div`
  border-radius: 16px;
  background-color: ${colors.second_bg};
  padding: 24px;
  width: 606px;
  @media ${breakpoints.sm} {
    width: 100%;
    border-radius: 0px;
  }
`;
export const OfferLayout = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-gap: 24px;
  margin: 32px 0;
`;
export const OfferImg = styled.img`
  width: 80px;
  aspect-ratio: 1/1;
  object-fit: cover;
`;
export const InputGroup = styled(FlexMiddle)`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid ${colors.primary};
  margin: 0px 12px 0 0;
`;
export const IconGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;
export const Icon = styled.img`
  cursor: pointer;
`;
export const Img = styled.img`
  width: 100%;
  height: 810px;
  margin-bottom: 64px;
  @media ${breakpoints.sm} {
    width: 100%;
    object-fit: cover;
  }
`;
export const ImgDetail = styled.img`
  width: 100%;
  margin-bottom: 64px;
`;
export const WrapperLandDetail = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const LandDetailHeader = styled.div`
  display: flex;
  justify-content: left;
  margin: 18px 0px 0px 23px;
  @media ${breakpoints.sm} {
    margin: 0px;
    width: 72%;
    margin: 20px 0px 24px -3px;
  }
  @media ${breakpoints.xs} {
    margin: 0px;
    width: 100%;
    margin: 20px 0px 24px -3px;
  }
`;
export const LandDetailContent = styled.div`
  display: flex;
  justify-content: center;
  margin-left: -100px;
  ul {
    list-style: disc;
    margin: 20px 0px 0px 40px;
  }
  p {
    font-size: 16px;
  }
  @media ${breakpoints.sm} {
    margin-left: 0px;
    ul {
      margin-top: 10px;
    }
    p {
      margin-top: 0px;
      margin-bottom: 0px;
    }
  }
`;
export const LandDetailTable = styled.div`
  display: flex;
  justify-content: center;
  gap: 28px;
  width: 100%;
  padding: 24px 24px 4px 24px;
  border: 1px solid #f5f5f5;
  box-sizing: border-box;
  border-radius: 16px;
  margin-top: 48px;
  p {
    font-size: 16px;
  }
  @media ${breakpoints.sm} {
    flex-direction: column;
    gap: 10px;
    height: 200px;
    margin-top: 10px;
    display: block;
    padding: 13px 8px 0px 13px;
  }
`;
export const Scroll = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 28px;
  p {
    font-size: 16px;
  }
  @media ${breakpoints.sm} {
    height: 170px;
    padding-right: 10px;
    overflow-y: scroll;
    overflow-x: hidden;
    display: block;
  }
`;
export const LandDetailTableLeft = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media ${breakpoints.sm} {
    gap: 0px;
  }
`;
export const LandDetailTableRight = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media ${breakpoints.sm} {
    justify-content: space-between;
  }
`;
export const LandDetailTableRowRight = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-between;
  gap: 68px;
  margin-bottom: 6px;
  @media ${breakpoints.sm} {
    /* gap:unset; */
    gap: 0px;
  }
`;
export const LandDetailTableRowUnit = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-between;
  gap: 140px;
  margin-bottom: 6px;
  @media ${breakpoints.sm} {
    /* gap:unset; */
    gap: 115px;
  }
`;
export const LandDetailTableRowLegal = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 6px;
  @media ${breakpoints.sm} {
    /* gap:unset; */
    gap: 68px;
  }
`;

export const LandDetailTableRowLeft = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-between;
  gap: 63px;
  margin-bottom: 6px;
  @media ${breakpoints.sm} {
    gap: 22px;
  }
`;
export const WrapImg = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80xp;
  flex-direction: column;
`;
export const LandWrapperFrame = styled.div`
  background: rgba(30, 32, 39, 0.7);
  border-radius: 32px;
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0px 24px;
  @media ${breakpoints.sm} {
    width: 75%;
  }
`;
export const LandWrapperFlex = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100vw;
  top: 97px;
  @media ${breakpoints.sm} {
    top: 22px;
  }
`;

export const Loading = styled.div`
  width: 100%;
  border-radius: 4px;
  height: 355px;
  background: #FFFFFF33;
`;
export const NoData = styled.div`
  background: transparent;
  padding: 28px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 8px;
  }
`;
export const FlexLeft = styled.div`
  margin-top:36px;
  display: flex;
  justify-content:left;
  width: 100%;

`