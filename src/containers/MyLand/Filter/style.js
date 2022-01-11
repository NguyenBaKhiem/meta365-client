import background from "@Assets/images/fillter.png";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 100px;
  left: 0;
  width: 300px;
  height: calc(100vh - 100px);
  background-color: ${colors.third_bg};
  overflow-y: auto;
  padding: 0 20px;
  backdrop-filter: blur(15px);
  @media ${breakpoints.sm} {
    position: fixed;
    top: 0;
    z-index: 1000;
    width: 100vw;
    /* background: linear-gradient(113.49deg, #062c69 -30.3%, #181e41 75.64%); */
    background-image: url(${background});
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 11px;
  padding: 20px 0;
  border-bottom: 0.5px solid #646f9a;
  @media ${breakpoints.sm} {
    flex-direction: column;
    padding-bottom: 0;
    align-items: flex-start;
  }
  & > div {
    display: flex;
    align-items: center;
    gap: 11px;
    & > span {
      color: #f5f5f5;
      font-size: 24px;
      line-height: 36px;
    }
  }
`;

export const Dropdown = styled.div``;

export const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px;
  cursor: pointer;
  color: #f5f5f5;
`;

export const Content = styled.div`
  padding-bottom: 30px;
  border-bottom: 0.5px solid #646f9a;
`;
export const StatusWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;

export const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  p {
    margin: 0;
  }
`;

export const InputPrice = styled.input.attrs((props) => ({
  type: props.type,
  placeholder: props.placeholder,
}))`
  outline: none;
  background: #4285F41A;
  border-radius: 4px;
  padding: 10px;
  width: 100px;
  color: ${colors.text_header};
  display: flex;
  justify-content: center;
  border: none;
  flex: 1 1 100%;
  text-align: center;
  &::placeholder {
    color: ${colors.sub_text};
  }
  &:focus{
    outline: 1px solid #4285F4;
  }
`;
export const ApplyButton = styled.div`
  margin-top: 24px;
  @media ${breakpoints.sm} {
    display: none;
  }
  button {
    color: ${colors.new_primary};
    border: 1px solid #4285F4;
  }
`;
export const SelectInput = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0px;
  background: rgba(66, 133, 244, 0.1);
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #4285F4;
    p{
      color: #F6F9FF;
    }
  }
  input {
    display: none;
  }
  p {
    margin: 0;
  }
`;

export const Label = styled.label`
  cursor: pointer;
  width: 100%;
  border-radius: 4px;
  transition: .5s;
  &:hover &>div{
    background: rgb(66, 133, 244);
  }
  &:hover {
    background: rgb(66, 133, 244);
  }

  
`;
export const Input = styled.input`
  cursor: pointer;
  appearance: none;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  border: 2px solid #c4c4c4;
  transition: 0.2s all linear;
  margin-right: 5px;
  position: relative;
  &:checked {
    background-color: #166cf6;
    border: 2px solid rgba(22, 108, 246, 0.5);
  }

`;
export const SearchProject = styled.div`
  position: relative;
  margin-bottom: 23px;
  img {
    width: 16px;
    position: absolute;
    top: 11px;
    left: 18px;
  }
  input {
    background: #2c375b;
    border-radius: 4px;
    border: none;
    padding: 10px 20px 10px 40px;
    width: 100%;
    font-family: Open Sans;
    font-size: 14px;
    line-height: 18px;
    color: #646f9a;
    &:focus {
      border: none;
      outline: none;
    }
  }
`;
export const ProjectsList = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;
export const ProjectItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom:10px;
  cursor: pointer;
  img {
    width: 24px;
    cursor: pointer;
  }
`;
export const Box = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.15);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 -20px;
  width: 100vw;
  &:hover{
    background-color: rgb(66, 133, 244);
  }
`;
