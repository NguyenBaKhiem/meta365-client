import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import circle_bg from "@Assets/images/circle-bg.png";
import { colors } from "@Theme/colors";

export const MarketplaceWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 100px);
`;
export const MarketGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 24px;

  @media ${breakpoints.sm} {
    grid-template-columns: 1fr;
  }
`;
export const MarketGridScroll = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 24px;

  @media ${breakpoints.sm} {
    grid-template-columns: 1fr;
  }
`;
export const MarketGridDetail = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
  @media ${breakpoints.sm} {
    grid-template-columns: 1fr;
  }
`;
export const MarketGridDetailScroll = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
  @media ${breakpoints.sm} {
    display: none;
  }
  @media ${breakpoints.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;
export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -15px;
  margin-bottom: 5px;
  @media ${breakpoints.sm} {
    flex-direction: column;
    gap: 4px;
    align-items: start;
  }
`;
export const FlexCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${breakpoints.sm} {
    flex-direction: column;
    gap: 16px;
    align-items: start;
  }
`;
export const MarketDetailWrapper = styled(MarketplaceWrapper)`
  /* background-image: url(${circle_bg}); */
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom left;
  margin-top: 15px;
  @media ${breakpoints.sm} {
    background-image: none;
  }
`;
export const MarketLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 24px;
  grid-template-rows: 1fr;
  @media ${breakpoints.sm} {
    grid-template-columns: 1fr;
    grid-gap: 12px;
  }
`;
export const DetailImg = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 26px;
`;
export const InfoDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin: 8px 0px;
  }
  @media ${breakpoints.sm} {
    /* flex-direction : column; */
  }
`;
export const InfoDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0px;
  p {
    margin: 0px;
  }
  @media ${breakpoints.sm} {
    flex-direction: column;
  }
`;
export const InfoHeader = styled(InfoDetail)`
  border-bottom: 0.8px solid #646f9a;
  padding-bottom: 10px;
  margin-bottom: 6px;
`;
export const InfoDetailList = styled.div`
  display: flex;
  margin-top: -17px;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px;
  p {
    margin: 0px;
  }
`;
export const InfoDetailEnd = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -6px;
  margin-top: 12px;
  p {
    margin: 0px;
  }
`;
export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
`;
export const InputGroup = styled(AlignCenter)`
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
export const SendButton = styled.div`
  margin: 16px 0 28px 0;
  @media ${breakpoints.sm} {
    margin: 32px 0 20px 0;
  }
`;
export const TableCover = styled.div`
  border: none;
  background: rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  border-radius: 16px;
  padding: 20px;
  div {
    border: none;
  }
  @media ${breakpoints.sm} {
    margin-top: 20px;
  }
`;
export const TextHeader = styled.div`
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${colors.text_header} !important;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  @media ${breakpoints.sm} {
    max-width: 280px;
  }
  @media ${breakpoints.xs} {
    max-width: 130px;
  }
`;
export const TextDetail = styled.div`
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  color: ${colors.text_body} !important;
  text-overflow: ellipsis;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  @media ${breakpoints.sm} {
    max-width: 280px;
    margin-bottom: 14px;
  }
  @media ${breakpoints.xs} {
    max-width: 130px;
  }
`;
export const TextCount = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  color: ${colors.accent} !important;
`;
export const Button = styled.button`
  border-radius: 12px;
  background-color: ${colors.primary};
  color: #ececec;
  border: none;
  padding: 9px 9px;
  cursor: pointer;
  font-size: 14px;
  line-height: 26px;
  text-align: center;
  font-weight: 600;

  @media ${breakpoints.sm} {
    width: 100%;
    font-size: 16px;
  }
`;
export const SwapWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Tab = styled.div`
  display: flex;
  align-items: center;
  margin: 32px 0 40px 0;
  background-color: #202135;
  border-radius: 8px;
  height: 56px;
  @media ${breakpoints.sm} {
    justify-content: center;
  }
`;
export const TabItem = styled.div`
  width: 180px;
  height: 56px;
  align-items: center;
  padding: 0px 13px;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  color: #6c757d;
  cursor: pointer;
  font-family: Poppins;
  font-weight: 600;
  font-size: 16px;
  &:hover {
    background-color: ${colors.primary};
    color: ${colors.text_header};
  }
  @media ${breakpoints.sm} {
    width: 109px;
    height: 56px;
  }
`;
export const Border = styled.div`
  border-radius: 18px;
  padding: 16px 16px;
  margin-top: -7px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  @media ${breakpoints.sm} {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 2px 4px 6px rgba(7, 12, 56, 0.1);
    border: none;
  }
`;
export const OfferButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  gap: 20px;
  @media ${breakpoints.sm} {
    flex-direction: column;
  }
`;
export const PriceContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  p {
    margin: 0px;
    font-family: "Open Sans";
  }
`;
export const ContentRegular = styled.div`
  height: fit-content;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 2px 4px 6px rgba(7, 12, 56, 0.1);
  border-radius: 16px;
  padding: 24px;
  margin-top: 60px;
  li {
    margin-top: 10px;
    list-style: disc;
    margin-left: 30px;
  }
  @media ${breakpoints.sm} {
    margin-top: 20px;
  }
`;
export const Detail = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 32px 16px;
  box-shadow: 2px 4px 6px rgba(7, 12, 56, 0.1);
  border-radius: 16px;
  padding-bottom: 40px;
  @media ${breakpoints.sm} {
    margin-top: 20px;
  }
`;
export const Slide = styled.div`
  width: 350px;
  /* height: 350px; */
  position: relative;
  @media ${breakpoints.xs} {
    width: 350px !important;
  }
  @media ${breakpoints.sm} {
    width: 80vw;
  }
`;
export const Logo = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${breakpoints.sm} {
    display: none;
  }
`;
export const LogoImg = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 12px;
  object-fit: content;
  @media ${breakpoints.sm} {
    height: 100%;
    width: 100%;
  }
  @media ${breakpoints.xs} {
    height: 300px;
    width: 100%;
  }
`;
export const SwapSlide = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  @media ${breakpoints.sm} {
    padding-bottom: 2px;
    margin-top: 0px;
  }
  @media ${breakpoints.xs} {
    /* padding-bottom: 60px; */
  }
`;
export const NoData = styled.div`
  margin: 150px 0;
  display: flex;
  justify-content: center;
`;
export const SearchWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin: 75px 0 20px;
  @media ${breakpoints.sm} {
    justify-content: center;
  }
`;
export const FlexMarketDetail = styled.div`
  display: flex;
  justify-content: center;
  p {
    margin-top: 3px;
  }
  @media ${breakpoints.sm} {
    margin-top: 10px;
    gap: 23px;
  }

  /* gap: 10px; */
`;
export const FlexMarketDetailVoting = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #00b67f;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  padding-bottom: 10px;
  gap: 5px;

  p {
    font-weight: 700;
  }
  @media ${breakpoints.sm} {
    margin-top: 10px;
    width: 55%;
    margin: auto;
    p {
      margin: 0px;
    }
  }
`;
export const FlexMarketDetailWrap = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${breakpoints.sm} {
    flex-direction: column;
  }
`;
export const ActivityWrapper = styled.div`
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 2px 4px 6px rgba(7, 12, 56, 0.1);
  border-radius: 16px;
  padding: 40px 30px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  border-radius: 16px;
  height: 500px;

  div {
    border: none;
  }
  @media ${breakpoints.sm} {
    height: unset;
    padding-top: 20px;
  }
`;
export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
  @media ${breakpoints.sm} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export const SearchButton = styled.button`
  width: 180px;
  background-color: transparent;
  font-family: "Open Sans";
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-sizing: border-box;
  border-radius: 8px;
  padding: 12px 24px;
  gap: 20px;
  margin-top: -6px;
  @media ${breakpoints.sm} {
    margin-top: 10px;
    width: 100%;
  }
`;
export const ButtonList = styled.button`
  background-color: transparent;
  font-family: "Open Sans";
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #4285f4;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 10px 12px;
  gap: 20px;
  margin-top: -6px;
  margin-right: 10px;
  cursor: pointer;
  p {
    margin: 0px;
  }
  @media ${breakpoints.sm} {
    margin-bottom: 12px;
    /* width: 45%; */
    width: fit-content;
  }
`;
export const TableButton = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 10px;
  position: absolute;
  top: -60px;
  @media ${breakpoints.sm} {
    flex-wrap: wrap;
    top: -100px;
  }
`;
export const ListAllItems = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-sizing: border-box;
  backdrop-filter: blur(30px);
  border-radius: 8px;
  justify-content: center;
  /* padding:14px 28px 0px 24px; */
  margin-top: 10px;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 5;
`;
export const ListAllItem = styled.div`
  display: flex;
  gap: 8px;
  justify-content: left;
  padding: 15px 35px;
  cursor: pointer;
  p {
    margin: 0px;
  }
`;
export const FlexHeader = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  @media ${breakpoints.sm} {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;
export const DetailHeader = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  border-radius: 16px;
  padding: 24px 16px;
  margin-top: 20px;
  @media ${breakpoints.sm} {
  }
`;
export const ButtonShowMore = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
  margin: auto;
  margin-top: 20px;
`;

export const TagCode = styled.div`
  background: linear-gradient(214.02deg, #4285F4 6.04%, #5B1AE4 92.95%);
  border-radius: 32px;
  padding: 4px 8px;
  position: absolute;
  font-family: Poppins;
  color: white;
  font-weight: 500;
  top: 31px;
  right: 32px;
  font-size: 12px;
  line-height: 16px;
`;
export const TagCodeDetail = styled.div`
  background: #fbbc05;
  border-radius: 32px;
  padding: 4px 8px;
  font-family: Poppins;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  padding-top: 8px;
`;
export const FlexTitle = styled.div`
  display: flex;
  gap: 10px;
`;
export const CountDownTime = styled.div`
  border-radius: 4px;
  padding: 3px 10px;
  height: 29px;
  padding-bottom: 8px;
  p {
    margin-top: 5px;
  }
  padding-bottom: 0px;
`;
export const CountdownDiv = styled.div`
  width: 30px;
  height: 28px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: inset 1px 1px 2px rgba(12, 66, 27, 0.25);
  border-radius: 2.69565px;
  padding-left: 5px;
  display: flex;
  align-items: center;
`;
export const FlexCountdown = styled.div`
  display: flex;
  gap: 6px;
`;
export const WrapCountdown = styled.div`
  display: flex;
  height: 95px;
  margin-bottom: 20px;
`;
export const Amount = styled.div`
  border: 1px solid ${colors.accent};
  box-sizing: border-box;
  border-radius: 4px;
  padding: 2px 6px;
`;
export const View = styled.div`
  position: absolute;
  top: 7px;
  right: 7px;
  cursor: pointer;
  @media ${breakpoints.sm} {
    right: 15px;
    top: 10px;
  }
  @media ${breakpoints.xs} {
    right: 7px;
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 20px;
`;

export const TableWrap = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 75px;
  @media ${breakpoints.sm} {
    margin-top: 125px;
  }
`;

export const SelectButton = styled.div`
  background: ${(props) => (props.active ? "#FBBC05" : "#fff")};
  border: 1px solid #fbbc05;
  box-sizing: border-box;
  box-shadow: 0px 0px 0px 2px rgba(251, 188, 5, 0.3);
  border-radius: 4px;
  position: absolute;
  top: 30px;
  left: 30px;
  width: 20px;
  height: 20px;
`;
export const PageHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  h2 {
    font-family: Poppins;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: #f5f5f5;
  }
`;

export const MultipleOffer = styled.div`
  background: #00b67f;
  border-radius: 10px;
  padding: 12px 24px;
  font-family: Poppins;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #f5f5f5;
  cursor: pointer;
`;

export const SelectOffer = styled.div`
  background: ${(props) => (props.active ? "#FBBC05" : "#fff")};
  border: 1px solid #fbbc05;
  box-sizing: border-box;
  box-shadow: 0px 0px 0px 2px rgba(251, 188, 5, 0.3);
  border-radius: 4px;
  position: absolute;
  top: 30px;
  left: 30px;
  width: 20px;
  height: 20px;
`;

export const TotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  align-items: center;
  & > span{
    color: #FBBC05
  }
`;

export const Price = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  margin-bottom: 10px;
  color: #F8F9FA;
  justify-content: flex-end;
  & > img{
    width: 24px;
    height: auto;
  }
`;