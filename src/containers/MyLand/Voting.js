import eye from "@Assets/images/eye.png";
import house from "@Assets/images/house.png";
import location from "@Assets/images/location.png";
import Button from "@Components/Button";
import Table from "@Components/Table";
import Text from "@Components/Text";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMedia } from "react-use";
import {
  AlignCenter,
  ButtonGroup,
  DetailImg, InfoDetail, MyLandDetailWrapper,
  MyLandLayout,
  Navigation, TableCover
} from "./StyledMyLand";

const Voting = () => {
  const belowSM = useMedia(breakpoints.sm);
  const [land, setLand] = useState(1);
  const tableFields = ["From", "To", "Price", "Date"];
  const [tableData, setTableData] = useState([
    {
      from: "0x0000...000000",
      to: "0x0000...000000",
      price: 120,
      date: "9 days ago"
    },
    {
      from: "0x0000...000000",
      to: "0x0000...000000",
      price: 120,
      date: "9 days ago"
    }
  ]);
  return (
    <>
      <MyLandDetailWrapper>
        <div className="container">
          <Navigation>
            <Link to="my-land">
              <Text color={colors.accent} type={"body"}>
                My land /&nbsp;
              </Text>
            </Link>
            <Text color={colors.text_body} type={"body"}>
              ten lo dat
            </Text>
          </Navigation>
          <MyLandLayout>
            <div>
              <DetailImg src={house} />
              {!belowSM && (
                <div>
                  <Text type={"header2"} color={colors.text_header}>
                    Thông tin chi tiết
                  </Text>
                  <br />
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Ngày khởi tạo
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      2021/09/03
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Hướng
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      Đông-tây
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Diện tích
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      1000m2
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Tỉ lệ
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      1:1000
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Ngày cấp sổ
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      2021/09/03
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Đơn vị cấp sổ
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      CA Hà Nội
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Pháp lí
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      Sổ hồng, sổ đỏ
                    </Text>
                  </InfoDetail>
                </div>
              )}
            </div>
            <div>
              <InfoDetail>
                <Text type={"header2"} color={colors.text_header}>
                  Ten Lo Dat
                </Text>
                <AlignCenter>
                  <a href={`${land.media}`} className="d-flex" target="_blank" rel="noreferrer">
                    <img src={eye} style={{ marginRight: "10px" }} alt="" />
                    <Text color={colors.accent} type={"button"}>
                      See on 360tour
                    </Text>
                  </a>
                </AlignCenter>
              </InfoDetail>
              <AlignCenter style={{ marginBottom: "20px" }}>
                <img src={location} style={{ marginRight: "5px" }} alt="" />
                <Text type={"body1"} color={colors.text_body}>
                  275 nguyen trai, thanh xuan
                </Text>
              </AlignCenter>
              <InfoDetail>
                <Text type={"body1"} color={colors.text_body}>
                  Current Owner
                </Text>
                <Text type={"body1"} color={colors.text_header}>
                  6/10
                </Text>
              </InfoDetail>
              <InfoDetail>
                <Text type={"body1"} color={colors.text_body}>
                  Mã số của thửa đất
                </Text>
                <Text type={"body1"} color={colors.text_header}>
                  BCNW@#
                </Text>
              </InfoDetail>
              <InfoDetail>
                <Text type={"body1"} color={colors.text_body}>
                  Mã số của bản đồ
                </Text>
                <Text type={"body1"} color={colors.text_header}>
                  NV9283
                </Text>
              </InfoDetail>
              <InfoDetail>
                <Text type={"body1"} color={colors.text_body}>
                  Current Market Value
                </Text>
                <Text type={"body1"} color={colors.text_header}>
                  123 UCC
                </Text>
              </InfoDetail>
              <InfoDetail>
                <Text type={"body1"} color={colors.text_body}>
                  Original New Land Value
                </Text>
                <Text type={"body1"} color={colors.text_header}>
                  3 UCC
                </Text>
              </InfoDetail>
              <InfoDetail>
                <Text type={"header2"} color={colors.text_body}>
                  Total
                </Text>
                <Text type={"header2"} color={colors.accent}>
                  123 UCC
                </Text>
              </InfoDetail>
              <ButtonGroup>
                <Button width={"50%"} color={colors.accent}>
                  <Text type={"button"} color={colors.text_header}>
                    CANCEL
                  </Text>
                </Button>
                <Button width={"50%"} color={colors.primary}>
                  <Text type={"button"} color={colors.text_header}>
                    APPLY
                  </Text>
                </Button>
              </ButtonGroup>
              {belowSM && (
                <div>
                  <Text type={"header2"} color={colors.text_header}>
                    Thông tin chi tiết
                  </Text>
                  <br />
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Ngày khởi tạo
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      2021/09/03
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Hướng
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      Đông-tây
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Diện tích
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      1000m2
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Tỉ lệ
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      1:1000
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Ngày cấp sổ
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      2021/09/03
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Đơn vị cấp sổ
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      CA Hà Nội
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Pháp lí
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      Sổ hồng, sổ đỏ
                    </Text>
                  </InfoDetail>
                </div>
              )}
              <TableCover>
                <Table title={"Offers"} fields={tableFields} data={tableData} />
              </TableCover>
            </div>
          </MyLandLayout>
        </div>
      </MyLandDetailWrapper>
    </>
  );
};

export default Voting;
