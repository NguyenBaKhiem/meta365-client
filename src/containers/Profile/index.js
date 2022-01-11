import avatar from "@Assets/images/avatar2.png";
import copy_icon from "@Assets/images/copy.png";
import logo_bg from "@Assets/images/logo-bg.png";
import Button from "@Components/Button";
import Text from "@Components/Text";
import {
  showNotificationError, showNotificationSuccess, showNotificationWarning
} from "@Redux/actions/notification";
import { userServices } from "@Services";
import { colors } from "@Theme/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CopyIcon, FlexMiddle } from "../../components/Header/StyledHeader";
import {
  Header,
  Input,
  InputGroup, Label,
  LogoImg,
  ProfileForm,
  ProfileLayout,
  ProfileWrapper
} from "./StyledProfile";

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

const Profile = () => {
  const [userData, setUserData] = useState({ email: "", fullName: "" });
  const [defaultValue, setDefaultValue] = useState({});
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  useEffect(() => {
    setUserData({ email: account.email, fullName: account.fullName });
  }, [account]);
  useEffect(() => {
    userServices
      .getMe()
      .then((res) => {
        const user = {
          email: res.email,
          fullName: res.fullName,
        };
        setUserData(user);
        setDefaultValue(user);
      })
      .catch((error) => {});
  }, []);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (defaultValue === userData)
      return dispatch(showNotificationWarning("Nothing Update"));
    if (validateEmail(userData.email)) {
      const result = await userServices.updateMe(userData);
      if(result.code === 400) return  dispatch(showNotificationError(result.message));
      const user = {
        email: result.email,
        fullName: result.fullName,
      };
      setUserData(user);
      dispatch(showNotificationSuccess("Successfully updated"));
    } else {
      dispatch(showNotificationError("Invalid data"));
    }
  };
  const copyTextToClipboard = async (text) => {
    const link = ` ${process.env.REACT_APP_BASE_URL}/?ref=${account.address}`;
    copyToClipboard(link);
    dispatch(showNotificationSuccess("Copied"));
  };
  return (
    <div style={{marginTop: "50px"}}>
      <ProfileWrapper>
        <div className="container">
          <ProfileLayout>
            <div>
              <Header>
                <div>
                  <img src={avatar} alt="" />
                </div>
                <div>
                  <Text color={colors.text_header} type={"header2"}>
                    Profile
                  </Text>
                  <FlexMiddle>
                    <Text color={colors.text_header} type={"body1"}>
                      {process.env.REACT_APP_BASE_URL}/?ref=
                      {account.address.slice(0, 5) +
                        "..." +
                        account.address.slice(account.address.length - 5)}
                    </Text>
                    <CopyIcon
                      src={copy_icon}
                      onClick={() => copyTextToClipboard(account.address)}
                    />
                  </FlexMiddle>
                </div>
              </Header>
              <div>
                <ProfileForm>
                  <InputGroup>
                    <Label>User name</Label>
                    <Input
                      placeholder="User name"
                      type="text"
                      value={userData.fullName ?? ""}
                      onChange={(e) => {
                        setUserData({ ...userData, fullName: e.target.value });
                      }}
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label>Your email</Label>
                    <Input
                      placeholder="Your e-mail"
                      type="email"
                      value={userData.email ?? ""}
                      onChange={(e) => {
                        setUserData({ ...userData, email: e.target.value });
                      }}
                    />
                  </InputGroup>
                  <Button
                    color={colors.new_button}
                    width={"100%"}
                    onClick={(e) => {
                      onSubmit(e);
                    }}
                    disabled={
                      !userData.email || !userData.fullName ? true : false
                    }
                  >
                    SAVE
                  </Button>
                </ProfileForm>
              </div>
            </div>

            <LogoImg>
              <img src={logo_bg} width="100%" />
            </LogoImg>
          </ProfileLayout>
        </div>
      </ProfileWrapper>
    </div>
  );
};

export default Profile;
