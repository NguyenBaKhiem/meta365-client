import React, { useEffect, useState } from "react";
import Table from "@Components/Table";
import { useMedia } from "react-use";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  ActivityWrapper,
  AlignCenter,
  ButtonList,
  FlexHeader,
  ListAllItem,
  ListAllItems,
  SearchButton,
  TableButton,
  TableCover,
  TableHeader,
} from "../Marketplace/StyledMarketplace";
import {
  showNotificationSuccess,
  showNotificationError,
  hideNotification,
  showNotificationWarning,
} from "@Redux/actions/notification";
import { colors } from "@Theme/colors";
import breakpoints from "@Theme/breakpoints";
import { transactionServices } from "@Services";
import { loading, unloading } from "@Redux/actions/loading";
import { contract } from "@Utils/contract";

const TableOffer = ({ land }) =>{
  const belowSM = useMedia(breakpoints.sm);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOwner, setIsOwner] = useState(false);
  const account = useSelector((state) => state.account);
  const [hasOffer, setHasOffer] = useState(false);
  const [myOffer, setMyOffer] = useState(0);
  const marketSaleType = useSelector((state) => state.market.saleType);
  const [title, setTitle] = useState("Offers");
  const isLogin = useSelector((state) => state.account.isLogin);
  const [tableData, setTableData] = useState([
    {
      who: "0x91d9e23a814267d88f2647d3a3eda8c26e0109b9",
      id: "0x0000...000000",
      offersPrice: 120,
      timestamp: 1639473127,
    },
  ]);
  // const selectBidder = async (input) => {
  //   if (isLogin) {
  //     dispatch(loading());
  //     try {
  //       const tx = await contract.acceptOffer(land.nftId, input.who);
  //       if (tx) {
  //         dispatch(unloading());
  //         dispatch(showNotificationSuccess("Transaction success"));
  //         navigate("/marketplace");
  //       } else {
  //         dispatch(unloading());
  //         dispatch(showNotificationError("Transaction failed"));
  //       }
  //     } catch (error) {
  //       dispatch(unloading());
  //     }
  //   } else {
  //     dispatch(unloading());
  //     dispatch(showNotificationWarning("Not login"));
  //   }
  // };
  useEffect(() => {
    if (land) {
      if (account.address === land.nftOwner) setIsOwner(true);
      if (land.nftId) {
        transactionServices
          .getEventTransactions({
            tokenId: land.nftId,
            type: 1,
          })
          .then((res) => {
            let newTable = [];
            for (let item of res) {
              if (item.who === account.address) {
                setHasOffer(true);
                if (item.offersPrice > myOffer) {
                  setMyOffer(item.offersPrice);
                }
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
          .catch((error) => {
          });
      }
    }
  }, [land]);
  useEffect(() => {
   
  }, []);

  return (
    <TableCover>
      <Table title={title} scroll={false}>
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
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Text color={colors.text_header} type="body1">
                      {item.who.slice(0, 5) +
                        "..." +
                        item.who.slice(item.who.length - 5)}
                    </Text>
                  </td>
                  {!belowSM && (
                    <td>
                      <Text color={colors.text_header} type="body1">
                        {item.id.slice(0, 5) +
                          "..." +
                          item.id.slice(item.id.length - 5)}
                      </Text>
                    </td>
                  )}

                  <td>
                    <Text color={colors.accent} type="body1">
                      {item.offersPrice} UCC
                    </Text>
                  </td>
                  {!belowSM && (
                    <td>
                      <Text color={colors.text_header} type="body1">
                        {item.timestamp}
                      </Text>
                    </td>
                  )}
{/* 
                  {isOwner && (
                    <td>
                      <Button
                        color={colors.primary}
                        width="120px"
                        onClick={() => {
                          selectBidder(item);
                        }}
                      >
                        Select Bidder
                      </Button>
                    </td>
                  )} */}
                </tr>
              );
            })}
        </tbody>
      </Table>
    </TableCover>
  );
};
export default TableOffer;
