import avatar from "@Assets/images/avatar.png";
import close_icon from "@Assets/images/close.png";
import copy_icon from "@Assets/images/copy.png";
import dashboard_icon from "@Assets/images/dashboard.png";
import logo from "@Assets/images/logo.png";
import logout_icon from "@Assets/images/logout.png";
import menu_icon from "@Assets/images/menu.png";
import profile_icon from "@Assets/images/profile.png";
import wallet_icon from "@Assets/images/wallet.png";
import Text from "@Components/Text";
import { loginRequest, logoutRequest } from "@Redux/actions/account";
import { hideSidebar, showSidebar } from "@Redux/actions/menu";
import {
  hideNotification,
  showNotificationError,
  showNotificationSuccess
} from "@Redux/actions/notification";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { useMedia } from "react-use";
import { utils } from "../../utils";
import Button from "../Button";
import Notification from "../Notification/index";
import { nav } from "./nav";
import {
  Avatar,
  AvatarWrapper,
  Beta,
  CloseIcon,
  CopyIcon,
  FlexMiddle,
  HeaderContainer,
  Logo,
  MenuIcon,
  MenuItem,
  MenuList,
  ProfileInfo,
  ProfileMenu,
  ProfileMenuItem,
  Wrapper
} from "./StyledHeader";

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Could not copy text: ", err);
    });
  } else {
    const dummyElement = document.createElement("span");
    dummyElement.style.whiteSpace = "pre";
    dummyElement.textContent = text;
    document.body.appendChild(dummyElement);

    const selection = window.getSelection();
    selection.removeAllRanges();
    const range = document.createRange();
    range.selectNode(dummyElement);
    selection.addRange(range);

    document.execCommand("copy");

    selection.removeAllRanges();
    document.body.removeChild(dummyElement);
  }
}

const Header = (props) => {
  const belowSM = useMedia(breakpoints.sm);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [contentNotice, setContentNotice] = useState({
    content: "You have to download Metamask!",
  });
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const notification = useSelector((state) => state.notification);
  const { isShow } = notification;

  useEffect(() => {
    let checked = false;
    const authListener = async () => {
      if (window.ethereum) {
        const checkExpired = async () => {
          if (!checked) {
            checked = true;
            return await utils.isTokenExpired();
          }
        };
        const test = await checkExpired();
        if (test) {
          dispatch(logoutRequest());
        }
        if (!(await window.ethereum._metamask.isUnlocked())) {
          logout();
        }
        window.ethereum.on("accountsChanged", function (accounts) {
          if (accounts[0] !== account.address) {
            logout();
          }
        });
        window.ethereum.on("chainChanged", function (accounts) {
          logout();
        });
      } else {
        // Notify metamask is not installed
      }
    };
    authListener();

    return () => {
      checked = true;
      window.ethereum.removeListener("accountsChanged");
      window.ethereum.removeListener("chainChanged");
    };
  }, []);
  let provider;
  if (account.address) {
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  } else {
    provider = new ethers.providers.JsonRpcProvider(
      "https://bsc-dataseed.binance.org/"
    );
  }

  useEffect(() => {
    window.addEventListener("click", function (e) {
      if (!e.target.closest(".avatar")) {
        setShowProfileMenu(false);
      }
      if (!e.target.closest(".menu-icon")) {
        setShowMenu(false);
        props.isAdmin && dispatch(hideSidebar());
      }
      if (e.target.closest(".copy-icon")) {
        dispatch(showNotificationSuccess("Copied"));
      }
    });

    if (!window.ethereum) {
      dispatch(showNotificationError(contentNotice.content));
      setTimeout(setTimeNotice, 5000);
    }
    return ()=>{
      window.removeEventListener("click", function () {});
    }
  }, []);

  const setTimeNotice = () => {
    dispatch(hideNotification());
  };

  const connect = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      if (address) {
        provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      }
      let network = await provider.getNetwork();
      let body = {
        publicAddress: address,
        chainId: network.chainId.toString(),
      };
      if (searchParams.get("ref"))
        body = { ...body, ref: searchParams.get("ref") };
      dispatch(loginRequest(body));
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    dispatch(logoutRequest());
  };
  const copyTextToClipboard = async (text) => {
    copyToClipboard(text);
  };
  return (
    <Wrapper isAdmin={props.isAdmin}>
      <HeaderContainer>
        <FlexMiddle>
          {(!props.isAdmin || belowSM) && (
            <NavLink to="/" style={{ position: 'relative' }}>
              <Logo src={logo} />
              <Beta>
                BETA
              </Beta>
            </NavLink>
          )}
        </FlexMiddle>
        <FlexMiddle>
          

          {!props.isAdmin && (
            <MenuList
              style={
                belowSM && !showMenu
                  ? { transform: "translateX(100%)" }
                  : { transform: "translateX(0%)" }
              }
            >
              {belowSM && (
                <CloseIcon
                  onClick={() => {
                    setShowMenu(false);
                  }}
                >
                  <img src={close_icon} alt=""/>
                </CloseIcon>
              )}
              {nav.map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    style={({ isActive }) =>
                      !belowSM
                        ? {
                            color: isActive ? "#4285F4" : "#F5F5F5",
                            borderBottom: `3px solid ${
                              isActive ? "#4285F4" : "transparent"
                            }`,
                          }
                        : {
                            color: isActive ? "#F6F9FF" : "#7683B6",
                          }
                    }
                    to={item.link}
                    target={item.name === "Whitepapers" ? "_blank" : ""}
                  >
                    <MenuItem>{item.name}</MenuItem>
                  </NavLink>
                );
              })}
            </MenuList>
          )}
        </FlexMiddle>
        {isShow && <Notification />}

        <FlexMiddle>
          {account.isLogin ? (
            <FlexMiddle>
              {/* <Notice src={bell_icon} /> */}
              {!props.isAdmin && (
                <AvatarWrapper>
                  <Avatar
                    src={avatar}
                    className="avatar"
                    onClick={() => {
                      setShowProfileMenu(!showProfileMenu);
                    }}
                  />
                  {showProfileMenu && (
                    <ProfileMenu>
                      <ProfileInfo>
                        <img src={avatar} alt=""/>
                        <div>
                          <Text color={colors.accent} type={"body1"}>
                            {account.fullName}
                          </Text>
                          <FlexMiddle>
                            <Text color={colors.text_header} type={"body1"}>
                              {account.address.slice(0, 4) +
                                "..." +
                                account.address.slice(
                                  account.address.length - 4
                                )}
                            </Text>
                            <CopyIcon
                              className="copy-icon"
                              src={copy_icon}
                              onClick={() =>
                                copyTextToClipboard(account.address)
                              }
                            />
                          </FlexMiddle>
                        </div>
                      </ProfileInfo>
                      <div>
                        <Link to="my-land">
                          <ProfileMenuItem>
                            <img src={wallet_icon} alt="" />
                            <Text color={colors.text_header}>My land</Text>
                          </ProfileMenuItem>
                        </Link>
                        <Link to="dashboard">
                          <ProfileMenuItem>
                            <img src={dashboard_icon} alt="" />
                            <Text color={colors.text_header}>Dashboard</Text>
                          </ProfileMenuItem>
                        </Link>
                        <Link to="profile">
                          <ProfileMenuItem>
                            <img src={profile_icon} alt="" />
                            <Text color={colors.text_header}>Profile</Text>
                          </ProfileMenuItem>
                        </Link>
                        {(account.role === "godAccount" ||
                          account.role === "editCreator") && (
                          <Link to="/admin">
                            <ProfileMenuItem>
                              <img src={profile_icon} alt="" />
                              <Text color={colors.text_header}>
                                Go to Admin
                              </Text>
                            </ProfileMenuItem>
                          </Link>
                        )}
                        <ProfileMenuItem
                          style={{ borderRadius: "0 0 16px 16px" }}
                          onClick={() => {
                            logout();
                          }}
                        >
                          <img src={logout_icon} alt="" />
                          <Text color={colors.text_header}>Log out</Text>
                        </ProfileMenuItem>
                      </div>
                    </ProfileMenu>
                  )}
                </AvatarWrapper>
              )}
            </FlexMiddle>
          ) : belowSM ? (
            <Button
              color={colors.new_button}
              width={"92px"}
              size={"sm"}
              onClick={() => {
                connect();
              }}
            >
              Connect
            </Button>
          ) : (
            <Button
              color={colors.new_button}
              width={"144px"}
              size={"sm"}
              onClick={() => {
                connect();
              }}
            >
              Connect Wallet
            </Button>
          )}

          <MenuIcon
            className="menu-icon"
            src={menu_icon}
            onClick={() => {
              props.isAdmin ? dispatch(showSidebar()) : setShowMenu(true);
            }}
          />
        </FlexMiddle>
      </HeaderContainer>
    </Wrapper>
  );
};

export default Header;
