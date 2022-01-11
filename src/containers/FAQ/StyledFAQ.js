import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

export const FAQWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top : 80px;
  position: relative;

  padding-bottom: 120px;
  @media ${breakpoints.sm} {
    padding-bottom: 80px;
  }
`;
export const FAQLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
    margin: auto;
  @media ${breakpoints.sm} {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }
`;
export const Title = styled.div`
  margin-bottom: 48 px;
  p {
    text-align: center;
    @media ${breakpoints.sm} {
      text-align: left;
    }
  }
`;
export const QuestionBox = styled.div`
  border: 1px solid ${colors.text_body};
  box-sizing: border-box;
  border-radius: 16px;
  padding: 16px 24px;
  transition: 0.5s;
  margin-bottom: 16px;
  height: fit-content;
  backdrop-filter: blur(15px);

`;
export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Icon = styled.img`
  width: 22px;
  height: 22px;
  cursor: pointer;
`;
export const Answer = styled.div`
  margin-bottom: 8px;
  height: fit-content;
  transition: 0.5s;
  &>*{
    z-index:0;
  }
  li{
    z-index:0;
  }
  p{
    z-index :0;
  }
  ul{
    z-index :0;
  }
`;
export const FAQImg = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  @media ${breakpoints.sm} {
    display: none;
  }
`;
export const EndFaq = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  @media ${breakpoints.sm} {
  }
`;
export const EndFaqHeader = styled.div`
  @media ${breakpoints.sm} {
    margin-bottom: 10px;
  }
`;
export const EndFaqContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    text-align: center;
  }
`;
