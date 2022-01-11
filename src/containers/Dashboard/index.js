import ban_icon from "@Assets/images/ban.png";
import bnb_token from "@Assets/images/bnb-token.png";
import busd from "@Assets/images/busd.png";
import ucctokeno from "@Assets/images/ucc-token-o.png";
import usdt from "@Assets/images/usdt.png";
import Table from "@Components/Table";
import Text from "@Components/Text";
import { MAINNET, TESTNET, WEB3_PROVIDER } from "@Constants/blockchain";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import { contract } from "@Utils/contract";
import { ethers } from "ethers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMedia } from "react-use";
import Button from "../../components/Button";
import { transactionServices } from "../../services/transactionServices";
import {
  DashboardGrid,
  DashboardWrapper, FlexButton, InfoCard, NoData, TableWrap
} from "./StyledDashboard";

const bcConfig = TESTNET;

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [balance, setBalance] = useState({ ucc: 0, usdt: 0, bnb: 0, busd: 0 });
  const account = useSelector((state) => state.account);
  const belowSM = useMedia(breakpoints.sm);
  let provider;
  if (window.ethereum) {
    provider = WEB3_PROVIDER;
  } else {
    if (account.chainId === 97) provider = bcConfig.PROVIDER;
    else provider = MAINNET.PROVIDER;
  }
  const read = new ethers.Contract(
    contract.TOKEN_ADDRESS,
    contract.UCC_ABI,
    provider
  );
  const readBusd = new ethers.Contract(
    contract.BUSD_ADDRESS,
    contract.BUSD_ABI,
    provider
  );
  const readUsdt = new ethers.Contract(
    contract.USDT_ADDRESS,
    contract.USDT_ABI,
    provider
  );
  const getBalance = async () => {
    if (account.address) {
      const resBusd = await readBusd.balanceOf(account.address);
      const resUsdt = await readUsdt.balanceOf(account.address);
      const resUCC = await read.balanceOf(account.address);
      const signer = await provider.getSigner();
      const res = await signer.getBalance();

      setBalance({
        ...balance,
        ucc: Number(resUCC) / 1e18,
        bnb: Number(res) / 1e18,
        usdt: Number(resUsdt) / 1e18,
        busd: Number(resBusd) / 1e18,
      });
    }
  };
  const getUCCTransactions = (filter = {}) => {
    if (account.address) {
      transactionServices
        .getUCCTransactions(filter)
        .then((res) => {
          const { totalPages, page, results } = res;
          let newData = [...data];
          results.map((item) => {
            newData.push(item);
          });
          setTotalPages(totalPages);
          setData(newData);
          setPage(page);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    getBalance();
    getUCCTransactions();
  }, [account.address]);

  return (
    <>
      <DashboardWrapper>
        <div className="container">
          <Text color={colors.text_header} type={"header2"}>
            Balance
          </Text>
          <DashboardGrid>
            <InfoCard>
              <img src={ucctokeno} alt=""/>
              <div>
                <Text color={colors.text_header} type={"header2"}>
                  {balance.ucc.toFixed(4)} UCC
                </Text>
              </div>
            </InfoCard>
            <InfoCard>
              <img src={busd} alt="" />
              <div>
                <Text color={colors.text_header} type={"header2"}>
                  {balance.busd.toFixed(4)} BUSD
                </Text>
              </div>
            </InfoCard>

            <InfoCard>
              <img src={bnb_token} alt="" />
              <div>
                <Text color={colors.text_header} type={"header2"}>
                  {balance.bnb.toFixed(4)} BNB
                </Text>
              </div>
            </InfoCard>
            <InfoCard>
              <img src={usdt} alt="" />
              <div>
                <Text color={colors.text_header} type={"header2"}>
                  {balance.usdt.toFixed(4)} USDT
                </Text>
              </div>
            </InfoCard>
          </DashboardGrid>
          <TableWrap>
            <Table scroll={!belowSM ? true : false}>
              <thead>
                <tr>
                  <th>
                    <Text color={colors.new_text_body} type="button">
                      From
                    </Text>
                  </th>
                  <th>
                    <Text color={colors.new_text_body} type="button">
                      To
                    </Text>
                  </th>
                  <th>
                    <Text color={colors.new_text_body} type="button">
                      Price
                    </Text>
                  </th>
                  {!belowSM && (
                    <th>
                      <Text color={colors.new_text_body} type="button">
                        Date
                      </Text>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody style={{ height: "300px" }}>
                {data.length > 0 ? (
                  data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Text color={colors.text_header} type="body1">
                            {item.who.slice(0,4) +
                              "..." +
                              item.who.slice(item.who.length - 4)}
                          </Text>
                        </td>
                        <td>
                          <Text color={colors.text_header} type="body1">
                            {item.to.slice(0, 4) +
                              "..." +
                              item.to.slice(item.to.length - 4)}
                          </Text>
                        </td>
                        <td>
                          <Text color={colors.accent} type="body1">
                            {item.price} UCC
                          </Text>
                        </td>
                        {!belowSM && (
                          <td>
                            <Text color={colors.text_header} type="body1">
                              {moment(item.timestamps * 1000).format(
                                "MMM D, YYYY, HH:mm"
                              )}
                            </Text>
                          </td>
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6">
                      <NoData>
                        <img src={ban_icon} alt="met365" />
                        <Text color={colors.text_body} type="button">
                          No data to display
                        </Text>
                      </NoData>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <FlexButton>
              <Button
                disabled={page === totalPages ? true : false}
                onClick={() => {
                  if (page + 1 <= totalPages) {
                    getUCCTransactions({ page: page + 1 });
                    setPage(page + 1);
                  }
                }}
                color={colors.new_primary}
                width={"100px"}
              >
                <Text color={colors.text_header} type="body1">
                  Show more
                </Text>
              </Button>
            </FlexButton>
          </TableWrap>
        </div>
      </DashboardWrapper>
    </>
  );
};

export default Dashboard;
