import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
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
export const TextTitle = styled.div`
  p {
    width: 150px;
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