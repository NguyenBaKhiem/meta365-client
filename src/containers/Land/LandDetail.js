import background from "@Assets/images/background.png";
import Button from "@Components/Button";
import Text from "@Components/Text";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useMedia } from "react-use";
import styled from "styled-components";
import { changeLand } from "../../redux/actions/land";
import { landServices } from "../../services/landServices";
import {
  ButtonGroup, Img, ImgDetail, LandDetailHeader, LandDetailTable,
  LandDetailTableLeft,
  LandDetailTableRight, LandDetailTableRowLeft, LandDetailTableRowLegal, LandDetailTableRowRight, LandDetailTableRowUnit, LandWrapperFlex, LandWrapperFrame, Scroll, WrapImg, WrapperLandDetail
} from "./StyledLand";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

export const ContentDetail = styled.div`
  color: ${colors.white} !important;
  line-height: 24px;
`;
const LandDetail = () => {
  const dispatch = useDispatch()
  const belowSM = useMedia(breakpoints.sm);
  const navigate = useNavigate();
  let { projectPath, landName } = useParams();

  const [landDetail, setLandDetails] = useState();
  let style = {
    position: "relative"
  };
  useEffect(() => {
    getLandDetailsByProject(projectPath, landName);
  }, [projectPath, landName]);
  const getLandDetailsByProject = (projectPath, landCode) => {
    landServices
      .getLandByProject(projectPath, landCode)
      .then((res) => {
        if (res.code === 400) {
          navigate("/page-not-found");
        } else {
          setLandDetails(res);
        }
      })
      .catch((err) => {
        navigate("/page-not-found");
        console.log(err);
      });
  };

  return (
    <div style={{ backgroundImage: `url(${background})`, width: "100vw" }}>
      {landDetail && (
        <>
          <div style={style}>
            <div>
              <Img src={landDetail ? landDetail.thumbnail : ""} />
            </div>
            <LandWrapperFlex>
              <LandWrapperFrame>
                <LandDetailHeader>
                  <Text
                    color={colors.accent}
                    type={!belowSM ? "header3" : "header2"}
                  >
                    {landDetail.projectName}
                  </Text>
                </LandDetailHeader>
                <ContentDetail
                  // id="ContentDetail"
                  dangerouslySetInnerHTML={{
                    __html: landDetail.projectDescription
                  }}
                />
                <LandDetailTable>
                  <Scroll>
                    <LandDetailTableLeft>
                      <LandDetailTableRowLeft>
                        <Text type="body3" color={colors.text_body}>
                          Total NFTs:
                        </Text>
                        <Text type="body3" color={colors.text_header}>
                          {landDetail ? landDetail.numOfNft : ""}
                        </Text>
                      </LandDetailTableRowLeft>
                      <LandDetailTableRowLeft>
                        <Text type="body3" color={colors.text_body}>
                          Created
                        </Text>
                        <Text type="body3" color={colors.text_header}>
                          {moment(landDetail.startDate).format("DD/MM/YYYY")}
                        </Text>
                      </LandDetailTableRowLeft>
                      <LandDetailTableRowLeft>
                        <Text type="body3" color={colors.text_body}>
                          Direction
                        </Text>
                        <Text type="body3" color={colors.text_header}>
                          {landDetail ? landDetail.direction : ""}
                        </Text>
                      </LandDetailTableRowLeft>
                      <LandDetailTableRowLeft>
                        <Text type="body3" color={colors.text_body}>
                          Area
                        </Text>
                        <Text type="body3" color={colors.text_header}>
                          {landDetail ? landDetail.squares : ""}m2
                        </Text>
                      </LandDetailTableRowLeft>
                    </LandDetailTableLeft>
                    <LandDetailTableRight>
                      <LandDetailTableRowRight>
                        <Text type="body3" color={colors.text_body}>
                          Rate
                        </Text>
                        <Text type="body3" color={colors.text_header}>
                          {landDetail ? landDetail.ratio : ""}
                        </Text>
                      </LandDetailTableRowRight>
                      <LandDetailTableRowRight>
                        <Text type="body3" color={colors.text_body}>
                          Issued on
                        </Text>
                        <Text type="body3" color={colors.text_header}>
                          {landDetail
                            ? moment(landDetail.ownershipCerDate).format(
                                "DD/MM/YYYY"
                              )
                            : ""}
                        </Text>
                      </LandDetailTableRowRight>
                      <LandDetailTableRowUnit>
                        <Text type="body3" color={colors.text_body}>
                          Unit
                        </Text>
                        <Text type="body3" color={colors.text_header}>
                          {landDetail ? landDetail.ownershipCerProvider : ""}
                        </Text>
                      </LandDetailTableRowUnit>
                      <LandDetailTableRowLegal>
                        <Text type="body3" color={colors.text_body}>
                          Legal document
                        </Text>
                        <Text type="body3" color={colors.text_header}>
                          {landDetail ? landDetail.legal : ""}
                        </Text>
                      </LandDetailTableRowLegal>
                    </LandDetailTableRight>
                  </Scroll>
                </LandDetailTable>
                <ButtonGroup>
                  <Button
                    width={"100%"}
                    color={colors.accent}
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(changeLand({landId: landDetail.id}))
                      window.top.location.href = `${baseUrl}/marketplace`;
                    }}
                  >
                    <Text type={"button"} color={colors.text_header}>
                      MARKETPLACE
                    </Text>
                  </Button>
                </ButtonGroup>
              </LandWrapperFrame>
            </LandWrapperFlex>
          </div>

          <WrapperLandDetail>
            <div
              style={
                !belowSM ? { width: "70%", margin: "auto" } : { width: "auto" }
              }
              className="container"
            >
              <WrapImg>
                {landDetail ? (
                  landDetail.images.map((item, index) => {
                    return <ImgDetail key={index} src={item} />;
                  })
                ) : (
                  <></>
                )}
              </WrapImg>
            </div>
          </WrapperLandDetail>
        </>
      )}
    </div>
  );
};

export default LandDetail;
