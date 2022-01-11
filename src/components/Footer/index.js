import React, { useState } from "react";
import {
  Col1,
  Col2,
  Col3,
  FooterGrid,
  FooterWrapper,
  FormInput,
  MenuItem,
  SocialGroup,
  SocialIcon
} from "./StyledFooter";
import logo from "@Assets/images/logo.png";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import facebook from "@Assets/images/facebook.png";
import twitter from "@Assets/images/twitter.png";
import telegram from "@Assets/images/telegram.png";
import discord from "@Assets/images/discord.png";
import linkin from "@Assets/images/linkin.png";
import { Link } from "react-router-dom";
import Button from "../Button";
import { colors } from "@Theme/colors";
import Text from "../Text";
import whitepaper from "@Assets/whitepaper.pdf";
import { contactServices } from "@Services";
import { useDispatch } from "react-redux";
import {showNotificationSuccess} from "@Redux/actions/notification";
const REGEX_EMAIL = /^\S+@\S+\.\S+$/gim;

const Footer = () => {
  const belowSM = useMedia(breakpoints.sm);
  const [contactData, setContactData] = useState({
    contactName: "",
    email: ""
  });
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (contactData.email && contactData.email.match(REGEX_EMAIL)) {
      await contactServices.postContact(contactData);
      dispatch(showNotificationSuccess("Successfully sent"));
      // reset form
      setContactData({
        contactName: "",
        email: ""
      });
    }
  };
  return (
    <FooterWrapper>
      <div className="container">
        <FooterGrid>
          <Col1>
            <img src={logo} width={belowSM ? "62px" : "75px"} alt="" />
            <SocialGroup>
              <SocialIcon src={facebook} />
              <SocialIcon src={twitter} />
              <SocialIcon src={linkin} />
              <SocialIcon src={telegram} />
              <SocialIcon src={discord} />
            </SocialGroup>
          </Col1>
          <Col2>
            <div>
              <Link to="/">
                <MenuItem>Home</MenuItem>
              </Link>
              <Link to="marketplace">
                <MenuItem>Marketplace</MenuItem>
              </Link>
              <Link to="land">
                <MenuItem>Meta365</MenuItem>
              </Link>
              <Link to={whitepaper} target="_blank">
                <MenuItem>Whitepapers</MenuItem>
              </Link>
            </div>
            <div>
              <Link to="leaderboard">
                <MenuItem>Leaderboard</MenuItem>
              </Link>
              <Link to="news">
                <MenuItem>News</MenuItem>
              </Link>
              <Link to="/">
                <MenuItem>Team</MenuItem>
              </Link>
              <Link to="faq">
                <MenuItem>FAQ</MenuItem>
              </Link>
            </div>
          </Col2>
          <Col3>
            <form>
              <FormInput
                placeholder="Full name*"
                type="text"
                required
                value={contactData.contactName}
                onChange={(e) => {
                  e.preventDefault();
                  setContactData({
                    ...contactData,
                    contactName: e.target.value.trim()
                  });
                }}
              />
              <FormInput
                placeholder="Your business e-mail*"
                type="email"
                required
                value={contactData.email}
                onChange={(e) => {
                  e.preventDefault();
                  setContactData({
                    ...contactData,
                    email: e.target.value.trim()
                  });
                }}
              />

              <Button
                color={colors.new_button}
                width={"100%"}
                onClick={onSubmit}
                disable={
                  contactData.email && contactData.email.match(REGEX_EMAIL)
                }
              >
                <Text color={colors.button} type={"button"}>
                  CONTACT US
                </Text>
              </Button>
            </form>
          </Col3>
        </FooterGrid>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
