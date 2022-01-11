import styled from "styled-components";

export const Wrapper = styled.div``;

export const Intro = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  & > img {
    width: 80px;
    height: 80px;
  }
  & > div {
    & > h1 {
      font-size: 24px;
      line-height: 32px;
      color: #f5f5f5;
    }
    & > div {
      display: flex;
      align-items: center;
      gap: 10px;
      & > span {
        font-size: 14px;
        line-height: 22px;
        color: #c0c0c0;
      }
    }
  }
`;

export const Value = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
  & > h1 {
    font-size: 14px;
    line-height: 22px;
    color: #c0c0c0;
  }
  & > h2 {
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    color: #f5f5f5;
  }
`;

export const Label = styled.label`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  color: #c0c0c0;
  margin-top: -3px;
`;
export const Button = styled.div`
  background: linear-gradient(214.02deg, #4285f4 6.04%, #5b1ae4 92.95%);
  border-radius: 12px;
  width: 100%;
  font-weight: 600;
  cursor: pointer;
  font-size: 18px;
  line-height: 26px;
  color: #f5f5f5;
  display: grid;
  place-content: center;
  padding: 14px 0;
  margin-top: 30px;
  &:hover {
    box-shadow: 0px 0px 16px rgba(5, 100, 253, 0.8);
  }
`;
export const SelectInput = styled.div`
  display: flex;
  justify-content: left;
  gap: 10px;
  padding: 20px 0px;
`;
export const Input = styled.input`
  cursor: pointer;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid #00b67f;
  transition: 0.2s all linear;
  margin-right: 5px;
  position: relative;
  &:checked {
    background-color: #00b67f;
  }
`;
export const ListAllItems = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  backdrop-filter: blur(30px);
  justify-content: center;
  margin-top: 10px;
  position: absolute;
  right: -10px;
  top: 59px;
  z-index: 5;
  background: #2C375B;
  border-radius: 4px;
`;
export const ListAllItem = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
  cursor: pointer;
  background: #2C375B;
  border-radius:4px ;
  p {
    margin: 0px;
  }
  &:hover{
    background: rgba(66, 133, 244, 0.1);

  }
`;
