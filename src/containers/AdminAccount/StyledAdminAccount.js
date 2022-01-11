import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

export const Title = styled.p`
  font-size: 24px;
  font-family: "Poppins";
  color: ${colors.text_header};
  margin-bottom: 0;
  margin-right: 16px;
  font-weight: 600;
  margin-bottom: 33px;
  @media ${breakpoints.sm} {
    font-size: 16px;
  }
`;
export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
`;
export const FlexRight = styled(AlignCenter)`
  justify-content: flex-end;
  button {
    margin-left: 8px;
  }
`;
export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  margin-right: 20px;
`;
export const Status = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 3px;
  background-color: #c0c0c0;
`;
export const CopyIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 8px;
  cursor: pointer;
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
`;
export const ModalBox = styled.div`
  border-radius: 8px;
  background-color: ${colors.second_bg};
  padding: 16px;
  width: 370px;
  border: 1px solid #166cf6;
  box-sizing: border-box;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  @media ${breakpoints.xs} {
    width: 90%;
  }
`;
export const CloseIcon = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
`;
export const TextCenter = styled.div`
  display: flex;
  justify-content: center;
`;
export const EditForm = styled.form`
  margin-top: 24px;
`;
export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 18px;
  font-family: "Open Sans";
  background-color: transparent;
  width: 100%;
  color: ${colors.text_header};
  margin-bottom: 24px;
`;
export const FormGroup = styled(AlignCenter)`
  justify-content: space-between;
  margin: 8px 0;
  p {
    margin: 0;
  }
`;
export const BlockButton = styled.div`
  margin-top: 16px;
  button {
    color: #e1626e;
  }
`;
