import React, { useState } from "react";
import {
  FlexMiddle,
  Icon,
  IconGroup,
  InfoDetail,
  InputGroup,
  ModalBox,
  ModalWrapper,
  OfferImg,
  OfferLayout,
  LandInfo
} from "./StyledLand";
import close from "@Assets/images/close-modal.png";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import house from "@Assets/images/house.png";
import location_icon from "@Assets/images/location.png";
import up_icon from "@Assets/images/up.png";
import down_icon from "@Assets/images/down.png";
import Button from "@Components/Button";
import Checkbox from "@Components/Checkbox";

const OfferModal = (props) => {
  const [land, setLand] = useState(1);
  return (
    <>
      <ModalWrapper>
        <ModalBox style={{ opacity: 0.85 }}>
          <InfoDetail>
            <Text color={colors.text_header} type={"header2"}>
              Ten Lo Dat
            </Text>
            <img
              src={close}
              height="16px"
              onClick={props.onCloseModal}
              style={{ cursor: "pointer" }}
              alt=""
            />
          </InfoDetail>
          <OfferLayout>
            <div>
              <OfferImg src={house} />
            </div>
            <div>
              <Text color={colors.text_header} type={"header2"}>
                GoldenLand
              </Text>
              <FlexMiddle>
                <img src={location_icon} style={{ marginRight: "6px" }} alt="" />
                <Text color={colors.text_body} type={"body2"}>
                  2972 Westheimer Rd. Santa Ana, Illinois 85486
                </Text>
              </FlexMiddle>
              <LandInfo>
                <InfoDetail>
                  <Text color={colors.text_body} type={"body2"}>
                    Current Owner
                  </Text>
                  <Text color={colors.text_header} type={"body2"}>
                    6/10
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text color={colors.text_body} type={"body2"}>
                    Current Market Value
                  </Text>
                  <Text color={colors.text_header} type={"body2"}>
                    123 UCC
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text color={colors.text_body} type={"body2"}>
                    Original New Land Value
                  </Text>
                  <Text color={colors.text_header} type={"body2"}>
                    3 UCC
                  </Text>
                </InfoDetail>
              </LandInfo>
              <InfoDetail>
                <FlexMiddle>
                  <InputGroup>
                    <Text type={"button"} color={"#B2B2B2"}>
                      {land}
                    </Text>
                    <IconGroup>
                      <Icon
                        src={up_icon}
                        style={{ marginBottom: "3px" }}
                        onClick={() => {
                          setLand(land + 1);
                        }}
                      />
                      <Icon
                        src={down_icon}
                        style={{ marginTop: "3px" }}
                        onClick={() => {
                          land > 0 ? setLand(land - 1) : setLand(land);
                        }}
                      />
                    </IconGroup>
                  </InputGroup>
                  <Text type={"button"} color={colors.text_header}>
                    Land
                  </Text>
                </FlexMiddle>
                <Text type={"button"} color={colors.accent}>
                  23 UCC
                </Text>
              </InfoDetail>
            </div>
          </OfferLayout>
          <Button color={colors.primary} width={"100%"}>
            <Text color={colors.text_header} type={"button"}>
              SEND OFFER
            </Text>
          </Button>
          <div style={{ marginTop: "10px" }}>
            <Checkbox>
              <Text color={colors.text_body} type={"body2"}>
                By checking this box, I agree to Meta365’s Terms of Service
              </Text>
            </Checkbox>
          </div>
        </ModalBox>
      </ModalWrapper>
    </>
  );
};

export default OfferModal;
