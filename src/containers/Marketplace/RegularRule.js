import React from "react";
import {
    ContentRegular,
} from "./StyledMarketplace";
import { colors } from "@Theme/colors";
import { useSelector } from "react-redux";
import Text from "@Components/Text";

const RegularRule = () => {
  const marketSaleType = useSelector((state) => state.market.saleType);

    return (
        <>
        {marketSaleType === "auction" && (
            <ContentRegular>
              <Text type="header2" color={colors.text_header}>
                Regular Auction Rules
              </Text>
              <ul>
                <Text color={colors.text_body} type={"body"}>
                  <li>
                    The seller puts up an item and buyers place bids until the
                    close of the auction, at which time the seller picks the
                    bidder of their choosing to own the item.
                  </li>
                </Text>
                <Text color={colors.text_body} type={"body"}>
                  <li>
                    The details of bidder are shown in a history dashboard of the
                    auction.
                  </li>
                </Text>
                <Text color={colors.text_body} type={"body"}>
                  <li>Sellers have to select a bidder in selection time.</li>
                </Text>
              </ul>
            </ContentRegular>
          )}
          {marketSaleType === "reverse-auction" && (
            <ContentRegular>
              <Text type="header2" color={colors.text_header}>
                Reverse Auction Rules
              </Text>
              <ul>
                <Text color={colors.text_body} type={"body"}>
                  <li>
                    The seller puts up an item as well as sets a starting and
                    ending price for buyers in a certain period of time. At the
                    end of the auction, the item goes to whoever purchases the
                    item first.
                  </li>
                </Text>
                <Text color={colors.text_body} type={"body"}>
                  <li>
                    The winner of the auction will be pronounced after the bidding
                    sessions close.
                  </li>
                </Text>
              </ul>
            </ContentRegular>
          )}
          </>
    );

}
export default RegularRule;