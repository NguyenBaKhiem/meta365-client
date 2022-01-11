
import styled from "styled-components";
export const Container = styled.div`
  position: relative;
  float: left;
  width: 40%;
  height: 57px;
  box-sizing: border-box;

`; 

export const Sd = styled.input.attrs((props)=>({
  type: props.type,
  name: props.name,
}))`
  padding: 17px 50px 17px 50px;
  position: absolute;
  height: 100%;
  width: 100%;
  color: #c4c4c4;
  font-size: 16px;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 12px;
  background: transparent;
  radius: 16px;
  &:focus(
    outline: none !important;
    border: 1px solid #00B67F;
  )

`;
export const Open = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 50px;
  width: 25px;
  height: 25px;
  pointer-events: none;
`;
