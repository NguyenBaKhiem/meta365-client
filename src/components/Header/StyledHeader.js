import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  background: rgba(38, 60, 107, 0.8);
  height: ${props => props.isAdmin ? "0px" : "100px"} ;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    z-index: -1;
  }
`;
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 992px;
  margin: 0 20px;
`;
export const FlexMiddle = styled.div`
  display: flex;
  align-items: center;
`;
export const MenuList = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  @media ${breakpoints.sm} {
    position: fixed;
    z-index: 10;
    background: rgba(38, 60, 107, 0.6);
    backdrop-filter: blur(10px);
    flex-direction: column;
    top: 0;
    right: 0;
    width: 246px;
    height: 100vh;
    transition: 0.5s;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      z-index: -1;
    }
  }
  a {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 20px;
    @media ${breakpoints.sm} {
      padding: 16px;
      width: 100%;
      height: fit-content;
      justify-content: flex-end;
    }
  }
`;
export const CloseIcon = styled.div`
  text-align: start;
  width: 100%;
  padding: 16px 10px;
  cursor: pointer;
`;
export const MenuIcon = styled.img`
  display: none;
  margin-left: 20px;
  cursor: pointer;
  @media ${breakpoints.sm} {
    display: block;
  }
`;
export const Logo = styled.img`
  width: 75px;
  margin: 16px 0;
  @media ${breakpoints.xs} {
    width: 56px;
  }
`;
export const Beta = styled.span`
  bottom: 12px;
  position: absolute;
  right: -10px;
  font-size: 14px;
  color: #ffffff;
  display: inline-block;
  font-weight: bold;
  background: linear-gradient(45deg, #ea4335 10%, #f6bb06 20%, #34a852 55%, #4285f4 70%);
  border-radius: 4px;
  padding: 2px 6px;
  @media ${breakpoints.xs} {
    font-size: 10px;
  }
`
export const MenuItem = styled.div`
  color: inherit;
  font-size: 14px;
  &:hover {
    color: ${colors.new_primary};
  }
  @media ${breakpoints.sm} {
    margin: 0;
  }
`;
export const Notice = styled.img`
  margin-right: 16px;
`;
export const AvatarWrapper = styled.div`
  position: relative;
`;
export const Avatar = styled.img`
  width: 33px;
  height: 33px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
`;
export const ProfileAvt = styled(Avatar)`
  width: 64px;
  height: 64px;
`;
export const ProfileMenu = styled.div`
  background-color: ${colors.second_bg};
  border-radius: 16px;
  position: absolute;
  top: 150%;
  right: 0%;
  width: 246px;
  z-index: 10;
  background: rgba(38, 60, 107, 0.6);
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);

  @media ${breakpoints.sm} {
    right: -160%;
  }
  &::before {
    content: "";
    backdrop-filter: blur(10px);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    background: rgba(38, 60, 107, 0.6);
  }
`;
export const ProfileInfo = styled.div`
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid #c0c0c0;
`;
export const CopyIcon = styled.img`
  width: 24px;
  margin-left: 16px;
  cursor: pointer;
`;
export const ProfileMenuItem = styled.div`
  padding: 16px 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 16px;
  &:hover {
    background: rgba(66, 133, 244, 0.1);
  }
  p {
    margin: 0;
  }
`;
