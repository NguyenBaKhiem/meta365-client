import right_icon from "@Assets/images/arrow-right-admin.png";
import avatar from "@Assets/images/avatar.png";
import copy_icon from "@Assets/images/copy.png";
import dashboard_icon from "@Assets/images/dashboard.png";
import down_icon from "@Assets/images/dropdown.png";
import logo from "@Assets/images/logo.png";
import logout_icon from "@Assets/images/logout.png";
import menu_icon from "@Assets/images/menu-toggle.png";
import profile_icon from "@Assets/images/profile-circle.png";
import wallet_icon from "@Assets/images/wallet.png";
import { logoutSuccess, updateAddress } from "@Redux/actions/account";
import { getTypeArticle } from "@Redux/actions/article";
import { hideSidebar } from "@Redux/actions/menu";
import { handleLogout } from "@Services/loginServices";
import { sessionServices } from "@Services/sessionServices";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useMedia } from "react-use";
import { UnlockAccess } from "../RoleBasedRouting";
import Text from "../Text";
import { sidebar } from "./sidebar";
import {
  Actived,
  AlignCenter,
  BackgroundBlur,
  CopyIcon, LogoImg,
  MenuIcon,
  MenuItem,
  MenuList, ProfileInfo,
  ProfileMenu,
  ProfileMenuItem,
  ShowIcon,
  ShowMenuIcon,
  SidebarHeader,
  SidebarWrapper,
  SpaceBetween,
  SubmenuItem,
  Title
} from "./StyledSidebar";



function copyToClipboard(text) {
  if(navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(err => {
        console.error('Could not copy text: ', err);
      });
  } else {
    const dummyElement = document.createElement('span');
    dummyElement.style.whiteSpace = 'pre'
    dummyElement.textContent = text;
    document.body.appendChild(dummyElement)

    const selection = window.getSelection();
    selection.removeAllRanges()
    const range = document.createRange()
    range.selectNode(dummyElement)
    selection.addRange(range)

    document.execCommand('copy');

    selection.removeAllRanges()
    document.body.removeChild(dummyElement)
  }
}

const Sidebar = () => {
  const belowSM = useMedia(breakpoints.sm);
  const account = useSelector((state) => state.account);
  const [pageActive, setPageActive] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation();
  const menu = useSelector((state) => state.menu);
  const [showProfile, setShowProfile] = useState(false);
  const [isActive, setIsActive] = useState("All posts");
  const getActiveTab = () => {
    switch (location.pathname) {
      case "/admin":
        setPageActive(0);
        break;
      case "/admin/project":
        setPageActive(1);
        break;
      case "/admin/land":
        setPageActive(2);
        break;
      case "/admin/mint-nft":
        setPageActive(3);
        break;
      case "/admin/account":
        setPageActive(4);
        break;
      default:
        setPageActive(0);
        break;
    }
  };

  const logout = async () => {
    const refreshToken = await sessionServices.getRefreshToken();
    await handleLogout({ refreshToken: refreshToken });
    dispatch(updateAddress({ address: "" }));
    dispatch(logoutSuccess());
  };

  useEffect(() => {
    getActiveTab();
  }, []);

  return (
    <>
      {menu.showSidebar && (
        <BackgroundBlur
          onClick={() => {
            dispatch(hideSidebar());
          }}
        />
      )}

      <SidebarWrapper
        style={
          belowSM && !menu.showSidebar
            ? { transform: "translateX(100%)" }
            : { transform: "translateX(0%)" }
        }
      >
        <div>
          <SidebarHeader>
            <SpaceBetween>
              <AlignCenter>
                <Link to="/">
                  <LogoImg src={logo} />
                </Link>
                <div>
                  <Title>META365</Title>
                  <Text color={colors.white} type={"body2"}>
                    Admin
                  </Text>
                </div>
              </AlignCenter>
              <ShowMenuIcon
                src={menu_icon}
                onClick={() => {
                  dispatch(hideSidebar());
                }}
              />
            </SpaceBetween>
          </SidebarHeader>
          <MenuList>
            {sidebar.map((item, index) => {
              return (
                <UnlockAccess key={index} request={item.roles}>
                  <Link to={item.link}>
                    <MenuItem
                      onClick={() => {
                        item.children && item.showChildren
                          ? (item.showChildren = false)
                          : (item.showChildren = true);
                        setPageActive(index);
                      }}
                    >
                      <AlignCenter>
                        <MenuIcon src={item.icon} />
                        <Text color={colors.white} type={"body1"}>
                          {item.name}
                        </Text>
                      </AlignCenter>
                      <AlignCenter>
                        {item.children && (
                          <ShowIcon
                            src={item.showChildren ? down_icon : right_icon}
                          />
                        )}
                        <Actived
                          style={
                            pageActive === index
                              ? { visibility: "visible" }
                              : { visibility: "hidden" }
                          }
                        />
                      </AlignCenter>
                    </MenuItem>
                  </Link>
                  {item.children &&
                    item.showChildren &&
                    item.children.map((child, i) => {
                      return (
                        <div key={i}>
                          <Link to={child.link}>
                            <SubmenuItem
                              style={
                                isActive == child.name
                                  ? { background: "#2C2C44" }
                                  : {  }
                              }
                              onClick={() => {
                                setPageActive(index);
                                setIsActive(child.name);
                                dispatch(getTypeArticle(child.request));
                              }}
                            >
                              <Text color={colors.text_body} type={"body2"}>
                                {child.name}
                              </Text>
                            </SubmenuItem>
                          </Link>
                        </div>
                      );
                    })}
                </UnlockAccess>
              );
            })}
          </MenuList>
        </div>

        <ProfileMenu>
          <ProfileInfo
            onClick={() => {
              setShowProfile(!showProfile);
            }}
          >
            <img src={avatar} alt=""/>
            <div>
              <Text color={colors.accent} type={"body1"}>
                {account.fullName}
              </Text>
              <AlignCenter>
                <Text color={colors.text_header} type={"body1"}>
                  {account.address.slice(0, 4) +
                    "..." +
                    account.address.slice(account.address.length - 4)}
                </Text>
                <CopyIcon src={copy_icon} onClick={() => copyToClipboard(account.address)} />
              </AlignCenter>
            </div>
          </ProfileInfo>
          {showProfile && (
            <div style={{ borderTop: "1px solid #C0C0C0" }}>
              <Link to="/my-land">
                <ProfileMenuItem>
                  <img src={wallet_icon} alt=""/>
                  <Text color={colors.text_header}>My land</Text>
                </ProfileMenuItem>
              </Link>
              <Link to="/dashboard">
                <ProfileMenuItem>
                  <img src={dashboard_icon} alt=""/>
                  <Text color={colors.text_header}>Dashboard</Text>
                </ProfileMenuItem>
              </Link>
              <Link to="/profile">
                <ProfileMenuItem>
                  <img src={profile_icon} alt=""/>
                  <Text color={colors.text_header}>Profile</Text>
                </ProfileMenuItem>
              </Link>
              <ProfileMenuItem
                onClick={() => {
                  logout();
                }}
              >
                <img src={logout_icon} alt=""/>
                <Text color={colors.text_header}>Log out</Text>
              </ProfileMenuItem>
            </div>
          )}
        </ProfileMenu>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
