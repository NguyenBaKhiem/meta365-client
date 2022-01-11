import ban_icon from "@Assets/images/ban.png";
import AdminTable from "@Components/AdminTable";
import Button from "@Components/Button";
import Text from "@Components/Text";
import { loading, unloading } from "@Redux/actions/loading";
import {
  showNotificationError, showNotificationSuccess
} from "@Redux/actions/notification";
import { landServices } from "@Services";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import { contract } from "@Utils/contract";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMedia } from "react-use";
import { AlignCenter, NoData, TextTitle, Title } from "./StyledMintNft";
const MintNft = () => {
  const belowSM = useMedia(breakpoints.sm);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddNFT, setShowAddNFT] = useState(false);
  const userAddress = useSelector((state) => state.account.address);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = (filter = {}) => {
    landServices
      .getUnmintLand(filter)
      .then((res) => {
        const { totalPages, page, results } = res;
        setTotalPages(totalPages);
        setPage(page);
        setTableData(results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const changePage = (page) => {
    fetchLands({ page: page });
    setPage(page);
  };
  const handleMint = async (delegate, length)=>{
    dispatch(loading());
    let address = [];
    let parent = [];
    for(let i = 0; i < length; i++){

      address.push(userAddress);
      parent.push(delegate);
    }
    contract.batchMint(address, parent).then(()=>{
      dispatch(unloading());
      dispatch(showNotificationSuccess('Mint success'));
      fetchLands({ page: page });
    }).catch((err)=>{
      console.log(err);
      dispatch(unloading());
      dispatch(showNotificationError('Mint failed'));
    });
  }
  const renderTable = useCallback(() => {
    return (
      <AdminTable pages={totalPages} activePage={page} pageChange={changePage}>
        <table>
          <thead>
            <tr>
              <th>
                <AlignCenter>
                  <Text color={colors.text_header} type={"button"}>
                    Land code
                  </Text>
                </AlignCenter>
              </th>
              <th>
                <AlignCenter style={{ justifyContent: "center" }}>
                  <Text color={colors.text_header} type={"button"}>
                    ID
                  </Text>
                </AlignCenter>
              </th>
              <th>
                <AlignCenter style={{ justifyContent: "center" }}>
                  <Text color={colors.text_header} type={"button"}>
                    NFT Number
                  </Text>
                </AlignCenter>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <AlignCenter>
                        <TextTitle>
                          <Text color={colors.text_header} type={"body1"}>
                            {item.landCode}
                          </Text>
                          {belowSM && (
                            <Text color={colors.text_body} type={"body2"}>
                              {item.delegate}
                            </Text>
                          )}
                        </TextTitle>
                      </AlignCenter>
                    </td>
                    {!belowSM && (
                      <td style={{ textAlign: "center" }}>
                        <Text color={colors.text_header} type={"body1"}>
                          {item.delegate}
                        </Text>
                      </td>
                    )}

                    <td style={{ textAlign: "center" }}>
                      <Text color={colors.text_header} type={"body1"}>
                        {item.numOfMinted}/{item.numOfNft}
                      </Text>
                    </td>

                    <td>
                      <Button color={colors.primary} width="85px" onClick={()=>handleMint(item.delegate,item.numOfNft)} disabled={item.isMinted}>
                        <Text color={colors.text_header} type={"body2"}>
                          MINT
                        </Text>
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6">
                  <NoData>
                    <img src={ban_icon} alt="met365" />
                    <Text color={colors.text_body} type="button">
                      No items to display
                    </Text>
                  </NoData>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </AdminTable>
    );
  }, [showAddNFT, tableData, totalPages]);


  return (
    <>
      <AlignCenter style={{ marginBottom: "32px", marginTop: "30px" }}>
        <Title>Mint NFTs</Title>
      </AlignCenter>
      {/* <AdminFilter
        onSearch={onSearchLand}
        placeholder={"search by land code"}
      /> */}
      {renderTable()}
    </>
  );
};
export default MintNft;
