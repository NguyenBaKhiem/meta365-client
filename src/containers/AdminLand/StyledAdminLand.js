import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import down_icon from "@Assets/images/dropdown-arrow.png";

export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
`;
export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const Title = styled.p`  
  font-size: 24px;
  color: ${colors.text_header};
  margin :30px 16px 0px 0px;
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

export const ShowIcon = styled.img`
  cursor: pointer;
  margin-left: 13px;
`;
export const EditForm = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 44px;
  grid-row-gap: 32px;
  padding: 32px 40px;
  background-color: #23252c;
  @media ${breakpoints.sm} {
    grid-template-columns: 1fr;
    background-color: transparent;
    padding: 32px 0px;
  }
`;
export const FormGroup = styled.div`
  position: relative;
  p {
    padding-bottom: 24px;
  }
  input,
  select {
    background: #23252c;
    border-radius: 8px;
    width: 100%;
    color: ${colors.text_header};
    font-size: 18px;
    padding: 12px 24px;
    font-weight: 600;
    border: 1px solid #8e8ea1;
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
    border-width: thin;
  }
  input[type="date"] {
    padding-left: 68px;
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
export const CheckboxPolicy = styled.img`
  cursor: pointer;
  margin-right: 14px;
`;
export const FileAttach = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  @media ${breakpoints.sm} {
    grid-column-end: 2;
  }
`;
export const FileAttachGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  margin: 24px 0 8px 0;
  @media ${breakpoints.sm} {
    grid-template-columns: 1fr;
  }
`;
export const FileAttachInput = styled.div`
  background: #334b6c;
  border: 2px dashed #c0c0c0;
  box-sizing: border-box;
  border-radius: 40px;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 24px;
  cursor: pointer;
`;
export const FilePreview = styled(FileAttachInput)`
  border: 1px solid ${colors.accent};
  background-color: transparent;
  justify-content: space-between;
`;
export const ImageView = styled.div`
  border-radius: 8px;
  img {
    width: 100%;
    aspect-ratio: 3/2;
    object-fit: cover;
    border-radius: 8px;
    
  }
`;
export const UploadIcon = styled.div`
  background-color: ${colors.primary};
  width: 54px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  @media ${breakpoints.sm} {
    width: 40px;
    height: 40px;
  }
  .preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    @media ${breakpoints.sm} {
      width: 40px;
      height: 40px;
    }
  }
`;
export const FileName = styled.span`
  display: inline-block;
  width: 150px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
`;
export const FileInput = styled.input`
  display: none;
`;
export const FileInputLabel = styled.label`
  background: #374a61;
  border-radius: 4px;
  width: 70%;
  border: none;
  text-align: end;
`;
export const FormFooter = styled(EditForm)`
  border-top: 1px solid rgba(192, 192, 192, 0.5);
  padding-top: 24px;

  @media ${breakpoints.sm} {
    padding-top: 0;
    border: none;
  }
`;
export const PriceLabel = styled.div`
  width: 30%;
`;
export const Price = styled.div`
  width: 70%;
`;
export const ButtonGroup = styled(AlignCenter)`
  grid-column: 3;
  gap: 12px;
  @media ${breakpoints.sm} {
    grid-column: 1;
    justify-content: space-between;
  }
  button {
    &:last-child {
      color: #e1626e;
    }
  }
`;

export const FlexRight = styled(AlignCenter)`
  justify-content: flex-end;
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
export const TableWrapper = styled.div`
  margin-top: 27px;
  table {
    width: 100%;
  }
  th {
    background-color: ${colors.second_bg};
    padding: 14px 18px;
    text-align: center;
    border-bottom: 1px solid rgba(192, 192, 192, 0.5);
    &:first-child {
      border-top-left-radius: 10px;
    }
    &:last-child {
      border-bottom-right-radius: 10px;
    }
  }
  td {
    padding: 14px 18px;
    border-radius: 0px;
    text-align: center;
    background-color: ${colors.second_bg};
    &:first-child{
      text-align: start;
    }
    p {
      margin: 0;
      font-weight: 600;
    }
  }
  thead {
    @media ${breakpoints.sm} {
      display: none;
    }
  }
`;
export const NoData = styled.div`
  background: ${colors.second_bg};
  padding: 28px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    margin-right: 8px;
  }
`;
