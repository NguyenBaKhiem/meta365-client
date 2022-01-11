import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

export const Header = styled.div`
    background-color: ${colors.background};
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const SidebarWrapper = styled.div`
  width: 253px;
  height: 100vh;
  background-color: ${colors.second_bg};
  position: relative;
  position: fixed;
  @media ${breakpoints.sm} {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 10;
    transition: 0.5s;
  }
  * {
    font-family: "Inter";
  }
`;
export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
`;
export const SidebarHeader = styled.div`
  padding: 30px 0;
  margin: 0px 20px 20px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  p {
    margin: 0;
  }
`;
export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LogoImg = styled.img`
  width: 45px;
  margin-right: 5px;
`;
export const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: ${colors.white};
  margin: 0;
`;
export const MenuList = styled.div`
  max-height: 70vh;
  overflow-y: scroll;
`;

export const MenuItem = styled.div`
  padding: 16px 5px 16px 20px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;
export const MenuIcon = styled.img`
  width: 24px;
  margin-right: 10px;
`;
export const Notice = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${colors.red};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: white;
  margin-right: 8px;
`;
export const ShowIcon = styled(MenuIcon)`
  margin-right: 7px;
`;
export const Actived = styled.span`
  height: 100%;
  width: 3px;
  background: #ffffff;
  border-radius: 10px;
`;
export const SubmenuItem = styled(MenuItem)`
  padding: 16px 40px 16px 54px;
  background: #222235;
  p {
    margin: 0;
  }
  &:hover {
    background: #2C2C44;
  }
`;
export const ProfileMenu = styled.div`
  background: #34363C;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 30px 20px;
  position: absolute;
  bottom: 0;
  right: -8px;
  z-index: 1;
`;
export const ProfileInfo = styled.div`
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
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
  gap: 16px;
  cursor: pointer;
  &:hover {
    background-color: #222235;
  }
  p {
    margin: 0;
  }
`;
export const ShowMenuIcon =  styled.img`
    display: none;
    @media ${breakpoints.sm} {
        display: block;
    }
`;
export const BackgroundBlur = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
`;
