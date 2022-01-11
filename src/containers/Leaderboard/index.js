import React, { useEffect, useState } from "react";
import Table from "@Components/Table";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import {
  AlignCenter,
  ArrowIcon,
  LeaderboardWrapper,
  TableWrapper,
} from "./StyledLeaderboard";
import arrow_icon from "@Assets/images/dropdown-arrow.png";
import { nftServices } from "@Services/nftServices";

const Leaderboard = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getAllLeaderboard();
    return () => {
      setTableData([]);
    };
  }, []);

  const getAllLeaderboard = () => {
    nftServices
      .getLeaderboard()
      .then((res) => {
        setTableData(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <LeaderboardWrapper>
        <div className="container">
          <Text color={colors.text_header} type={"header2"}>
            Leaderboard
          </Text>
          <TableWrapper>
            <Table scroll={false}>
              <thead>
                <tr>
                  <th style={{textAlign: "left", maxWidth: "60px"}}>
                    <Text color={colors.text_body} type="button">
                      Rank
                    </Text>
                  </th>
                  <th>
                    <Text color={colors.text_body} type="button">
                      User Name
                    </Text>
                  </th>
                  <th>
                    <Text color={colors.text_body} type="button">
                      User
                    </Text>
                  </th>
                  <th>
                    <AlignCenter>
                      <Text color={colors.text_body} type="button">
                        Owned NFT
                      </Text>
                      <ArrowIcon src={arrow_icon} alt="icon" />
                    </AlignCenter>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData &&
                  tableData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ textAlign: "left", maxWidth: "60px" }}>
                          <Text color={colors.text_header} type="body1">
                            {index + 1}
                          </Text>
                        </td>
                        <td>
                          <Text color={colors.text_header} type="body1">
                            {item.fullName}
                          </Text>
                        </td>
                        <td>
                          <Text color={colors.text_header} type="body1">
                            {item.publicAddress.slice(0, 10) +
                              "..." +
                              item.publicAddress.slice(
                                item.publicAddress.length - 10
                              )}
                          </Text>
                        </td>
                        <td>
                          <Text color={colors.text_header} type="body1">
                            {item.countNft}
                          </Text>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </TableWrapper>
        </div>
      </LeaderboardWrapper>
    </>
  );
};

export default Leaderboard;
