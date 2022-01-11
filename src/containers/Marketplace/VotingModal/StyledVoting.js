import styled from "styled-components";
import { colors } from "@Theme/colors";
import breakpoints from "@Theme/breakpoints";
import background from "@Assets/images/voting-bg.png";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(44, 55, 91, 0.5);
  z-index: 1000;
  @media ${breakpoints.sm} {
    top: 66px;
  }
`;
export const Modal = styled.div`
  width: 606px;
  background: linear-gradient(113.49deg, #062c69 -30.3%, #181e41 75.64%);
  backdrop-filter: blur(50px);
  border-radius: 24px;
  @media ${breakpoints.sm} {
    border-radius: 0;
    overflow-y: scroll;
    max-height: 100vh;
  }
`;
export const ConfirmModalContainer = styled.div`
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
  &>div{
    flex: 1 1 100%;
  }
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
  gap: 10px;
  margin: 4px 0;
  p {
    &:last-child {
      text-align: end;
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
export const CountdownWrapper = styled.div`
`;
export const Title = styled.p`
  font-family: Poppins;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #f5f5f5;
  text-align: center;
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
export const FormWrapper = styled.div`
  padding: 16px 24px;
`;
export const GroupButton = styled.div`
  margin: 24px 0;
  display: flex;
  align-items: center;
  gap: 16px;
  button {
    flex: 1 1 100%;
    cursor: pointer;
  }
  .disagree {
    border: 1px solid #4285f4;
    color: ${colors.new_primary};
  }
`;
export const Rules = styled.ul`
  margin-top: 16px;
  margin-left: 20px;
  li {
    list-style: disc;
    color: ${colors.text_header};
  }
`;
export const VoteRulesWrapper = styled.div`
  position: relative;
`;
export const VoteRulesTitle = styled.div`
  cursor: pointer;
  &:hover ~ .rules {
    display: block;
    opacity: 1;
  }
  p {
    font-weight: 700;
    &:hover{
    text-decoration: underline;
    }
  }
`;
export const VoteRulesBox = styled(VotingDetail)`
  position: absolute;
  left: 0;
  top: 145%;
  background: rgba(29, 40, 82, 0.8);
  border: 1px solid #4285f4;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  transition: 0.5s;
  opacity: 0;
  display: none;
  &:before {
    content: "";
    border-style: solid;
    border-width: 0px 15px 15px 15px;
    border-color: transparent transparent #4285F4 transparent;
    position: absolute;
    left: 28px;
    top: -15px;
  }
`;
export const StopTitle = styled.div`
  text-align: center;
  margin: 20px 0;
  p {
    font-weight: 600;
  }
`;