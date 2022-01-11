import arrow_up from "@Assets/images/arrow-up.png";
import checked_box from "@Assets/images/checked-box-blue.png";
import close from "@Assets/images/close.png";
import unchecked_box from "@Assets/images/unchecked-box-blue.png";
import Table from "@Components/Table";
import Text from "@Components/Text";
import { nftServices } from "@Services";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useMedia } from "react-use";
import {
  ActivityWrapper,
  AlignCenter,
  ButtonList,
  FlexHeader,
  ListAllItem,
  ListAllItems,
  SearchButton,
  TableButton,
  TableHeader,
  TableWrap
} from "./StyledMarketplace";

const TableActivity = (props) => {
  const belowSM = useMedia(breakpoints.sm);
  const [allItem, setAllItem] = useState(false);
  const [isShowClearAll, setIsShowClearAll] = useState(false);
  const [checked, setChecked] = useState([false, false, false, false]);
  const [data, setData] = useState([]);
  let styleFilter = {
    background: "rgba(66, 133, 244, 0.1)",
  };
  const onCloseButton = () => {
    let check = [false, false, false, false];
    setChecked(check);
    setIsShowClearAll(false);
    setAllItem(false);
  };
  const onCheckAllItems = (number) => {
    let check = [...checked];
    check[number] = !checked[number];
    let checkAllItem = false;
    check.map((item) => {
      if (item) {
        checkAllItem = true;
      }
    });
    setChecked(check);
    setIsShowClearAll(checkAllItem);
  };
  const onShowAllItem = () => {
    setAllItem(!allItem);
  };
  const getMarketActivityFilter = (id, data) => {
    nftServices
      .getNFTActivityFilter(id, data)
      .then((res) => {
        setData(res.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (props.nftIdActivity) {
      getMarketActivityFilter(props.nftIdActivity, {
        sortBy: "timestamp:desc",
      });
    }
  }, [props.nftIdActivity]);
  useEffect(() => {
    let name = "";
    let checkFilter = false;
    checked.map((item) => {
      if (item) {
        checkFilter = true;
      }
      return checkFilter;
    });
    if (checked[0]) {
      name += "transfers";
    }
    if (!checked[0]) name = name.slice("transfers");
    if (checked[1]) {
      name += "sales";
    }
    if (!checked[1]) name = name.slice("sales");
    if (checked[2]) {
      name += "listings";
    }
    if (!checked[2]) name = name.slice("listings");
    if (checked[3]) {
      name += "bids";
    }
    if (!checked[3]) name = name.slice("bids");
    let filter = {
      type: name,
    };
    if (props.nftIdActivity) {
      if (checkFilter) getMarketActivityFilter(props.nftIdActivity, filter);
      else {
        getMarketActivityFilter(props.nftIdActivity, {
          sortBy: "timestamp:desc",
        });
      }
    }
  }, [checked]);

  return (
    <ActivityWrapper>
      <TableHeader>
        <FlexHeader>
          <Text type={"header2"} color={colors.text_header}>
            Activity
          </Text>
        </FlexHeader>
        <FlexHeader>
          <SearchButton onClick={onShowAllItem}>
            <Text color={colors.text_header} type="button">
              Filter
            </Text>
            <img width="20" src={arrow_up} alt="" />
          </SearchButton>
          {allItem && (
            <ListAllItems>
              <ListAllItem
                style={checked[0] ? styleFilter : {}}
                onClick={() => onCheckAllItems(0)}
              >
                <img
                  alt=""
                  height="20"
                  src={checked[0] ? checked_box : unchecked_box}
                />
                <Text type={"body"} color={colors.text_header}>
                  Transfers
                </Text>
              </ListAllItem>
              <ListAllItem
                style={checked[1] ? styleFilter : {}}
                onClick={() => onCheckAllItems(1)}
              >
                <img
                  alt=""
                  height="20"
                  src={checked[1] ? checked_box : unchecked_box}
                />
                <Text type={"body"} color={colors.text_header}>
                  Sales
                </Text>
              </ListAllItem>
              <ListAllItem
                style={checked[2] ? styleFilter : {}}
                onClick={() => onCheckAllItems(2)}
              >
                <img
                  alt=""
                  height="20"
                  src={checked[2] ? checked_box : unchecked_box}
                />
                <Text type={"body"} color={colors.text_header}>
                  Listings
                </Text>
              </ListAllItem>
              <ListAllItem
                style={checked[3] ? styleFilter : {}}
                onClick={() => onCheckAllItems(3)}
              >
                <img
                  alt=""
                  height="20"
                  src={checked[3] ? checked_box : unchecked_box}
                />
                <Text type={"body"} color={colors.text_header}>
                  Bids
                </Text>
              </ListAllItem>
            </ListAllItems>
          )}
        </FlexHeader>
      </TableHeader>

      <TableWrap style={{ zIndex: "1" }}>
        <TableButton>
          {checked[0] && (
            <ButtonList>
              <Text color={colors.text_header} type="body">
                Transfers
              </Text>
              <img
                alt=""
                onClick={() => onCheckAllItems(0)}
                width="24"
                src={close}
              />
            </ButtonList>
          )}
          {checked[1] && (
            <ButtonList>
              <Text color={colors.text_header} type="body">
                Sales
              </Text>
              <img
                alt=""
                onClick={() => onCheckAllItems(1)}
                width="24"
                src={close}
              />
            </ButtonList>
          )}
          {checked[2] && (
            <ButtonList>
              <Text color={colors.text_header} type="body">
                Listings
              </Text>
              <img
                alt=""
                onClick={() => onCheckAllItems(2)}
                width="24"
                src={close}
              />
            </ButtonList>
          )}
          {checked[3] && (
            <ButtonList>
              <Text color={colors.text_header} type="body">
                Bids
              </Text>
              <img
                alt=""
                onClick={() => onCheckAllItems(3)}
                width="24"
                src={close}
              />
            </ButtonList>
          )}
          {isShowClearAll && (
            <div
              style={{ marginTop: "10px", cursor: "pointer" }}
              onClick={onCloseButton}
            >
              <Text color={colors.primary} type="body">
                Clear All
              </Text>
            </div>
          )}
        </TableButton>
        <Table scroll={true} height={data && data.length > 0 ? "250px" : "0"}>
          <thead>
            {!belowSM && (
              <tr>
                <th>
                  <Text color={colors.new_text_body} type="button">
                    Event
                  </Text>
                </th>
                <th>
                  <AlignCenter>
                    <Text color={colors.new_text_body} type="button">
                      Price
                    </Text>
                  </AlignCenter>
                </th>

                <th>
                  <AlignCenter>
                    <Text color={colors.new_text_body} type="button">
                      From
                    </Text>
                  </AlignCenter>
                </th>
                <th>
                  <AlignCenter>
                    <Text color={colors.new_text_body} type="button">
                      To
                    </Text>
                  </AlignCenter>
                </th>
                <th>
                  <AlignCenter>
                    <Text color={colors.new_text_body} type="button">
                      Date
                    </Text>
                  </AlignCenter>
                </th>
              </tr>
            )}
            {belowSM && (
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            )}
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Text color={colors.text_header} type="body1">
                        {item.event}
                      </Text>
                    </td>
                    <td>
                      <Text color={colors.accent} type="body1">
                        {item.price} UCC
                      </Text>
                    </td>
                    <td>
                      <Text color={colors.accent} type="body1">
                        {item.from.slice(0, 5) +
                          "..." +
                          item.from.slice(item.from.length - 5)}
                      </Text>
                    </td>
                    <td>
                      <Text color={colors.text_header} type="body1">
                        {item.to.slice(0, 5) +
                          "..." +
                          item.to.slice(item.to.length - 5)}
                      </Text>
                    </td>
                    <td>
                      <Text color={colors.text_header} type="body1">
                        {moment(item.timestamp * 1000).format(
                          "MMM D, YYYY, HH:mm"
                        )}
                      </Text>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        {data && data.results && data.results.length === 0 && (
          <div style={{ textAlign: "center", color: "#fff" }}>
            No data to display
          </div>
        )}
      </TableWrap>
    </ActivityWrapper>
  );
};
export default TableActivity;
