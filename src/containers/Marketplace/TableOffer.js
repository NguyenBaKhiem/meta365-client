import Table from "@Components/Table";
import { loading, unloading } from "@Redux/actions/loading";
import {
  showNotificationError, showNotificationSuccess
} from "@Redux/actions/notification";
import { transactionServices } from "@Services";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import { contract } from "@Utils/contract";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMedia } from "react-use";
import Button from "../../components/Button";
import Text from "@Components/Text";
import {
  AlignCenter, TableCover
} from "./StyledMarketplace";

const TableOffer = (props) => {
  const belowSM = useMedia(breakpoints.sm);
  const land = props.land;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOwner, setIsOwner] = useState(false);
  const account = useSelector((state) => state.account);

  const isLogin = useSelector((state) => state.account.isLogin);
  const [tableData, setTableData] = useState([]);
  const selectBidder = async (input) => {
    if (!isLogin) return dispatch(showNotificationError("Please login"));
    dispatch(loading());
    contract
      .acceptOffer(land.id, input.who)
      .then(() => {
        dispatch(unloading());
        dispatch(showNotificationSuccess("Transaction success"));
        navigate("/marketplace");
      })
      .catch((err) => {
        dispatch(unloading());
        dispatch(showNotificationError(err.message));
      });
  };
  useEffect(() => {
    if (land) {
      if (account.address === land.owner) setIsOwner(true);
      if (land.id) {
        transactionServices
          .getEventTransactions({
            tokenId: land.id,
            type: 1,
          })
          .then((res) => {
            let newTable = [];
            for (let item of res) {
              if (item.who === account.address) {
                props.setHasOffer(true);
              }
              newTable.push({
                who: item.who,
                id: item.id,
                offersPrice: item.offersPrice,
                timestamp: moment(item.timestamp * 1000).format(
                  "MMM D, YYYY, HH:mm"
                ),
              });
            }
            setTableData(newTable);
          })
          .catch((error) => {});
      }
    }
  }, [land]);

  return (
    <TableCover>
      <Table title="Offers" scroll={false}>
        <thead>
          <tr>
            <th>
              <Text color={colors.new_text_body} type="button">
                Hash
              </Text>
            </th>
            <th>
              <AlignCenter>
                <Text color={colors.new_text_body} type="button">
                  Price
                </Text>
              </AlignCenter>
            </th>
            {!belowSM && (
              <th>
                <Text color={colors.new_text_body} type="button">
                  Time
                </Text>
              </th>
            )}
            {isOwner && (
              <th></th>
            )}
          </tr>
        </thead>
        <tbody style={{ overflowY: tableData.length===0 && "auto", height: tableData.length===0 && 0 }}>
          {tableData.length>0 &&
            tableData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Text
                      color={colors.text_header}
                      type="body1"
                      style={{ lineHeight: "44px" }}
                    >
                      {item.who.slice(0, 5) +
                        "..." +
                        item.who.slice(item.who.length - 5)}
                    </Text>
                  </td>

                  <td>
                    <Text
                      color={colors.accent}
                      type="body1"
                      style={{ lineHeight: "44px" }}
                    >
                      {item.offersPrice} UCC
                    </Text>
                  </td>
                  {!belowSM && (
                    <td>
                      <Text
                        color={colors.text_header}
                        type="body1"
                        style={{ lineHeight: "44px" }}
                      >
                        {item.timestamp}
                      </Text>
                    </td>
                  )}

                  {isOwner && (
                    <td>
                      <Button
                        color={colors.new_button}
                        width="120px"
                        onClick={() => {
                          selectBidder(item);
                        }}
                      >
                        Select Bidder
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
     
      </Table>
      {tableData.length===0 && (
              <div style={{textAlign: "center", color: "#fff"}}>No data to display</div>

        )}
    </TableCover>
  );
};
export default TableOffer;
