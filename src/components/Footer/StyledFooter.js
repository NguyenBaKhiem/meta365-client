import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  background: linear-gradient(113.49deg, #062C69 -30.3%, #181E41 75.64%);
  padding: 64px 0;
  @media ${breakpoints.sm} {
    padding: 32px 0;
  }
`;
export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 4fr 5fr;
  gap: 20px;
  @media ${breakpoints.sm} {
    grid-template-columns: 1fr;
    grid-gap: 48px;
  }
`;
export const SocialGroup = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const SocialIcon = styled.img`
  width: 25px;
`;
export const Col1 = styled.div`
  @media ${breakpoints.sm} {
    grid-row: 2;
  }
`;
export const Col2 = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${breakpoints.sm} {
    grid-row: 3;
  }
`;
export const Col3 = styled.div`
  @media ${breakpoints.sm} {
    grid-row: 1;
  }
`;
export const MenuItem = styled.p`
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 24px;
  color: ${colors.text_header};
  font-weight: 500;
`;
export const FormInput = styled.input`
  font-size: 14px;
  line-height: 20px;
  padding: 14px 24px;
  margin-bottom: 16px;
  border: 1px solid rgba(250, 252, 254, 0.75);
  box-sizing: border-box;
  border-radius: 8px;
  color: ${colors.new_primary};
  background-color: transparent;
  width: 100%;
  &:placeholder{
    color: ${colors.sub_text};
  }
  &:focus{
    border: solid 1px ${colors.new_primary};
    outline: none;
  }
`;
