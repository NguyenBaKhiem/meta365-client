import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import circle_bg from "@Assets/images/circle-bg.png";
import { colors } from "@Theme/colors";
import down_icon from "@Assets/images/calendar.png";

export const MyLandWrapper = styled.div`
  display: flex;
  min-height: calc(100vh - 100px);
`;

export const Main = styled.div`
  margin: 30px 60px;
  flex: 1;
  @media ${breakpoints.sm} {
    margin: 20px;
  }
`;

export const Grid = styled.div`
  padding-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 24px;
`;

export const Background = styled.div`
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 2px 4px 6px rgba(7, 12, 56, 0.1);
  border-radius: 16px;
  width: 100%;
  margin: 20px 0;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media ${breakpoints.sm} {
    flex-direction: column;
    gap: 4px;
    align-items: start;
  }
`;
export const FlexStart = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
  @media ${breakpoints.sm} {
    justify-content: center;
  }
`;
export const MyLandDetailWrapper = styled(MyLandWrapper)`
  /* background-image: url(${circle_bg}); */
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom left;
  margin-top: 15px;
  margin-bottom: 120px;
  @media ${breakpoints.sm} {
    background-image: none;
  }
`;
export const Navigation = styled.div`
  display: flex;
`;
export const MyLandLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 67px;
  margin-top: 28px;
  @media ${breakpoints.sm} {
    grid-template-columns: 1fr;
    grid-gap: 32px;
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
  & > p:nth-child(2) {
    text-align: right;
  }
`;
export const HeaderDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  & > p:nth-child(2) {
    text-align: right;
  }
  @media ${breakpoints.sm} {
    justify-content: center;
  }
`;
export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  gap: 16px;
  @media ${breakpoints.sm} {
    flex-direction: column;
    align-items: flex-start;
  }
  .flex {
    gap: 24px;
    width: 78%;
    @media ${breakpoints.sm} {
      width: 100%;
    }
    div {
      width: 50%;
      @media ${breakpoints.sm} {
        width: 40vw;
      }
    }
  }
`;

export const Label = styled.label`
  color: #fff;
  width: 20%;
  @media ${breakpoints.sm} {
    width: 100%;
  }
`;

export const InputGroup = styled.div`
  position: relative;
  flex: 1;
  @media ${breakpoints.sm} {
    width: 100%;
  }
`;
export const StyledInput = styled.input`
  padding: 17px 75px 17px 24px;
  color: #b2b2b2;
  border: 1px solid ${colors.accent};
  box-sizing: border-box;
  border-radius: 12px;
  font-size: 14px;
  background-color: transparent;
  width: 100%;

  &:focus {
    border: 1px solid ${colors.primary};
    outline: none;
  }
`;
export const Token = styled.div`
  position: absolute;
  top: 12px;
  right: 24px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
export const SendButton = styled.div`
  margin: 30px 0 30px 0;
  @media ${breakpoints.sm} {
    margin: 32px 0 20px 0;
  }
`;
export const ButtonGroup = styled(AlignCenter)`
  gap: 24px;
  margin: 24px 0;
`;
export const TableCover = styled.div`
  margin-top: 48px;
  @media ${breakpoints.sm} {
    margin-top: 10px;
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
  height: 50px;
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
    height: 48px;
  }
`;
export const Border = styled.div`
  border-radius: 18px;
  border: 1px solid #c4c4c4;
  @media ${breakpoints.sm} {
    border: none;
  }
  padding: 16px;
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
  font-size: 14px;
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
  margin-top: 10px;
  color: ${colors.accent} !important;
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
export const Button = styled.button`
  background: linear-gradient(214.02deg, #4285f4 6.04%, #5b1ae4 92.95%);
  border-radius: 8px;
  color: #ececec;
  border: none;
  padding: 9px 15px;
  cursor: pointer;
  font-size: 14px;
  line-height: 26px;
  margin-top: 10px;
  text-align: center;
  font-weight: 600;
  width: 100%;
  &:hover {
    box-shadow: 0px 0px 16px rgba(5, 100, 253, 0.8);
  }
  @media ${breakpoints.sm} {
    margin: 20px 0px;
  }
`;

export const ButtonFilter = styled.button`
  border: none;
  border-radius: 12px;
  background-color: #166cf6;
  width: 100%;
  padding: 20px 0;
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  color: #ececec;
  margin: 0px 0 36px 0;
`;
export const FormGroup = styled.div`
  position: relative;

  @media ${breakpoints.sm} {
    width: 100%;
  }
  p {
    padding-bottom: 24px;
  }
  input {
    background: transparent;
    border-radius: 8px;
    width: 100%;
    color: ${colors.text_header};
    border: 1px solid ${colors.accent};
    font-size: 18px;
    padding: 12px 24px;
    font-weight: 600;
    &:focus {
      border: 1px solid white;
      outline: none;
    }

    &::placeholder {
      color: ${colors.text_body};
    }
  }
  input[type="date"]::-webkit-calendar-picker-indicator {
    color: rgba(0, 0, 0, 0);
    opacity: 1;
    display: block;
    background: url(${down_icon}) no-repeat;
    background-size: contain;
    border-width: thin;
  }
  select {
    background: url(${down_icon}) no-repeat right #23252c;
    -webkit-appearance: none;
    background-position-x: 96%;
    padding: 16px 24px;
  }
  .icon {
    position: absolute;
    top: 60px;
    right: 24px;

    p {
      padding: 0;
      padding-left: 5px;
    }
  }
  .calendar-icon {
    position: absolute;
    top: 54px;
    left: 24px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin: 24px 0;
  & > span {
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: -0.01em;
    color: #f5f5f5;
  }
  & > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
  }
`;

export const Badge = styled.div`
  width: 60px;
  height: 23.99px;
  right: 40px;
  top: 36px;
  background: #fbbc05;
  border-radius: 31.8992px;
  display: grid;
  place-content: center;
  & > span {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #1d2852;
  }
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
export const MultipleSell = styled.div`
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

export const MultipleWrapper = styled.div`
  h1 {
    font-family: Poppins;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: #f5f5f5;
  }
  h2 {
    font-size: 14px;
    line-height: 22px;
    color: #c0c0c0;
  }
`;
export const MultipleTable = styled.div`
  background: #2c375b;
  box-shadow: inset 0px 4px 2px rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  padding: 16px;
  table {
    thead {
      padding-right: 20px;
      th {
        font-weight: bold;
        font-size: 12px;
        line-height: 16px;
        color: #f6f9ff;
        &:nth-child(2) {
          text-align: center;
        }
      }
    }
    tbody {
      td {
        font-size: 12px;
        line-height: 16px;
        color: #f6f9ff;
        &:nth-child(2) {
          text-align: center;
        }
        &:nth-child(3) {
          text-align: right;
        }
        img{
          cursor: pointer;
        }
      }
    }
  }
`;
