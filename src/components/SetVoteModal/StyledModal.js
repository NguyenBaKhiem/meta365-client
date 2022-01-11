import styled from "styled-components";
import { colors } from "@Theme/colors";
import breakpoints from "@Theme/breakpoints";
import background from "@Assets/images/voting-bg.png";
import calendar from "@Assets/images/white-calendar.png";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: rgba(44, 55, 91, 0.5); */
  z-index: 10;
  @media ${breakpoints.sm} {
    top: 40px;
    /* height: calc(100vh - 66px) */
  }
`;
export const Modal = styled.div`
  width: 606px;
  background: ${colors.background};
  backdrop-filter: blur(50px);
  border-radius: 24px;
  @media ${breakpoints.sm} {
    width: 100%;
    border-radius: 0;
    overflow-y: scroll;
    max-height: calc(100% - 56px);
  }
`;
export const ModalHeader = styled.div`
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 2px 4px 6px rgba(7, 12, 56, 0.1);
  border-radius: 24px 24px 0px 0px;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    cursor: pointer;
    height: 16px;
  }
`;
export const ModalBody = styled.div``;
export const Flex = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 24px;
  @media ${breakpoints.sm} {
    flex-direction: column;
  }
`;
export const LandImage = styled.img`
  width: 190px;
  aspect-ratio: 1/1;
  border-radius: 10px;
  @media ${breakpoints.sm} {
    width: 100%;
  }
`;
export const VotingDetail = styled.div`
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 2px 4px 6px rgba(7, 12, 56, 0.1);
  border-radius: 16px;
  padding: 12px 16px;
  width: 100%;
  margin-top: 12px;
`;
export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  margin: 4px 0;
  p {
    &:last-child {
      text-align: end;
    }
  }
`;
export const ReversePriceWrapper = styled.div`
  padding: 0 24px;
`;
export const FormGroup = styled.div`
  border: 1px solid #7683b6;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  margin-top: 8px;
`;
export const PriceInput = styled.input`
  padding: 8px 14px;
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #f6f9ff;
  background: transparent;
  width: 80%;
  border: none;
  &:focus {
    outline: none;
    border: none;
  }
  @media ${breakpoints.xs} {
    width: 65%;
  }
`;
export const TokenSelect = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  justify-content: center;
  gap: 5px;
  position: relative;
  border-left: 1px solid #7683b6;
  @media ${breakpoints.xs} {
    width: 35%;
  }
`;
export const TokenOptions = styled.div`
  position: absolute;
  top: 130%;
  right: 0%;
  border-radius: 8px;
  background: #2c375b;
`;
export const Option = styled.div`
  padding: 8px 24px;
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  &:hover {
    background: rgba(66, 133, 244, 0.1);
  }
`;
export const Cashback = styled(Info)`
  padding: 16px;
`;
export const ScheduleTitle = styled.div`
  padding: 12px 40px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  border-radius: 0px;
  gap: 6px;
`;
export const DateGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1e2027;
  padding: 12px 40px 24px 40px;
`;
export const DateInput = styled.div`
  position: relative;
  input {
    background: #1d2852;
    border-radius: 4px;
    width: 180px;
    padding: 12px 0px 12px 40px;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    color: #f6f9ff;
    border: none;
    margin-top: 5px;
    &::-webkit-calendar-picker-indicator {
      position: absolute;
      left: -10px;
      background: url(${calendar}) no-repeat;
    }
    &::-webkit-datetime-edit {
      position: relative;
      left: 0;
    }
    &::-webkit-datetime-edit-fields-wrapper {
      position: relative;
      left: 0;
    }
    &:focus {
      outline: none;
      border: none;
    }
    @media ${breakpoints.sm} {
      width: 160px;
    }
  }
  img {
    position: absolute;
    top: 53%;
    left: 12px;
  }
`;
export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 24px;
  gap: 16px;
  button {
    &:first-child {
      color: ${colors.new_primary};
      border: 1px solid ${colors.new_primary};
    }
  }
`;
export const ProgressWrapper = styled.div`
  position: relative;
  margin-bottom: 30px;
`;
export const TotalProgress = styled.progress`
  background-color: rgba(255, 255, 255, 0.2);
  width: 100%;
  margin-bottom: 8px;
  margin-top: 3px;
  border-radius: 60px;
  height: 24px;
  &[value]::-webkit-progress-bar {
    background-color: #D95C74;
    /* box-shadow: 0px 0px 11px rgba(217, 92, 116, 0.6); */
    border-radius: 60px;
  }
  &[value]::-webkit-progress-value {
    background: linear-gradient(214.02deg, #4285F4 6.04%, #5B1AE4 92.95%);
    box-shadow: 0px 0px 6px rgba(91, 26, 228, 0.6);
    border-radius: 50px 0px 0px 50px;
  }
  &::-moz-progress-bar {
    border-radius: 60px;
  }
}
`;
export const ProgressValue = styled.div`
  position: absolute;
  top: 12%;
  left: 47%;
`;
export const VotingWrapper = styled.div`
  background-image: url(${background});

  padding: 12px 24px 24px 24px;
`;
export const CountdownWrapper = styled.div``;
export const Title = styled.p`
  font-family: Poppins;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #f5f5f5;
  text-align: center;
  margin-bottom: 8px !important;
`;
export const CountdownBox = styled.div`
  display: flex;
  justify-content: space-between;
  background: rgba(41, 83, 165, 0.2);
  border: 1px solid #7683b6;
  box-sizing: border-box;
  backdrop-filter: blur(73.8495px);
  border-radius: 12px;
  padding: 10px 32px; ;
`;
export const CountdownTime = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 48px;
  color: ${colors.text};
  text-align: center;
  p {
    font-family: Poppins;
  }
`;
export const ConfirmModal = styled.div`
  padding: 16px 14px;
  width: 328px;
  background: #222235;
  box-shadow: 1.77297px 1.77297px 3.54595px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  @media ${breakpoints.xs} {
    width: 90vw;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
      font-weight: 600;
    }
  }
  button{
    &:last-child{
      color: ${colors.new_primary};
      border: 1px solid ${colors.new_primary};
      margin-top: 16px;
    }
  }
`;
export const StopTitle = styled.div`
  text-align: center;
  margin: 20px 0;
  p {
    font-weight: 600;
  }
`;
