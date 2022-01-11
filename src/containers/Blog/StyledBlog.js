import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
`;
export const FlexRight = styled(AlignCenter)`
  justify-content: flex-end;
`;
export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StatusTag = styled.div`
  padding: 10px 30px;
  background: rgba(68, 216, 249, 0.1);
  border-radius: 20px;
  color: #44d8f9;
  font-size: 14px;
  line-height: 20px;
  width: fit-content;
  @media ${breakpoints.sm} {
    padding: 7px 12px;
    font-size: 12px;
    white-space: nowrap;
  }
`;
export const DeleteTag = styled(StatusTag)`
  background: rgba(198, 69, 77, 0.1);
  color: #c6454d;
`;
export const DraftTag = styled(StatusTag)`
  background: rgba(142, 142, 161, 0.1);
  color: #8e8ea1;
`;
export const Title = styled.p`
  font-size: 24px;
  font-family: "Poppins";
  color: ${colors.text_header};
  margin-bottom: 0;
  margin-right: 16px;
  font-weight: 600;
  @media ${breakpoints.sm} {
    font-size: 16px;
  }
`;
export const TabItem = styled.div`
  padding: 0 8px;
  margin: 8px 0;
  border-right: solid 1px rgba(192, 192, 192, 0.5);
  cursor: pointer;
  &:last-child {
    border: none;
  }
  p {
    margin: 0;
  }
`;
export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  margin-right: 20px;
`;
export const Icon = styled.img`
  width: 16px;
  height: 16px;
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
  position: relative;
  border-radius: 16px;
  background-color: ${colors.second_bg};
  padding: 24px 32px;
  width: 80vw;
  height: 85vh;
  @media ${breakpoints.xs} {
    width: 90%;
  }
`;
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  position: relative;
  & > p{
    flex: 1;
    text-align: center;
  }
`;
export const ProfileInfo = styled.div`
  padding: 16px 0px;
  display: flex;
  align-items: center;
  gap: 16px;
`;
export const CopyIcon = styled.img`
  width: 24px;
  margin-left: 16px;
  cursor: pointer;
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
  margin-bottom: 16px;
`;
export const Textarea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 16px;
  font-family: "Open Sans";
  background-color: transparent;
  width: 100%;
  color: ${colors.text_header};
  margin-bottom: 16px;
`;
export const FileInput = styled(Input)`
  display: none;
`;
export const FileInputLabel = styled.label`
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 18px;
  color: ${colors.text_header};
  align-items: center;
  margin-bottom: 16px;
`;

export const EditorContainer = styled.div`
  margin-bottom: 16px;
  color: white;
  width: 100%;
  max-height: 80vh;
`;

export const TextTitle = styled.div`
  p {
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media ${breakpoints.xs} {
    p {
      width: 100px;
      overflow: hidden;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
export const ModalWrapperConfirm = styled.div`
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
export const ModalBoxConfirm = styled.div`
  border-radius: 8px;
  background-color: ${colors.second_bg};
  padding: 16px;
  width: 370px;
  border: 1px solid #166cf6;
  box-sizing: border-box;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  p {
    text-align: center;
  }
  @media ${breakpoints.xs} {
    width: 90%;
  }
`;
export const CloseIcon = styled.div`
  cursor: pointer;
  position: absolute;
  right: 0px;
`;
export const FlexModel = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;
export const ButtonConfirm = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 22px;
  gap: 16px;
  p {
    margin: 0;
  }
`;
export const NoData = styled.div`
  background: ${colors.second_bg};
  padding: 28px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 8px;
  }
`;

export const CoverWrapper = styled.div`
  position: relative;
  border-radius: 16px;
  background-color: ${colors.second_bg};
  padding: 24px 32px;
  width: 400px;
  @media ${breakpoints.xs} {
    width: 90%;
  }
`;

export const AddImage = styled.div`
  height: 50px;
  cursor: pointer;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 10px;
  & > span {
    color: #f5f5f5;
    font-weight: 600;
    font-size: 16px;
    line-height: 32px;
  }
`;

export const InputImage = styled.input`
  display: none;
`;
export const ImagePreview = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  & > img {
    width: 100%;
    height: auto;
  }
`;
export const ImgCover = styled.div`
img{
    box-sizing: border-box;
    border-radius: 8px;
  }`;
export const ImgClose = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
  
`;
