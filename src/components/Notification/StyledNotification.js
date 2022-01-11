import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";

export const Notice = styled.div`
    position: fixed;
    width: 356px;
    border-radius: 14px;
    right: 75px;
    top: 92px;
    color:white;
    display: flex; 
    background-color: ${(props) => props.color};
    box-sizing: border-box;
    border-radius: 10px;
    align-items: center;
    padding:8px;
    gap: 10px;
    z-index:100;
    @media ${breakpoints.sm} {
        display:flex;
        align-items: center;
        transition: .5s;
        right:30px;
        width:fit-content;
    
     }
`;
export const NoticeText = styled.div`
   display: flex;
    color:white;
    justify-content: center;
    flex-direction: column;
    align-items: left;
    p{
        margin-top: 5px ;
        margin-bottom: 5px;
    }
`;
export const NoticeTextHeader = styled.div`
  
`;
export const NoticeTextContent = styled.div`
    
`;
export const NoticeClose= styled.div`
    display:flex ;
    cursor: pointer;
`;
export const NoticeCloseImage= styled.div`
    height: 22px;
    width: 22px;
    margin:auto;
    cursor: pointer;
`
export const Text = styled.p`
      color: white;
      font-size: 16px;
      margin:0px;
      @media ${breakpoints.xs} {
        font-size: 14px;
      }
`;